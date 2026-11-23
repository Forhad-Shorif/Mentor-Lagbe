"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteTuitionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: string | null;
    onDeleted?: (id: string) => void;
}

export default function DeleteTuitionDialog({
    open,
    onOpenChange,
    id,
    onDeleted,
}: DeleteTuitionDialogProps) {
    const [deleting, setDeleting] = useState(false);

    const backendUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const handleDelete = async () => {
        if (!id) return;

        try {
            setDeleting(true);
            const res = await fetch(`${backendUrl}/TuitionsDelete/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                onDeleted?.(id);
                onOpenChange(false);
            }
        } catch (error) {
            console.error("Delete error:", error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Delete Tuition?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this tuition?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}