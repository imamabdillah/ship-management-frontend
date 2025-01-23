import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockMaintenanceLogs = [
  {
    id: 1,
    date: "2023-04-15",
    type: "Engine Overhaul",
    description: "Routine maintenance of main engine",
    cost: 50000,
  },
  {
    id: 2,
    date: "2023-05-01",
    type: "Hull Inspection",
    description: "Annual hull inspection and cleaning",
    cost: 15000,
  },
  {
    id: 3,
    date: "2023-05-20",
    type: "Navigation System Update",
    description: "Software update for navigation systems",
    cost: 5000,
  },
];

export function MaintenanceLog({ shipId }: { shipId: string }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Cost ($)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockMaintenanceLogs.map((log) => (
          <TableRow key={log.id}>
            <TableCell>{log.date}</TableCell>
            <TableCell>{log.type}</TableCell>
            <TableCell>{log.description}</TableCell>
            <TableCell>{log.cost}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
