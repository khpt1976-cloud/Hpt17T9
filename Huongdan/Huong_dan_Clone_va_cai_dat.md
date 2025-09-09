# 📖 HƯỚNG DẪN CLONE VÀ CÀI ĐẶT CHI TIẾT

## 🎯 **TỔNG QUAN DỰ ÁN**

**DuanHpt9t9 + Botpress V12 Integration** là hệ thống tích hợp hoàn chỉnh giữa:
- **DuanHpt9t9**: Hệ thống quản lý xây dựng (Next.js)
- **Botpress V12**: Nền tảng chatbot AI
- **Docker**: Container hóa và deployment tự động

---

## 🔗 **THÔNG TIN REPOSITORY**

- **GitHub URL**: https://github.com/khpt1976-cloud/Hpt10T9
- **Tác giả**: khpt1976-cloud
- **Loại**: Public Repository
- **Công nghệ**: Docker, Next.js, Node.js, TypeScript

---

## 📋 **YÊU CẦU HỆ THỐNG**

### 🖥️ **Hệ điều hành hỗ trợ:**
- ✅ **Linux**: Ubuntu 18.04+, CentOS 7+, Debian 9+, RHEL 7+
- ✅ **macOS**: 10.14+ (Mojave trở lên)
- ✅ **Windows**: Windows 10/11, Windows Server 2016+

### 💾 **Cấu hình tối thiểu:**
- **RAM**: 4GB trở lên (khuyến nghị 8GB)
- **Ổ cứng**: 10GB dung lượng trống (khuyến nghị 20GB)
- **CPU**: 2 cores trở lên (khuyến nghị 4 cores)
- **Mạng**: Kết nối Internet ổn định

### 🔌 **Ports cần thiết:**
- **Port 12000**: DuanHpt9t9 Application
- **Port 12001**: Botpress Chatbot
- **Port 22**: SSH (nếu truy cập từ xa)

---

## 🛠️ **CHUẨN BỊ TRƯỚC KHI CÀI ĐẶT**

### 1️⃣ **Cài đặt Git (nếu chưa có)**

#### **Trên Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install git -y
```

#### **Trên CentOS/RHEL:**
```bash
sudo yum update -y
sudo yum install git -y
```

#### **Trên macOS:**
```bash
# Sử dụng Homebrew
brew install git

# Hoặc tải từ: https://git-scm.com/download/mac
```

#### **Trên Windows:**
- Tải Git từ: https://git-scm.com/download/windows
- Cài đặt với các tùy chọn mặc định

### 2️⃣ **Kiểm tra Git đã cài đặt:**
```bash
git --version
# Kết quả mong đợi: git version 2.x.x
```

---

## 📥 **BƯỚC 1: CLONE REPOSITORY**

### 🔽 **Clone từ GitHub:**

#### **Cách 1: Clone qua HTTPS (Khuyến nghị)**
```bash
# Tạo thư mục làm việc
mkdir -p ~/projects
cd ~/projects

# Clone repository
git clone https://github.com/khpt1976-cloud/Hpt10T9.git

# Di chuyển vào thư mục dự án
cd Hpt10T9
```

#### **Cách 2: Clone qua SSH (nếu có SSH key)**
```bash
git clone git@github.com:khpt1976-cloud/Hpt10T9.git
cd Hpt10T9
```

### ✅ **Kiểm tra clone thành công:**
```bash
# Kiểm tra cấu trúc thư mục
ls -la

# Kết quả mong đợi:
# drwxr-xr-x  - user  BotpressV12/
# drwxr-xr-x  - user  DuanHpt9t9/
# drwxr-xr-x  - user  Huongdan/
# -rw-r--r--  - user  README.md
# -rw-r--r--  - user  docker-compose.yml
# -rwxr-xr-x  - user  start.sh
# -rwxr-xr-x  - user  deploy-production.sh
```

---

## 🐳 **BƯỚC 2: CÀI ĐẶT DOCKER**

### 🔍 **Kiểm tra Docker đã có chưa:**
```bash
docker --version
docker-compose --version
```

### 📦 **Cài đặt Docker (nếu chưa có):**

#### **Trên Ubuntu/Debian:**
```bash
# Gỡ bỏ phiên bản cũ (nếu có)
sudo apt-get remove docker docker-engine docker.io containerd runc

# Cập nhật package index
sudo apt-get update

# Cài đặt packages cần thiết
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Thêm Docker GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Thêm Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Cài đặt Docker Engine
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Thêm user vào group docker
sudo usermod -aG docker $USER

# Khởi động Docker
sudo systemctl enable docker
sudo systemctl start docker
```

#### **Trên CentOS/RHEL:**
```bash
# Gỡ bỏ phiên bản cũ
sudo yum remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine

# Cài đặt yum-utils
sudo yum install -y yum-utils

# Thêm Docker repository
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# Cài đặt Docker Engine
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Khởi động Docker
sudo systemctl enable docker
sudo systemctl start docker

