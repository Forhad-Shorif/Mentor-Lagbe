"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Ban,
  CheckCircle2,
  CreditCard,
  Mail,
  RefreshCw,
  Shield,
  Trash2,
} from "lucide-react";
import { showToast } from "@/lib/utils/toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import RoleDialog, { UserRole } from "./RoleDialog";
import BlockUserDialog from "./BlockUserDialog";
import DeleteUserDialog from "./DeleteUserDialog";

export interface AdminUserRecord {
  _id: string;
  name?: string;
  email: string;
  // Backend e legacy "student"/"teacher" o thakte pare, tai string rakha hoy.
  role?: string;
  status?: "active" | "blocked";
  payment?: boolean;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function notifyOnce(type: "success" | "error", id: string, message: string) {
  showToast[type](message, { id });
}

export default function AdminUsersView() {
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [paymentUpdatingId, setPaymentUpdatingId] = useState<string | null>(
    null
  );

  const [roleTarget, setRoleTarget] = useState<AdminUserRecord | null>(null);
  const [blockTarget, setBlockTarget] = useState<AdminUserRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminUserRecord | null>(null);

  const hasFetchedRef = useRef(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/GetUsers`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.users)
        ? data.users
        : [];
      setUsers(list);
    } catch {
      notifyOnce("error", "admin-users-fetch-error", "Could not load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    fetchUsers();
  }, [fetchUsers]);

  const handleTogglePayment = async (user: AdminUserRecord) => {
    const nextPayment = !Boolean(user.payment);
    try {
      setPaymentUpdatingId(user._id);
      const res = await fetch(`${API_BASE}/UpdateUserPayment/${user._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payment: nextPayment }),
      });
      if (!res.ok) throw new Error("Payment update failed");

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, payment: nextPayment } : u
        )
      );
      notifyOnce(
        "success",
        "admin-user-payment",
        `Payment updated to ${nextPayment ? "true" : "false"}`
      );
    } catch {
      notifyOnce(
        "error",
        "admin-user-payment",
        "Failed to update payment status"
      );
    } finally {
      setPaymentUpdatingId(null);
    }
  };

  const handleRoleUpdate = async (selectedRole: UserRole) => {
    if (!roleTarget) return;
    try {
      setActionLoading(true);
      const res = await fetch(`${API_BASE}/UpdateUserRole/${roleTarget._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole }),
      });
      if (!res.ok) throw new Error("Role update failed");

      setUsers((prev) =>
        prev.map((u) =>
          u._id === roleTarget._id ? { ...u, role: selectedRole } : u
        )
      );
      notifyOnce(
        "success",
        "admin-user-role",
        `Role updated to ${selectedRole}`
      );
      setRoleTarget(null);
    } catch {
      notifyOnce("error", "admin-user-role", "Failed to update role");
    } finally {
      setActionLoading(false);
    }
  };

  const handleBlockConfirm = async () => {
    if (!blockTarget) return;
    const nextStatus = blockTarget.status === "blocked" ? "active" : "blocked";
    try {
      setActionLoading(true);
      const res = await fetch(`${API_BASE}/UpdateUserStatus/${blockTarget._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!res.ok) throw new Error("Status update failed");

      setUsers((prev) =>
        prev.map((u) =>
          u._id === blockTarget._id ? { ...u, status: nextStatus } : u
        )
      );
      notifyOnce(
        "success",
        "admin-user-status",
        `${blockTarget.name || blockTarget.email} is now ${nextStatus}`
      );
      setBlockTarget(null);
    } catch {
      notifyOnce("error", "admin-user-status", "Failed to update status");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      setActionLoading(true);
      const res = await fetch(`${API_BASE}/DeleteUser/${deleteTarget._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setUsers((prev) => prev.filter((u) => u._id !== deleteTarget._id));
      notifyOnce(
        "success",
        "admin-user-delete",
        `${deleteTarget.name || deleteTarget.email} deleted & session cleared`
      );
      setDeleteTarget(null);
    } catch {
      notifyOnce("error", "admin-user-delete", "Failed to delete user");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-2.5">
        {[1, 2, 3].map((n) => (
          <Card
            key={n}
            className="h-16 animate-pulse rounded-2xl border-amber-400/25 bg-white/60 backdrop-blur-md dark:border-amber-400/15 dark:bg-slate-900/50"
          />
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <Card className="rounded-2xl border border-amber-400/35 bg-white/70 shadow-sm backdrop-blur-md dark:border-amber-400/25 dark:bg-slate-900/60">
        <CardContent className="py-8 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">
          No users found in database.
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-2.5">
        {users.map((user) => {
          const displayName = user.name || "Unnamed User";
          const currentRole: UserRole =
            user.role === "teacher" || user.role === "teachers"
              ? "teachers"
              : user.role === "admin"
                ? "admin"
                : "students";
          const isBlocked = user.status === "blocked";
          const isPaid = Boolean(user.payment);
          const isPaymentBusy = paymentUpdatingId === user._id;

          return (
            <Card
              key={user._id}
              className="rounded-2xl border border-amber-400/35 bg-gradient-to-r from-white/75 via-amber-50/40 to-white/70 text-slate-900 shadow-sm shadow-amber-900/5 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-500/60 hover:shadow-md dark:border-amber-400/25 dark:from-slate-900/75 dark:via-amber-950/20 dark:to-slate-900/70 dark:text-slate-100 dark:shadow-black/25 dark:hover:border-amber-400/55"
            >
              <CardContent className="flex flex-col justify-between gap-3 px-4 py-3 lg:flex-row lg:items-center lg:px-6 lg:py-3.5">
                <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-amber-400/40 bg-amber-300/30 text-xs font-black text-amber-950 dark:border-amber-400/35 dark:bg-amber-400/15 dark:text-amber-300">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                    <h2 className="truncate text-sm font-extrabold text-slate-900 dark:text-white sm:text-[15px]">
                      {displayName}
                    </h2>
                    {isBlocked && (
                      <Badge className="h-5 border border-rose-500/40 bg-rose-500/15 px-2 text-[10px] uppercase text-rose-700 dark:bg-rose-500/20 dark:text-rose-300">
                        blocked
                      </Badge>
                    )}
                  </div>

                  <p className="flex min-w-0 items-center gap-1.5 truncate text-xs font-medium text-slate-600 dark:text-slate-300">
                    <Mail className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
                    <span className="truncate">{user.email}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 lg:justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setRoleTarget(user)}
                    className="h-8 gap-1.5 rounded-xl border-amber-400/45 bg-amber-400/15 px-3 text-xs font-extrabold uppercase text-amber-950 hover:border-amber-500 hover:bg-amber-400/25 dark:border-amber-400/35 dark:bg-amber-400/15 dark:text-amber-200 dark:hover:border-amber-400/65 dark:hover:bg-amber-400/25 dark:hover:text-white"
                  >
                    <Shield className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />
                    <span>{currentRole}</span>
                  </Button>

                  <Badge
                    variant="secondary"
                    className={`h-8 gap-1.5 rounded-xl border px-3 text-xs font-bold ${
                      isPaid
                        ? "border-amber-400/50 bg-amber-300/25 text-amber-950 dark:border-amber-400/45 dark:bg-amber-400/20 dark:text-amber-200"
                        : "border-slate-300/70 bg-white/65 text-slate-700 dark:border-slate-700/80 dark:bg-slate-950/60 dark:text-slate-300"
                    }`}
                  >
                    <CreditCard className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />
                    <span>Payment: {isPaid ? "true" : "false"}</span>
                  </Badge>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isPaymentBusy}
                    onClick={() => handleTogglePayment(user)}
                    className="h-8 gap-1 rounded-xl border-amber-400/35 bg-white/75 px-2.5 text-xs font-bold text-slate-800 hover:border-amber-500/60 hover:bg-amber-50 dark:border-amber-400/25 dark:bg-slate-950/65 dark:text-slate-200 dark:hover:border-amber-400/50 dark:hover:bg-amber-400/10 dark:hover:text-white"
                  >
                    <RefreshCw
                      className={`h-3 w-3 text-amber-600 dark:text-amber-400 ${
                        isPaymentBusy ? "animate-spin" : ""
                      }`}
                    />
                    <span>{isPaid ? "Set Free" : "Set Paid"}</span>
                  </Button>
                </div>

                <div className="flex shrink-0 items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setBlockTarget(user)}
                    className="h-8 gap-1.5 rounded-xl border-amber-400/40 bg-white/75 px-3 text-xs font-bold text-slate-800 hover:border-amber-500 hover:bg-amber-50 dark:border-amber-400/30 dark:bg-slate-950/65 dark:text-amber-200 dark:hover:border-amber-400/60 dark:hover:bg-amber-400/15 dark:hover:text-white"
                  >
                    {isBlocked ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Ban className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                    )}
                    <span>{isBlocked ? "Unblock" : "Block"}</span>
                  </Button>

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteTarget(user)}
                    className="h-8 gap-1.5 rounded-xl px-3 text-xs font-bold dark:border dark:border-rose-500/35 dark:bg-rose-500/20 dark:text-rose-200 dark:hover:bg-rose-500/35 dark:hover:text-white"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <RoleDialog
        userName={roleTarget?.name || roleTarget?.email || ""}
        currentRole={
          roleTarget?.role === "teacher" || roleTarget?.role === "teachers"
            ? "teachers"
            : roleTarget?.role === "admin"
              ? "admin"
              : "students"
        }
        open={Boolean(roleTarget)}
        loading={actionLoading}
        onOpenChange={(open) => !open && setRoleTarget(null)}
        onConfirm={handleRoleUpdate}
      />

      <BlockUserDialog
        userName={blockTarget?.name || blockTarget?.email || ""}
        currentStatus={blockTarget?.status || "active"}
        open={Boolean(blockTarget)}
        loading={actionLoading}
        onOpenChange={(open) => !open && setBlockTarget(null)}
        onConfirm={handleBlockConfirm}
      />

      <DeleteUserDialog
        userName={deleteTarget?.name || deleteTarget?.email || ""}
        open={Boolean(deleteTarget)}
        loading={actionLoading}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}