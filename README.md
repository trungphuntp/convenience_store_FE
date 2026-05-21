## 🛒 Tính năng & Giao diện

| Khu vực                    | Tính năng                                                                                   |
|----------------------------|---------------------------------------------------------------------------------------------|
| Trang chủ                  | Grid sản phẩm, lọc theo danh mục & khoảng giá, phân trang                                  |
| Header                     | Mini-cart popover, icon giỏ hàng, link Quản trị (chỉ ADMIN), thông tin user                |
| Đăng nhập                  | Form email + password, OAuth2 Google, toast thông báo                                       |
| Đăng ký                    | Validation password: 12–100 ký tự, hoa/thường/số/ký tự đặc biệt                            |
| Auth State                 | Redux + localStorage, tự rehydrate qua AuthInitializer + getMe khi vào trang               |
| Giỏ hàng                   | Mini-cart trong Header, trang giỏ hàng, chỉnh số lượng, xóa item, xóa toàn bộ, checkout   |
| Admin – Sản phẩm           | Bảng danh sách, thêm / sửa (modal), xóa (confirm dialog)                                   |
| Admin – Danh mục           | Bảng danh sách, thêm / sửa / xóa                                                            |
| Admin – Đơn hàng           | Bảng + lọc trạng thái, cập nhật trạng thái theo luồng cho phép                             |
| Admin – Chi tiết đơn hàng  | Thông tin đơn, chuyển trạng thái, chỉnh số lượng / xóa item                                |
| Bảo vệ route               | /admin/* yêu cầu ADMIN, /cart yêu cầu đăng nhập – tự redirect nếu không đủ quyền          |

## ⚙️ Kỹ thuật

| Hạng mục               | Chi tiết                                                                                    |
|------------------------|---------------------------------------------------------------------------------------------|
| Axios interceptor      | Lỗi 4xx → refresh token → retry tối đa 3 lần → auto logout                                |
| Error toast            | Interceptor tập trung toast.error message từ BE, không xử lý rải rác ở component           |
| Refresh queue          | Nhiều request lỗi đồng thời chỉ gọi refresh 1 lần, các request còn lại chờ rồi retry      |
| Custom UI wrappers     | Toàn bộ antd bọc lại: ButtonCustom, InputCustom, TableCustom, ModalCustom…                 |
| TanStack Query         | Server state cho products, cart, orders; invalidate cache sau mỗi mutation                 |
| Tailwind v4            | Cú pháp mới: bg-linear-to-br, shrink-0, class! suffix cho important                       |
