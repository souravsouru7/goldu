import "./globals.css";
import ScrollToTop from './components/ScrollToTop';
import FloatingContactIcons from './components/FloatingContactIcons';

export const metadata = {
  title: "Golden Extreme Auto Spare Parts",
  description: "Your trusted partner in tire and wheel solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="antialiased">
        {children}
        <ScrollToTop />
        <FloatingContactIcons />
      </body>
    </html>
  );
}
