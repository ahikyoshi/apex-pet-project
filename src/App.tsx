import { useEffect, useState } from "react"
import "./index.css"

function App() {

  const [neededKills, setNeededKills] = useState(0)
  
  const [currentKills, setCurrentKills] = useState<string | number>(0)
  const [currentDeaths, setCurrentDeaths] = useState<string | number>(0)
  const [desiredKD, setDesiredKD] = useState<string | number>(0)

  useEffect(() => {
    let kills: number = Number(desiredKD) * Number(currentDeaths) - Number(currentKills);
    kills = Number(kills.toFixed(1))
    setNeededKills(kills)
  },[currentDeaths,currentKills,desiredKD])

  return (
    <main className="bg-slate-100 text-slate-100  flex flex-col items-center font-mono h-screen bg-cover" style={{backgroundImage: "url(https://apexlegendsstatus.com/assets/layout/bg-body.jpg)"}}>

      <div className="my-4 text-4xl font-bold">K/D calculator</div>

      <div className="w-full px-2 font-bold mt-10">

        <div className="flex justify-between">
          Desired K/D
          <input 
            type="number" 
            className="bg-slate-900 border-b-2 border-white text-center"
            value={desiredKD}
            onChange={(e) => setDesiredKD(Number(e.target.value))}
            onClick={() => setDesiredKD("")}
          />
        </div>
        
        <div className="my-2 flex justify-between">
          Current kills
          <input 
            type="number" 
            className="bg-slate-900 border-b-2 border-white text-center"
            value={currentKills}
            onChange={(e) => setCurrentKills(Number(e.target.value))}
            onClick={() => setCurrentKills("")}
          />
        </div>
        
        <div className="flex justify-between">
          Current deaths
          <input 
            type="number"
            className="bg-slate-900 border-b-2 border-white text-center"
            value={currentDeaths}
            onChange={(e) => setCurrentDeaths(Number(e.target.value))}
            onClick={() => setCurrentDeaths("")}
          />
        </div>

      </div>

      <div className="font-bold text-sm mt-20 w-36 h-36 border-4 border-violet-900 rounded-full flex items-center justify-center flex-col">
        Needed kills: 
        <div className="text-4xl">{neededKills}</div>
      </div>

      <div className="mt-10">
        <button 
          className="bg-indigo-500 py-5 w-32 mr-4 text-slate-100 font-bold rounded-sm"
          onClick={() => setCurrentKills((prev) => {return Number(prev) + 1})}
        >
          +1 kill
        </button>
        <button 
          className="bg-rose-500 py-5 w-32 text-slate-100 font-bold rounded-sm"
          onClick={() => setCurrentDeaths((prev) => {return Number(prev) + 1})}
        >
          +1 death
        </button>
      </div>
    </main>
  )
}

export default App
