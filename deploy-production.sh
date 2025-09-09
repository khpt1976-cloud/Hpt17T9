#!/bin/bash

# 🚀 Production Deployment Script for DuanHpt9t9 + Botpress V12
# Tự động hóa deployment lên production server

set -e

echo "🚀 Starting Production Deployment..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_warning "Running as root. Consider using a non-root user for security."
fi

# Step 1: System Requirements Check
echo ""
print_info "Step 1: Checking system requirements..."

# Check OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    print_status "OS: Linux detected"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    print_status "OS: macOS detected"
else
    print_warning "OS: $OSTYPE - May need manual configuration"
fi

# Check available memory
MEMORY_GB=$(free -g | awk '/^Mem:/{print $2}' 2>/dev/null || echo "Unknown")
if [ "$MEMORY_GB" != "Unknown" ] && [ "$MEMORY_GB" -ge 4 ]; then
    print_status "Memory: ${MEMORY_GB}GB available"
else
    print_warning "Memory: Less than 4GB may cause performance issues"
fi

# Check available disk space
DISK_GB=$(df -BG . | awk 'NR==2{print $4}' | sed 's/G//' 2>/dev/null || echo "Unknown")
if [ "$DISK_GB" != "Unknown" ] && [ "$DISK_GB" -ge 10 ]; then
    print_status "Disk: ${DISK_GB}GB available"
else
    print_warning "Disk: Less than 10GB may cause storage issues"
fi

# Step 2: Install Docker if not present
echo ""
print_info "Step 2: Checking Docker installation..."

if ! command -v docker &> /dev/null; then
    print_warning "Docker not found. Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    
    # Add current user to docker group (if not root)
    if [ "$EUID" -ne 0 ]; then
        sudo usermod -aG docker $USER
        print_warning "Added user to docker group. You may need to logout/login or run: newgrp docker"
    fi
    
    print_status "Docker installed successfully"
else
    DOCKER_VERSION=$(docker --version | cut -d' ' -f3 | cut -d',' -f1)
    print_status "Docker found: v$DOCKER_VERSION"
fi

# Check Docker Compose
if ! command -v docker-compose &> /dev/null; then
    print_warning "Docker Compose not found. Installing..."
    
    # Install Docker Compose
    COMPOSE_VERSION="v2.24.0"
    sudo curl -L "https://github.com/docker/compose/releases/download/$COMPOSE_VERSION/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    
    # Create symlink if needed
    if [ ! -f "/usr/bin/docker-compose" ]; then
        sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
    fi
    
    print_status "Docker Compose installed successfully"
else
    COMPOSE_VERSION=$(docker-compose --version | cut -d' ' -f4 | cut -d',' -f1)
    print_status "Docker Compose found: $COMPOSE_VERSION"
fi

# Step 3: Check ports availability
echo ""
print_info "Step 3: Checking port availability..."

check_port() {
    local port=$1
    if netstat -tuln 2>/dev/null | grep -q ":$port "; then
        print_error "Port $port is already in use"
        return 1
    else
        print_status "Port $port is available"
        return 0
    fi
}

PORTS_OK=true
if ! check_port 12000; then
    PORTS_OK=false
fi
if ! check_port 12001; then
    PORTS_OK=false
fi

if [ "$PORTS_OK" = false ]; then
    print_error "Some required ports are in use. Please free ports 12000 and 12001"
    exit 1
fi

# Step 4: Configure environment for production
echo ""
print_info "Step 4: Configuring production environment..."

# Backup existing .env if exists
if [ -f ".env" ]; then
    cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
    print_status "Backed up existing .env file"
fi

# Get server IP for production URLs
SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || curl -s ipinfo.io/ip 2>/dev/null || echo "localhost")
print_info "Detected server IP: $SERVER_IP"

# Create production environment file
cat > .env << EOF
# Production Environment Configuration
# Generated on $(date)

