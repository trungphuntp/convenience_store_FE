Tóm tắt tính năng

feat: Convenience Store FE – full feature implementation
Tính năng & Giao diện
Khu vực	Tính năng
Trang chủ	Hiển thị sản phẩm dạng grid, lọc theo danh mục & khoảng giá, phân trang
Header	Logo, thanh tìm kiếm, icon giỏ hàng (mini-cart popover), nút Đăng nhập / thông tin user, link Quản trị (chỉ ADMIN)
Auth – Đăng nhập	Form email + password, nút Đăng nhập Google (OAuth2), toast thông báo
Auth – Đăng ký	Form với validation password (regex 12–100 ký tự, hoa/thường/số/ký tự đặc biệt)
Auth State	Redux Toolkit (authSlice), persist localStorage, rehydrate qua AuthInitializer + getMe mỗi lần vào trang
Giỏ hàng	Mini-cart trong Header (popover, scroll), trang giỏ hàng đầy đủ, chỉnh số lượng, xóa item, xóa toàn bộ, checkout
Đặt hàng	Nút "Đặt hàng" gọi POST /orders/checkout, toast thành công, invalidate cart query
Admin – Sản phẩm	Bảng danh sách, thêm / sửa (modal form), xóa (confirm dialog)
Admin – Danh mục	Bảng danh sách, thêm / sửa / xóa
Admin – Đơn hàng	Bảng với lọc theo trạng thái, cập nhật trạng thái inline theo luồng cho phép
Admin – Chi tiết đơn hàng	Thông tin đơn, chuyển trạng thái, bảng sản phẩm (chỉnh số lượng, xóa item)
Bảo vệ route	RequireAuth component: /admin/* yêu cầu đăng nhập + role ADMIN, /cart yêu cầu đăng nhập; tự redirect nếu không đủ quyền
Kỹ thuật
Hạng mục	Chi tiết
Axios interceptor	Mọi lỗi 4xx → refresh token → retry, tối đa 3 lần → auto logout
Error toast tập trung	Interceptor tự toast.error message từ BE, không xử lý rải rác ở từng component
Token refresh queue	Nhiều request lỗi đồng thời chỉ gọi refresh 1 lần, các request còn lại chờ rồi retry
Custom UI wrappers	Toàn bộ antd component bọc lại (ButtonCustom, InputCustom, TableCustom, ModalCustom…)
TanStack Query	Server state cho products, cart, orders; onError bỏ – để interceptor xử lý
Tailwind v4	Syntax mới (bg-linear-to-br, shrink-0, class! suffix cho important)
