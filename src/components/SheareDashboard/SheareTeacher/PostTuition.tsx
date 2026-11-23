"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Calendar,
  CalendarClock,
  Camera,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  GraduationCap,
  Hourglass,
  ImagePlus,
  MapPin,
  Monitor,
  Send,
  Sparkles,
  Tag,
  Users,
} from "lucide-react";
import ClientUser from "@/lib/ClientUser";
import { showToast } from "@/lib/utils/toast";

export default function PostTuitionForm() {
  const user = ClientUser() as {
    id?: string;
    email?: string;
    name?: string;
  } | null;

  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [logoImageFile, setLogoImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Live preview states
  const [titlePreview, setTitlePreview] = useState("");
  const [subjectPreview, setSubjectPreview] = useState("Subject");
  const [levelPreview, setLevelPreview] = useState("Class Level");
  const [aboutPreview, setAboutPreview] = useState("");
  const [feePreview, setFeePreview] = useState("0");
  const [modePreview, setModePreview] = useState("Online");
  const [locationPreview, setLocationPreview] = useState("Location");
  const [schedulePreview, setSchedulePreview] = useState("Schedule");
  const [durationPreview, setDurationPreview] = useState("1.5 hrs");
  const [courseDurationPreview, setCourseDurationPreview] = useState("Flexible");
  const [deadlinePreview, setDeadlinePreview] = useState("Open");
  const [seatsPreview, setSeatsPreview] = useState("10 seats");
  const [highlightsInput, setHighlightsInput] = useState(
    "Live Doubt Solving, Practical Projects, Weekly Practice"
  );
  const [formKey, setFormKey] = useState(0);

  const highlightTags = highlightsInput
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);

  const uploadToImgBB = async (file: File): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      throw new Error("Missing NEXT_PUBLIC_IMGBB_API_KEY");
    }

    const uploadData = new FormData();
    uploadData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: uploadData,
    });

    const data = await res.json();
    if (!data?.success || !data?.data?.display_url) {
      throw new Error("Failed to upload image to ImgBB");
    }

    return String(data.data.display_url);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      let coverImageURL = "";
      if (coverImageFile) {
        coverImageURL = await uploadToImgBB(coverImageFile);
      }

      let logoImageURL = "";
      if (logoImageFile) {
        logoImageURL = await uploadToImgBB(logoImageFile);
      }

      const payload = {
        title: String(formData.get("title") || "").trim(),
        subject: String(formData.get("subject") || "").trim(),
        classLevel: String(formData.get("classLevel") || "").trim(),
        deliveryMode: String(formData.get("deliveryMode") || "Online").trim(),
        location: String(formData.get("location") || "").trim(),
        monthlyFee: Number(formData.get("monthlyFee") || 0),
        weeklyClasses: String(formData.get("weeklyClasses") || "").trim(),
        classDuration: String(formData.get("classDuration") || "").trim(),
        courseDuration: String(formData.get("courseDuration") || "").trim(),
        applyDeadline: String(formData.get("applyDeadline") || "").trim(),
        availableSeats: String(formData.get("availableSeats") || "").trim(),
        highlights: highlightTags,
        about: String(formData.get("about") || "").trim(),
        coverImageURL,
        logoImageURL,
        name: user?.name || "Teacher",
        email: user?.email || "",
        mentorId: user?.id || "",
        createdAt: new Date().toISOString(),
      };

      const backendUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      const res = await fetch(`${backendUrl}/TuitionsPost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to publish tuition");
      }

      showToast.success("Tuition published successfully!");

      // .reset() ছাড়াই ফর্ম ও স্টেট অটো ক্লিয়ার
      setFormKey((prev) => prev + 1);
      setCoverImageFile(null);
      setLogoImageFile(null);
      setTitlePreview("");
      setAboutPreview("");
      setCourseDurationPreview("Flexible");
      setDeadlinePreview("Open");
    } catch (error) {
      console.error("Submit error:", error);
      showToast.error(
        error instanceof Error ? error.message : "Could not publish tuition"
      );
    } finally {
      setSubmitting(false);
    }
  };
  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all duration-200 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-500/15 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-950 dark:focus:ring-cyan-400/15";

  const fileInputClass =
    "w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-teal-700 file:px-3.5 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300 dark:file:bg-cyan-400 dark:file:text-slate-950 dark:hover:bg-slate-800";

  const surfaceCard =
    "rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-xs backdrop-blur-xs transition-colors dark:border-slate-800/90 dark:bg-slate-900/75 dark:shadow-[0_0_30px_rgba(6,182,212,0.06)]";

  return (
    <form
      key={formKey}
      onSubmit={handleSubmit}
      className="mx-auto max-w-6xl space-y-6 text-slate-900 dark:text-slate-100"
    >
      {/* Top Hero Header */}
      <div className="relative overflow-hidden rounded-2xl border border-teal-600/20 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-emerald-500/5 p-5 dark:border-cyan-400/25 dark:from-cyan-500/15 dark:via-teal-500/10 dark:to-slate-900">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-600/25 bg-white/80 px-3 py-1 text-xs font-semibold text-teal-800 dark:border-cyan-400/30 dark:bg-slate-950/70 dark:text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Create Course / Tuition</span>
            </span>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Post a Tuition
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Add your tuition details, optional logo & cover image, course duration, and deadline.
            </p>
          </div>
        </div>
      </div>

      {/* Main 12-Col Grid: Left Card (7 cols) + Right Card (5 cols) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Core Info, Images, Highlights & About */}
        <div className="space-y-5 lg:col-span-7">
          <div className={surfaceCard}>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-teal-600/10 px-2.5 py-0.5 text-xs font-semibold text-teal-800 dark:bg-cyan-400/10 dark:text-cyan-300">
                {subjectPreview || "Subject"}
              </span>
              <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {levelPreview || "Class Level"}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Tuition / Course Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Practical Data Science & Machine Learning with Python"
                  onChange={(e) => setTitlePreview(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <Tag className="h-3.5 w-3.5 text-teal-700 dark:text-cyan-400" />
                    <span>Subject *</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="e.g. Data Science"
                    onChange={(e) =>
                      setSubjectPreview(e.target.value.trim() || "Subject")
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <GraduationCap className="h-3.5 w-3.5 text-teal-700 dark:text-cyan-400" />
                    <span>Class Level *</span>
                  </label>
                  <input
                    type="text"
                    name="classLevel"
                    required
                    placeholder="e.g. Class University"
                    onChange={(e) =>
                      setLevelPreview(e.target.value.trim() || "Class Level")
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Cover Image & Logo Image (Optional) */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <Camera className="h-3.5 w-3.5 text-teal-700 dark:text-cyan-400" />
                    <span>Cover Image (Optional)</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setCoverImageFile(e.target.files?.[0] || null)
                    }
                    className={fileInputClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <ImagePlus className="h-3.5 w-3.5 text-teal-700 dark:text-cyan-400" />
                    <span>Logo Image (Optional)</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setLogoImageFile(e.target.files?.[0] || null)
                    }
                    className={fileInputClass}
                  />
                </div>
              </div>

              {/* Key Highlights (Optional) */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <Sparkles className="h-3.5 w-3.5 text-teal-700 dark:text-cyan-400" />
                  <span>Key Highlights (Optional, comma separated)</span>
                </label>
                <input
                  type="text"
                  name="highlights"
                  value={highlightsInput}
                  onChange={(e) => setHighlightsInput(e.target.value)}
                  placeholder="e.g. Live Doubt Solving, Real Projects, Notes Included"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className={surfaceCard}>
            <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
              <FileText className="h-4 w-4 text-teal-700 dark:text-cyan-400" />
              <span>About This Tuition *</span>
            </h2>
            <textarea
              name="about"
              rows={5}
              required
              placeholder="Write topics, syllabus, weekly plan, and what students will learn..."
              onChange={(e) => setAboutPreview(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Right Column: Clean Fee, Schedule & Publish Card */}
        <div className="space-y-5 lg:col-span-5">
          <div className={surfaceCard}>
            {/* Fee Highlight Box */}
            <div className="mb-4 rounded-xl border border-teal-600/20 bg-gradient-to-br from-teal-500/10 to-cyan-500/5 p-4 dark:border-cyan-400/25 dark:from-cyan-500/15 dark:to-slate-950/60">
              <p className="text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:text-cyan-300">
                Monthly Tuition Fee
              </p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  ৳{feePreview || "0"}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  / month
                </span>
              </div>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Monthly Fee (৳) *
                </label>
                <input
                  type="number"
                  name="monthlyFee"
                  min={0}
                  required
                  placeholder="e.g. 6000"
                  onChange={(e) => setFeePreview(e.target.value || "0")}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <Monitor className="h-3.5 w-3.5 text-teal-700 dark:text-cyan-400" />
                    <span>Delivery Mode</span>
                  </label>
                  <select
                    name="deliveryMode"
                    defaultValue="Online"
                    onChange={(e) => setModePreview(e.target.value)}
                    className={inputClass}
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <MapPin className="h-3.5 w-3.5 text-teal-700 dark:text-cyan-400" />
                    <span>Location *</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="e.g. Online or Dhaka"
                    onChange={(e) =>
                      setLocationPreview(e.target.value.trim() || "Location")
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <Calendar className="h-3.5 w-3.5 text-teal-700 dark:text-cyan-400" />
                    <span>Weekly Classes *</span>
                  </label>
                  <input
                    type="text"
                    name="weeklyClasses"
                    required
                    placeholder="e.g. 4 days / week"
                    onChange={(e) =>
                      setSchedulePreview(e.target.value.trim() || "Schedule")
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <Clock className="h-3.5 w-3.5 text-teal-700 dark:text-cyan-400" />
                    <span>Class Duration (Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="classDuration"
                    defaultValue="1.5 hrs"
                    placeholder="e.g. 1.5 hrs"
                    onChange={(e) =>
                      setDurationPreview(e.target.value.trim() || "1.5 hrs")
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <Hourglass className="h-3.5 w-3.5 text-teal-700 dark:text-cyan-400" />
                    <span>Course Duration (Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="courseDuration"
                    placeholder="e.g. 3 Months / 45 Days"
                    onChange={(e) =>
                      setCourseDurationPreview(
                        e.target.value.trim() || "Flexible"
                      )
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <CalendarClock className="h-3.5 w-3.5 text-teal-700 dark:text-cyan-400" />
                    <span>Apply Deadline (Optional)</span>
                  </label>
                  <input
                    type="date"
                    name="applyDeadline"
                    onChange={(e) =>
                      setDeadlinePreview(e.target.value || "Open")
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <Users className="h-3.5 w-3.5 text-teal-700 dark:text-cyan-400" />
                  <span>Batch Capacity / Seats (Optional)</span>
                </label>
                <input
                  type="text"
                  name="availableSeats"
                  defaultValue="10 seats"
                  placeholder="e.g. 10 seats or 1-on-1"
                  onChange={(e) =>
                    setSeatsPreview(e.target.value.trim() || "10 seats")
                  }
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 disabled:opacity-60 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
            >
              {submitting ? (
                <span>Publishing...</span>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Publish Tuition</span>
                </>
              )}
            </button>

            <p className="mt-2.5 flex items-center justify-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
              <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 dark:text-cyan-400" />
              <span>Ready to publish to your tuition board</span>
            </p>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH LIVE PREVIEW SECTION AT THE BOTTOM */}
      <div className={`${surfaceCard} lg:col-span-12`}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-teal-700 dark:text-cyan-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Full Screen Live Preview
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-md bg-teal-600/10 px-2.5 py-0.5 text-xs font-semibold text-teal-800 dark:bg-cyan-400/10 dark:text-cyan-300">
              {subjectPreview}
            </span>
            <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {levelPreview}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Preview: Title, Highlights & About */}
          <div className="space-y-4 lg:col-span-7">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {titlePreview.trim() ||
                  "Practical Data Science & Machine Learning with Python"}
              </h3>
              <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {aboutPreview.trim() ||
                  "Your course overview, syllabus, and learning outcomes will appear here as you type."}
              </p>
            </div>

            {highlightTags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {highlightTags.map((tag, idx) => (
                  <span
                    key={`${tag}-${idx}`}
                    className="rounded-full border border-teal-600/20 bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-800 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right Preview: Fee & All Key Details Grid */}
          <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 text-xs dark:border-slate-800 dark:bg-slate-950/60 sm:grid-cols-3 lg:col-span-5">
            <div>
              <span className="text-slate-500 dark:text-slate-400">
                Monthly Fee
              </span>
              <p className="mt-0.5 text-sm font-extrabold text-teal-800 dark:text-cyan-300">
                ৳{feePreview || "0"} / mo
              </p>
            </div>

            <div>
              <span className="text-slate-500 dark:text-slate-400">
                Delivery Mode
              </span>
              <p className="mt-0.5 font-semibold text-slate-800 dark:text-slate-200">
                {modePreview}
              </p>
            </div>

            <div>
              <span className="text-slate-500 dark:text-slate-400">
                Location
              </span>
              <p className="mt-0.5 font-semibold text-slate-800 dark:text-slate-200">
                {locationPreview}
              </p>
            </div>

            <div>
              <span className="text-slate-500 dark:text-slate-400">
                Schedule
              </span>
              <p className="mt-0.5 font-semibold text-slate-800 dark:text-slate-200">
                {schedulePreview} ({durationPreview})
              </p>
            </div>

            <div>
              <span className="text-slate-500 dark:text-slate-400">
                Course Duration
              </span>
              <p className="mt-0.5 font-semibold text-slate-800 dark:text-slate-200">
                {courseDurationPreview}
              </p>
            </div>

            <div>
              <span className="text-slate-500 dark:text-slate-400">
                Apply Deadline
              </span>
              <p className="mt-0.5 font-semibold text-slate-800 dark:text-slate-200">
                {deadlinePreview}
              </p>
            </div>

            <div>
              <span className="text-slate-500 dark:text-slate-400">
                Batch Seats
              </span>
              <p className="mt-0.5 font-semibold text-slate-800 dark:text-slate-200">
                {seatsPreview}
              </p>
            </div>

            <div className="col-span-2 sm:col-span-2">
              <span className="text-slate-500 dark:text-slate-400">Mentor</span>
              <p className="mt-0.5 inline-flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                <BookOpen className="h-3.5 w-3.5 text-teal-700 dark:text-cyan-400" />
                <span>{user?.name || "Teacher"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}