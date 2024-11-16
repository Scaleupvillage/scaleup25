import { Nunito } from "next/font/google"
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata = {
  title: "ScaleUpConclave",
  description: "ScaleUp Business Conclave 2025 is the second business conclave organized by ScaleUp Village",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        {children}
      </body>
    </html>
  );
}