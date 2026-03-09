import type { GameState } from '../types/game';
import { ACHIEVEMENTS } from '../types/game';

export function getNewlyUnlockedAchievementIds(state: GameState): string[] {
    return ACHIEVEMENTS
        .filter((achievement) => !state.unlockedAchievements.includes(achievement.id))
        .filter((achievement) => achievement.condition(state))
        .map((achievement) => achievement.id);
}

export function getAchievementRewardTotal(achievementIds: string[]): number {
    return achievementIds.reduce((sum, id) => {
        const achievement = ACHIEVEMENTS.find((item) => item.id === id);
        return sum + (achievement?.reward ?? 0);
    }, 0);
}
