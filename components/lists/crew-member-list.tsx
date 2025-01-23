import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockCrewMembers = [
  { id: 1, name: 'John Doe', position: 'Captain', joinDate: '2022-01-01' },
  { id: 2, name: 'Jane Smith', position: 'First Mate', joinDate: '2022-02-15' },
  { id: 3, name: 'Mike Johnson', position: 'Engineer', joinDate: '2022-03-10' },
]

export function CrewMemberList({ shipId }: { shipId: string }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Join Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockCrewMembers.map((member) => (
          <TableRow key={member.id}>
            <TableCell>{member.name}</TableCell>
            <TableCell>{member.position}</TableCell>
            <TableCell>{member.joinDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

