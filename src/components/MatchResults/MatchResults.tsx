import React, { useMemo } from "react";
import styles from "./MatchResults.module.scss";
import Flag from "react-world-flags";
import type { MatchResultsProps } from "./MatchResults.types";
import { COUNTRY_CODE_BY_NAME, normalizeName } from "../../data/data";

const FlagIcon: React.FC<{ code?: string; width: number; alt: string }> = ({
    code,
    width,
    alt,
}) => {
    if (!code) return null;
    const iso2 = code.trim().slice(0, 2).toUpperCase();
    return <Flag code={iso2} style={{ width, height: "auto" }} title={alt} />;
};

export const MatchResults: React.FC<MatchResultsProps> = ({ matches, teams, flagWidth = 24 }) => {
    const codeByName = useMemo(() => {
        const map = new Map<string, string | undefined>();
        teams.forEach((t) => {
            const fromTeam = t.countryCode?.toUpperCase();
            const fallback = COUNTRY_CODE_BY_NAME[normalizeName(t.name)];
            map.set(t.name, (fromTeam ?? fallback)?.toUpperCase());
        });
        return map;
    }, [teams]);

    return (
        <div className={styles.matchResultsWrapper}>
            {matches.map((m, idx) => {
                const homeCode = codeByName.get(m.home);
                const awayCode = codeByName.get(m.away);
                return (
                    <div key={idx} className={styles.matchRow}>
                        <div className={styles.teams}>
                            <div className={styles.team}>
                                <FlagIcon code={homeCode} width={flagWidth} alt={m.home} />
                                <span>{m.home}</span>
                            </div>
                            <span>vs</span>
                            <div className={styles.team}>
                                <FlagIcon code={awayCode} width={flagWidth} alt={m.away} />
                                <span>{m.away}</span>
                            </div>
                        </div>
                        {m.homeScore}-{m.awayScore}
                    </div>
                );
            })}
        </div>
    );
};
