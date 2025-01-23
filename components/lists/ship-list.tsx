"use client";

import { useEffect, useState } from "react";
import { Ship } from "@/types/ship";
import { getShips } from "@/services/api";
import { deleteShip } from "@/services/api";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, Trash2, Anchor } from "lucide-react";
import Link from "next/link";

export function ShipList() {
  const [ships, setShips] = useState<Ship[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Ship["status"] | "All">(
    "All"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShipsData = async () => {
      console.log("Fetching ships..."); // Log untuk melacak pemanggilan
      try {
        setIsLoading(true);
        const data = await getShips();
        console.log("Data fetched:", data); // Log untuk memeriksa data yang diterima
        setShips(data); // Pastikan data hanya di-*set* sekali
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch ships. Please try again.");
        setIsLoading(false);
      }
    };
    fetchShipsData();
  }, []); // Dependency array kosong untuk memastikan hanya dipanggil sekali

  // Filter data berdasarkan status dan kata kunci pencarian
  const filteredShips = ships.filter(
    (ship) =>
      ship.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "All" || ship.status === statusFilter)
  );

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this ship?")) {
      try {
        await deleteShip(id);
        setShips((prevShips) => prevShips.filter((ship) => ship.id !== id));
        alert("Ship deleted successfully.");
      } catch (error) {
        console.error("Failed to delete ship:", error);
        alert("Failed to delete ship. Please try again.");
      }
    }
  };

  if (isLoading) return <div>Loading ships...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search ships..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64"
        />
        <Select
          onValueChange={(value) =>
            setStatusFilter(value as Ship["status"] | "All")
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
            <SelectItem value="Docked">Docked</SelectItem>
            <SelectItem value="In Transit">In Transit</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Ship Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Port of Origin</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShips.map((ship) => (
              <TableRow key={ship.id}>
                <TableCell className="font-medium">{ship.name}</TableCell>
                <TableCell>{ship.type}</TableCell>
                <TableCell>{ship.capacity.toLocaleString()}</TableCell>
                <TableCell>{ship.portOfOrigin}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      ship.status === "Available"
                        ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                        : ship.status === "Maintenance"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                        : ship.status === "Docked"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                        : "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100"
                    }`}
                  >
                    {ship.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <TooltipProvider>
                    <div className="flex justify-end space-x-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit ship details</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(ship.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete ship</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={`/ships/${ship.id}`}>
                            <Button variant="ghost" size="icon">
                              <Anchor className="h-4 w-4" />
                              <span className="sr-only">View Details</span>
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View ship details</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
