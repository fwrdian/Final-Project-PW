import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  // State untuk menangkap input dari form
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State informasi feedback (loading dan error) untuk user
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // 1. Validasi kecocokan password konfirmasi di sisi client
    if (password !== confirmPassword) {
      setErrorMessage("Password konfirmasi tidak sesuai!");
      // Kosongkan kolom password saja agar user bisa langsung ketik ulang
      setPassword('');
      setConfirmPassword('');
      return;
    }

    try {
      setLoading(true);
      
      // 2. MENGIRIM DATA: Menembak langsung ke API Auth Register Express lokal kamu
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        nama: fullname,    // Dikirim sebagai 'nama' sesuai penampung body backend
        email: email,
        password: password
      });

      if (response.data.success) {
        alert(response.data.message); // Notifikasi akun berhasil dibuat dari backend
        
        // KOSONGKAN SEMUA KOLOM INPUT SAAT BERHASIL
        setFullname('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        // 3. Alihkan ke rute halaman login
        navigate('/login');
      }
    } catch (error) {
      // Menangkap pesan error spesifik dari backend (misal: email sudah terdaftar)
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Gagal terhubung ke server backend.');
      }
      
      // KOSONGKAN PASSWORD JIKA PROSES REGISTRASI GAGAL DARI SERVER
      setPassword('');
      setConfirmPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex items-center justify-center p-6 font-sans selection:bg-red-600 selection:text-white">
      <div className="w-full max-w-md border-4 border-zinc-900 p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
        
        {/* BRAND HEADER */}
        <div className="text-center mb-8 mt-2">
          <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-[0.85]">
            CREATE ACC.<span className="text-red-600">GH</span>
          </h2>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 mt-3">
            [ Registration Unit ]
          </p>
        </div>

        {/* NOTIFIKASI ERROR JIKA REGISTRASI GAGAL */}
        {errorMessage && (
          <div className="mb-4 p-3 border-2 border-red-600 bg-red-50 text-[10px] font-black uppercase tracking-wider text-red-600">
            [ ERROR ] {errorMessage}
          </div>
        )}

        {/* 🟢 Menambahkan autoComplete="off" pada form sebagai pelindung ekstra */}
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          
          {/* FULLNAME INPUT */}
          <div>
            <label className="block text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">
              [01] Full Identity Name
            </label>
            <input
              type="text"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="YOUR FULL NAME"
              autoComplete="off" // 🟢 Mencegah autofill nama bawaan browser
              className="w-full p-3 border-2 border-zinc-900 font-bold uppercase text-xs tracking-wider placeholder-zinc-300 focus:outline-none focus:bg-zinc-50 focus:border-red-600 transition-colors"
            />
          </div>

          {/* EMAIL INPUT */}
          <div>
            <label className="block text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">
              [02] Email 
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="NAME@EMAIL.COM"
              autoComplete="off" // 🟢 Mencegah browser otomatis mengisi email lama yang tersimpan
              className="w-full p-3 border-2 border-zinc-900 font-bold uppercase text-xs tracking-wider placeholder-zinc-300 focus:outline-none focus:bg-zinc-50 focus:border-red-600 transition-colors"
            />
          </div>

          {/* PASSWORD INPUT */}
          <div>
            <label className="block text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">
              [03] Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="MINIMUM 6 CHARACTERS"
              autoComplete="new-password" // 🟢 Memaksa browser mengosongkan kolom password baru
              className="w-full p-3 border-2 border-zinc-900 font-bold uppercase text-xs tracking-wider placeholder-zinc-300 focus:outline-none focus:bg-zinc-50 focus:border-red-600 transition-colors"
            />
          </div>

          {/* CONFIRM PASSWORD INPUT */}
          <div>
            <label className="block text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">
              [04] Verify Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="REPEAT YOUR PASSWORD"
              autoComplete="new-password" // 🟢 Memaksa browser mengosongkan kolom konfirmasi password
              className="w-full p-3 border-2 border-zinc-900 font-bold uppercase text-xs tracking-wider placeholder-zinc-300 focus:outline-none focus:bg-zinc-50 focus:border-red-600 transition-colors"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-4 border-2 border-zinc-900 bg-zinc-900 text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-zinc-900 transition-all shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:bg-zinc-400 disabled:cursor-not-allowed"
          >
            {loading ? 'PROCESSING...' : 'Register >'}
          </button>
        </form>

        {/* FOOTER SWITCH */}
        <div className="mt-6 text-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
          Already synced before?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-zinc-900 underline font-black hover:text-red-600 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;