# Thêm user vào group docker
sudo usermod -aG docker $USER
```

#### **Trên macOS:**
```bash
# Tải Docker Desktop từ: https://www.docker.com/products/docker-desktop
# Hoặc sử dụng Homebrew:
brew install --cask docker
```

#### **Trên Windows:**
- Tải Docker Desktop từ: https://www.docker.com/products/docker-desktop
- Cài đặt và khởi động Docker Desktop

### 🔄 **Cài đặt Docker Compose (nếu chưa có):**
```bash
# Tải Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Cấp quyền thực thi
sudo chmod +x /usr/local/bin/docker-compose

# Tạo symlink
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

### ✅ **Kiểm tra Docker đã cài đặt:**
```bash
# Kiểm tra Docker version
docker --version
# Kết quả: Docker version 24.x.x

# Kiểm tra Docker Compose version
docker-compose --version
# Kết quả: Docker Compose version v2.24.0

# Test Docker hoạt động
docker run hello-world
# Kết quả: Hello from Docker! ...
```

### 🔓 **Logout và login lại để áp dụng quyền Docker:**
```bash
# Logout và login lại, hoặc chạy:
newgrp docker
```

---

## ⚙️ **BƯỚC 3: CẤU HÌNH HỆ THỐNG**

### 🔥 **Cấu hình Firewall (Ubuntu/CentOS):**
```bash
# Trên Ubuntu (UFW):
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 12000/tcp   # DuanHpt9t9
sudo ufw allow 12001/tcp   # Botpress
sudo ufw --force enable

# Trên CentOS (firewalld):
sudo firewall-cmd --permanent --add-port=22/tcp
sudo firewall-cmd --permanent --add-port=12000/tcp
sudo firewall-cmd --permanent --add-port=12001/tcp
sudo firewall-cmd --reload
```

### 📁 **Kiểm tra quyền thư mục:**
```bash
# Đảm bảo có quyền thực thi scripts
chmod +x start.sh
chmod +x deploy-production.sh
chmod +x test-integration.sh
```

---

## 🚀 **BƯỚC 4: CÀI ĐẶT VÀ KHỞI ĐỘNG**

### 🎯 **Cách 1: Cài đặt tự động (Khuyến nghị)**
```bash
# Chạy script cài đặt tự động
./deploy-production.sh
```

**Script này sẽ tự động:**
- ✅ Kiểm tra system requirements
- ✅ Cài đặt Docker (nếu chưa có)
- ✅ Cấu hình environment variables
- ✅ Setup firewall
- ✅ Build và start containers
- ✅ Verify deployment

### 🎯 **Cách 2: Cài đặt thủ công**
```bash
# 1. Tạo file environment
cp .env.example .env

# 2. Chỉnh sửa cấu hình (tùy chọn)
nano .env

# 3. Build và start containers
./start.sh

# Hoặc sử dụng docker-compose trực tiếp:
docker-compose up --build -d
```

---

## ✅ **BƯỚC 5: KIỂM TRA CÀI ĐẶT**

### 🔍 **Kiểm tra containers đang chạy:**
```bash
docker-compose ps

# Kết quả mong đợi:
# NAME                    COMMAND                  SERVICE             STATUS              PORTS
# duanhpt9t9-duan_hpt-1   "docker-entrypoint.s…"   duan_hpt            running             0.0.0.0:12000->3000/tcp
# duanhpt9t9-botpress-1   "docker-entrypoint.s…"   botpress            running             0.0.0.0:12001->3000/tcp
```

### 🌐 **Kiểm tra truy cập web:**
```bash
# Test DuanHpt9t9
curl -I http://localhost:12000
# Kết quả: HTTP/1.1 200 OK hoặc HTTP/1.1 302 Found

# Test Botpress
curl -I http://localhost:12001
# Kết quả: HTTP/1.1 200 OK hoặc HTTP/1.1 302 Found
```

### 📊 **Chạy test tích hợp:**
```bash
./test-integration.sh

# Kết quả mong đợi: Tất cả tests PASS ✅
```

---

## 🌐 **BƯỚC 6: TRUY CẬP HỆ THỐNG**

### 🏠 **URLs truy cập:**

#### **Trên máy local:**
- **DuanHpt9t9 Main**: http://localhost:12000
- **Admin Panel**: http://localhost:12000/admin
- **AdminBot**: http://localhost:12000/admin/adminbot
- **Botpress**: http://localhost:12001
- **Botpress Admin**: http://localhost:12001/admin

#### **Trên server (thay YOUR_SERVER_IP):**
- **DuanHpt9t9 Main**: http://YOUR_SERVER_IP:12000
- **Admin Panel**: http://YOUR_SERVER_IP:12000/admin
- **AdminBot**: http://YOUR_SERVER_IP:12000/admin/adminbot
- **Botpress**: http://YOUR_SERVER_IP:12001
- **Botpress Admin**: http://YOUR_SERVER_IP:12001/admin

### 🔐 **Thông tin đăng nhập mặc định:**
```
DuanHpt9t9 Admin:
- Email: admin@example.com
- Password: admin123

Botpress Admin:
- Email: admin@botpress.com  
- Password: admin123
```

