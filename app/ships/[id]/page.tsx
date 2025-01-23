import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { ShipDetails } from './components/ship-details'

export default function ShipDetailsPage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <ShipDetails id={params.id} />
    </DashboardLayout>
  )
}

