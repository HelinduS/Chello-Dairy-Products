"use client"

import { useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface MapCardProps {
  isOpen: boolean
  onClose: () => void
  deliveryDay: "Wednesday" | "Sunday"
  username: string
}

export function MapCard({ isOpen, onClose, deliveryDay, username }: MapCardProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [coordinates, setCoordinates] = useState<[number, number]>([79.9842, 6.9308])
  const [address, setAddress] = useState("")

  useEffect(() => {
    if (!isOpen || !mapContainer.current) {
      console.log("Map not initialized: isOpen or mapContainer missing")
      return
    }

    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://tiles.openfreemap.org/styles/liberty",
        center: coordinates,
        zoom: 12,
      })

      const marker = new maplibregl.Marker({ color: "#FF0000", draggable: true })
          .setLngLat(coordinates)
          .addTo(map.current)

      marker.on("dragend", () => {
        const lngLat = marker.getLngLat()
        setCoordinates([lngLat.lng, lngLat.lat])
        fetchAddress(lngLat.lng, lngLat.lat)
      })

      map.current.on("click", (e) => {
        const { lng, lat } = e.lngLat
        marker.setLngLat([lng, lat])
        setCoordinates([lng, lat])
        fetchAddress(lng, lat)
      })

      map.current.addControl(new maplibregl.NavigationControl(), "top-right")

      map.current.on("error", (e) => {
        console.error("MapLibre error details:", e)
        setError(`Failed to load the map: ${e.error || "Unknown error"}`)
      })

      map.current.on("tileerror", (e) => {
        console.error("Tile load error:", e)
        setError("Failed to load map tiles. Please try again later.")
      })

      map.current.on("style.load", () => {
        console.log("Style loaded successfully")
      })
      map.current.on("style.error", (e) => {
        console.error("Style load error:", e)
        setError("Failed to load map style. Please try again later.")
      })
    } catch (err) {
      console.error("Map initialization failed:", err)
      setError(`Map initialization failed: ${err instanceof Error ? err.message : "Unknown error"}`)
    }

    return () => {
      if (map.current) {
        console.log("Cleaning up map")
        map.current.remove()
        map.current = null
      }
    }
  }, [isOpen, coordinates])

  const fetchAddress = async (lng: number, lat: number) => {
    try {
      const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      )
      const data = await response.json()
      setAddress(data.display_name || `${lat},${lng}`)
    } catch (err) {
      console.error("Geocoding failed:", err)
      setAddress(`${lat},${lng}`)
    }
  }

  const handleSave = async () => {
    if (!address) {
      setError("Please select a location")
      return
    }
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:8080/api/customer/deliveries", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          method: "delivery",
          address: address,
          availability: "8am-10am",
          deliveryDay: deliveryDay,
        }),
      })

      if (response.ok) {
        alert("Delivery address updated successfully")
        onClose()
      } else {
        const data = await response.json()
        setError(data.message || "Failed to update delivery address")
      }
    } catch (err) {
      console.error("Update failed:", err)
      setError("Failed to update delivery address")
    }
  }

  if (!isOpen) return null

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <Card className="relative w-full max-w-4xl h-[80vh] bg-white rounded-lg shadow-xl">
          <Button
              variant="ghost"
              className="absolute top-4 right-4 p-2 hover:bg-gray-100"
              onClick={onClose}
              aria-label="Close map"
          >
            <X className="w-6 h-6 text-gray-600" />
          </Button>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">
              Update Delivery Location - {deliveryDay}
            </h2>
            {error ? (
                <div className="w-full h-[calc(80vh-100px)] flex items-center justify-center text-red-600 text-center">
                  {error}
                </div>
            ) : (
                <>
                  <div
                      ref={mapContainer}
                      className="w-full h-[calc(80vh-150px)] min-h-[400px] rounded-md border border-gray-200 bg-gray-100"
                  />
                  <div className="mt-4 flex gap-4">
                    <Input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter address or click/drag on map"
                    />
                    <Button onClick={handleSave}>Save Location</Button>
                  </div>
                </>
            )}
          </div>
        </Card>
      </div>
  )
}