
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User as UserIcon, Loader2 } from 'lucide-react';

interface AICoachProps {
  userProfile: UserProfile;
}

const AICoach: React.FC<AICoachProps> = ({ userProfile }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { 
      role: 'bot', 
      text: `${userProfile.name} 마스터님, 반갑습니다! 2026 프로모션 통합 달성을 위한 전략 비즈니스 코치입니다. 현재 직급(${userProfile.rank})과 상황에 맞춘 최적의 경로를 안내해 드릴게요. 무엇이 궁금하신가요?` 
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `
        사용자 프로필: 성별 ${userProfile.gender === 'F' ? '여성' : '남성'}, 현재 직급 ${userProfile.rank}, 평균 실적 ${userProfile.avgCP}CP.
        사용자 질문: ${userMsg}
        
        당신은 유사나 코리아 2026 프로모션 마스터 코치입니다.
        8가지 주요 프로모션 규정을 완벽히 숙지하고 있습니다.
        반드시 '현황 분석', '통합 진척도(표)', '이번 주 핵심 행동', 'D-Day 알림' 형식을 지켜 답변하세요.
        One Action, Multi-Reward 전략을 강조하세요.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            systemInstruction: "You are a world-class business coach for Usana Korea Brand Partners. Be professional, analytical, and passionate."
        }
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || '죄송합니다. 답변을 생성하지 못했습니다.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', text: '죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn overflow-hidden">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[500px]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-100 text-indigo-600 shadow-sm'}`}>
                {msg.role === 'user' ? <UserIcon className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                <span className="text-sm text-slate-500 font-medium">분석 중...</span>
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 sticky bottom-0">
        <div className="relative flex items-center">
          <input 
            type="text" 
            placeholder="코치에게 질문하기..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="absolute right-2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICoach;
