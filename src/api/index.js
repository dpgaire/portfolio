import axios from "axios";

// ✅ Constants
const BASE_URL = "https://ai-chatbot-api-ten.vercel.app/api";
const CACHE_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes

// ✅ Generic cache utilities
const getCachedData = (key) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_EXPIRATION_TIME;

    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch (error) {
    console.warn(`Error reading cache for key "${key}":`, error);
    return null;
  }
};

const setCachedData = (key, data) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    console.warn(`Error writing cache for key "${key}":`, error);
  }
};

// ✅ Generic API fetcher with caching
const fetchWithCache = async (endpoint, cacheKey) => {
  const cachedData = getCachedData(cacheKey);
  if (cachedData) return cachedData;

  try {
    const { data } = await axios.get(`${BASE_URL}/${endpoint}`);
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw new Error("Unable to fetch data. Please try again later.");
  }
};

// ✅ API endpoints
export const fetchAboutData = () => fetchWithCache("about", "aboutData");

export const fetchProjectsData = () => fetchWithCache("projects", "projectsData");

export const fetchBlogsData = () => fetchWithCache("blogs", "blogsData");

export const fetchSkillsData = () => fetchWithCache("skills", "skillsData");

// ✅ Fetch by ID (uses same generic pattern)
export const fetchBlogById = (id) =>
  fetchWithCache(`blogs/${id}`, `blog-${id}`);

export const fetchProjectById = (id) =>
  fetchWithCache(`projects/${id}`, `project-${id}`);

// ✅ POST requests shouldn’t use cache
export const postContactForm = async (formData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/contact`, formData);
    return data;
  } catch (error) {
    console.error("Failed to send contact form:", error);
    throw new Error("Unable to send message. Please try again later.");
  }
};
