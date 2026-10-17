'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Phone,
  Smile,
  Camera,
  Check,
  ArrowLeft,
  Save,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { AppHeader } from '../../../components/layout/AppHeader';
import { useHumora } from '../../../lib/context/HumoraContext';

// Preset avatar options for quick selection in prototype
const PRESET_AVATARS = [
  {
    id: 'avatar-1',
    label: 'Klasik',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'avatar-2',
    label: 'Ceria',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'avatar-3',
    label: 'Senyum',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'avatar-4',
    label: 'Santai',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'avatar-5',
    label: 'Semangat',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'avatar-6',
    label: 'Keren',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
];

export default function EditProfilePage() {
  const router = useRouter();
  const { user, updateProfile, showToast } = useHumora();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('Laki-laki');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  // Initialize with current user data
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setBio(user.bio || 'Penikmat sketsa komedi garis keras 😂');
      setGender(user.gender || 'Laki-laki');
      setAvatarUrl(user.avatarUrl || PRESET_AVATARS[0].url);
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
        bio: bio.trim(),
        gender,
        avatarUrl,
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
        {/* AVATAR HERO CARD */}
        <div className="p-6 bg-white rounded-3xl border border-[#EEE8F0] shadow-xs flex flex-col items-center text-center relative overflow-hidden">
          <div className="relative group">
            <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-[#FFD52E] shadow-md bg-[#F6F1F8] ring-4 ring-[#FFF9E0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarUrl}
                alt={name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>

            {/* Quick Change Badge Button */}
            <button
              type="button"
              onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#21052F] text-white border-2 border-white flex items-center justify-center shadow-md hover:bg-[#4B0B7A] active:scale-95 transition-all"
              aria-label="Pilih Avatar"
            >
              <Camera className="w-4 h-4 text-[#FFD52E]" />
            </button>
          </div>

          <div className="mt-3">
            <h3 className="text-sm font-black text-[#24172B] tracking-tight">{name || 'Nama Pengguna'}</h3>
            <p className="text-[11px] text-[#786F7D] mt-0.5">Member sejak {user.joinedDate}</p>
          </div>

          <button
            type="button"
            onClick={() => setShowAvatarPicker(!showAvatarPicker)}
            className="mt-3 text-xs font-bold text-[#7028B8] hover:text-[#4B0B7A] bg-[#F6F1F8] hover:bg-[#EEE8F0] px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD52E] fill-[#FFD52E]" />
            <span>{showAvatarPicker ? 'Tutup Pilihan Avatar' : 'Ganti Foto Avatar'}</span>
          </button>

          {/* AVATAR PICKER DRAWER / TRAY */}
          {showAvatarPicker && (
            <div className="w-full mt-4 pt-4 border-t border-[#EEE8F0] animate-fade-in">
              <span className="text-[11px] font-bold text-[#786F7D] uppercase tracking-wider block mb-2.5">
                Pilih Karakter Avatar
              </span>
              <div className="grid grid-cols-6 gap-2">
                {PRESET_AVATARS.map((item) => {
                  const isSelected = avatarUrl === item.url;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setAvatarUrl(item.url);
                        showToast(`Avatar "${item.label}" dipilih!`);
                      }}
                      className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all active:scale-95 ${
                        isSelected
                          ? 'border-[#21052F] ring-2 ring-[#FFD52E] scale-105'
                          : 'border-[#EEE8F0] hover:border-[#7028B8] opacity-80 hover:opacity-100'
                      }`}
                      aria-label={`Pilih avatar ${item.label}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.url}
                        alt={item.label}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#21052F]/40 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* INPUT FIELDS SECTION */}
        <div className="bg-white rounded-3xl border border-[#EEE8F0] p-5 shadow-xs space-y-4">
          <h4 className="text-xs font-black text-[#21052F] uppercase tracking-wider">
            Informasi Pribadi
          </h4>

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
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[#24172B]">
                Alamat Email
              </label>
              <span className="text-[10px] font-bold text-[#21865B] bg-[#EAF8F1] px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Terverifikasi
              </span>
            </div>
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

          {/* Bio / Status Humor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[#24172B] flex items-center gap-1">
                <Smile className="w-3.5 h-3.5 text-[#7028B8]" />
                <span>Bio / Status Lucu</span>
              </label>
              <span className="text-[10px] text-[#A39CA9]">{bio.length}/100</span>
            </div>
            <textarea
              rows={2}
              maxLength={100}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Ceritakan sedikit seleramu atau status lucumu..."
              className="w-full px-3.5 py-2.5 rounded-2xl border border-[#EEE8F0] bg-white text-xs sm:text-sm font-semibold text-[#24172B] focus:border-[#7028B8] focus:ring-2 focus:ring-[#7028B8]/15 focus:outline-none transition-all resize-none"
            />
          </div>

          {/* Jenis Kelamin */}
          <div>
            <label className="text-xs font-bold text-[#24172B] block mb-2">
              Jenis Kelamin
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Laki-laki', 'Perempuan', 'Lainnya'].map((item) => {
                const isSelected = gender === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setGender(item)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
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
