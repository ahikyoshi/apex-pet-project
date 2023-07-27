import { FC, Dispatch } from "react";

interface IHeaderProps{
    currentLanguage: string,
    setCurrentLanguage: Dispatch<string>
}

export const Header: FC<IHeaderProps> = ({ currentLanguage, setCurrentLanguage }) => {
    return (
        <header className="bg-slate-950 w-screen h-16 flex items-center justify-between px-2">

            <div className="flex items-center">

                <img src="./Ash_Icon.svg" alt="Aurora Apex Icon" className="w-11 h-11" />

                <div className="ml-1 font-bold">Aurora Apex</div>

            </div>

            <div className="">

                <button
                    className={currentLanguage === "ru" ? "bg-indigo-800 h-9 px-2 rounded-sm" : "bg-indigo-800/25 h-9 px-2 rounded-sm"}
                    onClick={() => setCurrentLanguage("ru")}>
                    Русский
                </button>

                <button
                    className={currentLanguage === "eng" ? "bg-indigo-800 h-9 px-2 rounded-sm" : "bg-indigo-800/25 h-9 px-2 rounded-sm"}
                    onClick={() => setCurrentLanguage("eng")}>
                    English
                </button>

            </div>

        </header>
    )
}