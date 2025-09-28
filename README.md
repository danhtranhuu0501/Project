https://thd-react.onrender.com/home


Kiến trúc tổng quan

Full-stack: React + Node.js + MongoDB Atlas

Frontend:

Customer (port 3002)

Admin (port 3001)

Backend: Express.js (RESTful API, Mongoose ODM)

Triển khai: Render + MongoDB Atlas

🔹 Tính năng xác thực & bảo mật

Đăng nhập thông minh → 1 form cho cả admin & customer, tự động phân quyền

JWT Authentication, token có expiration

Email verification & reset password qua email

Middleware bảo vệ API, CORS, mã hóa mật khẩu

🔹 Tính năng khách hàng (Customer)

Mua sắm: Trang chủ, tìm kiếm, lọc danh mục, chi tiết sản phẩm

Giỏ hàng: Thêm/xóa/cập nhật, tính tổng tiền, lưu local storage, checkout

Tài khoản: Đăng ký (email verification), đăng nhập/đăng xuất, hồ sơ cá nhân, lịch sử đơn hàng, quên mật khẩu

Giao diện: Responsive, Dark/Light mode, toast notifications

🔹 Tính năng quản trị (Admin)

Sản phẩm: CRUD, upload nhiều ảnh, phân loại, phân trang

Danh mục: CRUD, gán sản phẩm

Đơn hàng: Xem chi tiết, cập nhật trạng thái (Pending/Approved/Canceled)

Khách hàng: Danh sách, kích hoạt/vô hiệu hóa, gửi email, xem lịch sử mua hàng

Thống kê: Doanh thu, số lượng sản phẩm/đơn hàng/khách hàng, dashboard trực quan

🔹 Tính năng kỹ thuật & UX

Nodemailer (email kích hoạt/reset password)

Google Maps (vị trí cửa hàng)

Base64 image storage

React Router, Axios, Context API

Responsive design, lazy loading, code splitting, tối ưu hình ảnh

✅ Điểm nổi bật

Đăng nhập thông minh: 1 form duy nhất → tự động redirect theo vai trò

Hệ thống giỏ hàng & đơn hàng hoàn chỉnh

Dashboard thống kê doanh thu

Triển khai production-ready trên Render + MongoDB Atlas