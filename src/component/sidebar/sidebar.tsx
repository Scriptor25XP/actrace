import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./sidebar.module.scss";

interface Entry {
    icon: IconProp,
    title: string,
    href: string,
}

interface Props {
    children?: Entry[],
}

export function Sidebar({ children }: Readonly<Props>) {

    return (
        <ul className={styles.container}>
            {children?.map(entry => (
                <li key={entry.href}>
                    <Link className="button" href={entry.href}>
                        <FontAwesomeIcon icon={entry.icon} />
                        <span>{entry.title}</span>
                    </Link>
                </li>
            ))}
        </ul >
    );
}
