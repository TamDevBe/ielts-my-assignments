import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/assignments/route";
import { MOCK_NOW } from "@/lib/clock";

describe("GET /api/assignments", () => {
  it("T09: returns the fixed clock and all four correct statuses", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.now).toBe(MOCK_NOW);
    expect(body.data.map((item: { id: string; status: string; isLate: boolean }) => [item.id, item.status, item.isLate])).toEqual([
      ["A01", "NOT_SUBMITTED", false], ["A02", "OVERDUE", false], ["A03", "SUBMITTED", false], ["A04", "SUBMITTED", true],
    ]);
  });
  it("prevents caching personalized responses", async () => {
    const response = await GET();
    expect(response.headers.get("Cache-Control")).toContain("no-store");
    expect(response.headers.get("Cache-Control")).toContain("private");
    expect(response.headers.get("Vary")).toBe("Cookie");
  });
  it("does not disclose student ownership or emails", async () => {
    const body = await (await GET()).text();
    for (const value of ["B01", "S02", "studentId", "email", "example.test", "lessonId"]) expect(body).not.toContain(value);
  });
});
