import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Sparkles, ArrowRight, UserPlus, LogIn, CheckCircle2, Shield } from 'lucide-react';

interface LoginModalProps {
  onLogin: (profile: UserProfile) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignup) {
      if (!name.trim()) {
        setError('Please enter your name');
        return;
      }
      if (!email.trim()) {
        setError('Please enter your email or username');
        return;
      }
      onLogin({
        name: name.trim(),
        email: email.trim(),
        isLoggedIn: true,
      });
    } else {
      if (!email.trim()) {
        setError('Please enter email or username');
        return;
      }
      onLogin({
        name: email.split('@')[0] || 'Youth Explorer',
        email: email.trim(),
        isLoggedIn: true,
      });
    }
  };

  const handleQuickDemo = () => {
    onLogin({
      name: 'Aarav Sharma',
      email: 'aarav.student@moneywise.org',
      isLoggedIn: true,
    });
  };

  return (
    <div
      id="loginPage"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-4 py-8"
    >
      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-950/50">
        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 text-white font-extrabold text-2xl shadow-lg shadow-blue-500/25 mb-3 ring-2 ring-blue-400/20">
            ₹
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            MoneyWise
          </h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">
            Learn. Earn. Grow your money.
          </p>
        </div>

        {/* Feature Highlights for Youth */}
        <div className="grid grid-cols-3 gap-2 mb-6 p-2.5 bg-slate-800/40 rounded-2xl border border-slate-800 text-center text-[11px] text-slate-300">
          <div className="flex flex-col items-center">
            <span className="text-base mb-0.5">💰</span>
            <span>Budget & Goals</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-base mb-0.5">🎮</span>
            <span>Coin Games</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-base mb-0.5">🤖</span>
            <span>AI Mentor</span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isSignup && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Name
              </label>
              <input
                id="signupName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {isSignup ? 'Email Address' : 'Email or Username'}
            </label>
            <input
              id={isSignup ? 'signupEmail' : 'loginEmail'}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isSignup ? 'student@gmail.com' : 'Enter your email or username'}
              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Password
            </label>
            <input
              id={isSignup ? 'signupPassword' : 'loginPassword'}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
            />
          </div>

          <button
            type="submit"
            id={isSignup ? 'btn-signup-submit' : 'btn-login-submit'}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer active:scale-[0.99] mt-2"
          >
            {isSignup ? (
              <>
                <UserPlus className="w-4 h-4" /> Create Account
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" /> Login
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Test Login */}
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <button
            type="button"
            onClick={handleQuickDemo}
            id="btn-demo-login"
            className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Instant Guest / Student Login
          </button>
        </div>

        {/* Toggle Login / Signup */}
        <div className="text-center mt-5 text-xs text-slate-400">
          {isSignup ? (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignup(false);
                  setError('');
                }}
                className="text-blue-400 font-bold hover:underline cursor-pointer ml-1"
              >
                Login
              </button>
            </>
          ) : (
            <>
              New user?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignup(true);
                  setError('');
                }}
                className="text-blue-400 font-bold hover:underline cursor-pointer ml-1"
              >
                Create Account
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
