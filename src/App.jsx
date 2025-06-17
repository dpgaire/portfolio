
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { ThemeProvider } from './context/ThemeContext';
import BlogDetails from './pages/BlogDetails';

function App() {
  return (
   <Router>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<BlogDetails />} />

          </Routes>
        </ThemeProvider>
    </Router>
  )
}

export default App
