import axios from 'axios';

const CACHE_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes

const getCachedData = (key) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_EXPIRATION_TIME) {
    localStorage.removeItem(key);
    return null;
  }
  return data;
};

const setCachedData = (key, data) => {
  const cacheData = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(cacheData));
};

export const fetchAboutData = async () => {
  const cacheKey = 'aboutData';
  const cachedData = getCachedData(cacheKey);
  if (cachedData) return cachedData;

  const response = await axios.get('https://ai-chatbot-api-ten.vercel.app/api/about');
  setCachedData(cacheKey, response.data);
  return response.data;
};

export const fetchProjectsData = async () => {
  const cacheKey = 'projectsData';
  const cachedData = getCachedData(cacheKey);
  if (cachedData) return cachedData;

  const response = await axios.get('https://ai-chatbot-api-ten.vercel.app/api/projects');
  setCachedData(cacheKey, response.data);
  return response.data;
};

export const fetchBlogsData = async () => {
  const cacheKey = 'blogsData';
  const cachedData = getCachedData(cacheKey);
  if (cachedData) return cachedData;

  const response = await axios.get('https://ai-chatbot-api-ten.vercel.app/api/blogs');
  setCachedData(cacheKey, response.data);
  return response.data;
};

export const fetchSkillsData = async () => {
  const cacheKey = 'skillsData';
  const cachedData = getCachedData(cacheKey);

  if (cachedData) return cachedData;
  const response = await axios.get('https://ai-chatbot-api-ten.vercel.app/api/skills');
  setCachedData(cacheKey, response.data);

  return response.data;

};

export const fetchBlogById = async (id) => {
  const cacheKey = `blog-${id}`;
  const cachedData = getCachedData(cacheKey);

  if (cachedData) return cachedData;
  const response = await axios.get(`https://ai-chatbot-api-ten.vercel.app/api/blogs/${id}`);

  setCachedData(cacheKey, response.data);

  return response.data;

}


export const fetchProjectById = async (id) => {
  const cacheKey = `project-${id}`;
  const cachedData = getCachedData(cacheKey);

  if (cachedData) return cachedData;
  const response = await axios.get(`https://ai-chatbot-api-ten.vercel.app/api/projects/${id}`);

  setCachedData(cacheKey, response.data);

  return response.data;

}

export const postContactForm = async (data) => {

  const response = await axios.post('https://ai-chatbot-api-ten.vercel.app/api/contact', data);

  return response.data;

};