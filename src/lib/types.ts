export type AssignmentStatus = "SUBMITTED" | "OVERDUE" | "NOT_SUBMITTED";

export interface AssignmentDTO {
  id: string;
  title: string;
  dueAt: string;
  submittedAt: string | null;
  status: AssignmentStatus;
  isLate: boolean;
}

export interface AssignmentsResponse {
  now: string;
  data: AssignmentDTO[];
}
