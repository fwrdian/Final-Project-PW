import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Login = ({ setIsLoggedIn, setUserAccount }) => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const intendedCar = location.state?.intendedCar;

  // 🟢 TRIDER TRICK: Paksa bersihkan state sesaat setelah komponen dimuat pertama kali
  useEffect(() => {
    const timer = setTimeout(() => {
      setEmail('');
      setPassword('');
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: email,
        password: password
      });

      if (response.data.success) {
        if (setIsLoggedIn) setIsLoggedIn(true); 
        if (setUserAccount) {
          setUserAccount({
            fullname: response.data.user?.nama || response.data.user?.fullname || 'User', 
            email: response.data.user?.email || email,
            role: response.data.user?.role || 'pelanggan'
          });
        }

        alert(`Selamat datang kembali! Login berhasil.`);
        setEmail('');
        setPassword('');

        if (intendedCar) {
          navigate('/contact', { 
            state: { 
              message: `Halo GarasiHiling, saya tertarik untuk memesan unit ${intendedCar.name}. Mohon info prosedur dan ketersediaan stoknya.`,
              id_mobil: intendedCar.id_mobil
            } 
          });
        } else {
          navigate('/profile'); 
        }
      }
    } catch (error) {
      let pesanError = 'Gagal terhubung ke server backend.';
      if (error.response && error.response.data && error.response.data.message) {
        pesanError = error.response.data.message;
      }
      alert(`[ LOGIN GAGAL ]\n${pesanError}`);
      setErrorMessage(pesanError);
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex items-center justify-center p-6 font-sans selection:bg-red-600 selection:text-white pt-16">
      <div className="w-full max-w-md border-4 border-zinc-900 p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
        
        {/* BRAND HEADER */}
        <div className="text-center mb-10 mt-2">
          <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.85]">
            GARASI<span className="text-red-600">HILING.</span>
          </h2>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 mt-3">
            [ Authentication Required ]
          </p>

          {intendedCar && (
            <div className="mt-4 p-3 bg-red-50 border-2 border-red-600 text-[10px] font-black text-red-600 uppercase tracking-wider animate-pulse">
              [ SYSTEM_NOTICE: LOGIN REQUIRED TO ORDER {intendedCar.name} ]
            </div>
          )}
        </div>

        {errorMessage && (
          <div className="mb-6 p-3 border-2 border-red-600 bg-red-50 text-[11px] font-black uppercase tracking-wider text-red-600 shadow-[2px_2px_0px_0px_rgba(220,38,38,1)]">
            [ PERINGATAN ]: {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          
          {/* 🟢 DUMMY INPUTS (Umpan palsu agar browser mengisi kolom tersembunyi ini, bukan kolom asli) */}
          <input type="text" name="email" style={{ display: 'none' }} aria-hidden="true" autoComplete="false" />
          <input type="password" name="password" style={{ display: 'none' }} aria-hidden="true" autoComplete="false" />

          {/* EMAIL INPUT ASLI */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">
              [01] Email
            </label>
            <input
              type="email"
              name="real-email-input" // Ganti nama agar tidak dideteksi engine bot browser
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER EMAIL ADDRESS"
              autoComplete="new-password" // Trik agar dianggap sebagai form baru
              className="w-full p-4 border-2 border-zinc-900 font-bold uppercase text-xs tracking-wider placeholder-zinc-300 focus:outline-none focus:bg-zinc-50 focus:border-red-600 transition-colors"
            />
          </div>

          {/* PASSWORD INPUT ASLI */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">
              [02] Password
            </label>
            <input
              type="password"
              name="real-password-input" // Ganti nama agar terhindar dari autofill otomatis
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoComplete="new-password"
              className="w-full p-4 border-2 border-zinc-900 font-bold uppercase text-xs tracking-wider placeholder-zinc-300 focus:outline-none focus:bg-zinc-50 focus:border-red-600 transition-colors"
            />
          </div>

          {/* OPTIONAL ACCESS */}
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-red-600 border-2 border-zinc-900 rounded-none cursor-pointer" />
              <span>Remember Me</span>
            </label>
            <a href="#" className="text-red-600 hover:underline">Forgot Password?</a>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 border-2 border-zinc-900 bg-zinc-900 text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-zinc-900 transition-all shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:bg-zinc-400 disabled:cursor-not-allowed"
          >
            {loading ? 'VERIFYING...' : 'Login >'}
          </button>
        </form>

        {/* FOOTER SWITCH */}
        <div className="mt-8 text-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
          Belum Punya Akun?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-zinc-900 underline font-black hover:text-red-600 transition-colors"
          >
            Register New Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;