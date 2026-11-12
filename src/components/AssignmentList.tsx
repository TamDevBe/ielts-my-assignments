import type { AssignmentDTO } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/format";
import { StatusBadge } from "./StatusBadge";

function AssignmentName({ item }: { item: AssignmentDTO }) {
  return <div className="assignment-name"><span className={`skill-icon skill-${item.id}`} aria-hidden="true">{item.id.replace("A", "")}</span><div><span className="assignment-code">{item.id} · FOUNDATION</span><h3>{item.title}</h3>{item.submittedAt && <p className="submitted-date">Đã nộp {formatDate(item.submittedAt)} · {formatTime(item.submittedAt)}</p>}</div></div>;
}
function Deadline({ value }: { value: string }) {
  return <time dateTime={value}><strong>{formatDate(value)}</strong><span>{formatTime(value)} · GMT+7</span></time>;
}

export function AssignmentList({ items }: { items: AssignmentDTO[] }) {
  return <>
    <table className="assignment-table"><caption className="sr-only">Danh sách bài tập, hạn nộp và trạng thái</caption><thead><tr><th scope="col">Tên bài tập</th><th scope="col">Hạn nộp</th><th scope="col">Trạng thái</th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><AssignmentName item={item} /></td><td><Deadline value={item.dueAt} /></td><td><StatusBadge assignment={item} /></td></tr>)}</tbody></table>
    <div className="assignment-cards">{items.map((item) => <article key={item.id} className="assignment-card"><AssignmentName item={item} /><div className="card-deadline"><span>Hạn nộp</span><Deadline value={item.dueAt} /></div><StatusBadge assignment={item} /></article>)}</div>
  </>;
}
