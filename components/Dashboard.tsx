
import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { PROMOTIONS_DATA } from '../constants';
import { 
  TrendingUp, Zap, Star, Info, X, 
  MapPin, Calendar, Target, Award, Edit3, Save, CheckCircle2, BookOpen
} from 'lucide-react';

interface DashboardProps {
  userProfile: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile }) => {
  const [selectedPromoIndex, setSelectedPromoIndex] = useState<number | null>(null);
  const [points, setPoints] = useState<Record<string, number>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  // 포인트 로드 및 초기화
  useEffect(() => {
    const savedPoints = localStorage.getItem(`usana_points_2026_${userProfile.name}`);
    if (savedPoints) {
      setPoints(JSON.parse(savedPoints));
    } else {
      const initial = PROMOTIONS_DATA.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {});
      setPoints(initial);
    }
  }, [userProfile.name]);

  const savePoints = (id: string, value: number) => {
    const newPoints = { ...points, [id]: value };
    setPoints(newPoints);
    localStorage.setItem(`usana_points_2026_${userProfile.name}`, JSON.stringify(newPoints));
    setIsEditing(false);
  };

  const handleUpdateClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setSelectedPromoIndex(index);
    setIsEditing(true);
    setEditValue(points[PROMOTIONS_DATA[index].id]?.toString() || "0");
  };

  return (
    <div className="p-4 space-y-6 animate-fadeIn pb-24">
      {/* 상단 프로필 섹션 */}
      <section className="bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Star className="w-24 h-24 fill-white" />
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
            <span className="text-2xl font-bold">BP</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">{userProfile.name} 마스터님</h2>
            <div className="flex items-center gap-2 text-indigo-100 text-sm">
              <span className="bg-white/20 px-2 py-0.5 rounded-full font-bold">{userProfile.rank}</span>
              <span className="w-1 h-1 bg-white/40 rounded-full"></span>
              <span>13주 평균 {userProfile.avgCP}CP</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center">
            <p className="text-[10px] uppercase tracking-wider text-indigo-200 font-bold">진행 프로모션</p>
            <p className="text-lg font-bold">8개 통합관리</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center">
            <p className="text-[10px] uppercase tracking-wider text-indigo-200 font-bold">상태</p>
            <p className="text-lg font-bold text-yellow-300">실시간 추적중</p>
          </div>
        </div>
      </section>

      {/* 프로모션 리스트 */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            2026 프로모션 달성 현황
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {PROMOTIONS_DATA.map((promo, idx) => {
            const currentVal = points[promo.id] || 0;
            const progress = Math.min(Math.round((currentVal / promo.targetValue) * 100), 100);
            
            return (
              <button 
                key={promo.id} 
                onClick={() => {
                  setSelectedPromoIndex(idx);
                  setIsEditing(false);
                }}
                className="w-full text-left bg-white p-4 rounded-2xl border border-slate-100 shadow-sm active:scale-[0.98] transition-all hover:border-indigo-200 group relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors flex items-center gap-1">
                      {promo.name}
                      <BookOpen className="w-3 h-3 text-slate-300" />
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      현재: {currentVal} / 목표: {promo.targetValue} {promo.unit}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full mb-1 ${progress >= 100 ? 'bg-green-100 text-green-600' : 'bg-indigo-50 text-indigo-600'}`}>
                      {progress}%
                    </span>
                    <div 
                      onClick={(e) => handleUpdateClick(e, idx)}
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${promo.color} transition-all duration-700 ease-out`} 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 시너지 팁 */}
      <section className="bg-yellow-50 p-5 rounded-3xl border border-yellow-100 border-dashed">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-yellow-600 fill-yellow-600" />
          <h4 className="font-bold text-yellow-800 tracking-tight">마스터 코치의 시너지 전략</h4>
        </div>
        <p className="text-xs text-yellow-700 leading-relaxed font-medium">
          각 항목을 클릭하여 <span className="underline decoration-yellow-400 font-bold">A-Z 가이드</span>를 확인하세요. 
          연필 아이콘을 눌러 실제 본인의 점수를 입력하면 달성률이 반영됩니다.
        </p>
      </section>

      {/* 가이드 및 점수 입력 통합 모달 */}
      {selectedPromoIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-slate-900/70 backdrop-blur-sm flex items-end justify-center animate-fadeIn p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-[40px] sm:rounded-[40px] p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => {
                setSelectedPromoIndex(null);
                setIsEditing(false);
              }}
              className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-6">
              <div className={`w-14 h-14 rounded-2xl ${PROMOTIONS_DATA[selectedPromoIndex].color} mb-4 flex items-center justify-center text-white shadow-xl`}>
                <Award className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">{PROMOTIONS_DATA[selectedPromoIndex].name}</h2>
              <p className="text-indigo-600 font-bold text-sm mt-1">{PROMOTIONS_DATA[selectedPromoIndex].details.reward}</p>
            </div>

            {isEditing ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    현재 나의 점수/수치 ({PROMOTIONS_DATA[selectedPromoIndex].unit})
                  </label>
                  <div className="flex gap-2">
                    <input 
                      autoFocus
                      type="number" 
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="flex-1 text-2xl font-bold bg-white border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                    <button 
                      onClick={() => savePoints(PROMOTIONS_DATA[selectedPromoIndex].id, parseFloat(editValue) || 0)}
                      className="bg-indigo-600 text-white px-6 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg"
                    >
                      <Save className="w-5 h-5" /> 저장
                    </button>
                  </div>
                  <p className="mt-4 text-xs text-slate-400 text-center">
                    목표 수치: {PROMOTIONS_DATA[selectedPromoIndex].targetValue} {PROMOTIONS_DATA[selectedPromoIndex].unit}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                      <Calendar className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase">자격 기간</span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-700">{PROMOTIONS_DATA[selectedPromoIndex].details.period}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                      <Target className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase">대상 직급</span>
                    </div>
                    <p className="text-[11px] font-bold text-slate-700">{PROMOTIONS_DATA[selectedPromoIndex].details.target}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Info className="w-4 h-4 text-indigo-500" />
                    상세 가이드 (A to Z)
                  </h3>
                  <div className="space-y-3">
                    {PROMOTIONS_DATA[selectedPromoIndex].details.fullGuide.map((step, sidx) => (
                      <div key={sidx} className="flex gap-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 flex gap-3 pb-4">
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
                  >
                    <Edit3 className="w-5 h-5" /> 내 점수 입력
                  </button>
                  <button 
                    onClick={() => setSelectedPromoIndex(null)}
                    className="px-6 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all"
                  >
                    닫기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
