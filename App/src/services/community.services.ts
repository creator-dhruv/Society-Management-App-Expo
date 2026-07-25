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
