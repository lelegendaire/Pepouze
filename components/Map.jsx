"use client"
import Image from "next/image";
import { Map, MapControls,MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip, } from "@/components/ui/map";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
export default function Map_create() {
 
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
<Card className="h-full p-0 overflow-hidden">
      <Map center={[-1.718,47.9783]} zoom={18}>
        <MapControls />
        <MapMarker
            longitude={-1.718}
            latitude={47.9783}
          >
            <MarkerContent>
              <div className="size-4 rounded-full bg-primary border-2 border-white shadow-lg" />
            </MarkerContent>
            <MarkerTooltip className={"flex items-center gap-1 bg-white text-black rounded-2xl p-2"}><Star size={12} fill="black" color="black"/>4.3</MarkerTooltip>
            <MarkerPopup className={"border-0"}>
              <div className="space-y-1 flex">
               
                <div>
                <p className="font-medium text-foreground">Pépouze La Crêperie du 12</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 ">
                  <Star size={12} fill="black" color="black"/>4.3 - Crêperie
                </p>
                </div>
              </div>
            </MarkerPopup>
          </MapMarker>
      </Map>
    </Card>

    </div>
  )
}