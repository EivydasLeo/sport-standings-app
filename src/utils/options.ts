export type Option = { value: string; label: string };

export function filterOptions(
    all: Option[],
    _selfPick: string,
    otherPick: string,
    hasMatch: (a: string, b: string) => boolean,
) {
    return all.filter((o) => {
        if (o.value === otherPick) return false;
        if (!otherPick) return true;
        return !hasMatch(o.value, otherPick);
    });
}
