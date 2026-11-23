"use client";

import React from "react";
import { Ban, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BlockUserDialogProps {
  userName: string;
  currentStatus: "active" | "blocked";
  open: boolean;
  loading?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
}

export default function BlockUserDialog({
  userName,
  currentStatus,
  open,
  loading = false,
  onOpenChange,
  onConfirm,
}: BlockUserDialogProps) {
  const isBlocking = currentStatus !== "blocked";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl border border-amber-400/40 bg-white/90 text-slate-900 shadow-xl backdrop-blur-xl dark:border-amber-400/30 dark:bg-slate-950/90 dark:text-slate-100 sm:max-w-md">
        <DialogHeader className="space-y-2">
          <DialogTitle className="flex items-center gap-2 text-lg font-extrabold text-slate-900 dark:text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-400/40 bg-amber-400/15">
              {isBlocking ? (
                <Ban className="h-4 w-4 text-amber-700 dark:text-amber-400" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              )}
            </span>
            <span>{isBlocking ? "Block User" : "Unblock User"}</span>
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600 dark:text-slate-300">
            Are you sure you want to{" "}
            <span className="font-bold text-amber-800 dark:text-amber-300">
              {isBlocking ? "block" : "unblock"}
            </span>{" "}
            this user:{" "}
            <span className="font-extrabold text-slate-900 dark:text-white">
              {userName}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-2 gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => onOpenChange(false)}
            className="rounded-xl border-amber-400/35 bg-white/80 font-bold text-slate-800 hover:bg-amber-50 dark:border-amber-400/25 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant={isBlocking ? "destructive" : "default"}
            disabled={loading}
            onClick={onConfirm}
            className={
              isBlocking
                ? "rounded-xl bg-rose-600 font-bold text-white hover:bg-rose-500 dark:border dark:border-rose-500/40 dark:bg-rose-500/25 dark:text-rose-200 dark:hover:bg-rose-500/40"
                : "rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 font-bold text-slate-950 hover:brightness-105 dark:from-amber-400 dark:to-yellow-400"
            }
          >
            {loading
              ? "Please wait..."
              : isBlocking
              ? "Yes, Block"
              : "Yes, Unblock"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}