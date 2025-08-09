/* eslint-disable @typescript-eslint/no-explicit-any */
export function applyResult(
    row: any,
    own: number,
    opp: number,
    allowDraw = true,
    playedKey = "played",
) {
    const win = own > opp;
    const draw = own === opp;
    const next: any = { ...row, [playedKey]: (row[playedKey] ?? 0) + 1 };

    if (win) {
        next.wins = (next.wins ?? 0) + 1;
        next.points = (next.points ?? 0) + 3;
    } else if (draw && allowDraw) {
        next.draws = (next.draws ?? 0) + 1;
        next.points = (next.points ?? 0) + 1;
    } else {
        next.losses = (next.losses ?? 0) + 1;
    }

    return next;
}
