"use client";

import { useState, useEffect } from "react";
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
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Server,
  Shield,
  Database,
  Cloud,
  Settings,
  Plus,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  HardDrive,
  Wifi,
} from "lucide-react";

export default function ServicesPage() {
  const [user, setUser] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const activeServices = [
    {
      id: 1,
      name: "Premium Hosting",
      category: "Infrastructure",
      status: "active",
      price: 299,
      billing: "monthly",
      description: "Dedicated server with 32GB RAM, 1TB SSD",
      features: [
        "99.9% Uptime",
        "24/7 Monitoring",
        "SSL Included",
        "Daily Backup",
      ],
      usage: {
        cpu: 45,
        memory: 62,
        storage: 38,
        bandwidth: 23,
      },
      icon: Server,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      name: "Advanced Security",
      category: "Security",
      status: "active",
      price: 199,
      billing: "monthly",
      description: "Firewall, antivirus and security monitoring",
      features: [
        "Advanced Firewall",
        "Malware Detection",
        "Vulnerability Analysis",
        "Weekly Reports",
      ],
      usage: {
        threats_blocked: 1247,
        scans_completed: 30,
        vulnerabilities: 0,
        last_scan: "2024-01-16",
      },
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: 3,
      name: "Managed Database",
      category: "Database",
      status: "active",
      price: 149,
      billing: "monthly",
      description: "Managed PostgreSQL with automatic backup",
      features: [
        "Automatic Backup",
        "Replication",
        "24/7 Monitoring",
        "Automatic Optimization",
      ],
      usage: {
        connections: 45,
        storage: 156,
        queries_per_second: 1250,
        uptime: 99.98,
      },
      icon: Database,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: 4,
      name: "Global CDN",
      category: "Performance",
      status: "active",
      price: 89,
      billing: "monthly",
      description: "Global content delivery network",
      features: [
        "150+ Locations",
        "Smart Cache",
        "Automatic Compression",
        "Detailed Analytics",
      ],
      usage: {
        requests: 2500000,
        bandwidth: 1.2,
        cache_hit_ratio: 94,
        avg_response_time: 45,
      },
      icon: Cloud,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const availableServices = [
    {
      id: 5,
      name: "24/7 Premium Support",
      category: "Support",
      price: 399,
      billing: "monthly",
      description: "Dedicated technical support 24 hours",
      features: [
        "Response < 15 min",
        "Dedicated Technician",
        "Priority Access",
        "Consulting Included",
      ],
      icon: Users,
      popular: true,
    },
    {
      id: 6,
      name: "Enterprise Backup",
      category: "Backup",
      price: 199,
      billing: "monthly",
      description: "Automatic backup with extended retention",
      features: [
        "Hourly Backup",
        "1 Year Retention",
        "Fast Restoration",
        "AES-256 Encryption",
      ],
      icon: HardDrive,
    },
    {
      id: 7,
      name: "Advanced Monitoring",
      category: "Monitoring",
      price: 129,
      billing: "monthly",
      description: "Complete infrastructure monitoring",
      features: [
        "Real-time Metrics",
        "Custom Alerts",
        "Dashboards",
        "API Access",
      ],
      icon: TrendingUp,
    },
    {
      id: 8,
      name: "Enterprise VPN",
      category: "Security",
      price: 79,
      billing: "monthly",
      description: "Secure access for remote teams",
      features: [
        "Up to 50 Users",
        "Multiple Locations",
        "Kill Switch",
        "Detailed Logs",
      ],
      icon: Wifi,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Inactive
          </Badge>
        );
      case "suspended":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Suspended
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalMonthlySpend = activeServices.reduce(
    (sum, service) => sum + service.price,
    0
  );

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Services</h1>
          <p className="text-muted-foreground">
            Manage your contracted services and explore new options
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Services
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {activeServices.length}
            </div>
            <p className="text-xs text-muted-foreground">All operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
            <Settings className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              ${totalMonthlySpend}
            </div>
            <p className="text-xs text-muted-foreground">Monthly billing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Uptime
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.9%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">0</div>
            <p className="text-xs text-muted-foreground">
              Everything working well
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Services */}
      <Card>
        <CardHeader>
          <CardTitle>Active Services</CardTitle>
          <CardDescription>
            Services you currently have contracted
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {activeServices.map((service) => (
              <Card key={service.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${service.bgColor}`}>
                        <service.icon className={`h-5 w-5 ${service.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {service.name}
                        </CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(service.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">${service.price}</span>
                    <span className="text-sm text-muted-foreground">
                      /{service.billing}
                    </span>
                  </div>

                  {service.name === "Hosting Premium" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>CPU</span>
                        <span>{service.usage.cpu}%</span>
                      </div>
                      <Progress value={service.usage.cpu} className="h-2" />

                      <div className="flex justify-between text-sm">
                        <span>Memory</span>
                        <span>{service.usage.memory}%</span>
                      </div>
                      <Progress value={service.usage.memory} className="h-2" />

                      <div className="flex justify-between text-sm">
                        <span>Storage</span>
                        <span>{service.usage.storage}%</span>
                      </div>
                      <Progress value={service.usage.storage} className="h-2" />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                          <DialogTitle>{service.name}</DialogTitle>
                          <DialogDescription>
                            {service.description}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">
                              Included Features
                            </h4>
                            <ul className="space-y-1">
                              {service.features.map((feature, index) => (
                                <li
                                  key={index}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex justify-between items-center pt-4 border-t">
                            <span className="text-lg font-semibold">
                              ${service.price}/{service.billing}
                            </span>
                            <Button variant="outline">Manage Service</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Services */}
      <Card>
        <CardHeader>
          <CardTitle>Available Services</CardTitle>
          <CardDescription>
            Expand your infrastructure with additional services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {availableServices.map((service) => (
              <Card key={service.id} className="relative">
                {service.popular && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-white">Popular</Badge>
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-gray-50">
                      <service.icon className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        {service.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {service.category}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>

                  <div className="space-y-1">
                    {service.features.slice(0, 2).map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        {feature}
                      </div>
                    ))}
                    {service.features.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{service.features.length - 2} more features
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="font-semibold">
                      ${service.price}/{service.billing}
                    </span>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Contract
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
