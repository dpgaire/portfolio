import  { createContext, useContext, useState, useEffect } from 'react';
import { fetchAboutData } from '../api';

const AboutContext = createContext();

export const AboutProvider = ({ children }) => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAboutData = async () => {
      try {
        const data = await fetchAboutData();
        setAboutData(data[0]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getAboutData();
  }, []);

  return (
    <AboutContext.Provider value={{ aboutData, loading, error }}>
      {children}
    </AboutContext.Provider>
  );
};

export const useAbout = () => useContext(AboutContext);
