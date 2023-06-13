import React from 'react'
import "leaflet/dist/leaflet.css"
import  { MapContainer, TileLayer } from "react-leaflet"
export const MapCreate = () => {
  return (
    <MapContainer center={[49.8566, 2.3522]} zoom={13}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

    </MapContainer>
  )
}
