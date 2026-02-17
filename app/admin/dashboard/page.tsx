'use client'

// TODO: Replace mock data with real API calls
// TODO: Connect to analytics service (Google Analytics, Mixpanel)
// TODO: Implement real-time data updates (WebSocket/Server-Sent Events)
// TODO: Add date range selector for custom analytics periods
// TODO: Add export functionality (CSV, PDF) for reports
// TODO: Implement data caching for better performance
// TODO: Add loading skeletons while fetching data
// TODO: Add error boundaries and proper error handling
// TODO: Connect sales graph to real transaction data
// TODO: Add comparison with previous periods
// TODO: Implement drill-down functionality for detailed insights

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Globe,
  MapPin,
  Sparkles
} from 'lucide-react'

type TimePeriod = 'week' | 'month' | 'year'

export default function AdminDashboard() {
  const router = useRouter()
  const [period, setPeriod] = useState<TimePeriod>('month')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('adminAuth')
      if (!isAuth) {
        window.location.href = '/login'
      }
    }
    checkAuth()
  }, [router])

  // Mock data - Enhanced with more realistic data
  const stats = {
    week: { revenue: 18750, orders: 42, customers: 38, products: 156, growth: 15.8 },
    month: { revenue: 67340, orders: 189, customers: 156, products: 156, growth: 23.4 },
    year: { revenue: 687500, orders: 2341, customers: 1876, products: 156, growth: 34.7 }
  }

  const currentStats = stats[period]

  // Two data series for comparison
  const salesData = {
    week: {
      online: [2450, 3100, 2200, 3850, 2900, 3650, 3200],
      store: [1800, 2400, 1900, 2900, 2200, 2800, 2500]
    },
    month: {
      online: [
        4200, 4500, 4800, 5100, 5400,
        5800, 5500, 5900, 6200, 6000,
        6400, 6100, 5800, 6500, 6300,
        6700, 6900, 6600, 7100, 6800,
        7000, 6500, 6800, 7200, 6900,
        7100, 6700, 6400, 6800, 6340
      ],
      store: [
        3200, 3400, 3600, 3800, 4000,
        4200, 4000, 4300, 4500, 4400,
        4600, 4400, 4200, 4700, 4500,
        4800, 5000, 4800, 5100, 4900,
        5000, 4700, 4900, 5200, 5000,
        5100, 4900, 4700, 4900, 4600
      ]
    },
    year: {
      online: [48000, 52000, 45000, 58000, 54000, 59000, 62000, 56000, 61000, 65000, 59000, 68500],
      store: [35000, 38000, 33000, 42000, 39000, 43000, 45000, 41000, 44000, 47000, 43000, 49500]
    }
  }

  const categoryData = [
    { name: 'World Map', value: 42, color: '#8b5a3c', sales: 98, revenue: 29302 },
    { name: 'Country Map', value: 33, color: '#a67c52', sales: 77, revenue: 19173 },
    { name: 'City Map', value: 18, color: '#c4a77d', sales: 42, revenue: 7938 },
    { name: 'Custom Maps', value: 7, color: '#d4b896', sales: 16, revenue: 5984 }
  ]

  const topProducts = [
    { name: 'World Map - XL Oak Natural', sales: 127, revenue: 37973, trend: '+18%' },
    { name: 'USA Map - Large Walnut', sales: 94, revenue: 23406, trend: '+12%' },
    { name: 'Europe Map - Medium White', sales: 76, revenue: 18924, trend: '+8%' },
    { name: 'Japan Map - Small Ebony', sales: 58, revenue: 10962, trend: '+22%' },
    { name: 'NYC City Map - LED Custom', sales: 51, revenue: 19074, trend: '+35%' }
  ]

  const recentOrders = [
    { id: '#ORD-2341', customer: 'Michael Chen', product: 'World Map XL - Oak', amount: 399, status: 'Completed', date: '2 min ago' },
    { id: '#ORD-2340', customer: 'Sarah Williams', product: 'USA Map - Walnut', amount: 299, status: 'Processing', date: '15 min ago' },
    { id: '#ORD-2339', customer: 'James Rodriguez', product: 'Europe Map - White', amount: 249, status: 'Shipped', date: '1 hour ago' },
    { id: '#ORD-2338', customer: 'Emma Thompson', product: 'Custom World LED', amount: 474, status: 'Completed', date: '2 hours ago' },
    { id: '#ORD-2337', customer: 'David Kim', product: 'Tokyo City Map', amount: 189, status: 'Processing', date: '3 hours ago' },
    { id: '#ORD-2336', customer: 'Lisa Anderson', product: 'Canada Map - Oak', amount: 279, status: 'Shipped', date: '4 hours ago' }
  ]

  const additionalInsights = {
    avgOrderValue: Math.round(currentStats.revenue / currentStats.orders),
    conversionRate: 3.8,
    returningCustomers: 42,
    pendingOrders: 23
  }

  const maxSales = Math.max(...salesData[period].online, ...salesData[period].store)

  return (
    <div className="min-h-screen bg-[#fffaf3]">
      <header className="bg-[#f7f1e8] shadow-sm sticky top-0 z-10 border-b border-[#e6dcd0]">
        <div className="px-4 lg:px-8 py-4">
          <div>
            <h1 className="text-2xl font-serif font-medium text-[#2b1a12]">Dashboard</h1>
            <p className="text-sm text-[#5a3726]">Welcome back, Admin</p>
          </div>
        </div>
      </header>

      <main className="px-4 lg:px-8 py-8 pb-16 space-y-8">
        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-[#f7f1e8] to-[#efe6d8] border-[#d4b896]">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-[#5a3726] font-medium">Avg Order Value</p>
                  <p className="text-2xl font-bold text-[#2b1a12] mt-1">${additionalInsights.avgOrderValue}</p>
                </div>
                <DollarSign className="h-8 w-8 text-[#9b7b65] opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#f7f1e8] to-[#efe6d8] border-[#a67c52]">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-[#5a3726] font-medium">Conversion Rate</p>
                  <p className="text-2xl font-bold text-[#2b1a12] mt-1">{additionalInsights.conversionRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-[#8b5a3c] opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#f7f1e8] to-[#efe6d8] border-[#c4a77d]">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-[#5a3726] font-medium">Returning Customers</p>
                  <p className="text-2xl font-bold text-[#2b1a12] mt-1">{additionalInsights.returningCustomers}%</p>
                </div>
                <Users className="h-8 w-8 text-[#9b7b65] opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#f7f1e8] to-[#efe6d8] border-[#d4b896]">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-[#5a3726] font-medium">Pending Orders</p>
                  <p className="text-2xl font-bold text-[#2b1a12] mt-1">{additionalInsights.pendingOrders}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-[#a67c52] opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-[#8b5a3c] bg-[#f7f1e8]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#5a3726]">Total Revenue</CardTitle>
              <DollarSign className="h-5 w-5 text-[#8b5a3c]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2b1a12]">${currentStats.revenue.toLocaleString()}</div>
              <div className="flex items-center text-sm text-[#8b5a3c] mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+{currentStats.growth}% from last {period}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#9b7b65] bg-[#f7f1e8]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#5a3726]">Total Orders</CardTitle>
              <ShoppingCart className="h-5 w-5 text-[#9b7b65]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2b1a12]">{currentStats.orders}</div>
              <div className="flex items-center text-sm text-[#9b7b65] mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+8.2% from last {period}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#a67c52] bg-[#f7f1e8]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#5a3726]">Total Customers</CardTitle>
              <Users className="h-5 w-5 text-[#a67c52]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2b1a12]">{currentStats.customers}</div>
              <div className="flex items-center text-sm text-[#a67c52] mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+15.3% from last {period}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#c4a77d] bg-[#f7f1e8]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#5a3726]">Total Products</CardTitle>
              <Package className="h-5 w-5 text-[#c4a77d]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#2b1a12]">{currentStats.products}</div>
              <div className="flex items-center text-sm text-[#5a3726] mt-2">
                <span>Active inventory</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Sales Chart */}
        <Card className="bg-[#f7f1e8] border-[#e6dcd0]">
          <CardHeader>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <CardTitle className="text-[#2b1a12] text-2xl mb-2">Sales Analytics</CardTitle>
                <p className="text-sm text-[#5a3726]">Track your revenue performance over time</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant={period === 'week' ? 'default' : 'outline'}
                  onClick={() => setPeriod('week')}
                  className={period === 'week' ? 'bg-[#8b5a3c] hover:bg-[#6d4830] text-white' : 'border-[#d4b896] text-[#5a3726] hover:bg-[#efe6d8]'}
                >
                  Week
                </Button>
                <Button 
                  size="sm" 
                  variant={period === 'month' ? 'default' : 'outline'}
                  onClick={() => setPeriod('month')}
                  className={period === 'month' ? 'bg-[#8b5a3c] hover:bg-[#6d4830] text-white' : 'border-[#d4b896] text-[#5a3726] hover:bg-[#efe6d8]'}
                >
                  Month
                </Button>
                <Button 
                  size="sm" 
                  variant={period === 'year' ? 'default' : 'outline'}
                  onClick={() => setPeriod('year')}
                  className={period === 'year' ? 'bg-[#8b5a3c] hover:bg-[#6d4830] text-white' : 'border-[#d4b896] text-[#5a3726] hover:bg-[#efe6d8]'}
                >
                  Year
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Chart */}
              <div className="h-80 relative">
                {/* Y-axis */}
                <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between text-xs text-[#9b7b65] font-medium">
                  <span>${(maxSales / 1000).toFixed(0)}k</span>
                  <span>${(maxSales * 0.75 / 1000).toFixed(0)}k</span>
                  <span>${(maxSales / 2 / 1000).toFixed(0)}k</span>
                  <span>${(maxSales * 0.25 / 1000).toFixed(0)}k</span>
                  <span>$0</span>
                </div>

                {/* Chart Area */}
                <div className="ml-16 h-full relative">
                  {/* Grid */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} className="border-t border-[#e6dcd0]"></div>
                    ))}
                  </div>

                  {/* SVG Chart */}
                  <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#8b5a3c" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#8b5a3c" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>
                    
                    {/* Area Fill */}
                    <path
                      d={(() => {
                        const points = salesData[period].online.map((value, index) => ({
                          x: (index / (salesData[period].online.length - 1)) * 1000,
                          y: 300 - ((value / maxSales) * 290)
                        }))
                        
                        let path = `M 0 300 L ${points[0].x} ${points[0].y}`
                        
                        for (let i = 0; i < points.length - 1; i++) {
                          const current = points[i]
                          const next = points[i + 1]
                          const controlX = (current.x + next.x) / 2
                          path += ` Q ${controlX} ${current.y}, ${next.x} ${next.y}`
                        }
                        
                        path += ' L 1000 300 Z'
                        return path
                      })()}
                      fill="url(#areaGradient)"
                    />
                    
                    {/* Line */}
                    <path
                      d={(() => {
                        const points = salesData[period].online.map((value, index) => ({
                          x: (index / (salesData[period].online.length - 1)) * 1000,
                          y: 300 - ((value / maxSales) * 290)
                        }))
                        
                        let path = `M ${points[0].x} ${points[0].y}`
                        
                        for (let i = 0; i < points.length - 1; i++) {
                          const current = points[i]
                          const next = points[i + 1]
                          const controlX = (current.x + next.x) / 2
                          path += ` Q ${controlX} ${current.y}, ${next.x} ${next.y}`
                        }
                        
                        return path
                      })()}
                      fill="none"
                      stroke="#8b5a3c"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Data Points */}
                    {salesData[period].online.map((value, index) => {
                      const x = (index / (salesData[period].online.length - 1)) * 1000
                      const y = 300 - ((value / maxSales) * 290)
                      const isHovered = hoveredIndex === index
                      return isHovered ? (
                        <circle
                          key={index}
                          cx={x}
                          cy={y}
                          r="7"
                          fill="#fffaf3"
                          stroke="#8b5a3c"
                          strokeWidth="3"
                          className="transition-all"
                          style={{ filter: 'drop-shadow(0 2px 4px rgba(139, 90, 60, 0.4))' }}
                        />
                      ) : null
                    })}
                  </svg>

                  {/* Interactive Overlay */}
                  <div className="absolute inset-0 flex">
                    {salesData[period].online.map((value, index) => {
                      const prevValue = index > 0 ? salesData[period].online[index - 1] : value
                      const change = ((value - prevValue) / prevValue * 100).toFixed(1)
                      const isPositive = parseFloat(change) >= 0
                      
                      return (
                        <div 
                          key={index} 
                          className="flex-1 relative cursor-pointer"
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          {hoveredIndex === index && (
                            <>
                              {/* Vertical Line */}
                              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#c4a77d] -translate-x-1/2"></div>
                              
                              {/* Tooltip */}
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-10">
                                <div className="bg-[#2b1a12] text-[#f7f1e8] rounded-xl shadow-2xl p-4 min-w-[180px]">
                                  <div className="text-xs text-[#c4a77d] mb-2 font-medium">
                                    {period === 'week' 
                                      ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][index]
                                      : period === 'month' 
                                      ? `Day ${index + 1}`
                                      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                                  </div>
                                  <div className="text-2xl font-bold mb-3">
                                    ${value.toLocaleString()}
                                  </div>
                                  {index > 0 && (
                                    <div className="flex items-center justify-between text-xs pt-2 border-t border-[#4a2c14]">
                                      <span className="text-[#9b7b65]">Change</span>
                                      <span className={`flex items-center gap-1 font-semibold ${isPositive ? 'text-[#8b5a3c]' : 'text-[#c4a77d]'}`}>
                                        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                        {Math.abs(parseFloat(change))}%
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                                  <div className="border-6 border-transparent border-t-[#2b1a12]" style={{ borderWidth: '6px' }}></div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* X-axis Labels */}
                  <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-[#9b7b65] font-medium">
                    {salesData[period].online.map((_, index) => {
                      let label = ''
                      if (period === 'week') {
                        label = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]
                      } else if (period === 'month') {
                        const day = index + 1
                        label = (day === 1 || day % 5 === 0) ? day.toString() : ''
                      } else {
                        label = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]
                      }
                      return (
                        <span 
                          key={index} 
                          className={`flex-1 text-center ${hoveredIndex === index ? 'text-[#8b5a3c] font-bold' : ''}`}
                        >
                          {label}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Insights Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-[#e6dcd0]">
                <div className="bg-[#efe6d8] rounded-lg p-4">
                  <p className="text-xs text-[#5a3726] mb-1 font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-[#2b1a12]">
                    ${salesData[period].online.reduce((a, b) => a + b, 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-[#8b5a3c] mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{currentStats.growth}%
                  </p>
                </div>
                
                <div className="bg-[#efe6d8] rounded-lg p-4">
                  <p className="text-xs text-[#5a3726] mb-1 font-medium">Average Sale</p>
                  <p className="text-2xl font-bold text-[#2b1a12]">
                    ${Math.round(salesData[period].online.reduce((a, b) => a + b, 0) / salesData[period].online.length).toLocaleString()}
                  </p>
                  <p className="text-xs text-[#9b7b65] mt-1">Per {period === 'week' ? 'day' : period === 'month' ? 'day' : 'month'}</p>
                </div>
                
                <div className="bg-[#efe6d8] rounded-lg p-4">
                  <p className="text-xs text-[#5a3726] mb-1 font-medium">Peak Sale</p>
                  <p className="text-2xl font-bold text-[#2b1a12]">
                    ${Math.max(...salesData[period].online).toLocaleString()}
                  </p>
                  <p className="text-xs text-[#9b7b65] mt-1">
                    {period === 'week' 
                      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][salesData[period].online.indexOf(Math.max(...salesData[period].online))]
                      : period === 'month'
                      ? `Day ${salesData[period].online.indexOf(Math.max(...salesData[period].online)) + 1}`
                      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][salesData[period].online.indexOf(Math.max(...salesData[period].online))]}
                  </p>
                </div>
                
                <div className="bg-[#efe6d8] rounded-lg p-4">
                  <p className="text-xs text-[#5a3726] mb-1 font-medium">Orders</p>
                  <p className="text-2xl font-bold text-[#2b1a12]">{currentStats.orders}</p>
                  <p className="text-xs text-[#9b7b65] mt-1">This {period}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Distribution */}
          <Card className="bg-[#f7f1e8] border-[#e6dcd0]">
            <CardHeader>
              <CardTitle className="text-[#2b1a12]">Sales by Category</CardTitle>
              <p className="text-sm text-[#5a3726]">Product category distribution</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-8">
                <div className="relative w-64 h-64">
                  {/* SVG Pie Chart */}
                  <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                    <defs>
                      {categoryData.map((cat, index) => (
                        <filter key={index} id={`shadow-${index}`}>
                          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3"/>
                        </filter>
                      ))}
                    </defs>
                    {(() => {
                      let cumulativePercent = 0
                      return categoryData.map((cat, index) => {
                        const startAngle = (cumulativePercent / 100) * 360
                        const endAngle = ((cumulativePercent + cat.value) / 100) * 360
                        cumulativePercent += cat.value
                        
                        const startRad = (startAngle - 90) * (Math.PI / 180)
                        const endRad = (endAngle - 90) * (Math.PI / 180)
                        
                        const x1 = 100 + 90 * Math.cos(startRad)
                        const y1 = 100 + 90 * Math.sin(startRad)
                        const x2 = 100 + 90 * Math.cos(endRad)
                        const y2 = 100 + 90 * Math.sin(endRad)
                        
                        const largeArc = cat.value > 50 ? 1 : 0
                        const isHovered = hoveredCategory === index
                        const scale = isHovered ? 1.05 : 1
                        
                        // Calculate center point for scaling
                        const midAngle = (startAngle + endAngle) / 2
                        const midRad = (midAngle - 90) * (Math.PI / 180)
                        const offsetX = isHovered ? 5 * Math.cos(midRad) : 0
                        const offsetY = isHovered ? 5 * Math.sin(midRad) : 0
                        
                        return (
                          <g 
                            key={index}
                            className="cursor-pointer transition-all duration-300"
                            onMouseEnter={() => setHoveredCategory(index)}
                            onMouseLeave={() => setHoveredCategory(null)}
                            style={{
                              transform: `translate(${offsetX}px, ${offsetY}px)`,
                              filter: isHovered ? `url(#shadow-${index})` : 'none'
                            }}
                          >
                            <path
                              d={`M 100 100 L ${x1} ${y1} A 90 90 0 ${largeArc} 1 ${x2} ${y2} Z`}
                              fill={cat.color}
                              opacity={hoveredCategory === null ? 1 : hoveredCategory === index ? 1 : 0.5}
                              className="transition-all duration-300"
                            />
                          </g>
                        )
                      })
                    })()}
                  </svg>
                  
                  {/* Center circle with info */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <div className="text-center">
                        {hoveredCategory !== null ? (
                          <>
                            <div className="text-3xl font-bold text-gray-900">
                              {categoryData[hoveredCategory].value}%
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {categoryData[hoveredCategory].name}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-3xl font-bold text-gray-900">{currentStats.orders}</div>
                            <div className="text-xs text-gray-500 mt-1">Total Orders</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover tooltip */}
                  {hoveredCategory !== null && (
                    <div className="absolute top-0 right-full mr-4 w-64">
                      <div className="bg-gray-900 text-white rounded-lg shadow-2xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div 
                            className="w-4 h-4 rounded" 
                            style={{ backgroundColor: categoryData[hoveredCategory].color }}
                          />
                          <h4 className="font-semibold text-lg">
                            {categoryData[hoveredCategory].name}
                          </h4>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                            <span className="text-gray-400">Market Share</span>
                            <span className="text-2xl font-bold text-blue-400">
                              {categoryData[hoveredCategory].value}%
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Total Sales</span>
                            <span className="font-semibold">
                              {categoryData[hoveredCategory].sales} units
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Revenue</span>
                            <span className="font-semibold text-green-400">
                              ${categoryData[hoveredCategory].revenue.toLocaleString()}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Avg Price</span>
                            <span className="font-semibold">
                              ${Math.round(categoryData[hoveredCategory].revenue / categoryData[hoveredCategory].sales)}
                            </span>
                          </div>

                          <div className="pt-2 border-t border-gray-700">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Growth</span>
                              <span className="flex items-center gap-1 text-green-400 font-semibold">
                                <TrendingUp className="h-3 w-3" />
                                +{(Math.random() * 20 + 5).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Arrow pointing to pie */}
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-px">
                        <div className="border-8 border-transparent border-l-gray-900"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Legend with hover interaction */}
              <div className="space-y-3">
                {categoryData.map((cat, index) => {
                  const isHovered = hoveredCategory === index
                  return (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer ${
                        isHovered ? 'bg-gray-100 shadow-md scale-105' : 'hover:bg-gray-50'
                      }`}
                      onMouseEnter={() => setHoveredCategory(index)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className={`w-5 h-5 rounded transition-all ${isHovered ? 'scale-125' : ''}`}
                          style={{ backgroundColor: cat.color }}
                        />
                        <div>
                          <span className={`text-sm font-medium transition-all ${
                            isHovered ? 'text-gray-900 text-base' : 'text-gray-700'
                          }`}>
                            {cat.name}
                          </span>
                          <p className="text-xs text-gray-500">{cat.sales} sales</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-semibold transition-all ${
                          isHovered ? 'text-blue-600 text-lg' : 'text-gray-900'
                        }`}>
                          {cat.value}%
                        </span>
                        <p className="text-xs text-gray-500">${cat.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Summary stats */}
              <div className="mt-6 pt-4 border-t grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Total Categories</p>
                  <p className="text-xl font-bold text-gray-900">{categoryData.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Total Revenue</p>
                  <p className="text-xl font-bold text-gray-900">
                    ${categoryData.reduce((sum, cat) => sum + cat.revenue, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className="bg-[#f7f1e8] border-[#e6dcd0]">
            <CardHeader>
              <CardTitle className="text-[#2b1a12]">Top 5 Products This Month</CardTitle>
              <p className="text-sm text-[#5a3726]">Best selling products</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#efe6d8] transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#c4a77d] to-[#9b7b65] flex items-center justify-center text-white font-bold shadow-md">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#2b1a12] truncate">{product.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-[#5a3726]">{product.sales} sales</p>
                        <span className="text-xs text-[#8b5a3c] font-medium">{product.trend}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#2b1a12]">${product.revenue.toLocaleString()}</p>
                      <p className="text-xs text-[#5a3726]">${Math.round(product.revenue / product.sales)}/unit</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="bg-[#f7f1e8] border-[#e6dcd0]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-[#2b1a12]">Recent Orders</CardTitle>
                <p className="text-sm text-[#5a3726] mt-1">Latest customer orders</p>
              </div>
              <Link href="/admin/orders">
                <Button variant="outline" size="sm" className="border-[#d4b896] text-[#5a3726] hover:bg-[#efe6d8]">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-[#efe6d8] border-[#e6dcd0]">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2b1a12]">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2b1a12]">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2b1a12]">Product</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2b1a12]">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2b1a12]">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-[#2b1a12]">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="border-b hover:bg-[#efe6d8] transition-colors border-[#e6dcd0]">
                      <td className="py-3 px-4 text-sm font-medium text-[#9b7b65]">{order.id}</td>
                      <td className="py-3 px-4 text-sm text-[#2b1a12]">{order.customer}</td>
                      <td className="py-3 px-4 text-sm text-[#5a3726]">{order.product}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-[#2b1a12]">${order.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${order.status === 'Completed' ? 'bg-[#d4f4dd] text-[#2d5f3f]' : 
                            order.status === 'Processing' ? 'bg-[#fef3c7] text-[#92400e]' : 
                            'bg-[#dbeafe] text-[#1e40af]'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-[#5a3726]">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/products">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-[#9b7b65] bg-[#f7f1e8]">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#efe6d8] rounded-lg">
                    <Package className="h-6 w-6 text-[#9b7b65]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2b1a12]">Manage Products</h3>
                    <p className="text-sm text-[#5a3726]">Add or edit products</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/orders">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-[#8b5a3c] bg-[#f7f1e8]">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#efe6d8] rounded-lg">
                    <ShoppingCart className="h-6 w-6 text-[#8b5a3c]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2b1a12]">Manage Orders</h3>
                    <p className="text-sm text-[#5a3726]">Process customer orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/customers">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-[#a67c52] bg-[#f7f1e8]">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#efe6d8] rounded-lg">
                    <Users className="h-6 w-6 text-[#a67c52]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2b1a12]">View Customers</h3>
                    <p className="text-sm text-[#5a3726]">Customer information</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  )
}
