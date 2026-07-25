import { create } from "zustand";
import { Message } from "@/types/community";

interface ChatState {
  messages: Message[];
  isInitialLoading: boolean;
  setMessages: (messages: Message[]) => void;
  appendNewMessages: (newMessages: Message[]) => void;
  setInitialLoading: (loading: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isInitialLoading: false,

  setMessages: (messages) => set({ messages }),

  // Place newly polled messages at the beginning of the array (Index 0)
  appendNewMessages: (incoming) =>
    set((state) => {
      if (!incoming || incoming.length === 0) return state;

      const existingIds = new Set(state.messages.map((m) => m._id));
      const freshMessages = incoming.filter((m) => !existingIds.has(m._id));

      if (freshMessages.length === 0) return state;

      // Unshift new items so index 0 remains the absolute newest message
      return { messages: [...freshMessages.reverse(), ...state.messages] };
    }),

  setInitialLoading: (isInitialLoading) => set({ isInitialLoading }),
}));

export interface PollOption {
  _id: string;
  text: string;
  votes: number;
  votedUserIds?: [];
}

export interface PollData {
  _id: string;
  societyId: string;
  authorName: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  votedUserIds: string[];
  createdAt: string;
  userVotedOptionId?: string;
  timeAgo?: string;
}

interface PollState {
  polls: PollData[];
  isInitialLoading: boolean;
  setPolls: (polls: PollData[]) => void;
  appendNewPolls: (newPolls: PollData[]) => void;
  updatePollVote: (pollId: string, updatedPoll: PollData) => void;
  setInitialLoading: (loading: boolean) => void;
}

export const usePollStore = create<PollState>((set) => ({
  polls: [],
  isInitialLoading: false,

  setPolls: (polls) => set({ polls }),

  appendNewPolls: (incoming) =>
    set((state) => {
      if (!incoming || incoming.length === 0) return state;

      const existingIds = new Set(state.polls.map((p) => p._id));
      const freshPolls = incoming.filter((p) => !existingIds.has(p._id));

      if (freshPolls.length === 0) return state;

      return { polls: [...freshPolls.reverse(), ...state.polls] };
    }),

  updatePollVote: (pollId, updatedPoll) =>
    set((state) => ({
      polls: state.polls.map((p) => (p._id === pollId ? updatedPoll : p)),
    })),

  setInitialLoading: (isInitialLoading) => set({ isInitialLoading }),
}));
