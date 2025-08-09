export const isValidPair = (home: string, away: string) => Boolean(home && away && home !== away);

export const isValidScorePair = (hs: string, as: string) => {
    if (hs === "" || as === "") return false;
    const h = Number(hs),
        a = Number(as);
    return Number.isFinite(h) && Number.isFinite(a) && h >= 0 && a >= 0;
};
