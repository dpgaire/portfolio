
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { ThemeProvider } from './context/ThemeContext';
import BlogDetails from './pages/BlogDetails';
import Layout from './layout';

function App() {
  return (
   <Router>
        <ThemeProvider>
            <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
          </Routes>
            </Layout>
        </ThemeProvider>
    </Router>
  )
}

export default App
