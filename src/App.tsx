import { useState, useEffect, FC } from "react"
import "./index.css"
import { KDcalculator } from "./Components/KDCalculator/KDcalculator"

export const App:FC = () => {

  const [currentLanguage, setCurrentLanguage] = useState<string>("eng")

  useEffect(() => {
    let language = localStorage.getItem("Language");
    if(language != null){
      setCurrentLanguage(language)
    }
  },[])

  useEffect(() => {

    localStorage.setItem("Language", currentLanguage)

  },[currentLanguage])

  return (
    <main className="bg-slate-100 text-slate-100  flex flex-col items-center font-mono h-screen bg-cover" style={{ backgroundImage: "url(https://apexlegendsstatus.com/assets/layout/bg-body.jpg)" }}>
      <div className="py-2">

        <button
          className={currentLanguage === "ru" ? "bg-rose-800 w-10 rounded-sm mr-5" : "bg-rose-800/25 w-10 rounded-sm mr-5"}
          onClick={() => setCurrentLanguage("ru")}>
          Ru
        </button>

        <button
          className={currentLanguage === "eng" ? "bg-rose-800 w-10 rounded-sm mr-5" : "bg-rose-800/25 w-10 rounded-sm mr-5"}
          onClick={() => setCurrentLanguage("eng")}>
          Eng
        </button>

      </div>

      <KDcalculator currentLanguage={currentLanguage} />

    </main>
  )
}
