"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteTuitionConfirmButtonProps<
  TTuition extends {
    _id?: string;
    id?: string;
    title?: string;
  },
> {
  tuition: TTuition;
  isBusy: boolean;
  onConfirmDelete: (tuition: TTuition) => void;
}

// হিন্ট: Tuition Delete বাটনে চাপ দিলে shadcn Dialog খুলে নিশ্চিত হওয়ার সুযোগ দেওয়া হচ্ছে।
// হিন্ট: ভুল করে ক্লিক পড়লে যেন সাথে সাথে টিউশন লিস্টিং ডিলিট না হয়ে Cancel করা যায়।
// হিন্ট: open ও onOpenChange দিয়ে ছোট Dialog কন্ট্রোল করে নিশ্চিত হলে onConfirmDelete কল করা হয়েছে।
export default function DeleteTuitionConfirmButton<
  TTuition extends {
    _id?: string;
    id?: string;
    title?: string;
  },
>({
  tuition,
  isBusy,
  onConfirmDelete,
}: DeleteTuitionConfirmButtonProps<TTuition>) {
  const [open, setOpen] = useState(false);

  const tuitionTitle = tuition.title || "this tuition";

  return (
    <>
      <Button
        type="button"
        size="sm"
        disabled={isBusy}
        onClick={() => setOpen(true)}
        className="group relative h-8 gap-1.5 overflow-hidden rounded-xl border border-rose-500/40 bg-gradient-to-r from-rose-600 via-red-600 to-rose-500 px-3.5 text-xs font-extrabold text-white shadow-sm shadow-rose-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-rose-500 hover:to-amber-500 hover:shadow-md hover:shadow-rose-500/30 active:scale-95 dark:border-rose-400/30 dark:from-rose-500/25 dark:via-rose-600/25 dark:to-amber-500/20 dark:text-rose-200 dark:hover:from-rose-500/40 dark:hover:to-amber-500/30 dark:hover:text-white"
      >
        <Trash2 className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-12" />
        <span>{isBusy ? "Working..." : "Delete"}</span>
      </Button>

      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (!isBusy) setOpen(nextOpen);
        }}
      >
        <DialogContent className="max-w-xs rounded-2xl border border-rose-500/30 p-4 sm:max-w-xs">
          <DialogHeader className="space-y-1 text-left">
            <DialogTitle className="text-sm font-extrabold">
              Delete tuition?
            </DialogTitle>
            <DialogDescription className="text-xs">
              Remove <span className="font-bold">{tuitionTitle}</span> listing
              permanently?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-2 flex-row justify-end gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={isBusy}
              onClick={() => setOpen(false)}
              className="h-8 rounded-lg px-3 text-xs font-bold"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={isBusy}
              onClick={() => {
                setOpen(false);
                onConfirmDelete(tuition);
              }}
              className="h-8 rounded-lg bg-rose-600 px-3 text-xs font-extrabold text-white hover:bg-rose-500"
            >
              {isBusy ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}