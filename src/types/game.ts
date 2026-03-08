export interface Coin {
    id: string;
    level: number;
    gridIndex: number;
}

export interface CoinLevel {
    name: string;
    value: number;
    emoji: string;
}

export const COIN_LEVELS: Record<number, CoinLevel> = {
    1: { name: '10원', value: 10, emoji: '₩10' },
    2: { name: '50원', value: 50, emoji: '₩50' },
    3: { name: '100원', value: 100, emoji: '₩100' },
    4: { name: '500원', value: 500, emoji: '₩500' },
    5: { name: '1,000원', value: 1_000, emoji: '💵' },
    6: { name: '5,000원', value: 5_000, emoji: '💴' },
    7: { name: '10,000원', value: 10_000, emoji: '💶' },
    8: { name: '50,000원', value: 50_000, emoji: '💷' },
    9: { name: '수표', value: 100_000, emoji: '🧾' },
    10: { name: '금괴', value: 500_000, emoji: '🥇' },
    11: { name: '다이아', value: 1_000_000, emoji: '💎' },
    12: { name: '토스 빌딩', value: 10_000_000, emoji: '🏢' },
    13: { name: '루비', value: 50_000_000, emoji: '♦️' },
    14: { name: '사파이어', value: 100_000_000, emoji: '🔷' },
    15: { name: '에메랄드', value: 500_000_000, emoji: '💚' },
    16: { name: '블랙 다이아', value: 1_000_000_000, emoji: '🖤' },
    17: { name: '우주석', value: 5_000_000_000, emoji: '🌙' },
    18: { name: '비트코인', value: 100_000_000_000, emoji: '₿' },
};

export const COIN_BASE_INCOME: Record<number, number> = {
    1: 1,
    2: 3,
    3: 8,
    4: 20,
    5: 50,
    6: 150,
    7: 400,
    8: 1_000,
    9: 3_000,
    10: 10_000,
    11: 50_000,
    12: 200_000,
    13: 1_000_000,
    14: 5_000_000,
    15: 20_000_000,
    16: 100_000_000,
    17: 500_000_000,
    18: 10_000_000_000,
};

export const GRID_SIZE = 5;
export const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

export type BoostType = 'AUTO_MERGE' | 'DOUBLE_INCOME' | 'AUTO_SPAWN';

export interface ActiveBoost {
    type: BoostType;
    endTime: number;
}

export type RewardSource =
    | 'passive_income'
    | 'merge_bonus'
    | 'daily_reward'
    | 'return_reward'
    | 'offline_reward'
    | 'achievement_reward'
    | 'monetization_bonus';

export interface TimedRewardPreview {
    source: Extract<RewardSource, 'return_reward' | 'offline_reward'>;
    amount: number;
    elapsedMs: number;
    eligibleAt: number;
    multiplier: number;
}

export interface GameState {
    coins: Coin[];
    totalMoney: number;
    incomePerTick: number;
    spawnLevel: number;
    spawnCooldown: number;
    incomeInterval: number;
    mergeBonusLevel: number;
    gemSystemUnlocked: boolean;
    bitcoinDiscovered: boolean;
    lastMergedId: string | null;
    activeBoosts: ActiveBoost[];
    unlockedAchievements: string[];
    totalMergeCount: number;
    totalEarnedMoney: number;
    discoveredLevels: number[];
    incomeMultiplierLevel: number;
    autoMergeInterval: number;
    dailyRewardLastClaimAt: number | null;
    dailyRewardLastClaimDayKey: string | null;
    dailyRewardStreak: number;
    dailyRewardTotalClaimed: number;
    dailyRewardLastAmount: number;
    lastSeenAt: number;
    lastSeenDayKey: string | null;
    returnRewardLastEligibleAt: number | null;
    returnRewardLastClaimAt: number | null;
    returnRewardTotalClaimed: number;
    pendingReturnReward: TimedRewardPreview | null;
    offlineRewardLastClaimAt: number | null;
    offlineRewardTotalClaimed: number;
    pendingOfflineReward: TimedRewardPreview | null;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    condition: (state: GameState) => boolean;
    reward?: number;
}

