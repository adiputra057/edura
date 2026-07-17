import React, { useState, useEffect, useRef } from 'react';
import { Lock, Mail, ArrowLeft, AlertCircle, ShieldCheck, RefreshCw } from 'lucide-react';
import emailjs from '@emailjs/browser';
import logo from '../assets/logo.png';

// =========================================================================
// KONFIGURASI EMAILJS (OTP REAL GMAIL)
// Silakan ganti nilai di bawah ini untuk mengaktifkan pengiriman OTP asli.
// =========================================================================
const EMAILJS_SERVICE_ID = 'service_oc57ujb';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Ganti dengan Template ID dari EmailJS
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';   // Ganti dengan Public Key dari EmailJS (Account -> API Keys)
// =========================================================================

export default function AdminLogin({ onLogin, onCancel }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // OTP States
  const [step, setStep] = useState('credentials'); // 'credentials' | 'otp'
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [correctOtp, setCorrectOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [demoNotification, setDemoNotification] = useState('');

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // Timer cooldown logic for OTP Resend
  useEffect(() => {
    let interval = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Auto-focus the first OTP input when transitioning to OTP step
  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => {
        if (inputRefs[0].current) {
          inputRefs[0].current.focus();
        }
      }, 200);
    }
  }, [step]);

  // Helper to generate and trigger OTP
  const triggerOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setCorrectOtp(code);
    setTimer(60);
    setOtpValues(['', '', '', '', '', '']);
    
    // Check if EmailJS is configured for real delivery
    const isConfigured = 
      EMAILJS_TEMPLATE_ID && 
      EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' && 
      EMAILJS_PUBLIC_KEY && 
      EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

    if (isConfigured) {
      // Send real email using user's EmailJS config hardcoded in the file
      emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: 'gedeadiputra14@gmail.com',
          otp_code: code,
        },
        EMAILJS_PUBLIC_KEY
      ).then(
        (response) => {
          console.log('EmailJS Success:', response.status, response.text);
          setDemoNotification(`OTP berhasil dikirim ke Gmail asli Anda! Silakan periksa inbox.`);
        },
        (err) => {
          console.error('EmailJS Error:', err);
          setDemoNotification(`Gagal kirim email asli (${err.text || 'Salah konfigurasi'}). Simulasi OTP: ${code}`);
        }
      );
    } else {
      // Fallback simulator toast
      setDemoNotification(`[Simulasi Email] OTP terkirim ke email terdaftar: ${code}`);
    }
    
    // Auto-fade notification after 20 seconds
    setTimeout(() => {
      setDemoNotification('');
    }, 20000);
  };

  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    if (email !== 'gedeadiputra14@gmail.com') {
      setError('Email atau password salah!');
      return;
    }

    if (password !== 'admin123') {
      setError('Password salah! Silakan coba lagi.');
      return;
    }

    // Check if this browser has already been verified previously
    const isVerified = localStorage.getItem('edura_device_verified');
    if (isVerified === 'true') {
      // Direct login if already verified once
      onLogin();
    } else {
      // First-time login -> Require OTP verification
      setError('');
      setStep('otp');
      triggerOtp();
    }
  };

  const handleOtpChange = (index, val) => {
    // Only accept numbers
    if (val && !/^[0-9]$/.test(val)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = val;
    setOtpValues(newOtpValues);

    // Auto-focus next field
    if (val && index < 5) {
      inputRefs[index + 1].current.focus();
    }

    // Perform check if all fields are filled
    const fullOtp = newOtpValues.join('');
    if (fullOtp.length === 6) {
      verifyOtp(fullOtp);
    }
  };

  const handleBackspace = (index, e) => {
    // Handle backspace back-focus
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const verifyOtp = (code) => {
    if (code === correctOtp) {
      // Success! Persist verification so next login is seamless
      localStorage.setItem('edura_device_verified', 'true');
      setDemoNotification('');
      onLogin();
    } else {
      setError('Kode OTP salah! Silakan periksa kembali kode Anda.');
      setOtpValues(['', '', '', '', '', '']);
      inputRefs[0].current.focus();
    }
  };

  const handleResendOtp = () => {
    if (timer === 0) {
      setError('');
      triggerOtp();
    }
  };

  const isUsingRealEmail = 
    EMAILJS_TEMPLATE_ID && 
    EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' && 
    EMAILJS_PUBLIC_KEY && 
    EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-[-20%] right-[-10%] w-[35rem] h-[35rem] rounded-full bg-primary-100/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-indigo-100/30 blur-[120px] pointer-events-none" />

      {/* Simulated/Real Notification Toast */}
      {demoNotification && (
        <div className="fixed top-6 right-6 z-50 max-w-sm w-full bg-slate-955 text-white rounded-2xl shadow-2xl p-4 border border-slate-800 animate-slide-in flex flex-col gap-1.5 text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-primary-400 tracking-wider uppercase">
              {isUsingRealEmail ? 'Info Pengiriman Email' : 'Notifikasi Email (Simulasi)'}
            </span>
            <button onClick={() => setDemoNotification('')} className="text-gray-400 hover:text-white text-xs">✕</button>
          </div>
          <p className="text-[11px] text-gray-300 leading-relaxed">
            {demoNotification}
          </p>
          {!isUsingRealEmail && (
            <div className="mt-1.5 p-2 bg-slate-800 rounded-lg border border-slate-700 text-center">
              <span className="text-xs text-gray-400">Kode Keamanan OTP Anda:</span>
              <h4 className="text-xl font-black text-white tracking-widest mt-1 select-all">{correctOtp}</h4>
            </div>
          )}
        </div>
      )}

      {/* Back button */}
      <div className="absolute top-8 left-8 z-10">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-500 font-semibold transition"
        >
          <ArrowLeft size={16} />
          Kembali ke Web
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center justify-center text-center z-10">
        <img src={logo} alt="EDURA Logo" className="h-10 w-auto object-contain mb-2" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {step === 'credentials' ? 'Portal Admin' : 'Verifikasi OTP'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 max-w-xs mx-auto">
          {step === 'credentials' 
            ? 'Silakan masuk untuk mengelola produk dan layanan' 
            : 'Masukkan 6 digit kode keamanan yang dikirimkan ke email Anda.'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-2xl border border-gray-100/50 rounded-3xl sm:px-10">
          
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl flex items-start gap-2.5 text-sm animate-scale-up">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {step === 'credentials' ? (
            /* STEP 1: CREDENTIALS FORM */
            <form className="space-y-6 animate-fade-in" onSubmit={handleCredentialsSubmit}>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Alamat Email Admin
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="nama@email.com"
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-primary-500/10 text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  Masuk Dashboard
                </button>
              </div>
            </form>
          ) : (
            /* STEP 2: OTP VERIFICATION FORM */
            <div className="space-y-6 text-center animate-fade-in">
              <div className="flex justify-center">
                <div className="p-4 bg-primary-50 rounded-2xl text-primary-500 animate-pulse">
                  <ShieldCheck size={32} />
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Kode keamanan dikirim ke</p>
                <p className="text-sm font-bold text-gray-800">email terdaftar Anda</p>
              </div>

              {/* 6 Digit Inputs */}
              <div className="flex justify-between gap-2 max-w-xs mx-auto my-6">
                {otpValues.map((val, idx) => (
                  <input
                    key={idx}
                    ref={inputRefs[idx]}
                    type="text"
                    maxLength={1}
                    value={val}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleBackspace(idx, e)}
                    className="w-11 h-14 border-2 border-gray-200 rounded-xl text-center text-xl font-bold focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition bg-gray-50/30"
                  />
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResendOtp}
                  disabled={timer > 0}
                  className={`inline-flex items-center gap-2 text-xs font-bold transition select-none ${
                    timer > 0 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-primary-500 hover:text-primary-600 cursor-pointer'
                  }`}
                >
                  <RefreshCw size={14} className={timer > 0 ? '' : 'animate-spin-slow'} />
                  Kirim Ulang Kode {timer > 0 ? `(${timer}s)` : ''}
                </button>
              </div>

              <button
                onClick={() => {
                  setStep('credentials');
                  setError('');
                }}
                className="w-full mt-4 text-xs font-semibold text-gray-500 hover:text-gray-700 transition animate-fade-in"
              >
                Ganti Email / Kembali ke Login
              </button>
            </div>
          )}


        </div>
      </div>
    </div>
  );
}
