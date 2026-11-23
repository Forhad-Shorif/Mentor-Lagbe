
"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import BrowseTuitionsView from "./BrowseTuitionsView";

export interface TuitionItem {
    _id: string;
    title: string;
    subject?: string;
    classLevel?: string;
    deliveryMode?: string;
    location?: string;
    monthlyFee?: number;
    weeklyClasses?: string;
    coverImageURL?: string;
    logoImageURL?: string;
    name?: string;
    status?: string;
}

const normalize = (value?: string) =>
    (value ?? "").trim().toLowerCase();

const capitalize = (value: string) =>
    value
        ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        : value;

const uniqueSorted = (values: string[]) =>
    [...new Set(values.map((value) => value.trim()).filter(Boolean))].sort(
        (a, b) => a.localeCompare(b)
    );

interface Props {
    initialSearch?: string;
    initialMode?: string;
}

export default function BrowseTuitionsClient({
    initialSearch = "",
    initialMode = "",
}: Props) {
    const [tuitions, setTuitions] = useState<TuitionItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchInput, setSearchInput] = useState(initialSearch);
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [subject, setSubject] = useState("all");
    const [classLevel, setClassLevel] = useState("all");
    const [mode, setMode] = useState(
        initialMode ? capitalize(initialMode) : "all"
    );

    const backendUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    // Fetch active tuitions
    useEffect(() => {
        const controller = new AbortController();

        async function fetchTuitions() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    `${backendUrl}/TuitionsSearch?status=active&limit=200`,
                    {
                        cache: "no-store",
                        signal: controller.signal,
                    }
                );

                const data = await response.json().catch(() => null);

                if (!response.ok) {
                    throw new Error(
                        data?.message || `Server responded with ${response.status}`
                    );
                }

                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.tuitions)
                        ? data.tuitions
                        : [];

                setTuitions(list);
            } catch (err) {
                if ((err as Error).name === "AbortError") return;

                console.error("Tuition fetch error:", err);
                setError(
                    err instanceof Error
                        ? err.message
                        : "Could not load tuitions."
                );
                setTuitions([]);
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        fetchTuitions();
        return () => controller.abort();
    }, [backendUrl]);

    // Filter options
    const subjects = useMemo(
        () => uniqueSorted(tuitions.map((item) => item.subject ?? "")),
        [tuitions]
    );

    const levels = useMemo(
        () => uniqueSorted(tuitions.map((item) => item.classLevel ?? "")),
        [tuitions]
    );

    const modes = useMemo(
        () => uniqueSorted(tuitions.map((item) => item.deliveryMode ?? "")),
        [tuitions]
    );

    const activeMode =
        mode === "all" ||
        modes.length === 0 ||
        modes.some((item) => normalize(item) === normalize(mode))
            ? mode
            : "all";

    // Search and filter
    const filteredTuitions = useMemo(() => {
        const keyword = normalize(searchQuery);

        return tuitions.filter((item) => {
            if (
                subject !== "all" &&
                normalize(item.subject) !== normalize(subject)
            ) return false;

            if (
                classLevel !== "all" &&
                normalize(item.classLevel) !== normalize(classLevel)
            ) return false;

            if (
                activeMode !== "all" &&
                normalize(item.deliveryMode) !== normalize(activeMode)
            ) return false;

            if (!keyword) return true;

            return [
                item.title,
                item.subject,
                item.classLevel,
                item.location,
                item.name,
            ].some((value) => normalize(value).includes(keyword));
        });
    }, [tuitions, searchQuery, subject, classLevel, activeMode]);

    // Search submit
    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearchQuery(searchInput.trim());
    };

    // Reset all filters
    const handleReset = () => {
        setSearchInput("");
        setSearchQuery("");
        setSubject("all");
        setClassLevel("all");
        setMode("all");

        if (typeof window !== "undefined" && window.location.search) {
            window.history.replaceState(
                null,
                "",
                window.location.pathname
            );
        }
    };

    return (
        <BrowseTuitionsView
            tuitions={filteredTuitions}
            total={tuitions.length}
            loading={loading}
            error={error}
            searchInput={searchInput}
            subject={subject}
            classLevel={classLevel}
            mode={activeMode}
            subjects={subjects}
            levels={levels}
            modes={modes}
            onSearchInput={setSearchInput}
            onSearch={handleSearch}
            onSubjectChange={setSubject}
            onLevelChange={setClassLevel}
            onModeChange={setMode}
            onReset={handleReset}
        />
    );
}
