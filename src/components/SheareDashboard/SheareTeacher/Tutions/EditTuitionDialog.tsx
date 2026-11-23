"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { TuitionItem } from "@/components/SheareDashboard/SheareTeacher/My-Tuition";

interface EditTuitionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tuition: TuitionItem | null;
  onUpdated?: (updated: TuitionItem) => void;
}

export default function EditTuitionDialog({
  open,
  onOpenChange,
  tuition,
  onUpdated,
}: EditTuitionDialogProps) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [monthlyFee, setMonthlyFee] = useState("");
  const [location, setLocation] = useState("");
  const [weeklyClasses, setWeeklyClasses] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [about, setAbout] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!tuition) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTitle(tuition.title || "");
    setSubject(tuition.subject || "");
    setClassLevel(tuition.classLevel || "");
    setMonthlyFee(String(tuition.monthlyFee ?? 0));
    setLocation(tuition.location || "");
    setWeeklyClasses(tuition.weeklyClasses || "");
    setCourseDuration(tuition.courseDuration || "");
    setAbout(tuition.about || "");
  }, [tuition]);

  const backendUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tuition?._id) return;

    try {
      setSaving(true);

      const res = await fetch(`${backendUrl}/TuitionsEdit/${tuition._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          subject: subject.trim(),
          classLevel: classLevel.trim(),
          monthlyFee: Number(monthlyFee || 0),
          location: location.trim(),
          weeklyClasses: weeklyClasses.trim(),
          courseDuration: courseDuration.trim(),
          about: about.trim(),
        }),
      });

      if (res.ok) {
        onUpdated?.({
          ...(tuition as TuitionItem),
          title: title.trim(),
          subject: subject.trim(),
          classLevel: classLevel.trim(),
          monthlyFee: Number(monthlyFee || 0),
          location: location.trim(),
          weeklyClasses: weeklyClasses.trim(),
          courseDuration: courseDuration.trim(),
          about: about.trim(),
        });
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Edit error:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Tuition</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label>Subject</Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label>Class Level</Label>
              <Input
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label>Monthly Fee (৳)</Label>
              <Input
                type="number"
                value={monthlyFee}
                onChange={(e) => setMonthlyFee(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label>Location</Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label>Weekly Classes</Label>
              <Input
                value={weeklyClasses}
                onChange={(e) => setWeeklyClasses(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label>Course Duration (Optional)</Label>
              <Input
                value={courseDuration}
                onChange={(e) => setCourseDuration(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label>About</Label>
            <Textarea
              rows={3}
              value={about}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setAbout(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}