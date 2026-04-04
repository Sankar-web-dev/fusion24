'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Dumbbell, 
  Users, 
  Target, 
  Flame, 
  Heart, 
  Zap, 
  Shield,
  Star,
  CheckCircle,
  BarChart3,
  Calendar,
  CreditCard,
  Settings,
  Lock,
  Smartphone,
  Cloud,
  Database,
  Activity,
  TrendingUp
} from 'lucide-react';

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Dumbbell className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white">Fusion 24</span>
              <Badge className="bg-slate-800 text-slate-300 border-slate-700 ml-2">
                Management System
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                Features
              </Button>
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                Pricing
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-slate-900 to-blue-500/10" />
        <div className="absolute inset-0 bg-[url('/login-bg.png')] bg-cover bg-center opacity-10" />
        
        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-green-500/20 text-green-400 border-green-500/50 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Complete Gym Management Solution
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-green-400 to-blue-400 bg-clip-text text-transparent">
              Manage Your Gym
              <br />
              Like a <span className="text-green-400">Pro</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              The all-in-one gym management platform. Track members, schedules, payments, 
              and fitness progress with powerful analytics and intuitive design.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800 text-lg px-8 py-4 rounded-xl">
                Live Demo
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-400" />
                <span>1000+ Gyms Trust Us</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-green-400" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-400" />
                <span>Bank-Level Security</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-24 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Everything You Need to <span className="text-green-400">Manage Your Gym</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Powerful features designed to streamline your gym operations and boost efficiency
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Member Management",
                description: "Complete member profiles, attendance tracking, and communication tools"
              },
              {
                icon: Calendar,
                title: "Class Scheduling",
                description: "Smart scheduling system with automated reminders and capacity management"
              },
              {
                icon: CreditCard,
                title: "Payment Processing",
                description: "Secure payment gateway with automated billing and invoicing"
              },
              {
                icon: BarChart3,
                title: "Analytics Dashboard",
                description: "Real-time insights on revenue, attendance, and member engagement"
              },
              {
                icon: Heart,
                title: "Fitness Tracking",
                description: "Workout plans, progress tracking, and nutrition monitoring"
              },
              {
                icon: Smartphone,
                title: "Mobile App",
                description: "Member mobile app for bookings, check-ins, and progress tracking"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 hover:border-green-500/50 transition-all group">
                <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition-colors">
                  <feature.icon className="text-green-400 w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 lg:py-24 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Powerful <span className="text-green-400">Admin Dashboard</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Get a bird's eye view of your gym operations with our intuitive dashboard
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { label: "Total Members", value: "523", change: "+12%", icon: Users },
                  { label: "Monthly Revenue", value: "$15,420", change: "+8%", icon: TrendingUp },
                  { label: "Active Today", value: "89", change: "+15%", icon: Activity },
                  { label: "Pending Payments", value: "7", change: "-3%", icon: CreditCard }
                ].map((stat, index) => (
                  <div key={index} className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon className="w-5 h-5 text-green-400" />
                      <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Recent Activity</h4>
                <div className="space-y-3">
                  {[
                    "John Doe checked in for workout",
                    "New member Sarah Johnson registered",
                    "Payment received from Mike Wilson",
                    "Class: Yoga Session completed"
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span>{activity}</span>
                      <span className="text-slate-500 ml-auto">2m ago</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 lg:py-24 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Choose Your <span className="text-green-400">Management Plan</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Flexible pricing for gyms of all sizes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$49",
                period: "/month",
                features: [
                  "Up to 100 Members",
                  "Basic Analytics",
                  "Email Support",
                  "Mobile App Access",
                  "Payment Processing"
                ],
                popular: false
              },
              {
                name: "Professional",
                price: "$99",
                period: "/month",
                features: [
                  "Up to 500 Members",
                  "Advanced Analytics",
                  "Priority Support",
                  "Custom Branding",
                  "API Access",
                  "Advanced Reporting"
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                features: [
                  "Unlimited Members",
                  "White-Label Solution",
                  "Dedicated Support",
                  "Custom Integrations",
                  "On-Premise Option",
                  "SLA Guarantee"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className={`relative ${plan.popular ? 'scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-500 text-white px-4 py-1 text-sm">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className={`bg-slate-800/50 border ${plan.popular ? 'border-green-500/50' : 'border-slate-700/50'} rounded-xl p-8 hover:border-green-500/50 transition-all`}>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-green-400">{plan.price}</span>
                    <span className="text-slate-400 ml-1">{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' : 'bg-slate-700 hover:bg-slate-600'} text-white py-3 rounded-xl`}
                    onClick={() => setSelectedPlan(plan.name)}
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Trusted by <span className="text-green-400">Gym Owners</span> Worldwide
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Join thousands of successful gyms using Fusion 24
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Active Gyms" },
              { number: "500K+", label: "Members Managed" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl lg:text-5xl font-bold text-green-400 mb-2">{stat.number}</div>
                <div className="text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-slate-900/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Gym Management?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Start your free 14-day trial. No credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg px-8 py-4 rounded-xl">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800 text-lg px-8 py-4 rounded-xl">
              Schedule Demo
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-green-400" />
              <span>Secure & Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-green-400" />
              <span>Cloud-Based</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-green-400" />
              <span>Automated Backups</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
