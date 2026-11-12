import { AssignmentsDashboard } from "@/components/AssignmentsDashboard";
import { MOCK_NOW } from "@/lib/clock";
import { formatDate, formatTime } from "@/lib/format";

export default function Home() {
  return <div className="app-shell">
    <a className="skip-link" href="#main">Đến nội dung chính</a>
    <aside className="sidebar"><a href="/" className="brand" aria-label="IELTS Master, trang bài tập"><span className="brand-mark" aria-hidden="true">im<span>.</span></span><span>IELTS MASTER<small>LEARN WITH PURPOSE</small></span></a><div className="sidebar-section">KHÔNG GIAN HỌC TẬP</div><nav aria-label="Điều hướng chính"><a href="#main" className="nav-active" aria-current="page"><span aria-hidden="true">▤</span>Bài tập của tôi<span className="nav-indicator" /></a></nav><div className="sidebar-note"><span className="note-line" /><p>Mỗi bài tập là một bước tiến.</p><span>Giữ nhịp học, chinh phục mục tiêu.</span></div><div className="student"><span className="avatar">S1</span><div><strong>Học viên S01</strong><small>Tài khoản học viên · mô phỏng</small></div></div></aside>
    <div className="workspace"><header className="topbar"><span>Không gian học tập <span aria-hidden="true">/</span> <strong>Bài tập của tôi</strong></span><span className="session-pill"><i />S01</span></header><main id="main"><div className="page-heading"><span className="eyebrow">HỌC ĐỀU ĐẶN. TIẾN XA HƠN.</span><h1>Bài tập của tôi<span>.</span></h1><p>Tất cả bài tập của bạn, gọn trong một nơi.</p></div><div className="clock-note"><span className="clock-icon" aria-hidden="true">◷</span><span>Thời điểm mô phỏng <time dateTime={MOCK_NOW}><strong>{formatDate(MOCK_NOW)} · {formatTime(MOCK_NOW)}</strong> (GMT+7)</time></span></div><AssignmentsDashboard /><footer className="footer"><span>IELTS MASTER <span aria-hidden="true">/</span> FOUNDATION</span><span>Học từng chút, tiến từng ngày.</span></footer></main></div>
  </div>;
}
