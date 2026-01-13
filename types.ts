
export enum Rank {
  ASSOCIATE = '애소시에이트',
  SHAREHOLDER = '쉐어홀더',
  BELIEVER = '빌리버',
  BUILDER = '빌더',
  ACHIEVER = '어치버',
  DIRECTOR = '디렉터',
  BRONZE = '브론즈',
  SILVER = '실버',
  GOLD = '골드',
  RUBY = '루비',
  EMERALD = '에메랄드',
  DIAMOND = '다이아몬드'
}

export interface UserProfile {
  name: string;
  gender: 'M' | 'F';
  rank: Rank;
  avgCP: number;
  isExecutive: boolean;
}

export interface PromotionStatus {
  id: string;
  name: string;
  target: string;
  progress: number; // percentage
  currentValue: string;
  targetValue: string;
  deadline: string;
  isGoldenQuarter: boolean;
}

export interface ActionPlan {
  week: string;
  task: string;
  impacts: string[];
}
