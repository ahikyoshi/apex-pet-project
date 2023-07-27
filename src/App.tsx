import { useState, useEffect, FC } from "react"
import "./index.css"
import { KDcalculator } from "./Components/KDCalculator/KDcalculator"
import { Header } from "./Components/Header/Header"

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

      <Header currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}/>

      <KDcalculator currentLanguage={currentLanguage} />

    </main>
  )
}
