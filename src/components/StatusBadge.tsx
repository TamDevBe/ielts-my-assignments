import type { AssignmentDTO, AssignmentStatus } from "@/lib/types";
import { Check, Circle, CircleAlert } from "lucide-react";

export const statusLabels: Record<AssignmentStatus, string> = {
  SUBMITTED: "Đã nộp", OVERDUE: "Quá hạn", NOT_SUBMITTED: "Chưa nộp",
};

export function StatusBadge({ assignment }: { assignment: Pick<AssignmentDTO, "status" | "isLate"> }) {
  const Icon = assignment.status === "SUBMITTED" ? Check : assignment.status === "OVERDUE" ? CircleAlert : Circle;
  return <div className="badges">
    <span className={`badge badge-${assignment.status.toLowerCase()}`}>
      <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
      {statusLabels[assignment.status]}
    </span>
    {assignment.isLate && <span className="badge badge-late">Nộp trễ</span>}
  </div>;
}
