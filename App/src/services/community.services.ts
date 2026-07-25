import { api } from "@/utils/axios"; // Your configured Axios instance
import {
  Message,
  SendMessagePayload,
  ChatApiResponse,
} from "@/types/community";

export const chatService = {
  getMessages: async (
    societyId: string,
    lastMessageId?: string,
  ): Promise<ChatApiResponse<Message[]>> => {
    const params: Record<string, string> = { societyId };
    if (lastMessageId) params.lastMessageId = lastMessageId;

    const { data } = await api.get<ChatApiResponse<Message[]>>(
      "/community/messages",
      { params },
    );
    return data;
  },

  sendMessage: async (
    payload: SendMessagePayload,
  ): Promise<ChatApiResponse<Message>> => {
    console.log(payload);
    const { data } = await api.post<ChatApiResponse<Message>>(
      "/community/message",
      payload,
    );
    return data;
  },
};

export interface CreatePollPayload {
  societyId: string;
  authorName: string;
  question: string;
  options: string[];
}

export interface VotePollPayload {
  userId: string;
  optionId: string;
}

export const pollService = {
  getPolls: async (societyId: string, lastPollId?: string) => {
    try {
      console.log("PRESENT");
      const response = await api.get(`/community/polls/${societyId}`);
      // console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching polls:", error?.response?.data || error);
      throw error;
    }
  },

  createPoll: async (payload: CreatePollPayload) => {
    try {
      const response = await api.post("/community/poll", payload);
      return response.data;
    } catch (error: any) {
      console.error("Error creating poll:", error?.response?.data || error);
      throw error;
    }
  },

  votePoll: async (pollId: string, payload: VotePollPayload) => {
    try {
      const response = await api.post(
        `/community/polls/${pollId}/vote`,
        payload,
      );
      return response.data;
    } catch (error: any) {
      console.error("Error voting on poll:", error?.response?.data || error);
      throw error;
    }
  },
};
