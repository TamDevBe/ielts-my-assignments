import "server-only";
import { students } from "./db/seed";

// Demo identity is owned by the server. Replace with a verified session in production.
export function getCurrentStudent() {
  return students.find((student) => student.id === "S01")!;
}
