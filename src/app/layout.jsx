import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar/navbar";
import Footer from "./_components/Footer/footer";
import { Toaster } from "react-hot-toast";

const nunito = Nunito({
    subsets: ["latin"],
    variable: "--font-nunito",
});

export const metadata = {
    title: "ScaleUp Conclave",
    description:
        "ScaleUp Business Conclave 2025 is the second business conclave organized by ScaleUp Village",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="ScaleUp " />
                <link rel="manifest" href="/site.webmanifest" />

                <script
                    src="https://cdn.counter.dev/script.js"
                    data-id="4bf49088-4ea9-4811-818e-5a9c24d75148"
                    data-utcoffset="6"
                ></script>

                <script type="text/javascript">
                    {`(function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "kl12yka7mv");`}
                </script>
            </head>
            <body className={nunito.className}>
                <Toaster position="bottom-center" />
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
