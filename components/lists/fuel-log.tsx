import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockFuelLogs = [
  { id: 1, date: '2023-05-01', fuelType: 'Diesel', amount: 50000, cost: 75000 },
  { id: 2, date: '2023-05-15', fuelType: 'Diesel', amount: 45000, cost: 67500 },
  { id: 3, date: '2023-05-30', fuelType: 'Diesel', amount: 55000, cost: 82500 },
]

export function FuelLog({ shipId }: { shipId: string }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Fuel Type</TableHead>
          <TableHead>Amount (L)</TableHead>
          <TableHead>Cost ($)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockFuelLogs.map((log) => (
          <TableRow key={log.id}>
            <TableCell>{log.date}</TableCell>
            <TableCell>{log.fuelType}</TableCell>
            <TableCell>{log.amount}</TableCell>
            <TableCell>{log.cost}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

