"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileText, Download, Search, Filter, Eye, DollarSign } from 'lucide-react'

export default function InvoicesPage() {
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const invoices = [
    {
      id: "INV-2024-001",
      date: "2024-01-15",
      dueDate: "2024-02-15",
      amount: 4200,
      status: "pending",
      services: "Hosting Premium + Soporte",
      description: "Servicios de hosting y soporte técnico - Enero 2024"
    },
    {
      id: "INV-2024-002",
      date: "2024-01-10",
      dueDate: "2024-02-10",
      amount: 3800,
      status: "pending",
      services: "Desarrollo Web",
      description: "Desarrollo de módulo de reportes"
    },
    {
      id: "INV-2023-012",
      date: "2023-12-15",
      dueDate: "2024-01-15",
      amount: 4450,
      status: "paid",
      services: "Hosting Premium + Soporte",
      description: "Servicios de hosting y soporte técnico - Diciembre 2023"
    },
    {
      id: "INV-2023-011",
      date: "2023-11-15",
      dueDate: "2023-12-15",
      amount: 4200,
      status: "paid",
      services: "Hosting Premium + Soporte",
      description: "Servicios de hosting y soporte técnico - Noviembre 2023"
    },
    {
      id: "INV-2023-010",
      date: "2023-10-15",
      dueDate: "2023-11-15",
      amount: 4200,
      status: "paid",
      services: "Hosting Premium + Soporte",
      description: "Servicios de hosting y soporte técnico - Octubre 2023"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Pagada</Badge>
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Pendiente</Badge>
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Vencida</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredInvoices = invoices.filter(invoice =>
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.services.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPending = invoices
    .filter(inv => inv.status === 'pending')
    .reduce((sum, inv) => sum + inv.amount, 0)

  if (!user) return null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Facturas</h1>
          <p className="text-muted-foreground">
            Gestiona y descarga tus facturas
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pendiente
            </CardTitle>
            <DollarSign className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              ${totalPending.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {invoices.filter(inv => inv.status === 'pending').length} facturas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Facturas Este Mes
            </CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              $8,000 total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Próximo Vencimiento
            </CardTitle>
            <FileText className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 Feb</div>
            <p className="text-xs text-muted-foreground">
              INV-2024-001
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>Historial de Facturas</CardTitle>
              <CardDescription>
                Todas tus facturas y su estado actual
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar facturas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Factura</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Servicios</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    {invoice.id}
                  </TableCell>
                  <TableCell>
                    {new Date(invoice.date).toLocaleDateString('es-ES')}
                  </TableCell>
                  <TableCell>
                    {new Date(invoice.dueDate).toLocaleDateString('es-ES')}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{invoice.services}</div>
                      <div className="text-sm text-muted-foreground">
                        {invoice.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${invoice.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(invoice.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
