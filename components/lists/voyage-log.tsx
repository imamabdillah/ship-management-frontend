import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockVoyages = [
  { id: 1, departure: 'Singapore', arrival: 'Hong Kong', departureDate: '2023-05-01', arrivalDate: '2023-05-05' },
  { id: 2, departure: 'Hong Kong', arrival: 'Tokyo', departureDate: '2023-05-07', arrivalDate: '2023-05-12' },
  { id: 3, departure: 'Tokyo', arrival: 'San Francisco', departureDate: '2023-05-15', arrivalDate: '2023-05-30' },
]

export function VoyageLog({ shipId }: { shipId: string }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Departure</TableHead>
          <TableHead>Arrival</TableHead>
          <TableHead>Departure Date</TableHead>
          <TableHead>Arrival Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockVoyages.map((voyage) => (
          <TableRow key={voyage.id}>
            <TableCell>{voyage.departure}</TableCell>
            <TableCell>{voyage.arrival}</TableCell>
            <TableCell>{voyage.departureDate}</TableCell>
            <TableCell>{voyage.arrivalDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

