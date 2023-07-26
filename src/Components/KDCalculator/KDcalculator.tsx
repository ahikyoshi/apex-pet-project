import { FC, useState, useEffect } from "react";

import * as languageData from "./language.json"

import { getNeededKills } from "./utils";

import { ILocalData, IKDcalculatorProps } from "./types";




export const KDcalculator: FC<IKDcalculatorProps> = ({currentLanguage}) => {

    const [lang, setLang] = useState(languageData.ru)

    const [currentKills, setCurrentKills] = useState<string>("")
    const [currentDeaths, setCurrentDeaths] = useState<string>("")
    const [desiredKD, setDesiredKD] = useState<string>("")

    const [neededKills, setNeededKills] = useState(0)

    useEffect(() => {

        if (currentKills != "" || currentDeaths != "" || desiredKD != "") {
            
            let KDdata = {
                currentKills: currentKills,
                currentDeaths: currentDeaths,
                desiredKD: desiredKD
            }

            setNeededKills(getNeededKills(KDdata))
            
            localStorage.setItem("KDdata", JSON.stringify(KDdata))
        }

    }, [currentDeaths, currentKills, desiredKD])

    useEffect(() => {

        document.title = "KD calculator"

        if(currentLanguage === "ru"){
            setLang(languageData.ru)
        }else{
            setLang(languageData.eng)
        }
        
        let KDdata: string | null = localStorage.getItem("KDdata");

        if(typeof KDdata === "string"){
            let data: ILocalData  = JSON.parse(KDdata)
            
            if(data){
                setCurrentDeaths(data.currentKills)
                setCurrentKills(data.currentKills)
                setDesiredKD(data.desiredKD)
            }
            
        }
    }, [currentLanguage])


    return (
        <div className="w-screen h-full flex flex-col items-center">
            <div className="my-4 text-4xl font-bold">{lang.title}</div>

            <div className="w-full px-2 font-bold mt-10">

                <div className="flex justify-between">
                    {lang.currentKills}
                    <input
                        type="number"
                        className="bg-slate-900 border-b-2 border-white text-center"
                        value={currentKills}
                        onChange={(e) => setCurrentKills(e.target.value)}
                        onClick={() => setCurrentKills("")}
                    />
                </div>

                <div className="my-2 flex justify-between">
                    {lang.currentDeaths}
                    <input
                        type="number"
                        className="bg-slate-900 border-b-2 border-white text-center"
                        value={currentDeaths}
                        onChange={(e) => setCurrentDeaths(e.target.value)}
                        onClick={() => setCurrentDeaths("")}
                    />
                </div>

                <div className="flex justify-between">
                    {lang.desiredKD}
                    <input
                        type="number"
                        className="bg-slate-900 border-b-2 border-white text-center"
                        value={desiredKD}
                        onChange={(e) => setDesiredKD(e.target.value)}
                        onClick={() => setDesiredKD("")}
                    />
                </div>

            </div>

            <div className="font-bold text-sm mt-20 w-44 h-44 border-4 border-violet-900 rounded-full flex items-center justify-center flex-col">
                {lang.nedeedKills}:
                <div className="text-4xl">{neededKills.toFixed(1)}</div>
            </div>

            <div className="mt-10">

                <button
                    className="bg-indigo-500 py-5 w-32 mr-4 text-slate-100 font-bold rounded-sm"
                    onClick={() => setCurrentKills((prev) => { return prev + 1 })}
                >
                    +1 {lang.kill}
                </button>

                <button
                    className="bg-rose-500 py-5 w-32 text-slate-100 font-bold rounded-sm"
                    onClick={() => setCurrentDeaths((prev) => { return prev + 1 })}
                >
                    +1 {lang.death}
                </button>
                
            </div>
        </div>
    )
}