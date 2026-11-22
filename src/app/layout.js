import "./globals.css";
import Header from "@/components/layout/Header";
import WhatsAppWidget from "@/components/common/WhatsAppWidget";

export const metadata = {
  title: "JobsHub HR",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><Header />{children}<WhatsAppWidget /></body>
    </html>
  );
}
