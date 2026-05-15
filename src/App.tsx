import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { BookingModal } from "./components/BookingModal";
import { CookieConsent } from "./components/CookieConsent";
import { FloatingActions } from "./components/FloatingActions";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { LoadingScreen } from "./components/LoadingScreen";
import { ScrollToTop } from "./components/ScrollToTop";
import { About } from "./pages/About";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Blog } from "./pages/Blog";
import { Contact } from "./pages/Contact";
import { Gallery } from "./pages/Gallery";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      <LoadingScreen visible={loading} />
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="*"
          element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/tjanster" element={<Services />} />
                  <Route path="/om-oss" element={<About />} />
                  <Route path="/galleri" element={<Gallery />} />
                  <Route path="/blogg" element={<Blog />} />
                  <Route path="/kontakta-oss" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
              <FloatingActions />
              <BookingModal />
              <CookieConsent />
            </>
          }
        />
      </Routes>
    </>
  );
}
