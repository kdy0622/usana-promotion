
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Calculator, Plus, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface CalculatorProps {
  userProfile: UserProfile;
}

const SmartCalculator: React.FC<CalculatorProps> = ({ userProfile }) => {
  const [partnerType, setPartnerType] = useState<'F' | 'M'>('F');
  const [isStarterPack, setIsStarterPack] = useState(true);
  const [expectedCP, setExpectedCP] = useState(200);

  const calculateImpact = () => {
    const impacts = [];
    if (partnerType === 'F' && isStarterPack) {
      impacts.push("셀라비브 푸켓: 직접후원 +1 / 실적 +220점");
    }
    if (isStarterPack) {
      impacts.push("원팀 챌린지: SBP 점수 반영");
    }
    impacts.push(`푸꾸옥/프라하: 성장 실적 ${expectedCP}CP 반영`);
    return impacts;
  };

  return (
    <div className="p-4 space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-slate-800">스마트 시뮬레이터</h2>
      
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-bold text-slate-600">신규 파트너 정보</label>
          <div className="flex gap-2">
            <button 
              onClick={() => setPartnerType('F')}
              className={`flex-1 py-3 rounded-xl border-2 transition-all font-bold ${partnerType === 'F' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 text-slate-400'}`}
            >
              여성 BP
            </button>
            <button 
              onClick={() => setPartnerType('M')}
              className={`flex-1 py-3 rounded-xl border-2 transition-all font-bold ${partnerType === 'M' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 text-slate-400'}`}
            >
              남성 BP
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
          <div className="flex items-center gap-3">
            <ShieldCheck className={`w-6 h-6 ${isStarterPack ? 'text-green-500' : 'text-slate-300'}`} />
            <div>
              <p className="text-sm font-bold text-slate-800">셀라비브 스타터 팩</p>
              <p className="text-[10px] text-slate-400 uppercase">220 Point / One Team Bonus</p>
            </div>
          </div>
          <button 
            onClick={() => setIsStarterPack(!isStarterPack)}
            className={`w-12 h-6 rounded-full transition-all relative ${isStarterPack ? 'bg-indigo-600' : 'bg-slate-300'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isStarterPack ? 'left-7' : 'left-1'}`}></div>
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-600">예상 구매 실적 (CP)</label>
          <input 
            type="range" 
            min="0" 
            max="1000" 
            step="50"
            value={expectedCP}
            onChange={(e) => setExpectedCP(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs font-bold text-indigo-600">
            <span>0 CP</span>
            <span className="text-lg">{expectedCP} CP</span>
            <span>1000 CP</span>
          </div>
        </div>
      </div>

      <div className="bg-indigo-900 text-white p-6 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles className="w-16 h-16" />
        </div>
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-indigo-300" />
          예상 시너지 분석
        </h3>
        <ul className="space-y-3">
          {calculateImpact().map((text, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-indigo-100">
              <Plus className="w-4 h-4 mt-0.5 text-indigo-400" />
              {text}
            </li>
          ))}
        </ul>
        <button className="w-full mt-6 bg-white text-indigo-900 font-bold py-3 rounded-xl shadow-lg hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
          행동 플랜에 추가 <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SmartCalculator;
