import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// 🛠️ FIX: Terima prop setUserAccount dari App.jsx
const Login = ({ setIsLoggedIn, setUserAccount }) => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  // Tangkap data mobil yang dikirim oleh Katalog via state router (jika ada)
  const intendedCar = location.state?.intendedCar;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login System Sync:', { email, password });
    
    // 1. Ubah status login jadi true
    if (setIsLoggedIn) setIsLoggedIn(true); 

    // 🛠️ 2. Set data akun simulasi (Bisa kamu ganti dengan data respon API asli nantinya)
    if (setUserAccount) {
      setUserAccount({
        fullname: email.split('@')[0], // Mengambil nama depan email sebagai nama profil sementara
        email: email
      });
    }

    // JALUR REDIRECT OTOMATIS:
    if (intendedCar) {
      // Jika user datang karena klik "Pesan" di katalog, langsung arahkan ke /contact
      navigate('/contact', { 
        state: { message: `Halo GarasiHiling, saya tertarik untuk memesan unit ${intendedCar.name}. Mohon info prosedur dan ketersediaan stoknya.` } 
      });
    } else {
      // 🛠️ 3. Jika login normal, arahkan langsung ke halaman /profile agar datanya langsung muncul
      navigate('/profile'); 
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

          {/* NOTIFIKASI JIKA MAU PESAN MOBIL */}
          {intendedCar && (
            <div className="mt-4 p-3 bg-red-50 border-2 border-red-600 text-[10px] font-black text-red-600 uppercase tracking-wider animate-pulse">
              [ SYSTEM_NOTICE: LOGIN REQUIRED TO ORDER {intendedCar.name} ]
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* EMAIL INPUT */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">
              [01] Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER EMAIL ADDRESS"
              className="w-full p-4 border-2 border-zinc-900 font-bold uppercase text-xs tracking-wider placeholder-zinc-300 focus:outline-none focus:bg-zinc-50 focus:border-red-600 transition-colors"
            />
          </div>

          {/* PASSWORD INPUT */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">
              [02] Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
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
            className="w-full py-4 border-2 border-zinc-900 bg-zinc-900 text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-zinc-900 transition-all shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            Login &gt;
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