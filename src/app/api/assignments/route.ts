import { getCurrentStudent } from "@/server/auth";
import { listAssignmentsForStudent } from "@/server/assignments.service";
import { MOCK_NOW } from "@/lib/clock";

export const dynamic = "force-dynamic";

export async function GET() {
  const student = getCurrentStudent();
  return Response.json(
    { now: MOCK_NOW, data: listAssignmentsForStudent(student.id, new Date(MOCK_NOW)) },
    { headers: { "Cache-Control": "private, no-store, max-age=0", Vary: "Cookie" } },
  );
}
