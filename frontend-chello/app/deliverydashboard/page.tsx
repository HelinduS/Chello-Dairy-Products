'use client';

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type Delivery = {
  id: string;
  customer: string;
  region: string;
  status: "Unassigned" | "Assigned";
  assignedDriver?: string;
};

type Driver = {
  id: string;
  name: string;
  status: "Available" | "Busy";
};

const mockDeliveries: Delivery[] = [
  { id: "d1", customer: "Barry Allen", region: "North", status: "Unassigned" },
  { id: "d2", customer: "Iris West", region: "South", status: "Assigned", assignedDriver: "John Diggle" },
  { id: "d3", customer: "Cisco Ramon", region: "East", status: "Unassigned" },
];

const mockDrivers: Driver[] = [
  { id: "1", name: "John Diggle", status: "Available" },
  { id: "2", name: "Oliver Queen", status: "Busy" },
  { id: "3", name: "Demian Dark", status: "Available" },
];

export default function DeliveryDashboard() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    setDeliveries(mockDeliveries);
    setDrivers(mockDrivers);
  }, []);

  const handleAssign = (deliveryId: string, driverId: string) => {
    const driver = drivers.find((d) => d.id === driverId);
    setDeliveries((prev) =>
      prev.map((del) =>
        del.id === deliveryId
          ? {
              ...del,
              status: "Assigned",
              assignedDriver: driver?.name,
            }
          : del
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Delivery Dashboard</h1>

      {deliveries.map((delivery) => (
        <Card key={delivery.id}>
          <CardContent className="flex justify-between items-center p-4">
            <div>
              <h2 className="text-lg font-semibold">Customer: {delivery.customer}</h2>
              <p className="text-sm text-gray-500">Region: {delivery.region}</p>
              <p className="text-sm">
                Status:{" "}
                <Badge
                  variant={
                    delivery.status === "Unassigned"
                      ? "secondary"
                      : "default"
                  }
                >
                  {delivery.status}
                </Badge>
              </p>
              {delivery.assignedDriver && (
                <p className="text-sm mt-1 text-green-700">
                  Assigned to: {delivery.assignedDriver}
                </p>
              )}
            </div>

            {delivery.status === "Unassigned" && (
              <Select onValueChange={(driverId) => handleAssign(delivery.id, driverId)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Assign to driver" />
                </SelectTrigger>
                <SelectContent>
                  {drivers
                    .filter((d) => d.status === "Available")
                    .map((driver) => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
