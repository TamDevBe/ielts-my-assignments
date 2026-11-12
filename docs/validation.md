# Kết quả kiểm tra

Các lệnh thực thi trên Windows, Node.js 24.11.1; các kết quả bên dưới chỉ ghi nhận sau khi chạy thực tế.

| Kiểm tra | Kết quả |
| --- | --- |
| Vitest (`npm test`) | 18 test pass, 3 file: trạng thái, service và Route Handler |
| TypeScript (`npm run typecheck`) | Pass |
| Production (`npm run build`) | Pass, Next.js 16.4.6; trang `/` và API động `/api/assignments` |
| Playwright (`npm run test:e2e`) | 9 test pass, 34.4 giây, Microsoft Edge |

Playwright kiểm tra request HTTP thật và giao diện trên Microsoft Edge, gồm đủ 320/375/414/768/1280px. Cả 9 test đã pass: query/cookie không thay được S01, năm kích thước màn hình, lọc trạng thái, lỗi API/retry và trạng thái rỗng. Đã kiểm tra ảnh desktop/mobile từ bản production: đủ A01–A04, nhãn nộp trễ và không tràn ngang. Server kiểm thử dùng cổng 3100 riêng và được dừng sau khi chạy.

```text
Test Files  3 passed (3)
Tests       18 passed (18)
Playwright  9 passed (34.4s)
TypeScript  exit 0
Next build  exit 0
```

Không chạy PostgreSQL: SQL chỉ là thiết kế tham chiếu, ứng dụng dùng mảng TypeScript ở server theo đề.
