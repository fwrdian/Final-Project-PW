import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Paksa window browser untuk langsung lompat ke koordinat paling atas (0,0)
    window.scrollTo(0, 0);
  }, [pathname]); // Setiap kali pathname (URL) berubah, fungsi ini bakal jalan

  return null; // Komponen ini invisible, tidak perlu me-render HTML apapun
}