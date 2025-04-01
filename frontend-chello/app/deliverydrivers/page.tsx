'use client';


import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type Driver = {
  id: string;
  name: string;
  status: "Available" | "Busy" | "Offline";
  region: string;
  rating: number;
  completedDeliveries: number;
};

const mockDrivers: Driver[] = [
  { id: "1", name: "John Diggle", status: "Available", region: "North", rating: 4.5, completedDeliveries: 120 },
  { id: "2", name: "Oliver Queen", status: "Busy", region: "East", rating: 4.8, completedDeliveries: 200 },
  { id: "3", name: "Demian Dark", status: "Available", region: "South", rating: 4.3, completedDeliveries: 95 },
];

export default function DeliveryDriversDashboard() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("");

  useEffect(() => {
    // Normally fetch data here
    setDrivers(mockDrivers);
  }, []);

  const filteredDrivers = filterStatus
    ? drivers.filter((driver) => driver.status === filterStatus)
    : drivers;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Delivery Drivers</h1>

      <div className="flex items-center gap-4">
        <Input placeholder="Search drivers..." />
        <Select onValueChange={(value) => setFilterStatus(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="Busy">Busy</SelectItem>
            <SelectItem value="Offline">Offline</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredDrivers.map((driver) => (
          <Card key={driver.id}>
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <h2 className="text-lg font-semibold">{driver.name}</h2>
                <p className="text-sm text-gray-500">Region: {driver.region}</p>
                <p className="text-sm">Deliveries: {driver.completedDeliveries}</p>
                <p className="text-sm">Rating: ⭐ {driver.rating}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge
                  variant={
                    driver.status === "Available"
                      ? "default"
                      : driver.status === "Busy"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {driver.status}
                </Badge>
                <Button size="sm" disabled={driver.status !== "Available"}>
                  Assign Delivery
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
