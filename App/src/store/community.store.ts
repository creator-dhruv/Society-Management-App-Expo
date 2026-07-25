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