---

## 🛠️ **QUẢN LÝ HỆ THỐNG**

### 📊 **Các lệnh quản lý cơ bản:**
```bash
# Xem trạng thái containers
docker-compose ps

# Xem logs real-time
docker-compose logs -f

# Xem logs của service cụ thể
docker-compose logs -f duan_hpt
docker-compose logs -f botpress

# Restart toàn bộ hệ thống
docker-compose restart

# Restart service cụ thể
docker-compose restart duan_hpt
docker-compose restart botpress

# Dừng hệ thống
docker-compose down

# Dừng và xóa volumes (reset data)
docker-compose down -v

# Cập nhật code và rebuild
git pull origin main
docker-compose up --build -d
```

### 🔧 **Troubleshooting:**
```bash
# Kiểm tra resource usage
docker stats

# Kiểm tra disk space
df -h

# Kiểm tra memory
free -h

# Kiểm tra ports đang sử dụng
netstat -tulpn | grep :12000
netstat -tulpn | grep :12001

# Cleanup Docker
docker system prune -f
docker volume prune -f
```

---

## 🔄 **CẬP NHẬT HỆ THỐNG**

### 📥 **Cập nhật từ GitHub:**
```bash
# Pull latest changes
git pull origin main

# Rebuild và restart
docker-compose down
docker-compose up --build -d

# Verify update
./test-integration.sh
```

### 💾 **Backup dữ liệu:**
```bash
# Backup volumes
docker run --rm \
  -v duanhpt9t9_botpress_duan_hpt_data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/backup-$(date +%Y%m%d).tar.gz -C /data .
```

### 🔄 **Restore dữ liệu:**
```bash
# Restore from backup
docker run --rm \
  -v duanhpt9t9_botpress_duan_hpt_data:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/backup-YYYYMMDD.tar.gz -C /data
```

---

## 🚨 **XỬ LÝ SỰ CỐ**

### ❌ **Lỗi thường gặp và cách khắc phục:**

#### **1. Port đã được sử dụng:**
```bash
# Tìm process đang sử dụng port
sudo netstat -tulpn | grep :12000
sudo netstat -tulpn | grep :12001

# Kill process (thay PID)
sudo kill -9 PID_NUMBER

# Hoặc thay đổi port trong docker-compose.yml
```

#### **2. Docker permission denied:**
```bash
# Thêm user vào docker group
sudo usermod -aG docker $USER
newgrp docker

# Hoặc chạy với sudo (không khuyến nghị)
sudo docker-compose up -d
```

#### **3. Out of memory:**
```bash
# Kiểm tra memory
free -h
docker stats

# Tăng swap space
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

#### **4. Container không start:**
```bash
# Xem logs chi tiết
docker-compose logs service_name

# Rebuild container
docker-compose up --build service_name

# Reset toàn bộ
docker-compose down -v
docker-compose up --build -d
```

#### **5. Network issues:**
```bash
# Kiểm tra Docker network
docker network ls
docker network inspect duanhpt9t9_botpress_app_network

# Recreate network
docker-compose down
docker network prune
docker-compose up -d
```

---

## 📞 **HỖ TRỢ VÀ LIÊN HỆ**

### 🐛 **Báo lỗi:**
- **GitHub Issues**: https://github.com/khpt1976-cloud/Hpt10T9/issues

### 📚 **Tài liệu tham khảo:**
- **README.md**: Tổng quan dự án
- **DEPLOYMENT.md**: Chi tiết kỹ thuật
- **PRODUCTION-GUIDE.md**: Hướng dẫn production

### 🔧 **Debug mode:**
```bash
# Chạy với debug logs
DEBUG=* docker-compose up

# Hoặc set environment variable
export DEBUG=*
docker-compose up -d
```

---

## ✅ **CHECKLIST HOÀN THÀNH**

Sau khi hoàn thành tất cả các bước, kiểm tra:

- [ ] Git đã cài đặt và clone repository thành công
- [ ] Docker và Docker Compose đã cài đặt
- [ ] Firewall đã cấu hình cho ports 12000, 12001
- [ ] Containers đang chạy: `docker-compose ps`
- [ ] DuanHpt9t9 truy cập được: http://localhost:12000
- [ ] Botpress truy cập được: http://localhost:12001
- [ ] AdminBot integration hoạt động
- [ ] Test integration pass: `./test-integration.sh`
- [ ] Logs không có lỗi: `docker-compose logs`

---

## 🎉 **CHÚC MỪNG!**

Bạn đã cài đặt thành công **DuanHpt9t9 + Botpress V12 Integration**!

### 🌟 **Các bước tiếp theo:**
1. Khám phá giao diện DuanHpt9t9
2. Cấu hình Botpress chatbot
3. Test AdminBot integration
4. Tùy chỉnh theo nhu cầu
5. Deploy lên production server

### 🚀 **Enjoy your new integrated system!**

---

---

**📝 Tài liệu được cập nhật: 09/09/2025**  
**🔗 Repository: https://github.com/khpt1976-cloud/Hpt10T9**