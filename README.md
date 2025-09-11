# DuanHpt11T9 - Construction Management System

## 🚀 Tổng quan
DuanHpt11T9 là phiên bản nâng cấp của hệ thống quản lý xây dựng với các tính năng bảo mật được cải thiện và giao diện người dùng tối ưu.

## ✨ Tính năng chính

### 🔐 Bảo mật nâng cao
- **Password Protection**: Menu "Phân tích cách chơi" được bảo vệ bằng mật khẩu
- **Mật khẩu mặc định**: `123456`
- **Validation**: Kiểm tra mật khẩu với thông báo lỗi rõ ràng

### 🎨 Giao diện người dùng
- Thiết kế responsive với Tailwind CSS
- Theme tối/sáng
- Modal đẹp mắt với animation
- Hỗ trợ đa ngôn ngữ (Tiếng Việt/English)

### 🛠️ Công nghệ sử dụng
- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui
- **State Management**: React Hooks
- **Routing**: Next.js App Router

## 📦 Cài đặt

### Yêu cầu hệ thống
- Node.js 18.0+
- npm hoặc yarn
- Git

### Bước cài đặt

1. **Clone repository**
```bash
git clone https://github.com/khpt1976-cloud/DuanHpt11T9.git
cd DuanHpt11T9/DuanHpt9t9
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Chạy development server**
```bash
npm run dev
```

4. **Truy cập ứng dụng**
```
http://localhost:3000
```

## 🔑 Hướng dẫn sử dụng tính năng Password

1. Click vào menu "Phân tích cách chơi"
2. Nhập mật khẩu: `123456`
3. Click "Xác nhận" hoặc nhấn Enter
4. Hệ thống sẽ chuyển hướng đến trang phân tích

## 📁 Cấu trúc dự án

```
DuanHpt11T9/
├── DuanHpt9t9/                 # Main application
│   ├── app/                    # Next.js App Router
│   ├── components/             # React components
│   ├── lib/                    # Utilities
│   └── public/                 # Static files
├── HuongdancaiDuanHpt/         # Installation guides
├── BotpressV12/                # Botpress integration
└── README.md                   # This file
```

## 🚀 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm start            # Production server
npm run lint         # Code linting
```

## 🔧 Cấu hình

Tạo file `.env.local`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=your-database-url
```

## 📖 Tài liệu

- [Hướng dẫn cài đặt chi tiết](./HuongdancaiDuanHpt/HUONG_DAN_CAI_DAT_DUAN_HPT9T9.md)
- [Hướng dẫn deployment](./DEPLOYMENT.md)
- [Production guide](./PRODUCTION-GUIDE.md)

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📝 Changelog

### Version 11T9
- ✅ Thêm bảo mật password cho menu "Phân tích cách chơi"
- ✅ Cải thiện UI/UX với modal đẹp mắt
- ✅ Thêm validation và error handling
- ✅ Hỗ trợ Enter key để submit
- ✅ Tạo hướng dẫn cài đặt chi tiết

## 📞 Liên hệ

- Repository: [https://github.com/khpt1976-cloud/DuanHpt11T9](https://github.com/khpt1976-cloud/DuanHpt11T9)
- Issues: [https://github.com/khpt1976-cloud/DuanHpt11T9/issues](https://github.com/khpt1976-cloud/DuanHpt11T9/issues)

## 📄 License

This project is licensed under the MIT License.

---

**Made with ❤️ by HPT Team**