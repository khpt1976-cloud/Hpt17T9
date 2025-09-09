# Khung7T9 - Construction Management System

## 📋 Mô tả dự án
Hệ thống quản lý dự án xây dựng chuyên nghiệp với giao diện hiện đại, được xây dựng bằng Next.js và TypeScript.

## ✨ Tính năng chính
- 🏗️ Quản lý dự án xây dựng
- 📝 Tạo và quản lý nhật ký thi công
- 👥 Hệ thống phân quyền người dùng (Admin, Manager, User)
- 📊 Báo cáo và thống kê
- 🌐 Giao diện đa ngôn ngữ (Tiếng Việt/English)
- 📱 Responsive design

## 🛠️ Công nghệ sử dụng
- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Database**: PostgreSQL với Prisma ORM
- **Authentication**: NextAuth.js
- **File Upload**: AWS S3
- **Email**: AWS SES

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js 18.x trở lên
- npm hoặc yarn
- PostgreSQL database

### Các bước cài đặt

1. **Clone repository**
```bash
git clone https://github.com/HptAI2025/Khung7T9.git
cd Khung7T9
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Cấu hình environment variables**
```bash
cp .env.example .env.local
```
Chỉnh sửa file `.env.local` với thông tin database và các service của bạn.

4. **Setup database**
```bash
npx prisma generate
npx prisma db push
```

5. **Chạy ứng dụng**
```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## 📁 Cấu trúc thư mục
```
├── app/                    # Next.js App Router
├── components/             # React components
├── contexts/              # React contexts
├── lib/                   # Utility functions
├── prisma/                # Database schema
├── public/                # Static files
└── types/                 # TypeScript type definitions
```

## 🔧 Scripts có sẵn
- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run start` - Chạy production server
- `npm run lint` - Chạy ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database

## 📝 Changelog
- **v2.0.0** - Loại bỏ BotpressV12, tối ưu hóa performance
- **v1.0.0** - Phiên bản đầu tiên

## 🤝 Đóng góp
Mọi đóng góp đều được chào đón! Vui lòng tạo issue hoặc pull request.

## 📄 License
MIT License

## 📞 Liên hệ
- GitHub: [@HptAI2025](https://github.com/HptAI2025)
- Repository: [Khung7T9](https://github.com/HptAI2025/Khung7T9)