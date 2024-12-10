import localFont from "next/font/local";
import "./globals.css";
import {Inter} from "next/font/google"

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700"], // Add the font weights you need
});

export const metadata = {
  title: "GenResume.AI",
  description: "Resume Recipes created by AI that will blow your mind"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
