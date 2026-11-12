import { describe, expect, it } from "vitest";
import { listAssignmentsForStudent } from "@/server/assignments.service";
import { assignments, lessons, students, submissions } from "@/server/db/seed";
import { MOCK_NOW } from "@/lib/clock";

describe("student data isolation", () => {
  it("T07: S01 gets exactly A01–A04 in ID order", () => {
    expect(listAssignmentsForStudent("S01", new Date(MOCK_NOW)).map((item) => item.id)).toEqual(["A01", "A02", "A03", "A04"]);
  });
  it("T08: S02 gets only B01", () => {
    expect(listAssignmentsForStudent("S02", new Date(MOCK_NOW)).map((item) => item.id)).toEqual(["B01"]);
  });
  it("unknown students get an empty list", () => {
    expect(listAssignmentsForStudent("unknown", new Date(MOCK_NOW))).toEqual([]);
  });
  it("returns only the public DTO fields", () => {
    for (const item of listAssignmentsForStudent("S01", new Date(MOCK_NOW))) {
      expect(Object.keys(item).sort()).toEqual(["dueAt", "id", "isLate", "status", "submittedAt", "title"]);
    }
  });
  it("seed satisfies the four-table relationships and unique submissions", () => {
    expect(assignments).toHaveLength(5);
    expect(students).toHaveLength(2);
    expect(lessons).toHaveLength(4);
    expect(submissions).toHaveLength(2);
    for (const item of assignments) {
      expect(students.some((student) => student.id === item.studentId)).toBe(true);
      expect(lessons.some((lesson) => lesson.id === item.lessonId)).toBe(true);
      expect(item.dueAt).toMatch(/\+07:00$/);
    }
    expect(new Set(submissions.map((item) => item.assignmentId)).size).toBe(submissions.length);
    for (const item of submissions) expect(assignments.some((assignment) => assignment.id === item.assignmentId)).toBe(true);
  });
});
