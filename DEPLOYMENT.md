# 🚀 DuanHpt9t9 + Botpress V12 - Deployment Guide

## ✅ Hoàn thành tích hợp

Hệ thống đã được tích hợp hoàn chỉnh với các tính năng:

### 🏗️ DuanHpt9t9 (Construction Management)
- ✅ Next.js với standalone build
- ✅ Prisma ORM với SQLite database
- ✅ Multi-stage Docker build tối ưu
- ✅ Admin Panel với AdminBot integration
- ✅ CORS configuration cho iframe embedding

### 🤖 Botpress V12 (Chatbot Platform)
- ✅ Build từ source code với Yarn
- ✅ Multi-stage Docker build
- ✅ Production configuration
- ✅ Docker networking support

### 🔗 Tích hợp AdminBot
- ✅ Menu AdminBot trong Admin sidebar
- ✅ Real-time status checking
- ✅ Embedded Botpress interface
- ✅ Quick actions (Open Admin Panel, View Chatbot)
- ✅ Seamless navigation flow

## 🚀 Portable Deployment

### Yêu cầu
```bash
# Cài đặt Docker & Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Cài đặt Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

### Deployment 1 lệnh
```bash
# Clone và khởi động
git clone https://github.com/khpt1976-cloud/DuanHpt9t9.git
cd DuanHpt9t9
./start.sh
```

### Manual Deployment
```bash
# Build và khởi động services
docker-compose up --build -d

# Kiểm tra status
docker-compose ps

# Xem logs
docker-compose logs -f
```

## 🌐 Access URLs

| Service | URL | Description |
|---------|-----|-------------|
| **DuanHpt9t9** | http://localhost:12000 | Construction Management System |
| **Admin Panel** | http://localhost:12000/admin | Admin Dashboard |
| **AdminBot** | http://localhost:12000/admin/adminbot | Botpress Integration |
| **Botpress** | http://localhost:12001 | Chatbot Platform |
| **Botpress Admin** | http://localhost:12001/admin | Botpress Admin Panel |

## 🔄 Integration Flow

```
1. User Login → DuanHpt9t9
2. Navigate to Admin Panel (/admin)
3. Click "AdminBot" in sidebar
4. View Botpress status & embedded interface
5. Quick actions to open Botpress in new tab
```

## 📊 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Docker Network (172.20.0.0/16)          │
│                                                             │
│  ┌─────────────────┐              ┌─────────────────┐      │
│  │   duan_hpt      │◄────────────►│    botpress     │      │
│  │   (Next.js)     │              │   (Botpress)    │      │
│  │   Port: 3000    │              │   Port: 3000    │      │
│  └─────────────────┘              └─────────────────┘      │
│           │                                 │               │
└───────────┼─────────────────────────────────┼───────────────┘
            │                                 │
    ┌───────▼──────┐                 ┌────────▼──────┐
    │ Host:12000   │                 │ Host:12001    │
    │ (External)   │                 │ (External)    │
    └──────────────┘                 └───────────────┘
```

## 🔧 Configuration Files

### docker-compose.yml
- ✅ 2 services: duan_hpt, botpress
- ✅ Custom network với subnet 172.20.0.0/16
- ✅ Persistent volumes cho data
- ✅ Environment variables
- ✅ Health checks và dependencies

### Dockerfiles
- ✅ **DuanHpt9t9**: Multi-stage build với Node.js 18-alpine
- ✅ **Botpress**: Multi-stage build với Node.js 16-alpine
- ✅ Non-root users cho security
- ✅ Optimized layer caching

### Environment Variables
```env
# DuanHpt9t9
NEXTAUTH_URL=http://localhost:12000
NEXT_PUBLIC_BOTPRESS_URL=http://localhost:12001
BOTPRESS_INTERNAL_URL=http://botpress:3000

# Botpress
EXTERNAL_URL=http://localhost:12001
DUAN_HPT_URL=http://duan_hpt:3000
BP_HOST=0.0.0.0
```

## 🛠️ Development & Maintenance

### Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f duan_hpt
docker-compose logs -f botpress
```

### Updates
```bash
# Rebuild specific service
docker-compose build --no-cache duan_hpt
docker-compose up -d duan_hpt

# Full rebuild
docker-compose down
docker-compose up --build -d
```

### Backup
```bash
# Backup volumes
docker run --rm -v duanhpt9t9_botpress_duan_hpt_data:/data -v $(pwd):/backup alpine tar czf /backup/duan_hpt_backup.tar.gz -C /data .
docker run --rm -v duanhpt9t9_botpress_botpress_data:/data -v $(pwd):/backup alpine tar czf /backup/botpress_backup.tar.gz -C /data .
```

### Cleanup
```bash
# Stop và remove containers
docker-compose down

# Remove volumes (careful!)
docker-compose down -v

# System cleanup
docker system prune -f
```

## 🔒 Security Features

- ✅ Non-root containers
- ✅ Network isolation
- ✅ Environment variable protection
- ✅ CORS configuration
- ✅ Iframe sandbox attributes

## 📈 Performance Optimizations

- ✅ Multi-stage Docker builds
- ✅ Layer caching optimization
- ✅ Next.js standalone output
- ✅ Production builds
- ✅ Resource limits (configurable)

## 🚨 Troubleshooting

### Common Issues

1. **Port conflicts**
   ```bash
   # Check ports
   netstat -tulpn | grep :12000
   netstat -tulpn | grep :12001
   ```

2. **Service not starting**
   ```bash
   # Check logs
   docker-compose logs service_name
   
   # Restart service
   docker-compose restart service_name
   ```

3. **Network issues**
   ```bash
   # Test connectivity
   docker exec duan_hpt_container ping botpress
   
   # Check network
   docker network inspect duanhpt9t9_botpress_app_network
   ```

4. **Database issues**
   ```bash
   # Reset database
   docker-compose down -v
   docker-compose up -d
   ```

## ✅ Verification Checklist

- [ ] Docker & Docker Compose installed
- [ ] Ports 12000, 12001 available
- [ ] Services start successfully
- [ ] DuanHpt9t9 accessible at http://localhost:12000
- [ ] Admin panel accessible at http://localhost:12000/admin
- [ ] AdminBot page shows Botpress integration
- [ ] Botpress accessible at http://localhost:12001
- [ ] Embedded iframe loads Botpress admin
- [ ] No CORS errors in browser console

## 🎯 Success Criteria

✅ **Portable Deployment**: 1 lệnh `./start.sh` khởi động toàn bộ hệ thống
✅ **Seamless Integration**: AdminBot menu → Botpress interface
✅ **Production Ready**: Multi-stage builds, security, performance
✅ **Easy Maintenance**: Logs, updates, backup procedures
✅ **Complete Documentation**: README, deployment guide, troubleshooting

---

**🚀 Deployment hoàn thành! Hệ thống sẵn sàng cho production.**