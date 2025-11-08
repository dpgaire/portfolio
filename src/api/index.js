import axios from "axios";

// ✅ Constants
const BASE_URL = import.meta.env.VITE_NEXUS_BASE_URL;
const CACHE_EXPIRATION_TIME = 5 * 60 * 1000;
const API_KEY = import.meta.env.VITE_NEXUS_API_KEY;

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

// ✅ Generic API fetcher with caching + API key header
const fetchWithCache = async (endpoint, cacheKey) => {
  const cachedData = getCachedData(cacheKey);
  if (cachedData) return cachedData;

  try {
    const { data } = await axios.get(`${BASE_URL}/${endpoint}`, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw new Error("Unable to fetch data. Please try again later.");
  }
};

// ✅ API endpoints
export const fetchAboutData = () => fetchWithCache("about/public", "aboutData");
export const fetchProjectsData = () => fetchWithCache("projects/public", "projectsData");
export const fetchBlogsData = () => fetchWithCache("blogs/public", "blogsData");
export const fetchSkillsData = () => fetchWithCache("skills/public", "skillsData");

// ✅ Fetch by ID (uses same generic pattern)
export const fetchBlogById = (id) =>
  fetchWithCache(`blogs/${id}`, `blog-${id}`);

export const fetchProjectById = (id) =>
  fetchWithCache(`projects/${id}`, `project-${id}`);

// ✅ POST requests shouldn’t use cache but include header
export const postContactForm = async (formData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/contact`, formData, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    return data;
  } catch (error) {
    console.error("Failed to send contact form:", error);
    throw new Error("Unable to send message. Please try again later.");
  }
};
