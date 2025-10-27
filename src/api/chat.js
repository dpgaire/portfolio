import axios from 'axios';

const API_BASE_URL = 'https://ai-chatbot-api-ten.vercel.app/api/chat';

export const createUser = async (fullName, email) => {
  const response = await axios.post(`${API_BASE_URL}/user-entry`, {
    fullName,
    email,
  });
  return response.data;
};
export const createChat = async (query) => {
  const response = await axios.post(`${API_BASE_URL}`, {
    query
  });
  return response.data;
};

export const createChatHistory = async (userId, title, messages) => {
  const response = await axios.post(`${API_BASE_URL}/history`, {
    userId,
    title,
    messages,
  });
  return response.data;
};

export const getChatHistories = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/history/${userId}`);
  return response.data;
};

export const getChatHistory = async (userId, chatId) => {
  const response = await axios.get(`${API_BASE_URL}/history/${userId}/${chatId}`);
  return response.data;
};

export const updateChatHistoryTitle = async (userId, chatId, title) => {
  const response = await axios.patch(`${API_BASE_URL}/history/${userId}/${chatId}`, {
    title,
  });
  return response.data;
};

export const deleteChatHistory = async (userId, chatId) => {
  const response = await axios.delete(`${API_BASE_URL}/history/${userId}/${chatId}`);
  return response.data;
};

export const updateChatHistory = async (userId, chatId, patchData = {}) => {
  const response = await axios.patch(`${API_BASE_URL}/history/${userId}/${chatId}`, patchData);
  return response.data;
};

