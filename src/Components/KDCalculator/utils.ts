import { IGetNeededKills } from "./types"

export const getNeededKills = ({desiredKD, currentDeaths, currentKills}: IGetNeededKills): number => {
    return Number(Number(desiredKD) * Number(currentDeaths) - Number(currentKills))
}
