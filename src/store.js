import { defineStore } from 'pinia';
import { loadFile, saveSessions } from './utils/file';

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    sessions: [],
    currentSession: {},
  }),
  getters: {},
  actions: {
    async load() {
      const data = await loadFile();

      this.sessions = data.sessions;

      //Check if there is a current session
      const lastSession = data.sessions[data.sessions.length - 1];
      if (lastSession && !lastSession.end) {
        this.currentSession = lastSession;
      }
    },
    async createAndStartSession(session) {
      this.sessions.push(session);
      this.currentSession = session;

      await saveSessions(this.sessions);
    },
    async endAndSaveSession(endTime) {
      if (this.currentSession?.id) {
        const index = this.sessions.findIndex((s) => s.id === this.currentSession.id);

        const session = this.sessions[index];
        session.end = endTime;

        this.sessions[index] = session;
        this.currentSession = {};

        await saveSessions(this.sessions);
      }
    },
    async cancelAndRemoveSession() {
      if (this.currentSession?.id) {
        const index = this.sessions.findIndex((s) => s.id === this.currentSession.id);
        this.sessions.splice(index, 1);
        this.currentSession = {};

        await saveSessions(this.sessions);
      }
    },
    async updateSessionComment(sessionId, comment) {
      const index = this.sessions.findIndex((s) => s.id === sessionId);
      this.sessions[index].comment = comment;

      await saveSessions(this.sessions);
    }
  },
});
