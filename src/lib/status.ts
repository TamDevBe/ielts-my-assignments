import type { AssignmentStatus } from "./types";

export function getAssignmentStatus(
  dueAt: string,
  submittedAt: string | null,
  now: Date,
): { status: AssignmentStatus; isLate: boolean } {
  const due = Date.parse(dueAt);
  if (submittedAt !== null) {
    return { status: "SUBMITTED", isLate: Date.parse(submittedAt) > due };
  }
  return { status: now.getTime() > due ? "OVERDUE" : "NOT_SUBMITTED", isLate: false };
}
