"use client"

import { useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css" // Import MapLibre CSS
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface MapCardProps {
  isOpen: boolean
  onClose: () => void
  deliveryDay: "Wednesday" | "Sunday"
}

export function MapCard({ isOpen, onClose, deliveryDay }: MapCardProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen || !mapContainer.current) {
      console.log("Map not initialized: isOpen or mapContainer missing")
      return
    }

    try {
      console.log("Initializing MapLibre with container:", mapContainer.current)
      // Initialize MapLibre GL JS with OpenFreeMap Liberty style
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://tiles.openfreemap.org/styles/liberty", // Correct OpenFreeMap style
        center: [79.9842, 6.9308], // Hardcoded: Kaduwela, Sri Lanka
        zoom: 12,
      })

      // Log when map is loaded
      map.current.on("load", () => {
        console.log("Map loaded successfully")
        // Add marker for delivery vehicle after map loads
        new maplibregl.Marker({ color: "#FF0000" }) // Red marker for vehicle
          .setLngLat([79.9842, 6.9308]) // Hardcoded: Kaduwela, Sri Lanka
          .addTo(map.current!)
      })

      // Add navigation controls (zoom/pan)
      map.current.addControl(new maplibregl.NavigationControl(), "top-right")

      // Handle map errors
      map.current.on("error", (e) => {
        console.error("MapLibre error details:", e)
        setError(`Failed to load the map: ${e.error || "Unknown error"}`)
      })

      // Handle tile load errors
      map.current.on("tileerror", (e) => {
        console.error("Tile load error:", e)
        setError("Failed to load map tiles. Please try again later.")
      })

      // Handle style load errors
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

    // Cleanup on unmount
    return () => {
      if (map.current) {
        console.log("Cleaning up map")
        map.current.remove()
        map.current = null
      }
    }
  }, [isOpen])

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
            Track Delivery Vehicle - {deliveryDay}
          </h2>
          {error ? (
            <div className="w-full h-[calc(80vh-100px)] flex items-center justify-center text-red-600 text-center">
              {error}
            </div>
          ) : (
            <div
              ref={mapContainer}
              className="w-full h-[calc(80vh-100px)] min-h-[400px] rounded-md border border-gray-200 bg-gray-100"
            />
          )}
        </div>
      </Card>
    </div>
  )
}