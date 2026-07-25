export interface Message {
  _id: string;
  societyId: string;
  userId: string;
  name: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface SendMessagePayload {
  societyId: string;
  userId: string;
  name: string;
  message: string;
}

export interface ChatApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
