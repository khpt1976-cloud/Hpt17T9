# 🚀 Production Deployment Guide

## ✅ **CÓ THỂ CHẠY NGAY TRÊN SERVER**

Hệ thống được thiết kế **100% portable** - chỉ cần 1 lệnh để deploy lên bất kỳ server nào!

## 🎯 **Quick Deploy - 30 giây**

```bash
# Trên server production
git clone https://github.com/khpt1976-cloud/DuanHpt9t9-Botpress-Integration.git
cd DuanHpt9t9-Botpress-Integration
./deploy-production.sh
```

## 📋 **Server Requirements**

### Minimum Requirements
- **OS**: Linux (Ubuntu 18+, CentOS 7+, Debian 9+), macOS, Windows Server
- **RAM**: 4GB+ available
- **Storage**: 10GB+ free space
- **Network**: Ports 12000, 12001 available
- **Internet**: For Docker image downloads

### Recommended for Production
- **RAM**: 8GB+
- **CPU**: 4+ cores
- **Storage**: 50GB+ SSD
- **Network**: Dedicated IP, firewall configured

## 🔧 **Automatic Configuration**

Script `deploy-production.sh` tự động:

### ✅ System Checks
- Kiểm tra OS compatibility
- Verify RAM và disk space
- Check port availability
- Network connectivity test

### ✅ Docker Installation
- Auto-install Docker Engine
- Install Docker Compose
- Configure user permissions
- Verify installation

### ✅ Environment Setup
- Generate production `.env`
- Configure server IP addresses
- Set secure secrets
- Database initialization

### ✅ Security Configuration
- Firewall rules (UFW)
- Container security
- Network isolation
- Port restrictions

### ✅ Service Deployment
- Build Docker images
- Start containers
- Health checks
- Service verification

## 🌐 **Access URLs After Deploy**

Sau khi deploy thành công:

```
🏠 DuanHpt9t9 Main:     http://YOUR_SERVER_IP:12000
🔐 Admin Panel:         http://YOUR_SERVER_IP:12000/admin
🤖 AdminBot:            http://YOUR_SERVER_IP:12000/admin/adminbot
💬 Botpress:            http://YOUR_SERVER_IP:12001
⚙️  Botpress Admin:     http://YOUR_SERVER_IP:12001/admin
```

## 🔒 **Production Security**

### Automatic Security Features
- ✅ Non-root containers
- ✅ Network isolation
- ✅ Firewall configuration
- ✅ Secure environment variables
- ✅ Container resource limits

### Manual Security Steps (Recommended)
```bash
# 1. Setup HTTPS with Let's Encrypt
sudo apt install certbot nginx
sudo certbot --nginx -d yourdomain.com

# 2. Configure reverse proxy
# Edit /etc/nginx/sites-available/default

# 3. Enable fail2ban
sudo apt install fail2ban
sudo systemctl enable fail2ban

# 4. Regular updates
sudo apt update && sudo apt upgrade -y
```

## 📊 **Monitoring & Management**

### Real-time Monitoring
```bash
# Container status
docker-compose ps

# Live logs
docker-compose logs -f

# Resource usage
docker stats

# System resources
htop
```

### Management Commands
```bash
# Restart services
docker-compose restart

# Update application
git pull origin main
docker-compose up --build -d

# Backup data
docker run --rm -v duanhpt9t9_botpress_duan_hpt_data:/data \
  -v $(pwd):/backup alpine tar czf /backup/backup-$(date +%Y%m%d).tar.gz -C /data .

# Restore data
docker run --rm -v duanhpt9t9_botpress_duan_hpt_data:/data \
  -v $(pwd):/backup alpine tar xzf /backup/backup-YYYYMMDD.tar.gz -C /data
```

## 🚨 **Troubleshooting**

### Common Issues & Solutions

#### 1. Port Already in Use
```bash
# Check what's using the port
sudo netstat -tulpn | grep :12000
sudo netstat -tulpn | grep :12001

# Kill process if needed
sudo kill -9 PID_NUMBER
```

#### 2. Docker Permission Denied
```bash
# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Or run with sudo (not recommended)
sudo docker-compose up -d
```

#### 3. Out of Memory
```bash
# Check memory usage
free -h
docker stats

# Increase swap if needed
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

#### 4. Database Issues
```bash
# Reset database
docker-compose down -v
docker-compose up -d

# Check database logs
docker-compose logs duan_hpt
```

#### 5. Network Issues
```bash
# Check Docker network
docker network ls
docker network inspect duanhpt9t9_botpress_app_network

# Test container connectivity
docker exec duan_hpt_container ping botpress
```

## 🔄 **Updates & Maintenance**

### Regular Updates
```bash
# Weekly maintenance script
#!/bin/bash
cd /path/to/DuanHpt9t9-Botpress-Integration

# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up --build -d

# Cleanup old images
docker system prune -f
```

### Backup Strategy
```bash
# Daily backup script
#!/bin/bash
BACKUP_DIR="/backups/duanhpt9t9"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup volumes
docker run --rm \
  -v duanhpt9t9_botpress_duan_hpt_data:/data \
  -v $BACKUP_DIR:/backup \
  alpine tar czf /backup/duan_hpt_$DATE.tar.gz -C /data .

docker run --rm \
  -v duanhpt9t9_botpress_botpress_data:/data \
  -v $BACKUP_DIR:/backup \
  alpine tar czf /backup/botpress_$DATE.tar.gz -C /data .

# Keep only last 7 days
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

## 📈 **Performance Optimization**

### Production Tuning
```bash
# Increase file limits
echo "* soft nofile 65536" >> /etc/security/limits.conf
echo "* hard nofile 65536" >> /etc/security/limits.conf

# Optimize Docker
echo '{"log-driver":"json-file","log-opts":{"max-size":"10m","max-file":"3"}}' > /etc/docker/daemon.json
systemctl restart docker

# Enable swap accounting
echo 'GRUB_CMDLINE_LINUX="cgroup_enable=memory swapaccount=1"' >> /etc/default/grub
update-grub
```

### Resource Limits
Edit `docker-compose.yml`:
```yaml
services:
  duan_hpt:
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
        reservations:
          memory: 1G
          cpus: '0.5'
```

## ✅ **Verification Checklist**

After deployment, verify:

- [ ] All containers running: `docker-compose ps`
- [ ] DuanHpt9t9 accessible: `curl http://localhost:12000`
- [ ] Botpress accessible: `curl http://localhost:12001`
- [ ] AdminBot integration working
- [ ] Database initialized
- [ ] Logs showing no errors
- [ ] Firewall configured
- [ ] Backup system setup
- [ ] Monitoring configured

## 🎉 **Success!**

Nếu tất cả steps trên hoàn thành, hệ thống đã sẵn sàng cho production!

**🌐 Access URLs:**
- **Main App**: http://YOUR_SERVER_IP:12000
- **AdminBot**: http://YOUR_SERVER_IP:12000/admin/adminbot
- **Botpress**: http://YOUR_SERVER_IP:12001

---

**💡 Pro Tip**: Sử dụng domain name và HTTPS cho production thực tế!