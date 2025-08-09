export const makePairId = (a: string, b: string, sep = "__") => {
    const [x, y] = [a.toLowerCase(), b.toLowerCase()].sort();
    return `${x}${sep}${y}`;
};
