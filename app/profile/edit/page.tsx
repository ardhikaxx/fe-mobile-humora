'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Phone,
  Save,
  AlertCircle,
} from 'lucide-react';
import { AppHeader } from '../../../components/layout/AppHeader';
import { useHumora } from '../../../lib/context/HumoraContext';

export default function EditProfilePage() {
  const router = useRouter();
  const { user, updateProfile, showToast } = useHumora();

  // Form State initialized with user data
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [gender, setGender] = useState(user?.gender === 'Perempuan' ? 'Perempuan' : 'Laki-laki');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  // Sync if user data changes or loads asynchronously
  useEffect(() => {
    if (user) {
      if (user.name) setName(user.name);
      if (user.email) setEmail(user.email);
      if (user.phone) setPhone(user.phone);
      if (user.gender) setGender(user.gender === 'Perempuan' ? 'Perempuan' : 'Laki-laki');
    }
  }, [user]);

  const validate = () => {
    const newErrors: { name?: string; email?: string; phone?: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Nama minimal 2 karakter';
    }

    if (!email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!email.includes('@') || !email.includes('.')) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Nomor HP wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      showToast('Mohon lengkapi formulir dengan benar.');
      return;
    }

    setIsSubmitting(true);

    // Simulate instant pleasant save feedback
    setTimeout(() => {
      updateProfile({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        gender,
      });

      setIsSubmitting(false);
      router.push('/profile');
    }, 450);
  };

  if (!user) {
    return (
      <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-24">
        <AppHeader title="Edit Profil" showBack />
        <div className="px-5 pt-8 flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#F6F1F8] border border-[#EEE8F0] flex items-center justify-center text-[#4B0B7A] mb-3">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-black text-[#24172B]">Belum Masuk Akun</h2>
          <p className="text-xs text-[#786F7D] mt-1 max-w-xs">
            Silakan masuk ke akun HUMORA kamu untuk mengubah informasi profil.
          </p>
          <Link
            href="/auth/login"
            className="mt-5 px-6 py-3 rounded-xl bg-[#21052F] text-white text-xs font-bold shadow-md hover:bg-[#340847] active:scale-95 transition-all"
          >
            Masuk Sekarang
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-28">
      {/* Top Header */}
      <AppHeader title="Edit Profil" showBack />

      <form onSubmit={handleSubmit} className="px-5 pt-3 space-y-5">
        {/* INPUT FIELDS SECTION */}
        <div className="bg-white rounded-3xl border border-[#EEE8F0] p-5 sm:p-6 shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#EEE8F0]">
            <h4 className="text-sm font-black text-[#21052F] tracking-tight">
              Informasi Akun
            </h4>
            <p className="text-[11px] text-[#786F7D] mt-0.5">
              Member sejak {user.joinedDate}
            </p>
          </div>

          {/* Nama Lengkap */}
          <div>
            <label className="text-xs font-bold text-[#24172B] block mb-1.5">
              Nama Lengkap
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-[#786F7D] pointer-events-none">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="Masukkan nama lengkap"
                className={`w-full pl-10 pr-3.5 py-3 rounded-2xl border text-xs sm:text-sm font-semibold text-[#24172B] focus:outline-none transition-all ${
                  errors.name
                    ? 'border-[#D94152] bg-[#FEECEF]/30 focus:ring-2 focus:ring-[#D94152]/30'
                    : 'border-[#EEE8F0] bg-white focus:border-[#7028B8] focus:ring-2 focus:ring-[#7028B8]/15'
                }`}
              />
            </div>
            {errors.name && (
              <span className="text-[11px] text-[#D94152] font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-bold text-[#24172B] block mb-1.5">
              Alamat Email
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-[#786F7D] pointer-events-none">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="nama@email.com"
                className={`w-full pl-10 pr-3.5 py-3 rounded-2xl border text-xs sm:text-sm font-semibold text-[#24172B] focus:outline-none transition-all ${
                  errors.email
                    ? 'border-[#D94152] bg-[#FEECEF]/30 focus:ring-2 focus:ring-[#D94152]/30'
                    : 'border-[#EEE8F0] bg-white focus:border-[#7028B8] focus:ring-2 focus:ring-[#7028B8]/15'
                }`}
              />
            </div>
            {errors.email && (
              <span className="text-[11px] text-[#D94152] font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </span>
            )}
          </div>

          {/* Nomor Telepon */}
          <div>
            <label className="text-xs font-bold text-[#24172B] block mb-1.5">
              Nomor WhatsApp / HP
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-[#786F7D] pointer-events-none">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                placeholder="0812-xxxx-xxxx"
                className={`w-full pl-10 pr-3.5 py-3 rounded-2xl border text-xs sm:text-sm font-semibold text-[#24172B] focus:outline-none transition-all ${
                  errors.phone
                    ? 'border-[#D94152] bg-[#FEECEF]/30 focus:ring-2 focus:ring-[#D94152]/30'
                    : 'border-[#EEE8F0] bg-white focus:border-[#7028B8] focus:ring-2 focus:ring-[#7028B8]/15'
                }`}
              />
            </div>
            {errors.phone && (
              <span className="text-[11px] text-[#D94152] font-semibold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.phone}
              </span>
            )}
          </div>

          {/* Jenis Kelamin */}
          <div>
            <label className="text-xs font-bold text-[#24172B] block mb-2">
              Jenis Kelamin
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {['Laki-laki', 'Perempuan'].map((item) => {
                const isSelected = gender === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setGender(item)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-[#21052F] text-white border-[#21052F] shadow-xs'
                        : 'bg-[#FFFDF7] text-[#786F7D] border-[#EEE8F0] hover:bg-[#F6F1F8]'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="space-y-2.5 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-[#21052F] hover:bg-[#340847] active:scale-98 text-white font-bold text-sm shadow-md shadow-[#21052F]/20 flex items-center justify-center gap-2 transition-all disabled:opacity-70"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-4 h-4 text-[#FFD52E]" />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>

          <Link
            href="/profile"
            className="w-full py-3.5 rounded-2xl bg-white border border-[#EEE8F0] hover:bg-[#F6F1F8] text-[#786F7D] font-bold text-xs flex items-center justify-center transition-colors text-center"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