export const ACHIEVEMENTS: Achievement[] = [
    { id: 'first_merge', title: '첫 머지', description: '처음으로 코인을 머지하세요.', icon: '✨', condition: (state) => state.totalMergeCount >= 1, reward: 100 },
    { id: 'merge_10', title: '머지 초보', description: '코인을 10번 머지하세요.', icon: '🧩', condition: (state) => state.totalMergeCount >= 10, reward: 500 },
    { id: 'merge_50', title: '머지 중수', description: '코인을 50번 머지하세요.', icon: '⚙️', condition: (state) => state.totalMergeCount >= 50, reward: 2_000 },
    { id: 'merge_100', title: '머지 고수', description: '코인을 100번 머지하세요.', icon: '🏆', condition: (state) => state.totalMergeCount >= 100, reward: 5_000 },
    { id: 'merge_500', title: '머지 마스터', description: '코인을 500번 머지하세요.', icon: '👑', condition: (state) => state.totalMergeCount >= 500, reward: 50_000 },
    { id: 'daily_7', title: '출석 루키', description: '일일 보상을 7회 수령하세요.', icon: '🗓️', condition: (state) => state.dailyRewardTotalClaimed >= 7, reward: 20_000 },
    { id: 'daily_30', title: '출석 챔피언', description: '일일 보상을 30회 수령하세요.', icon: '📆', condition: (state) => state.dailyRewardTotalClaimed >= 30, reward: 200_000 },
    { id: 'return_3', title: '복귀 단골', description: '복귀 보상을 3회 수령하세요.', icon: '🎁', condition: (state) => state.returnRewardTotalClaimed >= 3, reward: 80_000 },
    { id: 'return_7', title: '복귀 베테랑', description: '복귀 보상을 7회 수령하세요.', icon: '🎉', condition: (state) => state.returnRewardTotalClaimed >= 7, reward: 220_000 },
    { id: 'offline_10', title: '절전 고수', description: '오프라인 보상을 10회 정산하세요.', icon: '🌙', condition: (state) => state.offlineRewardTotalClaimed >= 10, reward: 120_000 },
    { id: 'offline_25', title: '오프라인 매니저', description: '오프라인 보상을 25회 정산하세요.', icon: '🛌', condition: (state) => state.offlineRewardTotalClaimed >= 25, reward: 360_000 },
    { id: 'money_1k', title: '천 원의 시작', description: '자산 1,000원을 달성하세요.', icon: '💵', condition: (state) => state.totalMoney >= 1_000, reward: 100 },
    { id: 'money_10k', title: '만원 돌파', description: '자산 10,000원을 달성하세요.', icon: '💴', condition: (state) => state.totalMoney >= 10_000, reward: 1_000 },
    { id: 'money_100k', title: '십만 원 달성', description: '자산 100,000원을 달성하세요.', icon: '💶', condition: (state) => state.totalMoney >= 100_000, reward: 5_000 },
    { id: 'money_1m', title: '백만장자', description: '자산 1,000,000원을 달성하세요.', icon: '💎', condition: (state) => state.totalMoney >= 1_000_000, reward: 50_000 },
    { id: 'money_10m', title: '천만장자', description: '자산 10,000,000원을 달성하세요.', icon: '🏦', condition: (state) => state.totalMoney >= 10_000_000, reward: 500_000 },
    { id: 'money_100m', title: '억대 자산가', description: '자산 100,000,000원을 달성하세요.', icon: '💰', condition: (state) => state.totalMoney >= 100_000_000, reward: 5_000_000 },
    { id: 'money_1b', title: '부자의 문턱', description: '자산 1,000,000,000원을 달성하세요.', icon: '🤑', condition: (state) => state.totalMoney >= 1_000_000_000, reward: 50_000_000 },
    { id: 'level_5', title: '고급 지폐', description: '레벨 5 코인을 보유하세요.', icon: '📈', condition: (state) => state.coins.some((coin) => coin.level >= 5), reward: 500 },
    { id: 'level_8', title: '고액권 컬렉터', description: '레벨 8 코인을 보유하세요.', icon: '📊', condition: (state) => state.coins.some((coin) => coin.level >= 8), reward: 5_000 },
    { id: 'level_10', title: '금괴 확보', description: '금괴를 발견하세요.', icon: '🥇', condition: (state) => state.coins.some((coin) => coin.level >= 10), reward: 50_000 },
    { id: 'level_12', title: '토스 빌딩 도달', description: '토스 빌딩을 발견하세요.', icon: '🏢', condition: (state) => state.coins.some((coin) => coin.level >= 12), reward: 1_000_000 },
    { id: 'gem_unlock', title: '보석 시장 개방', description: '보석 시스템을 해금하세요.', icon: '💠', condition: (state) => state.gemSystemUnlocked, reward: 10_000_000 },
    { id: 'bitcoin', title: '전설의 비트코인', description: '비트코인을 발견하세요.', icon: '₿', condition: (state) => state.bitcoinDiscovered, reward: 1_000_000_000 },
    { id: 'full_board', title: '보드 점령', description: '보드를 코인으로 가득 채우세요.', icon: '🧱', condition: (state) => state.coins.length >= TOTAL_CELLS, reward: 1_000 },
    { id: 'spawn_level_5', title: '고급 생산자', description: '생성 레벨 5를 달성하세요.', icon: '🚀', condition: (state) => state.spawnLevel >= 5, reward: 10_000 },
    { id: 'spawn_level_10', title: '최상위 생산자', description: '생성 레벨 10을 달성하세요.', icon: '🌟', condition: (state) => state.spawnLevel >= 10, reward: 500_000 },
    {
        id: 'all_upgrades_max',
        title: '완벽주의자',
        description: '모든 업그레이드를 최대까지 달성하세요.',
        icon: '🏁',
        condition: (state) =>
            state.spawnLevel >= 11 &&
            state.spawnCooldown <= 200 &&
            state.incomeInterval <= 1_000 &&
            state.mergeBonusLevel >= 60 &&
            state.gemSystemUnlocked &&
            state.incomeMultiplierLevel >= 80 &&
            state.autoMergeInterval <= 200,
        reward: 1_000_000_000,
    },
    {
        id: 'max_money',
        title: '끝없는 부',
        description: '최대 자산 9,999조원을 달성하세요.',
        icon: '🎉',
        condition: (state) => state.totalMoney >= 9_999 * 1_000_000_000_000,
        reward: 0,
    },
];

export const MAX_MONEY = 9_999 * 1_000_000_000_000;
