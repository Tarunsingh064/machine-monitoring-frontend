//import Navbar from "@/components/Navbar";
import "./globals.css";
import { AuthProvider } from "@/context/Authcontext";
//import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          
          {children}
          
          </AuthProvider>
      </body>
    </html>
  );
}