# DuanHpt9t9 Configuration
NEXTAUTH_URL=http://$SERVER_IP:12000
NEXTAUTH_SECRET=$(openssl rand -base64 32 2>/dev/null || echo "your-production-secret-key-$(date +%s)")
NEXT_PUBLIC_BOTPRESS_URL=http://$SERVER_IP:12001
BOTPRESS_INTERNAL_URL=http://botpress:3000
DATABASE_URL=file:./prisma/dev.db
NODE_ENV=production

# Botpress Configuration
EXTERNAL_URL=http://$SERVER_IP:12001
DUAN_HPT_URL=http://duan_hpt:3000
BP_HOST=0.0.0.0
BP_PRODUCTION=true
CLUSTER_ENABLED=false
PORT=3000

# Docker Configuration
COMPOSE_PROJECT_NAME=duanhpt9t9_botpress
EOF

print_status "Production environment configured"
print_info "Server URLs:"
print_info "  - DuanHpt9t9: http://$SERVER_IP:12000"
print_info "  - AdminBot: http://$SERVER_IP:12000/admin/adminbot"
print_info "  - Botpress: http://$SERVER_IP:12001"

# Step 5: Configure firewall (if ufw is available)
echo ""
print_info "Step 5: Configuring firewall..."

if command -v ufw &> /dev/null; then
    print_info "UFW firewall detected. Configuring ports..."
    
    # Allow SSH (important!)
    sudo ufw allow ssh 2>/dev/null || true
    
    # Allow our application ports
    sudo ufw allow 12000/tcp 2>/dev/null || true
    sudo ufw allow 12001/tcp 2>/dev/null || true
    
    # Enable firewall if not already enabled
    echo "y" | sudo ufw enable 2>/dev/null || true
    
    print_status "Firewall configured for ports 12000, 12001"
else
    print_warning "UFW not found. Please manually configure firewall to allow ports 12000, 12001"
fi

# Step 6: Start the application
echo ""
print_info "Step 6: Starting application..."

# Make start script executable
chmod +x start.sh

# Run the start script
print_info "Executing ./start.sh..."
./start.sh

# Step 7: Verify deployment
echo ""
print_info "Step 7: Verifying deployment..."

sleep 10  # Wait for services to start

# Check if containers are running
if docker-compose ps | grep -q "Up"; then
    print_status "Containers are running successfully"
    
    # Test HTTP endpoints
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:12000 | grep -q "200\|302"; then
        print_status "DuanHpt9t9 is responding"
    else
        print_warning "DuanHpt9t9 may still be starting up"
    fi
    
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:12001 | grep -q "200\|302"; then
        print_status "Botpress is responding"
    else
        print_warning "Botpress may still be starting up"
    fi
    
else
    print_error "Some containers failed to start. Check logs with: docker-compose logs"
    exit 1
fi

# Step 8: Final instructions
echo ""
echo "=================================================="
print_status "🎉 Production deployment completed successfully!"
echo "=================================================="
echo ""
print_info "📋 Access Information:"
echo "   🌐 DuanHpt9t9: http://$SERVER_IP:12000"
echo "   🤖 AdminBot: http://$SERVER_IP:12000/admin/adminbot"
echo "   💬 Botpress: http://$SERVER_IP:12001"
echo ""
print_info "🔧 Management Commands:"
echo "   📊 View logs: docker-compose logs -f"
echo "   🔄 Restart: docker-compose restart"
echo "   ⏹️  Stop: docker-compose down"
echo "   🗑️  Cleanup: docker-compose down -v"
echo ""
print_info "📁 Important Files:"
echo "   🔐 Environment: .env"
echo "   📋 Compose: docker-compose.yml"
echo "   📖 Documentation: README.md, DEPLOYMENT.md"
echo ""
print_warning "🔒 Security Notes:"
echo "   • Change default passwords in production"
echo "   • Configure HTTPS with reverse proxy (nginx/traefik)"
echo "   • Regular backups of volumes"
echo "   • Monitor logs for security issues"
echo ""
print_status "✅ System is ready for production use!"
echo "=================================================="