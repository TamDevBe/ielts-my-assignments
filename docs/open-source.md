# Nguồn tham khảo và phần tái sử dụng

## Thiết kế

- [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), commit `6ae86f61f520d6ca229d2f40e070410638c908c5`: đã đọc skill, chạy `search.py` với `education student dashboard`, `learning management dashboard` và stack `nextjs`. Áp dụng bố cục tối giản, token màu, tương phản, focus bàn phím, nhãn trạng thái có chữ, vùng bấm tối thiểu 44px và mobile-first. Không áp dụng đề xuất hero/CTA của landing page hoặc font dành cho trẻ em vì không phù hợp dashboard học viên IELTS. Truy vấn product `student dashboard` không trả kết quả; không dùng nó làm bằng chứng lựa chọn sản phẩm.
- Hallmark: giữ hệ màu Coral, nhịp khoảng trắng, phân cấp nội dung, bảng desktop/thẻ mobile; không thêm ảnh trang trí hoặc số liệu giả. Phông Be Vietnam Pro được đóng gói cục bộ bằng Fontsource.

## Chức năng và cấu trúc

Đã đọc [Coursi LMS Nextjs Prisma](https://github.com/mohammadnedaei/Coursi-LMS-Nextjs-Prisma), commit `ef2c820a7d1de818163436c682e3f7dd16dfd6ec`, giấy phép MIT:

| File nguồn đã đọc | Áp dụng trong dự án |
| --- | --- |
| `actions/get-dashboard-courses.ts` | Học cách giới hạn truy vấn theo user ở server trước khi tạo danh sách; chuyển sang mảng mock lọc theo studentId trong service. |
| `app/(dashboard)/(routes)/(root)/page.tsx` | Thống kê từ dữ liệu thực của học viên, tách component danh sách và tổng quan. |
| `app/(dashboard)/(routes)/(root)/_components/info-card.tsx` | Chuyển thể thành `src/components/InfoCard.tsx`, đổi sang số bài tập, trạng thái tải và CSS token. |
| `components/courses-list.tsx` | Tham khảo danh sách, bộ chọn và trạng thái rỗng; dự án dùng bộ lọc trạng thái bài tập. |
| `app/(dashboard)/_components/sidebar.tsx` | Tham khảo phân tách navigation và nội dung dashboard. |

Giữ thông báo bản quyền trong [giấy phép Coursi](licenses/Coursi-MIT.txt). Không tích hợp Clerk, MySQL, thanh toán hoặc video của Coursi: đề yêu cầu tài khoản giả lập và dữ liệu mock. Không che lỗi thành danh sách trống như service tham khảo; giao diện có trạng thái lỗi riêng.

## Thư viện thực sự sử dụng

- [SWR](https://github.com/vercel/swr) (MIT): hook tải dữ liệu, trạng thái lỗi, cache phía trình duyệt và thao tác retry bằng `mutate`. Tắt tự revalidate khi focus và tự retry để trạng thái lỗi rõ ràng. HTTP response vẫn là `private, no-store`; khi thay tài khoản thật cần reset SWR cache hoặc khóa cache theo phiên.
- [Lucide](https://github.com/lucide-icons/lucide) (ISC): icon SVG thống nhất, icon trang trí có `aria-hidden`.
- Next.js, React và Vitest: nền tảng ứng dụng và kiểm thử, không dựng lại framework.

Quy tắc thời gian, DTO, dữ liệu A01–B01 và bài kiểm thử được triển khai theo tài liệu Word của dự án. Đây là một tính năng được chuyển thể theo yêu cầu, không phải bản fork toàn bộ LMS.
