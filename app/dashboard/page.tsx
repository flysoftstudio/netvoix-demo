"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, HeadphonesIcon, Settings, TrendingUp, AlertCircle, CheckCircle, Clock, DollarSign } from 'lucide-react'
import Link from "next/link"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  if (!user) return null

  const stats = [
    {
      title: "Facturas Pendientes",
      value: "3",
      description: "Total: $12,450",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Tickets Abiertos",
      value: "2",
      description: "1 alta prioridad",
      icon: HeadphonesIcon,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Servicios Activos",
      value: "8",
      description: "Todos operativos",
      icon: Settings,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Ahorro Mensual",
      value: "$2,340",
      description: "vs. competencia",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/5"
    }
  ]

  const recentActivity = [
    {
      type: "invoice",
      title: "Nueva factura generada",
      description: "Factura #INV-2024-001 por $4,200",
      time: "Hace 2 horas",
      status: "pending"
    },
    {
      type: "support",
      title: "Ticket resuelto",
      description: "Problema de conectividad solucionado",
      time: "Hace 1 día",
      status: "resolved"
    },
    {
      type: "service",
      title: "Servicio actualizado",
      description: "Plan de hosting mejorado",
      time: "Hace 3 días",
      status: "active"
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-secondary">
          Bienvenido, {user.name}
        </h1>
        <p className="text-muted-foreground">
          {user.company} • Panel de control
        </p>
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
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Gestiona tus servicios y soporte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/invoices">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Ver Facturas
              </Button>
            </Link>
            <Link href="/support">
              <Button variant="outline" className="w-full justify-start">
                <HeadphonesIcon className="mr-2 h-4 w-4" />
                Crear Ticket de Soporte
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Gestionar Servicios
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimas actualizaciones de tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {activity.status === 'pending' && (
                    <Clock className="h-5 w-5 text-orange-500" />
                  )}
                  {activity.status === 'resolved' && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {activity.status === 'active' && (
                    <Settings className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
