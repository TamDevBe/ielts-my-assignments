"use client";

import { useState } from "react";
import useSWR from "swr";
import { BookOpen, CircleCheck, ClockAlert } from "lucide-react";
import type { AssignmentStatus, AssignmentsResponse } from "@/lib/types";
import { AssignmentList } from "./AssignmentList";
import { statusLabels } from "./StatusBadge";
import { InfoCard } from "./InfoCard";

async function fetchAssignments(url: string): Promise<AssignmentsResponse> {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error("Không tải được bài tập");
  return response.json() as Promise<AssignmentsResponse>;
}

export function AssignmentsDashboard() {
  const { data: response, error, isValidating, mutate } = useSWR<AssignmentsResponse>("/api/assignments", fetchAssignments, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
  const [filter, setFilter] = useState<AssignmentStatus | "ALL">("ALL");
  const data = response?.data ?? [];
  const visible = filter === "ALL" ? data : data.filter((item) => item.status === filter);
  return <>
    <div className="overview" aria-label="Tổng quan bài tập">
      <InfoCard label="Tổng bài tập" numberOfItems={response ? data.length : null} icon={BookOpen} />
      <InfoCard label="Đã hoàn thành" numberOfItems={response ? data.filter((item) => item.status === "SUBMITTED").length : null} detail="bài đã nộp" icon={CircleCheck} variant="success" />
      <InfoCard label="Cần chú ý" numberOfItems={response ? data.filter((item) => item.status === "OVERDUE").length : null} detail="bài quá hạn" icon={ClockAlert} variant="warning" />
    </div>
    <section className="assignments-panel" aria-labelledby="list-heading">
      <div className="panel-heading"><div><h2 id="list-heading">Danh sách bài tập</h2><p>Theo dõi hạn nộp và tiến độ của bạn.</p></div><span className="course-label">Khóa Foundation</span></div>
      <div className="filter-row"><label htmlFor="status-filter">Trạng thái</label><select id="status-filter" value={filter} onChange={(event) => setFilter(event.target.value as typeof filter)}><option value="ALL">Tất cả bài tập</option>{Object.entries(statusLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select><span className="result-count" aria-live="polite">{response ? `${visible.length} bài tập` : "Đang tải…"}</span></div>
      {error ? <div className="empty-state" role="alert"><span className="state-symbol" aria-hidden="true">!</span><h3>Chưa tải được bài tập</h3><p>Kết nối có thể bị gián đoạn. Hãy thử tải lại danh sách.</p><button disabled={isValidating} onClick={() => void mutate()}>{isValidating ? "Đang tải…" : "Thử lại"}</button></div>
      : !response ? <div className="loading-state" role="status"><span className="sr-only">Đang tải bài tập</span>{[1, 2, 3, 4].map((row) => <div className="skeleton-row" key={row}><span /><span /><span /></div>)}</div>
      : visible.length === 0 ? <div className="empty-state"><span className="state-symbol" aria-hidden="true">○</span><h3>{data.length ? "Không có bài ở trạng thái này" : "Bạn chưa được giao bài tập"}</h3><p>{data.length ? "Chọn trạng thái khác để xem các bài tập của bạn." : "Bài tập sẽ xuất hiện ở đây sau khi được giao. Bạn có thể kiểm tra lại danh sách."}</p><button disabled={isValidating} onClick={() => data.length ? setFilter("ALL") : void mutate()}>{isValidating ? "Đang tải…" : data.length ? "Xem tất cả" : "Tải lại"}</button></div>
      : <AssignmentList items={visible} />}
      <div className="panel-footer"><span className="legend-dot" aria-hidden="true" />Nộp trễ vẫn được tính là đã nộp, kèm nhãn riêng.</div>
    </section>
  </>;
}
