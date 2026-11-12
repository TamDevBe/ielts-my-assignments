import "server-only";
import { assignments, submissions } from "./db/seed";
import { getAssignmentStatus } from "@/lib/status";
import type { AssignmentDTO } from "@/lib/types";

export function listAssignmentsForStudent(studentId: string, now: Date): AssignmentDTO[] {
  return assignments
    .filter((assignment) => assignment.studentId === studentId)
    .map((assignment) => {
      const submittedAt = submissions.find((entry) => entry.assignmentId === assignment.id)?.submittedAt ?? null;
      return {
        id: assignment.id, title: assignment.title, dueAt: assignment.dueAt, submittedAt,
        ...getAssignmentStatus(assignment.dueAt, submittedAt, now),
      };
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}
