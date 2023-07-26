export interface ILocalData {
    currentKills: string,
    currentDeaths: string,
    desiredKD: string
};

export interface IKDcalculatorProps {
    currentLanguage: string
};

export interface IGetNeededKills {
    desiredKD: string,
    currentDeaths: string,
    currentKills: string
};
