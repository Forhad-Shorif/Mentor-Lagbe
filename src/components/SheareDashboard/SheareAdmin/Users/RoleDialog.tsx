"use client";

import React, { useEffect, useState } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type UserRole = "student" | "teacher" | "admin";

interface RoleDialogProps {
  userName: string;
  currentRole: UserRole;
  open: boolean;
  loading?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (selectedRole: UserRole) => Promise<void> | void;
}

export default function RoleDialog({
  userName,
  currentRole,
  open,
  loading = false,
  onOpenChange,
  onConfirm,
}: RoleDialogProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedRole(currentRole);
  }, [currentRole, open]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await onConfirm(selectedRole);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl border border-amber-400/40 bg-white/90 text-slate-900 shadow-xl backdrop-blur-xl dark:border-amber-400/30 dark:bg-slate-950/90 dark:text-slate-100 sm:max-w-md">
        <DialogHeader className="space-y-2">
          <DialogTitle className="flex items-center gap-2 text-lg font-extrabold text-slate-900 dark:text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-amber-400/40 bg-amber-400/15">
              <Shield className="h-4 w-4 text-amber-700 dark:text-amber-400" />
            </span>
            <span>Update User Role</span>
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600 dark:text-slate-300">
            Select a new role for{" "}
            <span className="font-bold text-slate-900 dark:text-white">
              {userName}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Select Role
            </label>
            <Select
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value as UserRole)}
            >
              <SelectTrigger className="w-full rounded-xl border-amber-400/35 bg-white/80 text-slate-900 dark:border-amber-400/25 dark:bg-slate-900/80 dark:text-white">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="border-amber-400/30 bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
                <SelectItem value="student">student</SelectItem>
                <SelectItem value="teacher">teacher</SelectItem>
                <SelectItem value="admin">admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2">
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
              type="submit"
              disabled={loading}
              className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 font-bold text-slate-950 hover:brightness-105 dark:from-amber-400 dark:to-yellow-400"
            >
              {loading ? "Updating..." : "Save Role"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}