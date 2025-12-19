import { Session, SessionHistory } from '../types';

const STORAGE_KEY = 'dsarush_history';
const MAX_HISTORY = 50;

export const storageService = {
    saveSession: (session: Session): SessionHistory => {
        const history = storageService.getHistory();
        const newHistory = [session, ...history].slice(0, MAX_HISTORY);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
        return newHistory;
    },

    getHistory: (): SessionHistory => {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Failed to parse history', e);
            return [];
        }
    },

    clearHistory: () => {
        localStorage.removeItem(STORAGE_KEY);
    },

    getStats: () => {
        const history = storageService.getHistory();
        if (history.length === 0) return null;

        const totalWpm = history.reduce((acc, s) => acc + s.wpm, 0);
        const avgWpm = totalWpm / history.length;

        const maxWpm = Math.max(...history.map(s => s.wpm));
        const maxAccuracy = Math.max(...history.map(s => s.accuracy));

        return {
            avgWpm,
            maxWpm,
            maxAccuracy,
            totalSessions: history.length
        };
    }
};
