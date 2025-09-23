import { fetchRestrictedAPI } from "@/api/fetch";
import { getOAuthURI } from "@/api/oauth";
import { Footer } from "@/component/footer/footer";
import { Header } from "@/component/header/header";
import { Sidebar } from "@/component/sidebar/sidebar";
import { StravaProvider } from "@/component/strava-provider/strava-provider";
import { DetailedAthlete } from "@/type/strava";
import { getBundleCookies } from "@/util/cookies";
import "@fortawesome/fontawesome-svg-core/styles";
import { faStrava } from "@fortawesome/free-brands-svg-icons";
import { faBars, faChartLine, faChartSimple, faEnvelopeOpen, faFolderOpen, faListCheck, faQuestion } from "@fortawesome/free-solid-svg-icons";
import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import { ReactNode } from "react";
import "./globals.scss";
import styles from "./layout.module.scss";

const font = Fira_Sans({
    subsets: ["latin", "latin-ext"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Actrace",
    description: "Leave a trace in the vastness of cycling space...",
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {

    const bundle = await getBundleCookies();

    let athlete: DetailedAthlete | null = null;
    if (bundle) {
        const response = await fetchRestrictedAPI("athlete", bundle);
        athlete = await response.json();
    }

    const oauthURI = await getOAuthURI(["read", "read_all"], { state: "/athlete" });

    return (
        <html lang="en">
            <body className={font.className}>
                <StravaProvider athlete={athlete} oauthURI={oauthURI}>
                    <Header />
                    <div className={styles.container}>
                        <Sidebar>{[
                            { href: "/segments", icon: faChartLine, title: "Segments" },
                            { href: "/challanges", icon: faListCheck, title: "Challanges" },
                            { href: "/collections", icon: faFolderOpen, title: "Collections" },
                            { href: "/strava-connect", icon: faStrava, title: " StravaConnect" },
                            { href: "/submission", icon: faEnvelopeOpen, title: "Submission" },
                            { href: "/my-segments", icon: faChartSimple, title: "My Segments" },
                            { href: "/faq", icon: faQuestion, title: "FAQ" },
                            { href: "/about", icon: faBars, title: "About" },
                        ]}</Sidebar>
                        <main>{children}</main>
                    </div>
                    <Footer />
                </StravaProvider>
            </body>
        </html>
    );
}
