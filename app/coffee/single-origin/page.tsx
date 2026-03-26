"use client"

import Link from "next/link"

export default function SingleOriginPage() {
  const regions = [
    {
      id: "01",
      name: "MONDULKIRI",
      coordinates: "12°27'15.8\"N 107°11'11.7\"E",
      altitude: "800M - 1000M",
      soil: "VOLCANIC RED BASALT",
      profile: "High Density, Balanced Acidity, Nutty Undertones",
      density: "85%",
      moisture: "11.5%"
    },
    {
      id: "02",
      name: "RATANAKIRI",
      coordinates: "13°44'43.2\"N 107°00'34.5\"E",
      altitude: "400M - 600M",
      soil: "FERRUGINOUS LATOSOL",
      profile: "Heavy Body, Dark Chocolate, Low Acidity",
      density: "82%",
      moisture: "12.0%"
    }
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FA] relative overflow-hidden font-sans">
      <div className="absolute top-8 left-8 z-20">
        <Link href="/coffee" className="text-gray-400 text-[10px] font-bold tracking-[0.3em] hover:text-gray-900 transition-colors uppercase">
          ← BACK
        </Link>
      </div>

      <main className="max-w-6xl mx-auto pt-32 pb-24 px-8 md:px-16">
        <header className="mb-24 border-b border-gray-300 pb-12">
          <span className="text-[10px] tracking-[0.5em] text-gray-400 uppercase italic mb-4 block">03 / GEOGRAPHIC ANALYSIS</span>
          <h1 className="text-5xl font-bold text-gray-900 tracking-tighter mb-4 uppercase">Terroir Architecture.</h1>
          <p className="text-gray-500 tracking-widest text-[10px] uppercase font-light">Mapping the sensory coordinates of Cambodia.</p>
        </header>

        <div className="space-y-40">
          {regions.map((region) => (
            <div key={region.id} className="grid grid-cols-1 md:grid-cols-12 gap-16 group">
              <section className="md:col-span-5 space-y-10">
                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-[0.2em] border-l-4 border-gray-900 pl-4">
                  {region.id} / {region.name}
                </h2>
                <div className="space-y-5 font-mono text-[10px] text-gray-500 uppercase leading-loose">
                  <div className="flex justify-between border-b border-gray-200 pb-2"><span>Coordinates</span><span className="text-gray-900 font-bold">{region.coordinates}</span></div>
                  <div className="flex justify-between border-b border-gray-200 pb-2"><span>Elevation</span><span className="text-gray-900 font-bold">{region.altitude}</span></div>
                  <div className="flex justify-between border-b border-gray-200 pb-2"><span>Soil Composition</span><span className="text-gray-900 font-bold">{region.soil}</span></div>
                </div>
              </section>

              <section className="md:col-span-7 bg-white p-12 shadow-sm relative overflow-hidden">
                <h3 className="text-xl font-bold text-gray-900 mb-8 tracking-tight uppercase">Technical Profile</h3>
                <p className="text-gray-600 text-sm leading-loose mb-10 font-light">
                  {region.profile}. High-altitude thermal variance optimizes the <span className="underline font-bold text-gray-900 uppercase">molecular sugar conversion</span>, processed under strict physical constraints.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="border border-gray-100 p-6 bg-[#FCFCFC]">
                    <h4 className="font-bold text-[9px] tracking-[0.2em] text-gray-400 uppercase mb-4 text-center">Density Analysis</h4>
                    <div className="w-full bg-gray-100 h-[2px] relative">
                      <div className="absolute top-0 left-0 bg-gray-900 h-full" style={{ width: region.density }}></div>
                    </div>
                  </div>
                  <div className="border border-gray-100 p-6 bg-[#FCFCFC]">
                    <h4 className="font-bold text-[9px] tracking-[0.2em] text-gray-400 uppercase mb-4 text-center">Moisture Content</h4>
                    <div className="w-full bg-gray-100 h-[2px] relative">
                      <div className="absolute top-0 left-0 bg-gray-900 h-full" style={{ width: region.moisture }}></div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}