# HƯỚNG DẪN CÀI ĐẶT DỰ ÁN HPT9T9

## Tổng quan
Dự án HPT9T9 là một hệ thống quản lý xây dựng (Construction Management System) được xây dựng bằng Next.js với các tính năng:
- Hệ thống đăng nhập/đăng ký
- Phân tích cách chơi (có bảo mật password)
- Quản lý dữ liệu và cấu hình
- Giao diện đa ngôn ngữ (Tiếng Việt/English)

## Yêu cầu hệ thống
- Node.js phiên bản 18.0 trở lên
- npm hoặc yarn
- Git

## Bước 1: Clone dự án từ GitHub

```bash
git clone https://github.com/khpt1976-cloud/Hpt10T9.git
cd Hpt10T9/DuanHpt9t9
```

## Bước 2: Cài đặt dependencies

```bash
npm install
```

Hoặc nếu sử dụng yarn:

```bash
yarn install
```

## Bước 3: Cấu hình môi trường

Tạo file `.env.local` trong thư mục gốc của dự án:

```bash
touch .env.local
```

Thêm các biến môi trường cần thiết vào file `.env.local`:

```env
# Database
DATABASE_URL="your_database_url_here"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secret_key_here"

# Other configurations
NODE_ENV="development"
```

## Bước 4: Thiết lập cơ sở dữ liệu (nếu có)

Nếu dự án sử dụng Prisma:

```bash
npx prisma generate
npx prisma db push
```

## Bước 5: Chạy dự án

### Chạy ở chế độ development:

```bash
npm run dev
```

Hoặc:

```bash
yarn dev
```

Dự án sẽ chạy tại: `http://localhost:3000`

### Chạy ở chế độ production:

```bash
npm run build
npm start
```

## Bước 6: Truy cập ứng dụng

Mở trình duyệt và truy cập: `http://localhost:3000`

## Tính năng đặc biệt

### Bảo mật "Phân tích cách chơi"
- Khi click vào menu "Phân tích cách chơi", hệ thống sẽ yêu cầu nhập mật khẩu
- Mật khẩu mặc định: `123456`
- Chỉ khi nhập đúng mật khẩu mới có thể truy cập trang phân tích

## Cấu trúc thư mục chính

```
DuanHpt9t9/
├── app/                    # App Router (Next.js 13+)
├── components/             # React components
├── contexts/              # React contexts
├── lib/                   # Utility libraries
├── public/                # Static files
├── styles/                # CSS styles
├── types/                 # TypeScript types
├── package.json           # Dependencies
└── next.config.mjs        # Next.js configuration
```

## Scripts có sẵn

```bash
npm run dev          # Chạy development server
npm run build        # Build production
npm start            # Chạy production server
npm run lint         # Kiểm tra linting
npm test             # Chạy tests
```

## Troubleshooting

### Lỗi port đã được sử dụng
Nếu port 3000 đã được sử dụng, có thể chạy với port khác:

```bash
npm run dev -- -p 3001
```

### Lỗi dependencies
Xóa node_modules và cài đặt lại:

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Lỗi build
Kiểm tra TypeScript errors:

```bash
npm run lint
```

## Liên hệ hỗ trợ

Nếu gặp vấn đề trong quá trình cài đặt, vui lòng:
1. Kiểm tra log errors trong terminal
2. Đảm bảo đã cài đặt đúng phiên bản Node.js
3. Kiểm tra file .env.local đã được cấu hình đúng

## Cập nhật dự án

Để cập nhật dự án từ GitHub:

```bash
git pull origin main
npm install  # Cài đặt dependencies mới (nếu có)
```

---

**Lưu ý**: Đây là hướng dẫn cài đặt cơ bản. Tùy thuộc vào môi trường cụ thể, có thể cần thêm các bước cấu hình khác.