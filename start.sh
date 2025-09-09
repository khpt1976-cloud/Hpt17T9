#!/bin/bash

# DuanHpt9t9 + Botpress V12 Docker Deployment Script
# Portable deployment với 1 lệnh

echo "🚀 Starting DuanHpt9t9 + Botpress V12 Integration..."
echo "=================================================="

# Check if Docker and Docker Compose are installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found. Please create .env file with required variables."
    exit 1
fi

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Build and start services
echo "🔨 Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check service status
echo "📊 Checking service status..."
docker-compose ps

# Display access URLs
echo ""
echo "✅ Deployment completed successfully!"
echo "=================================================="
echo "🌐 Access URLs:"
echo "   • DuanHpt9t9 (Construction Management): http://localhost:12000"
echo "   • Botpress V12 (Chatbot Platform):      http://localhost:12001"
echo ""
echo "🔧 Admin Access:"
echo "   • DuanHpt9t9 Admin Panel: http://localhost:12000/admin"
echo "   • AdminBot Integration:   http://localhost:12000/admin/adminbot"
echo "   • Botpress Admin Panel:   http://localhost:12001/admin"
echo ""
echo "📝 Logs:"
echo "   • View all logs:     docker-compose logs -f"
echo "   • DuanHpt9t9 logs:   docker-compose logs -f duan_hpt"
echo "   • Botpress logs:     docker-compose logs -f botpress"
echo ""
echo "🛑 To stop:"
echo "   • Stop services:     docker-compose down"
echo "   • Stop and cleanup:  docker-compose down -v"
echo "=================================================="