"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Server, Shield, Database, Cloud, Settings, Plus, CheckCircle, AlertCircle, TrendingUp, Users, HardDrive, Wifi } from 'lucide-react'

export default function ServicesPage() {
  const [user, setUser] = useState<any>(null)
  const [selectedService, setSelectedService] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const activeServices = [
    {
      id: 1,
      name: "Hosting Premium",
      category: "Infrastructure",
      status: "active",
      price: 299,
      billing: "monthly",
      description: "Servidor dedicado con 32GB RAM, 1TB SSD",
      features: ["99.9% Uptime", "24/7 Monitoring", "SSL Incluido", "Backup Diario"],
      usage: {
        cpu: 45,
        memory: 62,
        storage: 38,
        bandwidth: 23
      },
      icon: Server,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      name: "Seguridad Avanzada",
      category: "Security",
      status: "active",
      price: 199,
      billing: "monthly",
      description: "Firewall, antivirus y monitoreo de seguridad",
      features: ["Firewall Avanzado", "Detección de Malware", "Análisis de Vulnerabilidades", "Reportes Semanales"],
      usage: {
        threats_blocked: 1247,
        scans_completed: 30,
        vulnerabilities: 0,
        last_scan: "2024-01-16"
      },
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 3,
      name: "Base de Datos Gestionada",
      category: "Database",
      status: "active",
      price: 149,
      billing: "monthly",
      description: "PostgreSQL gestionada con backup automático",
      features: ["Backup Automático", "Replicación", "Monitoreo 24/7", "Optimización Automática"],
      usage: {
        connections: 45,
        storage: 156,
        queries_per_second: 1250,
        uptime: 99.98
      },
      icon: Database,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: 4,
      name: "CDN Global",
      category: "Performance",
      status: "active",
      price: 89,
      billing: "monthly",
      description: "Red de distribución de contenido global",
      features: ["150+ Ubicaciones", "Cache Inteligente", "Compresión Automática", "Analytics Detallados"],
      usage: {
        requests: 2500000,
        bandwidth: 1.2,
        cache_hit_ratio: 94,
        avg_response_time: 45
      },
      icon: Cloud,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ]

  const availableServices = [
    {
      id: 5,
      name: "Soporte Premium 24/7",
      category: "Support",
      price: 399,
      billing: "monthly",
      description: "Soporte técnico dedicado las 24 horas",
      features: ["Respuesta < 15 min", "Técnico Dedicado", "Acceso Prioritario", "Consultoría Incluida"],
      icon: Users,
      popular: true
    },
    {
      id: 6,
      name: "Backup Enterprise",
      category: "Backup",
      price: 199,
      billing: "monthly",
      description: "Backup automático con retención extendida",
      features: ["Backup Cada Hora", "Retención 1 Año", "Restauración Rápida", "Cifrado AES-256"],
      icon: HardDrive
    },
    {
      id: 7,
      name: "Monitoreo Avanzado",
      category: "Monitoring",
      price: 129,
      billing: "monthly",
      description: "Monitoreo completo de infraestructura",
      features: ["Métricas en Tiempo Real", "Alertas Personalizadas", "Dashboards", "API Access"],
      icon: TrendingUp
    },
    {
      id: 8,
      name: "VPN Empresarial",
      category: "Security",
      price: 79,
      billing: "monthly",
      description: "Acceso seguro para equipos remotos",
      features: ["Hasta 50 Usuarios", "Múltiples Ubicaciones", "Kill Switch", "Logs Detallados"],
      icon: Wifi
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Activo</Badge>
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactivo</Badge>
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Suspendido</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const totalMonthlySpend = activeServices.reduce((sum, service) => sum + service.price, 0)

  if (!user) return null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Servicios</h1>
          <p className="text-muted-foreground">
            Gestiona tus servicios contratados y explora nuevas opciones
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Servicios Activos
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {activeServices.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Todos operativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gasto Mensual
            </CardTitle>
            <Settings className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              ${totalMonthlySpend}
            </div>
            <p className="text-xs text-muted-foreground">
              Facturación mensual
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Uptime Promedio
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.9%</div>
            <p className="text-xs text-muted-foreground">
              Últimos 30 días
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Alertas Activas
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">0</div>
            <p className="text-xs text-muted-foreground">
              Todo funcionando bien
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Services */}
      <Card>
        <CardHeader>
          <CardTitle>Servicios Activos</CardTitle>
          <CardDescription>
            Servicios que tienes contratados actualmente
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
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(service.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">${service.price}</span>
                    <span className="text-sm text-muted-foreground">/{service.billing}</span>
                  </div>
                  
                  {service.name === "Hosting Premium" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>CPU</span>
                        <span>{service.usage.cpu}%</span>
                      </div>
                      <Progress value={service.usage.cpu} className="h-2" />
                      
                      <div className="flex justify-between text-sm">
                        <span>Memoria</span>
                        <span>{service.usage.memory}%</span>
                      </div>
                      <Progress value={service.usage.memory} className="h-2" />
                      
                      <div className="flex justify-between text-sm">
                        <span>Almacenamiento</span>
                        <span>{service.usage.storage}%</span>
                      </div>
                      <Progress value={service.usage.storage} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          Ver Detalles
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
                            <h4 className="font-medium mb-2">Características Incluidas</h4>
                            <ul className="space-y-1">
                              {service.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex justify-between items-center pt-4 border-t">
                            <span className="text-lg font-semibold">${service.price}/{service.billing}</span>
                            <Button variant="outline">Gestionar Servicio</Button>
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
          <CardTitle>Servicios Disponibles</CardTitle>
          <CardDescription>
            Expande tu infraestructura con servicios adicionales
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
                      <service.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{service.name}</CardTitle>
                      <CardDescription className="text-sm">{service.category}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  
                  <div className="space-y-1">
                    {service.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        {feature}
                      </div>
                    ))}
                    {service.features.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{service.features.length - 2} características más
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-semibold">${service.price}/{service.billing}</span>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Contratar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
