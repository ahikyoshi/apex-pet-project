import { useEffect, useState } from "react"
import "./index.css"

function App() {

  const [neededKills, setNeededKills] = useState(0)
  
  const [currentKills, setCurrentKills] = useState(0)
  const [currentDeaths, setCurrentDeaths] = useState(0)
  const [desiredKD, setDesiredKD] = useState(0)

  useEffect(() => {
    let kills = desiredKD * currentDeaths - currentKills;
    kills = Number(kills.toFixed(1))
    setNeededKills(kills)
  },[currentDeaths,currentKills,desiredKD])

  return (
    <main className="bg-slate-100 flex flex-col items-center font-thin h-screen">

      <div className="my-4 text-4xl font-bold">K/D calculator</div>

      <div className="w-full px-2 font-bold mt-10">

        <div className="flex justify-between">
          Desired K/D
          <input 
            type="number" 
            className=""
            value={desiredKD}
            onChange={(e) => setDesiredKD(Number(e.target.value))}
            onClick={() => setDesiredKD(0)}
          />
        </div>
        
        <div className="my-2 flex justify-between">
          Current kills
          <input 
            type="number" 
            className=""
            value={currentKills}
            onChange={(e) => setCurrentKills(Number(e.target.value))}
            onClick={() => setCurrentKills(0)}
          />
        </div>
        
        <div className="flex justify-between">
          Current deaths
          <input 
            type="number" 
            className=""
            value={currentDeaths}
            onChange={(e) => setCurrentDeaths(Number(e.target.value))}
            onClick={() => setCurrentDeaths(0)}
          />
        </div>

      </div>

      <div className="font-bold mt-20 w-36 h-36 border-2 border-rose-500 rounded-full flex items-center justify-center flex-col">
        Needed kills: 
        <div className="">{neededKills}</div>
      </div>

      <div className="mt-10">
        <button 
          className="bg-indigo-500 py-2 w-20 mr-4 text-slate-100 font-bold"
          onClick={() => setCurrentKills((prev) => {return prev + 1})}
        >
          +1 kill
        </button>
        <button 
          className="bg-rose-500 py-2 w-20 text-slate-100 font-bold"
          onClick={() => setCurrentDeaths((prev) => {return prev + 1})}
        >
          +1 death
        </button>
      </div>
    </main>
  )
}

export default App
