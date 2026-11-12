import { test, expect } from "@playwright/test";

test("T10: URL and cookie cannot change the server identity", async ({ request }) => {
  const response = await request.get("/api/assignments?studentId=S02&student_id=S02", { headers: { Cookie: "studentId=S02" } });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.data.map((item: { id: string }) => item.id)).toEqual(["A01", "A02", "A03", "A04"]);
  expect(response.headers()["cache-control"]).toContain("no-store");
});

for (const width of [320, 375, 414, 768, 1280]) {
  test(`T11: readable layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Bài tập của tôi." })).toBeVisible();
    const container = width < 768 ? page.locator(".assignment-cards") : page.getByRole("table");
    await expect(container.getByRole("heading", { name: "Foundation U1 – Reading" })).toBeVisible();
    await expect(container.getByText("Nộp trễ", { exact: true })).toBeVisible();
    await expect(container.getByText("Quá hạn", { exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (width === 1280) await page.screenshot({ path: "docs/screenshot.png", fullPage: true });
    if (width === 375) await page.screenshot({ path: "docs/screenshot-mobile.png", fullPage: true });
  });
}

test("filters assignments and resets after an empty result", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".result-count")).toHaveText("4 bài tập");
  await page.getByLabel("Trạng thái", { exact: true }).selectOption("SUBMITTED");
  await expect(page.locator(".result-count")).toHaveText("2 bài tập");
  await page.getByLabel("Trạng thái", { exact: true }).selectOption("ALL");
  await expect(page.locator(".result-count")).toHaveText("4 bài tập");
});

test("displays an API error and retries successfully", async ({ page }) => {
  let fail = true;
  await page.route("**/api/assignments", (route) => fail ? route.fulfill({ status: 503 }) : route.continue());
  await page.goto("/");
  await expect(page.getByRole("main").getByRole("alert")).toContainText("Chưa tải được bài tập");
  fail = false;
  await page.getByRole("button", { name: "Thử lại" }).click();
  await expect(page.locator(".result-count")).toHaveText("4 bài tập");
});

test("handles no assignments and no matching filter", async ({ page }) => {
  await page.route("**/api/assignments", (route) => route.fulfill({ json: { now: "2026-11-11T09:00:00+07:00", data: [] } }));
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Bạn chưa được giao bài tập" })).toBeVisible();
  await page.unroute("**/api/assignments");
  await page.getByRole("button", { name: "Tải lại", exact: true }).click();
  await expect(page.locator(".result-count")).toHaveText("4 bài tập");
  await page.route("**/api/assignments", async (route) => {
    const response = await route.fetch();
    const body = await response.json();
    await route.fulfill({ json: { ...body, data: body.data.filter((item: { status: string }) => item.status === "SUBMITTED") } });
  });
  await page.reload();
  await expect(page.locator(".result-count")).toHaveText("2 bài tập");
  await page.getByLabel("Trạng thái", { exact: true }).selectOption("OVERDUE");
  await expect(page.getByRole("heading", { name: "Không có bài ở trạng thái này" })).toBeVisible();
  await page.getByRole("button", { name: "Xem tất cả" }).click();
  await expect(page.locator(".result-count")).toHaveText("2 bài tập");
});
