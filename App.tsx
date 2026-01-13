
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Calculator, 
  Calendar, 
  MessageSquare, 
  Bell,
  Zap,
  LogIn,
  User as UserIcon
} from 'lucide-react';
import { Rank, UserProfile } from './types';
import { ACTION_PLANS } from './constants';
import SmartCalculator from './components/SmartCalculator';
import AICoach from './components/AICoach';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'calc' | 'coach' | 'timeline'>('dashboard');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    gender: 'F',
    rank: Rank.SILVER,
    avgCP: 120,
    isExecutive: false
  });
  const [memberId, setMemberId] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userProfile.name && memberId) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-8 animate-fadeIn">
          <div className="text-center">
            <div className="bg-indigo-600 w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-200 mx-auto mb-6 transform rotate-3">
              <span className="text-white font-bold text-4xl">U</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">2026 프로모션 마스터</h1>
            <p className="text-slate-500 mt-2 font-medium">성공을 위한 비즈니스 가이드</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Membership ID</label>
              <div className="relative">
                <LogIn className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  required
                  type="text" 
                  placeholder="회원번호 입력"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none font-semibold"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Name</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input 
                  required
                  type="text" 
                  placeholder="성함 입력"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none font-semibold"
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all mt-4 text-lg"
            >
              시작하기
            </button>
          </form>
          <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            © 2026 dreamon coach
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-2xl relative">
      <header className="bg-white/80 backdrop-blur-md px-5 py-4 border-b border-slate-100 flex justify-between items-center sticky top-0 z-[60]">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
            <span className="text-white font-bold text-lg">U</span>
          </div>
          <div>
            <h1 className="font-bold text-[15px] text-slate-900 leading-tight">2026 프로모션</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Status Master</p>
          </div>
        </div>
        <button className="relative p-2 text-slate-400">
          <Bell className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-28">
        {activeTab === 'dashboard' && <Dashboard userProfile={userProfile} />}
        {activeTab === 'calc' && <SmartCalculator userProfile={userProfile} />}
        {activeTab === 'coach' && <AICoach userProfile={userProfile} />}
        {activeTab === 'timeline' && (
          <div className="p-5 space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-900">프로모션 타임라인</h2>
            <div className="bg-indigo-600 text-white p-5 rounded-[2rem] shadow-xl flex items-center gap-4">
              <Zap className="w-8 h-8 fill-yellow-300 text-yellow-300" />
              <div>
                <p className="font-bold text-lg">골든 쿼터 진행 중!</p>
                <p className="text-xs opacity-90 text-indigo-100 font-medium">가장 많은 혜택이 중첩되는 시기입니다.</p>
              </div>
            </div>
            <div className="space-y-4">
              {ACTION_PLANS.map((plan, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden transition-all hover:shadow-md">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
                  <p className="text-indigo-600 font-extrabold text-xs mb-2 tracking-wide">{plan.week}</p>
                  <h3 className="font-bold text-slate-800 text-base mb-3 leading-snug">{plan.task}</h3>
                  <div className="flex flex-wrap gap-2">
                    {plan.impacts.map((impact, i) => (
                      <span key={i} className="text-[10px] bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg font-bold">
                        #{impact}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <nav className="bg-white/90 backdrop-blur-lg border-t border-slate-100 px-8 py-4 flex justify-between items-center fixed bottom-0 max-w-md w-full shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-[60]">
        {[
          { id: 'dashboard', icon: LayoutDashboard, label: '홈' },
          { id: 'calc', icon: Calculator, label: '시뮬' },
          { id: 'timeline', icon: Calendar, label: '일정' },
          { id: 'coach', icon: MessageSquare, label: '코치' }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)} 
            className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === tab.id ? 'text-indigo-600 scale-110' : 'text-slate-300 hover:text-slate-400'}`}
          >
            <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className="text-[10px] font-bold tracking-tight">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
