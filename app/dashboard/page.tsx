"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  HeadphonesIcon,
  Settings,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  if (!user) return null;

  const stats = [
    {
      title: "Pending Invoices",
      value: "3",
      description: "Total: $12,450",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Open Tickets",
      value: "2",
      description: "1 high priority",
      icon: HeadphonesIcon,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Active Services",
      value: "8",
      description: "All operational",
      icon: Settings,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Monthly Savings",
      value: "$2,340",
      description: "vs. competition",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/5",
    },
  ];

  const recentActivity = [
    {
      type: "invoice",
      title: "New invoice generated",
      description: "Invoice #INV-2024-001 for $4,200",
      time: "2 hours ago",
      status: "pending",
    },
    {
      type: "support",
      title: "Ticket resolved",
      description: "Connectivity issue resolved",
      time: "1 day ago",
      status: "resolved",
    },
    {
      type: "service",
      title: "Service updated",
      description: "Hosting plan upgraded",
      time: "3 days ago",
      status: "active",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-secondary">
          Welcome, {user.name}
        </h1>
        <p className="text-muted-foreground">{user.company} • Control Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your services and support</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/invoices">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                View Invoices
              </Button>
            </Link>
            <Link href="/support">
              <Button variant="outline" className="w-full justify-start">
                <HeadphonesIcon className="mr-2 h-4 w-4" />
                Create Support Ticket
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Manage Services
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {activity.status === "pending" && (
                    <Clock className="h-5 w-5 text-orange-500" />
                  )}
                  {activity.status === "resolved" && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {activity.status === "active" && (
                    <Settings className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
