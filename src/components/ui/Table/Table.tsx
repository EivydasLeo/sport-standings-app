import React from "react";
import styles from "./Table.module.scss";
import type { TableProps } from "./Table.type";
import clsx from "clsx";
import Check from "../../../assets/check.svg";
import Failed from "../../../assets/failed.svg";

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
                {rows.map((row, idx) => (
                    <tr key={idx}>
                        <td>
                            {variant === "basketball" && row.flag && (
                                <span className={styles.flag}>
                                    <img src={row.flag} alt="flag" />
                                </span>
                            )}
                            {row.name}
                        </td>
                        {row.played !== undefined && <td>{row.played}</td>}
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

                        {row.draws !== undefined && <td>{row.draws}</td>}
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
                        <td>
                            <strong>{row.points}</strong>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
