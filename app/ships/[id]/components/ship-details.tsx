"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CrewMemberList } from "@/components/lists/crew-member-list";
import { CargoList } from "@/components/lists/cargo-list";
import { VoyageLog } from "@/components/lists/voyage-log";
import { FuelLog } from "@/components/lists/fuel-log";
import { MaintenanceLog } from "@/components/lists/maintenance-log";
import { AddCrewMemberForm } from "@/components/forms/add-crew-member-form";
import { AddCargoForm } from "@/components/forms/add-cargo-form";
import { AddVoyageLogForm } from "@/components/forms/add-voyage-log-form";
import { AddFuelLogForm } from "@/components/forms/add-fuel-log-form";
import { AddMaintenanceLogForm } from "@/components/forms/add-maintenance-log-form";

// Mock data - in a real application, this would come from an API
const mockShipData = {
  id: "1",
  name: "Seastar",
  type: "Cargo",
  capacity: 50000,
  portOfOrigin: "Singapore",
  status: "Active",
};

export function ShipDetails({ id }: { id: string }) {
  const [ship, setShip] = useState(mockShipData);
  const [showCrewForm, setShowCrewForm] = useState(false);
  const [showCargoForm, setShowCargoForm] = useState(false);
  const [showVoyageForm, setShowVoyageForm] = useState(false);
  const [showFuelForm, setShowFuelForm] = useState(false);
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);

  useEffect(() => {
    // In a real application, fetch ship data here
    console.log(`Fetching data for ship ${id}`);
  }, [id]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{ship.name}</CardTitle>
          <CardDescription>Ship Details</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium">Type</dt>
              <dd className="mt-1 text-sm ">{ship.type}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium">Capacity</dt>
              <dd className="mt-1 text-sm ">{ship.capacity}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium">Port of Origin</dt>
              <dd className="mt-1 text-sm">{ship.portOfOrigin}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium">Status</dt>
              <dd className="mt-1 text-sm">{ship.status}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Tabs defaultValue="crew">
        <TabsList>
          <TabsTrigger value="crew">Crew</TabsTrigger>
          <TabsTrigger value="cargo">Cargo</TabsTrigger>
          <TabsTrigger value="voyage">Voyage Log</TabsTrigger>
          <TabsTrigger value="fuel">Fuel Log</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance Log</TabsTrigger>
        </TabsList>
        <TabsContent value="crew">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Crew Members</CardTitle>
              </CardHeader>
              <CardContent>
                <CrewMemberList shipId={id} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Add Crew Member</CardTitle>
                <Button onClick={() => setShowCrewForm(!showCrewForm)}>
                  {showCrewForm ? "Hide Form" : "Show Form"}
                </Button>
              </CardHeader>
              <CardContent>
                {showCrewForm && <AddCrewMemberForm shipId={id} />}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="cargo">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cargo</CardTitle>
              </CardHeader>
              <CardContent>
                <CargoList shipId={id} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Add Cargo</CardTitle>
                <Button onClick={() => setShowCargoForm(!showCargoForm)}>
                  {showCargoForm ? "Hide Form" : "Show Form"}
                </Button>
              </CardHeader>
              <CardContent>
                {showCargoForm && <AddCargoForm shipId={id} />}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="voyage">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Voyage Log</CardTitle>
              </CardHeader>
              <CardContent>
                <VoyageLog shipId={id} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Add Voyage Log</CardTitle>
                <Button onClick={() => setShowVoyageForm(!showVoyageForm)}>
                  {showVoyageForm ? "Hide Form" : "Show Form"}
                </Button>
              </CardHeader>
              <CardContent>
                {showVoyageForm && <AddVoyageLogForm shipId={id} />}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="fuel">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fuel Log</CardTitle>
              </CardHeader>
              <CardContent>
                <FuelLog shipId={id} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Add Fuel Log</CardTitle>
                <Button onClick={() => setShowFuelForm(!showFuelForm)}>
                  {showFuelForm ? "Hide Form" : "Show Form"}
                </Button>
              </CardHeader>
              <CardContent>
                {showFuelForm && <AddFuelLogForm shipId={id} />}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="maintenance">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Log</CardTitle>
              </CardHeader>
              <CardContent>
                <MaintenanceLog shipId={id} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Add Maintenance Log</CardTitle>
                <Button
                  onClick={() => setShowMaintenanceForm(!showMaintenanceForm)}
                >
                  {showMaintenanceForm ? "Hide Form" : "Show Form"}
                </Button>
              </CardHeader>
              <CardContent>
                {showMaintenanceForm && <AddMaintenanceLogForm shipId={id} />}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
