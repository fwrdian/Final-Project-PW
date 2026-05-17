import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [vehicles, setVehicles] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fungsi Tambah Mobil Baru
  const handleAddCar = () => {
    const newCar = {
      id: Date.now(), // Menggunakan timestamp agar unik
      model: "New Entry Unit",
      year: "2026",
      plate: "TEMP 0000",
      status: "Processing",
      isEditing: true // Langsung masuk mode edit saat ditambah
    };
    setVehicles([...vehicles, newCar]);
  };

  // Fungsi Update Nama Mobil
  const handleUpdateModel = (id, newModel) => {
    setVehicles(vehicles.map(car => 
      car.id === id ? { ...car, model: newModel } : car
    ));
  };

  // Fungsi Toggle Mode Edit
  const toggleEdit = (id) => {
    setVehicles(vehicles.map(car => 
      car.id === id ? { ...car, isEditing: !car.isEditing } : car
    ));
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [userRes] = await Promise.all([
          axios.get('https://jsonplaceholder.typicode.com/users/1')
        ]);

        setUser({
          ...userRes.data,
          ownerId: `OWN-2026-${userRes.data.id}XX`,
          foto: `https://ui-avatars.com/api/?name=${userRes.data.name}&background=dc2626&color=fff`,
          location: "Yogyakarta, ID",
          lastActive: "15:45"
        });

        setVehicles([
          { id: 1, model: "GR Supra G90", year: "2024", plate: "AB 1994 GR", status: "Optimal", isEditing: false },
          { id: 2, model: "Land Cruiser 300", year: "2023", plate: "AB 2026 HI", status: "Garage", isEditing: false }
        ]);
        
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  if (loading || !user) return <div className="p-20 font-black text-red-600 animate-pulse uppercase tracking-widest">Initializing_System...</div>;

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-red-600 selection:text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        
        {/* HEADER */}
        <header className="border-b-4 border-zinc-900 pb-12 mb-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
              <img src={user.foto} alt="Owner" className="w-32 h-32 grayscale border-4 border-zinc-900" />
              <div className="text-center md:text-left">
                <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.5em] mb-3">User Verified</p>
                <h1 className="text-8xl font-black italic tracking-tighter uppercase leading-[0.75] mb-2">{user.name}</h1>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{user.location} // {user.ownerId}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <div className="sticky top-10 bg-white p-10 border-4 border-zinc-900">
              <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] mb-12 flex items-center gap-3">
                <span className="w-3 h-3 bg-red-600"></span> User Information
              </h3>
              <div className="space-y-10">
                {[{ label: 'Network', val: user.email }, { label: 'Comm', val: user.phone }, { label: 'Corp', val: user.company.name }].map((item, i) => (
                  <div key={i}>
                    <p className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-2">[{item.label}]</p>
                    <p className="text-sm font-bold text-zinc-900 break-all">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <section className="space-y-12">
              <div className="flex justify-between items-center border-b-2 border-zinc-900 pb-4">
                <h3 className="text-xs font-black uppercase tracking-[0.5em] text-zinc-900">Garage</h3>
                <p className="text-[10px] font-black uppercase text-zinc-400">{vehicles.length} Units Sync</p>
              </div>

              <div className="divide-y-2 divide-zinc-100 mb-12">
                {vehicles.map((car) => (
                  <div key={car.id} className="group py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-[10px] font-black text-red-600 border border-red-600 px-2 py-0.5">{car.plate}</span>
                        <span className="text-[10px] font-black text-zinc-300 uppercase">Year_{car.year}</span>
                      </div>
                      
                      {car.isEditing ? (
                        <div className="flex items-center gap-4">
                           <input 
                            autoFocus
                            className="text-5xl font-black italic tracking-tighter uppercase text-red-600 border-b-4 border-red-600 outline-none w-full bg-zinc-50 p-2"
                            value={car.model}
                            onChange={(e) => handleUpdateModel(car.id, e.target.value)}
                            onBlur={() => toggleEdit(car.id)}
                            onKeyDown={(e) => e.key === 'Enter' && toggleEdit(car.id)}
                          />
                        </div>
                      ) : (
                        <h4 
                          onClick={() => toggleEdit(car.id)}
                          className="text-5xl font-black italic tracking-tighter uppercase text-zinc-900 hover:text-red-600 cursor-text transition-colors"
                        >
                          {car.model}
                        </h4>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-left md:text-right">
                        <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Status</p>
                        <p className="text-xl font-black italic uppercase text-zinc-900 tracking-tighter">{car.status}</p>
                      </div>
                      <button 
                        onClick={() => toggleEdit(car.id)}
                        className="p-3 border-2 border-zinc-900 hover:bg-zinc-900 hover:text-white transition-all text-xs font-black uppercase"
                      >
                        {car.isEditing ? 'SAVE' : 'EDIT'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={handleAddCar}
                className="w-full group p-8 border-4 border-dashed border-zinc-200 hover:border-zinc-900 hover:bg-zinc-900 transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-4 group-hover:text-white transition-colors">
                  <span className="text-4xl font-light">+</span>
                  <span className="text-xs font-black uppercase tracking-[0.4em]">Register New Asset Unit</span>
                </div>
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;