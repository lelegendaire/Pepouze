"use client"
import { useEffect, useRef } from "react"
import * as maptilersdk from "@maptiler/sdk"
import "@maptiler/sdk/dist/maptiler-sdk.css"

export default function Map() {
  const mapContainer = useRef(null)
  const map = useRef(null)

  const LNG = -1.718
  const LAT = 47.9783

  useEffect(() => {
    if (map.current) return

    maptilersdk.config.apiKey = "OVKTtEmd6oXqJWFoFhnn"

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: "https://api.maptiler.com/maps/light/style.json?key=OVKTtEmd6oXqJWFoFhnn",
      center: [LNG, LAT],
      zoom: 16,
      scrollZoom: false,
      doubleClickZoom: false,
      navigationControl: false, // ← désactive les boutons par défaut
    })
map.current.on("load", () => {
  // ... ton code existant ...

  // Supprime le style de la bulle par défaut
  const style = document.createElement("style")
  style.textContent = `
    .pepouze-popup .maplibregl-popup-content {
      padding: 0 !important;
      border-radius: 16px !important;
      box-shadow: 0 8px 32px rgba(0,0,0,0.12) !important;
      border: none !important;
    }
    .pepouze-popup .maplibregl-popup-tip {
      border-top-color: white !important;
    }
  `
  document.head.appendChild(style)
})
    // ── Marker HTML custom ──
    const markerEl = document.createElement("div")
    markerEl.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        filter: drop-shadow(0 4px 12px rgba(109,17,28,0.4));
      ">
        <!-- Bulle -->
        <div style="
          background: #fff;
          color: white;
          padding: 8px 14px;
          border-radius: 999px;
          font-family: sans-serif;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-items:center;
          
          letter-spacing: 0.03em;
          color: #000;
        ">
          <span style="font-size: 14px;">⭐</span>
          4.7
        </div>
        
        <!-- Point au sol -->
        <div style="
          width: 6px;
          height: 6px;
          background: #6d111c;
          border-radius: 50%;
          opacity: 0.4;
          margin-top: 2px;
        "></div>
      </div>
    `

   new maptilersdk.Marker({ element: markerEl, anchor: "bottom" })
  .setLngLat([LNG, LAT])
  .setPopup(
    new maptilersdk.Popup({
      offset: 25,
      closeButton: false,
      className: "pepouze-popup",
    }).setHTML(`
      <div style="
        font-family: sans-serif;
        padding: 20px;
        border-radius: 16px;
        min-width: 220px;
      ">
        <h3 style="
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 6px;
        ">Pépouze</h3>

        <p style="
          font-size: 13px;
          color: #666;
          line-height: 1.6;
          margin: 0 0 8px;
        ">
          La Crêperie du 12<br/>
          12 Rue du Point du Jour<br/>
          35890 Laillé
        </p>

        <p style="
          font-size: 13px;
          color: #1a1a1a;
          margin: 0 0 14px;
        ">06 16 27 34 22</p>

        
          <a href="https://www.google.com/maps?q=47.9781,-1.7184"
          target="_blank"
          style="
            display: inline-block;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            border: 1.5px solid #1a1a1a;
            color: #1a1a1a;
            padding: 7px 16px;
            border-radius: 50px;
            text-decoration: none;
            transition: all 0.2s;
          "
          onmouseover="this.style.background='#1a1a1a'; this.style.color='white';"
          onmouseout="this.style.background='transparent'; this.style.color='#1a1a1a';"
        >Voir sur la carte</a>
      </div>
    `)
  )
  .addTo(map.current)

   

  }, [])

  // ── Zoom custom ──
  const zoomIn  = () => map.current?.zoomIn({ duration: 300 })
  const zoomOut = () => map.current?.zoomOut({ duration: 300 })

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">

      {/* Carte */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Boutons zoom custom */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
        <button
          onClick={zoomIn}
          className="w-10 h-10 bg-white text-[#6d111c] rounded-xl shadow-lg flex items-center justify-center text-xl font-light hover:bg-[#6d111c] hover:text-white transition-all duration-200 select-none"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          onClick={zoomOut}
          className="w-10 h-10 bg-white text-[#6d111c] rounded-xl shadow-lg flex items-center justify-center text-xl font-light hover:bg-[#6d111c] hover:text-white transition-all duration-200 select-none"
          aria-label="Zoom out"
        >
          −
        </button>
      </div>

    </div>
  )
}