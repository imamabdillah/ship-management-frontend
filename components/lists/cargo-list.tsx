import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockCargo = [
  { id: 1, type: 'Electronics', weight: 5000, destination: 'New York' },
  { id: 2, type: 'Textiles', weight: 3000, destination: 'London' },
  { id: 3, type: 'Machinery', weight: 8000, destination: 'Shanghai' },
]

export function CargoList({ shipId }: { shipId: string }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cargo Type</TableHead>
          <TableHead>Weight (kg)</TableHead>
          <TableHead>Destination</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockCargo.map((cargo) => (
          <TableRow key={cargo.id}>
            <TableCell>{cargo.type}</TableCell>
            <TableCell>{cargo.weight}</TableCell>
            <TableCell>{cargo.destination}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

