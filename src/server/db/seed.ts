import "server-only";
import type { Assignment, Lesson, Student, Submission } from "./types";

export const students: readonly Student[] = [
  { id: "S01", fullName: "Học viên S01", email: "s01@example.test", createdAt: "2026-11-01T09:00:00+07:00" },
  { id: "S02", fullName: "Học viên S02", email: "s02@example.test", createdAt: "2026-11-01T09:00:00+07:00" },
];
export const lessons: readonly Lesson[] = [
  { id: "FND-U1-READING", unit: "U1", skill: "Reading", title: "Foundation U1 – Reading" },
  { id: "FND-U2-LISTENING", unit: "U2", skill: "Listening", title: "Foundation U2 – Listening" },
  { id: "FND-U3-WRITING", unit: "U3", skill: "Writing", title: "Foundation U3 – Writing" },
  { id: "FND-U4-SPEAKING", unit: "U4", skill: "Speaking", title: "Foundation U4 – Speaking" },
];
export const assignments: readonly Assignment[] = [
  { id: "A01", studentId: "S01", lessonId: "FND-U1-READING", title: "Foundation U1 – Reading", dueAt: "2026-11-13T23:59:00+07:00" },
  { id: "A02", studentId: "S01", lessonId: "FND-U2-LISTENING", title: "Foundation U2 – Listening", dueAt: "2026-11-09T23:59:00+07:00" },
  { id: "A03", studentId: "S01", lessonId: "FND-U3-WRITING", title: "Foundation U3 – Writing", dueAt: "2026-11-10T23:59:00+07:00" },
  { id: "A04", studentId: "S01", lessonId: "FND-U4-SPEAKING", title: "Foundation U4 – Speaking", dueAt: "2026-11-08T23:59:00+07:00" },
  { id: "B01", studentId: "S02", lessonId: "FND-U1-READING", title: "Foundation U1 – Reading", dueAt: "2026-11-13T23:59:00+07:00" },
];
export const submissions: readonly Submission[] = [
  { id: "SUB-A03", assignmentId: "A03", submittedAt: "2026-11-10T20:00:00+07:00" },
  { id: "SUB-A04", assignmentId: "A04", submittedAt: "2026-11-10T12:00:00+07:00" },
];
