'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { LoadingProvider } from '../contexts/LoadingContext';
import Logo from '/public/images/logo.png'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Drop Pay</title>
        <meta name="description" content="Drop Payments." />
        <link rel="icon" href={Logo.src} />

        {/* Bootstrap Icons CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-yEuPHEl6N3KnSoxXX7VLhT0tDRSM0d7mXWop1Gd1IHL0JxZZ47W8XrKktG6VHgTIuZ51AiJAI+/2z5/ZQFnT7Q=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* Bootstrap JS Bundle */}

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-papJ+zP0sl1vL8HqD1CSzZyfRQ2ePLPZ3V0HRDnH5avjHZiZoJvYZApWeQv1Hd4QZ2pSUz1hZyNqXgY9H7ylwQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        translate="no"
      >
        <LoadingProvider>
          {children}
        </LoadingProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
