import { Nunito } from "next/font/google"
import "./globals.css";
import Navbar from "./_components/Navbar/navbar";
import Footer from "./_components/Footer/footer";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "ScaleUp Conclave",
  description: "ScaleUp Business Conclave 2025 is the second business conclave organized by ScaleUp Village",
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
      </head>
      <body className={nunito.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}