
import React, { useState } from 'react';
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
      <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden justify-center px-6">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-indigo-200 shadow-xl mx-auto mb-4">
            <span className="text-white font-bold text-3xl">U</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">유사나 프로모션 마스터</h1>
          <p className="text-slate-500 text-sm mt-1">by dreamon</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">회원번호</label>
            <div className="relative">
              <LogIn className="absolute left-3 top-3 w-5 h-5 text-slate-300" />
              <input 
                required
                type="text" 
                placeholder="Membership ID"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">성명</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 w-5 h-5 text-slate-300" />
              <input 
                required
                type="text" 
                placeholder="Full Name"
                value={userProfile.name}
                onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>
          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all mt-4"
          >
            마스터 시작하기
          </button>
        </form>
        <p className="text-center text-[10px] text-slate-400 mt-8 uppercase tracking-widest">
          © 2026 USANA KOREA PROMOTION MASTER
        </p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard userProfile={userProfile} />;
      case 'calc':
        return <SmartCalculator userProfile={userProfile} />;
      case 'coach':
        return <AICoach userProfile={userProfile} />;
      case 'timeline':
        return (
          <div className="p-4 space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-800">통합 프로모션 타임라인</h2>
            <div className="bg-indigo-600 text-white p-4 rounded-xl shadow-lg flex items-center gap-3">
              <Zap className="w-6 h-6 fill-yellow-300 text-yellow-300" />
              <div>
                <p className="font-bold">현재는 '골든 쿼터' 집중 기간!</p>
                <p className="text-sm opacity-90 text-indigo-100">최대 5개 프로모션이 중첩됩니다. 지금이 기회입니다.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {ACTION_PLANS.map((plan, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                  <p className="text-indigo-600 font-bold text-sm mb-1">{plan.week}</p>
                  <h3 className="font-bold text-slate-800 mb-2">{plan.task}</h3>
                  <div className="flex flex-wrap gap-2">
                    {plan.impacts.map((impact, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                        #{impact}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <Dashboard userProfile={userProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden relative">
      <header className="bg-white px-4 py-4 border-b border-slate-100 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center shadow-indigo-200 shadow-lg">
            <span className="text-white font-bold">U</span>
          </div>
          <div>
            <h1 className="font-bold text-sm text-slate-800">유사나 프로모션 마스터</h1>
            <p className="text-[9px] text-slate-400 -mt-0.5">by dreamon</p>
          </div>
        </div>
        <button className="relative p-2 text-slate-400 hover:text-slate-600">
          <Bell className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {renderContent()}
      </main>

      <nav className="bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center fixed bottom-0 max-w-md w-full shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'dashboard' ? 'text-indigo-600 scale-110' : 'text-slate-400'}`}>
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">홈</span>
        </button>
        <button onClick={() => setActiveTab('calc')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'calc' ? 'text-indigo-600 scale-110' : 'text-slate-400'}`}>
          <Calculator className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">계산기</span>
        </button>
        <button onClick={() => setActiveTab('timeline')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'timeline' ? 'text-indigo-600 scale-110' : 'text-slate-400'}`}>
          <Calendar className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">일정</span>
        </button>
        <button onClick={() => setActiveTab('coach')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'coach' ? 'text-indigo-600 scale-110' : 'text-slate-400'}`}>
          <MessageSquare className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">코치</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
