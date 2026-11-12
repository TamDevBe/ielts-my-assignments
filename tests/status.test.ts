import { describe, expect, it } from "vitest";
import { getAssignmentStatus } from "@/lib/status";
import { MOCK_NOW } from "@/lib/clock";
import { formatDate, formatTime } from "@/lib/format";

describe("assignment status at the fixed clock", () => {
  it.each([
    ["A01", "2026-11-13T23:59:00+07:00", null, "NOT_SUBMITTED", false],
    ["A02", "2026-11-09T23:59:00+07:00", null, "OVERDUE", false],
    ["A03", "2026-11-10T23:59:00+07:00", "2026-11-10T20:00:00+07:00", "SUBMITTED", false],
    ["A04", "2026-11-08T23:59:00+07:00", "2026-11-10T12:00:00+07:00", "SUBMITTED", true],
  ])("T01–T04: %s", (_id, due, submitted, status, isLate) => {
    expect(getAssignmentStatus(due as string, submitted as string | null, new Date(MOCK_NOW))).toEqual({ status, isLate });
  });
  it("T05: submission exactly at deadline is on time", () => {
    expect(getAssignmentStatus(MOCK_NOW, MOCK_NOW, new Date(MOCK_NOW))).toEqual({ status: "SUBMITTED", isLate: false });
  });
  it("T06: now exactly at deadline is not overdue", () => {
    expect(getAssignmentStatus(MOCK_NOW, null, new Date(MOCK_NOW))).toEqual({ status: "NOT_SUBMITTED", isLate: false });
  });
  it("becomes overdue one millisecond after deadline", () => {
    expect(getAssignmentStatus(MOCK_NOW, null, new Date(Date.parse(MOCK_NOW) + 1)).status).toBe("OVERDUE");
  });
  it("submission one millisecond after deadline is late", () => {
    expect(getAssignmentStatus(MOCK_NOW, new Date(Date.parse(MOCK_NOW) + 1).toISOString(), new Date(MOCK_NOW)).isLate).toBe(true);
  });
  it("compares instants independently of ISO timezone offsets", () => {
    expect(getAssignmentStatus(MOCK_NOW, "2026-11-11T02:00:00Z", new Date(MOCK_NOW))).toEqual({ status: "SUBMITTED", isLate: false });
  });
  it("formats UTC input in GMT+7 regardless of the system timezone", () => {
    expect(formatDate("2026-11-10T18:00:00Z")).toBe("11/11/2026");
    expect(formatTime("2026-11-10T18:00:00Z")).toBe("01:00");
  });
});
