import React from "react";
import styles from "./Table.module.scss";
import type { TableProps } from "./Table.types";
import clsx from "clsx";
import Check from "../../../assets/check.svg";
import Failed from "../../../assets/failed.svg";
import Flag from "react-world-flags";

export const Table: React.FC<TableProps> = ({ headers, rows, variant }) => {
    return (
        <table className={clsx(styles.table, variant && styles[variant])}>
            <thead>
                <tr>
                    {headers.map((header, idx) => (
                        <th key={idx}>{header}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {rows.map((row, idx) => {
                    const code =
                        variant === "basketball" && row.flag
                            ? row.flag.toString().toUpperCase()
                            : undefined;

                    return (
                        <tr key={idx}>
                            <td>
                                <div className={styles.cellFlex}>
                                    {variant === "basketball" && code && (
                                        <Flag
                                            className={styles.flag}
                                            code={code}
                                            title={row.name}
                                        />
                                    )}
                                    {row.name}
                                </div>
                            </td>

                            {variant === "football" && (
                                <td>
                                    {row.played ??
                                        (row.wins ?? 0) + (row.draws ?? 0) + (row.losses ?? 0)}
                                </td>
                            )}

                            {variant === "tennis" && <td>{row.matches ?? 0}</td>}

                            <td>
                                <div className={clsx(variant === "tennis" && styles.cellWithIcon)}>
                                    {row.wins}
                                    {variant === "tennis" && (
                                        <span className={styles.icon}>
                                            <img src={Check} alt="check" />
                                        </span>
                                    )}
                                </div>
                            </td>

                            {variant === "football" && row.draws !== undefined && (
                                <td>{row.draws}</td>
                            )}

                            <td>
                                <div className={clsx(variant === "tennis" && styles.cellWithIcon)}>
                                    {row.losses}
                                    {variant === "tennis" && (
                                        <span className={styles.icon}>
                                            <img src={Failed} alt="failed" />
                                        </span>
                                    )}
                                </div>
                            </td>

                            {variant === "basketball" && row.draws !== undefined && (
                                <td>{row.draws}</td>
                            )}

                            <td>
                                <strong>{row.points}</strong>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
