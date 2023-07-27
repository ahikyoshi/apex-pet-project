import { FC, useState, useEffect } from "react";

import * as languageData from "./language.json"

import { getNeededKills } from "./utils";

import { ILocalData, IKDcalculatorProps } from "./types";

export const KDcalculator: FC<IKDcalculatorProps> = ({ currentLanguage }) => {

    const [selectedLanguage, setSelectedLanguage] = useState(languageData.ru)
    const [isSeasonKD, setIsSeasonKD] = useState(false)

    const [currentSeasonKills, setCurrentSeasonKills] = useState<string>("")
    const [currentSeasonDeaths, setCurrentSeasonDeaths] = useState<string>("")
    const [desiredSeasonKD, setSeasonDesiredKD] = useState<string>("")
    const [currentAllKills, setCurrentAllKills] = useState<string>("")
    const [currentAllDeaths, setCurrentAllDeaths] = useState<string>("")
    const [desiredAllKD, setAllDesiredKD] = useState<string>("")

    const [neededKills, setNeededKills] = useState(0)

    useEffect(() => {

        if (currentSeasonKills != "" || currentSeasonDeaths != "" || desiredSeasonKD != "") {

            if (isSeasonKD === true) {
                let KDSeasondata = {
                    currentKills: currentSeasonKills,
                    currentDeaths: currentSeasonDeaths,
                    desiredKD: desiredSeasonKD
                }

                setNeededKills(getNeededKills(KDSeasondata))

                localStorage.setItem("KDSeasondata", JSON.stringify(KDSeasondata))

            }
        }


    }, [currentSeasonDeaths, currentSeasonKills, desiredSeasonKD, isSeasonKD])

    useEffect(() => {

        if (currentAllDeaths != "" || currentAllKills != "" || desiredAllKD != "") {

            if (isSeasonKD === false) {

                let KDAlldata = {
                    currentKills: currentAllKills,
                    currentDeaths: currentAllDeaths,
                    desiredKD: desiredAllKD
                }

                setNeededKills(getNeededKills(KDAlldata))

                localStorage.setItem("KDAlldata", JSON.stringify(KDAlldata))

            }

        }


    }, [currentAllDeaths, currentAllKills, desiredAllKD, isSeasonKD])

    useEffect(() => {

        document.title = "KD calculator"

        if (currentLanguage === "ru") {
            setSelectedLanguage(languageData.ru)
        } else {
            setSelectedLanguage(languageData.eng)
        }

        let KDSeasondata: string | null = localStorage.getItem("KDSeasondata");

        if (typeof KDSeasondata === "string") {
            let data: ILocalData = JSON.parse(KDSeasondata)

            if (data) {
                setCurrentSeasonKills(data.currentKills)
                setCurrentSeasonDeaths(data.currentDeaths)
                setSeasonDesiredKD(data.desiredKD)
            }

        }

        let KDAlldata: string | null = localStorage.getItem("KDAlldata");

        if (typeof KDAlldata === "string") {
            let data: ILocalData = JSON.parse(KDAlldata)

            if (data) {
                setCurrentAllKills(data.currentKills)
                setCurrentAllDeaths(data.currentDeaths)
                setAllDesiredKD(data.desiredKD)
            }

        }


    }, [currentLanguage])


    return (
        <div className="w-screen h-full flex flex-col items-center">

            <div className="my-4 text-4xl font-bold">{selectedLanguage.title}</div>

            <div className="bg-indigo-500 w-11/12 h-8 rounded-sm flex font-bold text-slate-300">
                <button
                    className={isSeasonKD != false ? "w-1/2" : "bg-indigo-800 w-1/2 shadow-inner text-slate-50"}
                    onClick={() => setIsSeasonKD(false)}
                >
                    {selectedLanguage.all}
                </button>
                <button
                    className={isSeasonKD != true ? "w-1/2" : "bg-indigo-800 w-1/2 shadow-inner text-slate-50"}
                    onClick={() => setIsSeasonKD(true)}
                >
                    {selectedLanguage.season}
                </button>
            </div>

            <div className="w-11/12 font-bold mt-5">

                <div className="flex justify-between">
                    {selectedLanguage.currentKills}
                    <input
                        type="number"
                        className="bg-slate-900 border-b-2 border-white text-center"
                        value={isSeasonKD === true ? currentSeasonKills : currentAllKills}
                        onChange={isSeasonKD === true ? (e) => { setCurrentSeasonKills(e.target.value) } : (e) => { setCurrentAllKills(e.target.value) }}
                        onClick={isSeasonKD === true ? () => { setCurrentSeasonKills("") } : () => { setCurrentAllKills("") }}
                    />
                </div>

                <div className="my-2 flex justify-between">
                    {selectedLanguage.currentDeaths}
                    <input
                        type="number"
                        className="bg-slate-900 border-b-2 border-white text-center"
                        value={isSeasonKD === true ? currentSeasonDeaths : currentAllDeaths}
                        onChange={isSeasonKD === true ? (e) => { setCurrentSeasonDeaths(e.target.value) } : (e) => { setCurrentAllDeaths(e.target.value) }}
                        onClick={isSeasonKD === true ? () => { setCurrentSeasonDeaths("") } : () => { setCurrentAllDeaths("") }}
                    />
                </div>

                <div className="flex justify-between">
                    {selectedLanguage.desiredKD}
                    <input
                        type="number"
                        className="bg-slate-900 border-b-2 border-white text-center"
                        value={isSeasonKD === true ? desiredSeasonKD : desiredAllKD}
                        onChange={isSeasonKD === true ? (e) => { setSeasonDesiredKD(e.target.value) } : (e) => { setAllDesiredKD(e.target.value) }}
                        onClick={isSeasonKD === true ? () => { setSeasonDesiredKD("") } : () => { setAllDesiredKD("") }}
                    />
                </div>

            </div>

            <div className="font-bold text-sm mt-10 w-44 h-44 border-4 border-violet-900 rounded-full flex items-center justify-center flex-col">
                {selectedLanguage.nedeedKills}:
                <div className="text-4xl">{neededKills.toFixed(1)}</div>
            </div>

            <div className="mt-10">

                <button
                    className="bg-indigo-500 py-5 w-32 mr-4 text-slate-100 font-bold rounded-sm"
                    onClick={() => { setCurrentSeasonKills((prev) => { return String(Number(prev) + 1) }); setCurrentAllKills((prev) => { return String(Number(prev) + 1) }) }}
                >
                    +1 {selectedLanguage.kill}
                </button>

                <button
                    className="bg-rose-500 py-5 w-32 text-slate-100 font-bold rounded-sm"
                    onClick={() => { setCurrentSeasonDeaths((prev) => { return String(Number(prev) + 1) }); setCurrentAllDeaths((prev) => { return String(Number(prev) + 1) }) }}
                >
                    +1 {selectedLanguage.death}
                </button>

            </div>

            <div className="mt-2">

                <button
                    className="bg-rose-800 py-2 w-32 mr-4 text-slate-100 font-bold rounded-sm"
                    onClick={() => { setCurrentSeasonKills((prev) => { return String(Number(prev) - 1) }); setCurrentAllKills((prev) => { return String(Number(prev) - 1) }) }}
                >
                    -1 {selectedLanguage.kill}
                </button>

                <button
                    className="bg-rose-800 py-2 w-32 text-slate-100 font-bold rounded-sm"
                    onClick={() => { setCurrentSeasonDeaths((prev) => { return String(Number(prev) - 1) }); setCurrentAllDeaths((prev) => { return String(Number(prev) - 1) }) }}
                >
                    -1 {selectedLanguage.death}
                </button>

            </div>
        </div>
    )
}