"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { UserMenu } from "@/components/user-menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Home,
  Database,
  BarChart3,
  Globe,
  ChevronDown,
  User,
  Gamepad2,
  BookOpen,
  FileText,
  MessageCircle,
  Send,
  Star,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react"

export default function BaoComPage() {
  const { language, setLanguage, t, isHydrated } = useLanguage()
  const { user } = useAuth()

  // States for form
  const [message, setMessage] = useState("")
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState("")

  // Mock data for community posts
  const communityPosts = [
    {
      id: 1,
      user: "NguyenVanA",
      avatar: "👤",
      time: "2 giờ trước",
      content: "Hôm nay thắng 3/4 trận với chiến lược Tài. Cảm ơn hệ thống phân tích!",
      likes: 12,
      replies: 3
    },
    {
      id: 2,
      user: "TranThiB",
      avatar: "👩",
      time: "5 giờ trước", 
      content: "Có ai biết cách tối ưu hóa khoảng thời gian vào kèo không? Mình đang thắng 60% nhưng muốn cải thiện thêm.",
      likes: 8,
      replies: 7
    },
    {
      id: 3,
      user: "LeVanC",
      avatar: "👨",
      time: "1 ngày trước",
      content: "Chia sẻ kinh nghiệm: Nên đặt stop loss ở mức 3 trận thua liên tiếp. Giúp mình bảo vệ vốn rất tốt.",
      likes: 25,
      replies: 12
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Show development message
    alert("🚧 Tính năng đang phát triển!\n\nChức năng đăng bài sẽ sớm được hoàn thiện. Cảm ơn bạn đã quan tâm!")
    setMessage("")
    setCategory("")
    setPriority("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation Bar */}
      <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Navigation */}
            <div className="flex items-center space-x-6">
              <Link 
                href="/"
                className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Trang chủ</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                <Link
                  href="/digital-analysis/data-config"
                  className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <Database className="w-4 h-4" />
                  <span>Cấu hình Dữ liệu</span>
                </Link>
                <Link
                  href="/digital-analysis"
                  className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Phân tích cách chơi</span>
                </Link>
                <Link
                  href="/play-demo"
                  className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Chơi thử</span>
                </Link>
                <Link
                  href="/how-to-play"
                  className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Tìm kiếm cách chơi</span>
                </Link>
                <div className="flex items-center space-x-2 text-cyan-400">
                  <FileText className="w-4 h-4" />
                  <span>Bào Com</span>
                </div>
              </div>
            </div>

            {/* Right side - Language & User */}
            <div className="flex items-center space-x-4">
              {/* Language Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                  <Globe className="w-4 h-4" />
                  <span>{language === "vi" ? "🇻🇳 VN" : "🇺🇸 EN"}</span>
                  <ChevronDown className="w-3 h-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                  <DropdownMenuItem
                    onClick={() => setLanguage("vi")}
                    className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-700"
                  >
                    <span>🇻🇳</span>
                    <span>Tiếng Việt</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setLanguage("en")}
                    className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-700"
                  >
                    <span>🇺🇸</span>
                    <span>English</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              {user ? (
                <UserMenu />
              ) : (
                <Button
                  variant="ghost"
                  className="text-slate-300 hover:text-cyan-400 hover:bg-slate-800"
                >
                  <User className="w-4 h-4 mr-2" />
                  Đăng nhập
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Bào Com
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Cộng đồng chia sẻ kinh nghiệm và hỗ trợ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Community Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Post Form */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-cyan-400" />
                  Chia sẻ kinh nghiệm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Danh mục:
                      </label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="strategy" className="text-white hover:bg-slate-700">
                            Chiến lược
                          </SelectItem>
                          <SelectItem value="tips" className="text-white hover:bg-slate-700">
                            Mẹo hay
                          </SelectItem>
                          <SelectItem value="question" className="text-white hover:bg-slate-700">
                            Câu hỏi
                          </SelectItem>
                          <SelectItem value="experience" className="text-white hover:bg-slate-700">
                            Kinh nghiệm
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Độ ưu tiên:
                      </label>
                      <Select value={priority} onValueChange={setPriority}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Chọn độ ưu tiên" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="low" className="text-white hover:bg-slate-700">
                            Thấp
                          </SelectItem>
                          <SelectItem value="medium" className="text-white hover:bg-slate-700">
                            Trung bình
                          </SelectItem>
                          <SelectItem value="high" className="text-white hover:bg-slate-700">
                            Cao
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Nội dung:
                    </label>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Chia sẻ kinh nghiệm, đặt câu hỏi hoặc thảo luận..."
                      className="bg-slate-700 border-slate-600 text-white min-h-[120px]"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Đăng bài
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Community Posts */}
            <div className="space-y-4">
              {communityPosts.map((post) => (
                <Card key={post.id} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">{post.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-white">{post.user}</span>
                          <span className="text-sm text-slate-400">{post.time}</span>
                        </div>
                        <p className="text-slate-300 mb-4">{post.content}</p>
                        <div className="flex items-center space-x-4">
                          <button 
                            onClick={() => alert("🚧 Tính năng đang phát triển!\n\nChức năng like sẽ sớm được hoàn thiện.")}
                            className="flex items-center space-x-1 text-slate-400 hover:text-cyan-400 transition-colors"
                          >
                            <Star className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button 
                            onClick={() => alert("🚧 Tính năng đang phát triển!\n\nChức năng bình luận sẽ sớm được hoàn thiện.")}
                            className="flex items-center space-x-1 text-slate-400 hover:text-cyan-400 transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.replies}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-cyan-400" />
                  Thống kê cộng đồng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Thành viên:</span>
                  <span className="text-white font-medium">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Bài viết hôm nay:</span>
                  <span className="text-white font-medium">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Đang online:</span>
                  <span className="text-green-400 font-medium">156</span>
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                  Người đóng góp hàng đầu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🥇</span>
                  <div className="flex-1">
                    <div className="text-white font-medium">MasterTrader</div>
                    <div className="text-sm text-slate-400">245 bài viết</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🥈</span>
                  <div className="flex-1">
                    <div className="text-white font-medium">ProAnalyst</div>
                    <div className="text-sm text-slate-400">189 bài viết</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🥉</span>
                  <div className="flex-1">
                    <div className="text-white font-medium">SmartBetter</div>
                    <div className="text-sm text-slate-400">156 bài viết</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Hành động nhanh
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => alert("🚧 Tính năng đang phát triển!\n\nChức năng báo cáo vấn đề sẽ sớm được hoàn thiện.")}
                  variant="outline" 
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Báo cáo vấn đề
                </Button>
                <Button 
                  onClick={() => alert("🚧 Tính năng đang phát triển!\n\nChức năng liên hệ Admin sẽ sớm được hoàn thiện.")}
                  variant="outline" 
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Liên hệ Admin
                </Button>
                <Button 
                  onClick={() => alert("🚧 Tính năng đang phát triển!\n\nQuy tắc cộng đồng sẽ sớm được hoàn thiện.")}
                  variant="outline" 
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Quy tắc cộng đồng
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}