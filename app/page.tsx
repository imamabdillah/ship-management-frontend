import { ShipList } from '@/components/lists/ship-list'
import { AddShipForm } from '@/components/forms/add-ship-form'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { TooltipProvider } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <TooltipProvider>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold sm:text-3xl">Ship Management Dashboard</CardTitle>
              <CardDescription>Manage your fleet and operations</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="list" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2 sm:w-auto">
                  <TabsTrigger value="list">Ship List</TabsTrigger>
                  <TabsTrigger value="add">Add New Ship</TabsTrigger>
                </TabsList>
                <TabsContent value="list" className="space-y-4">
                  <ShipList />
                </TabsContent>
                <TabsContent value="add">
                  <div className="max-w-2xl mx-auto">
                    <h2 className="text-xl font-semibold mb-4 sm:text-2xl">Add New Ship</h2>
                    <AddShipForm />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </TooltipProvider>
    </DashboardLayout>
  )
}

