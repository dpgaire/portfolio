import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
  ShareIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  BookmarkIcon as BookmarkSolidIcon,
} from "@heroicons/react/24/solid";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Sample blog posts data (in a real app, this would come from an API)
  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable React Applications: Lessons from Production",
      excerpt:
        "Discover the architectural patterns and best practices I've learned while building large-scale React applications that serve thousands of users daily.",
      content: `
# Building Scalable React Applications: Lessons from Production

Building React applications that can scale to serve thousands of users daily is both an art and a science. Over the past five years of developing production React applications, I've learned valuable lessons about architecture, performance, and maintainability that I want to share with you.

## The Foundation: Project Structure

The way you structure your React project from day one will determine how easily you can scale it later. Here's the structure I've found most effective:

\`\`\`
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Layout components
│   └── features/        # Feature-specific components
├── hooks/               # Custom hooks
├── services/            # API services
├── utils/               # Utility functions
├── context/             # React context providers
├── types/               # TypeScript types
└── constants/           # Application constants
\`\`\`

## Component Architecture

### 1. Composition Over Inheritance

React's composition model is powerful, but it's easy to create tightly coupled components. I've learned to favor composition patterns that make components more reusable and testable.

\`\`\`jsx
// Instead of this
function UserCard({ user, showActions, showAvatar }) {
  return (
    <div className="card">
      {showAvatar && <Avatar src={user.avatar} />}
      <h3>{user.name}</h3>
      {showActions && <ActionButtons user={user} />}
    </div>
  );
}

// Do this
function UserCard({ children }) {
  return <div className="card">{children}</div>;
}

function UserProfile({ user }) {
  return (
    <UserCard>
      <Avatar src={user.avatar} />
      <h3>{user.name}</h3>
      <ActionButtons user={user} />
    </UserCard>
  );
}
\`\`\`

### 2. Custom Hooks for Logic Separation

Custom hooks are one of React's most powerful features for code reuse and separation of concerns.

\`\`\`jsx
function useUserData(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const userData = await api.getUser(userId);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  return { user, loading, error };
}
\`\`\`

## Performance Optimization

### 1. Code Splitting and Lazy Loading

One of the biggest performance wins comes from splitting your code and loading components only when needed.

\`\`\`jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

### 2. Memoization Strategies

Use React.memo, useMemo, and useCallback strategically, not everywhere.

\`\`\`jsx
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      computed: expensiveCalculation(item)
    }));
  }, [data]);

  const handleUpdate = useCallback((id, changes) => {
    onUpdate(id, changes);
  }, [onUpdate]);

  return (
    <div>
      {processedData.map(item => (
        <Item 
          key={item.id} 
          data={item} 
          onUpdate={handleUpdate} 
        />
      ))}
    </div>
  );
});
\`\`\`

## State Management

### 1. Context vs External Libraries

For most applications, React's built-in state management is sufficient. I use this decision tree:

- **Local state**: useState for component-specific state
- **Shared state**: useContext for state shared across multiple components
- **Complex state**: useReducer for complex state logic
- **Global state**: External library (Redux, Zustand) only when context becomes unwieldy

### 2. State Normalization

When dealing with complex data structures, normalize your state to avoid deep nesting and make updates more efficient.

\`\`\`jsx
// Instead of nested structure
const state = {
  users: [
    { id: 1, name: 'John', posts: [{ id: 1, title: 'Hello' }] }
  ]
};

// Use normalized structure
const state = {
  users: { 1: { id: 1, name: 'John', postIds: [1] } },
  posts: { 1: { id: 1, title: 'Hello', userId: 1 } }
};
\`\`\`

## Testing Strategy

### 1. Testing Pyramid

- **Unit tests**: Test individual functions and hooks
- **Integration tests**: Test component interactions
- **E2E tests**: Test critical user journeys

### 2. Testing Custom Hooks

\`\`\`jsx
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
\`\`\`

## Error Handling

Implement proper error boundaries and error handling strategies:

\`\`\`jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
\`\`\`

## Conclusion

Building scalable React applications requires thoughtful architecture, performance considerations, and robust testing. The patterns I've shared here have served me well in production applications serving thousands of users.

Remember, scalability isn't just about handling more users—it's about maintaining code quality, developer productivity, and user experience as your application grows.

What patterns have you found most effective in your React applications? I'd love to hear your experiences in the comments below.
      `,
      author: "Durga Gairhe",
      date: "2024-06-15",
      readTime: "8 min read",
      category: "React",
      tags: ["React", "Architecture", "Performance", "Best Practices"],
      featured: true,
      likes: 42,
      comments: 8,
      image: "/api/placeholder/800/400",
    },
    {
      id: 2,
      title: "The Future of Web Development: AI-Powered Code Generation",
      excerpt:
        "Exploring how AI is revolutionizing the way we write code and what it means for the future of software development.",
      content: `
# The Future of Web Development: AI-Powered Code Generation

Artificial Intelligence is transforming every aspect of software development, from code generation to testing and deployment. As developers, we're witnessing a paradigm shift that will fundamentally change how we build applications.

## The Current State of AI in Development

AI-powered development tools have evolved rapidly in recent years. GitHub Copilot, ChatGPT, and other AI assistants are already helping millions of developers write code faster and more efficiently.

### What AI Can Do Today

- **Code Completion**: Intelligent autocomplete that understands context
- **Bug Detection**: Automated identification of potential issues
- **Code Review**: AI-powered analysis of code quality and security
- **Documentation**: Automatic generation of comments and documentation
- **Testing**: Automated test case generation

## The Impact on Developer Productivity

My experience using AI tools in production has shown significant productivity gains:

### Time Savings
- 40% faster initial code writing
- 60% reduction in debugging time
- 50% faster documentation creation

### Quality Improvements
- Fewer syntax errors
- Better code consistency
- Improved security practices

## Challenges and Limitations

While AI is powerful, it's not without limitations:

### Current Challenges
- **Context Understanding**: AI sometimes misses broader application context
- **Security Concerns**: Generated code may contain vulnerabilities
- **Over-reliance**: Risk of developers losing fundamental skills
- **Bias**: AI models can perpetuate existing code biases

## The Future Landscape

Looking ahead, I see several trends emerging:

### 1. Specialized AI Models
We'll see AI models trained specifically for different domains:
- Frontend development
- Backend APIs
- Database optimization
- DevOps automation

### 2. Integrated Development Environments
IDEs will become AI-first, with intelligent features built into every aspect of development.

### 3. Natural Language Programming
The line between describing what you want and writing code will blur.

## Preparing for the AI-Driven Future

As developers, we need to adapt:

### Skills to Develop
- **AI Prompt Engineering**: Learning to communicate effectively with AI
- **Code Review**: Enhanced ability to review and validate AI-generated code
- **Architecture Thinking**: Focus on high-level design and system architecture
- **Domain Expertise**: Deep understanding of business problems

### Best Practices
1. Always review AI-generated code
2. Understand the code before using it
3. Test thoroughly
4. Maintain coding fundamentals

## Conclusion

AI is not replacing developers—it's augmenting our capabilities. The future belongs to developers who can effectively collaborate with AI tools while maintaining strong fundamental skills.

The key is to embrace AI as a powerful assistant while continuing to grow as thoughtful, creative problem solvers.
      `,
      author: "Durga Gairhe",
      date: "2024-06-10",
      readTime: "6 min read",
      category: "AI",
      tags: ["AI", "Machine Learning", "Code Generation", "Future Tech"],
      featured: false,
      likes: 38,
      comments: 12,
      image: "/api/placeholder/800/400",
    },
  ];

  const post = blogPosts.find((p) => p.id === parseInt(id));

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) {
    return (
      <div
        id="blog"
        className="min-h-screen bg-white dark:bg-dark-900 text-gray-900 dark:text-white"
      >
        <div id="blog" className="container-custom section-padding text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <button onClick={() => navigate("/")} className="btn-primary">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-dark-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <article className="pt-20">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-800 dark:to-dark-900 py-16">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate("/")}
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 mb-8"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Blog
            </motion.button>

            <div className="max-w-4xl mx-auto">
              {/* Category */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4"
              >
                <span className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 rounded-full text-sm font-medium">
                  <TagIcon className="w-3 h-3 mr-1" />
                  {post.category}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className=" text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                {post.title}
              </motion.h1>

              {/* Excerpt */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
              >
                {post.excerpt}
              </motion.p>

              {/* Meta Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400"
              >
                <div className="flex items-center">
                  <UserIcon className="w-5 h-5 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  <span>{post.readTime}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl sm:max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert w-full max-w-full overflow-auto"
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .replace(/\n/g, "<br>")
                      .replace(/```(.*?)```/gs, "<pre><code>$1</code></pre>")
                      .replace(/`(.*?)`/g, "<code>$1</code>")
                      .replace(/### (.*?)(<br>|$)/g, "<h3>$1</h3>")
                      .replace(/## (.*?)(<br>|$)/g, "<h2>$1</h2>")
                      .replace(/# (.*?)(<br>|$)/g, "<h1>$1</h1>"),
                  }}
                />

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-700"
                >
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-800 dark:hover:text-primary-300 transition-colors duration-200 cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Actions */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="card p-6"
                  >
                    <h3 className="font-semibold mb-4">Actions</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setLiked(!liked)}
                        className={`w-full flex items-center justify-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                          liked
                            ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                            : "bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600"
                        }`}
                      >
                        {liked ? (
                          <HeartSolidIcon className="w-5 h-5 mr-2" />
                        ) : (
                          <HeartIcon className="w-5 h-5 mr-2" />
                        )}
                        {liked ? "Liked" : "Like"} (
                        {post.likes + (liked ? 1 : 0)})
                      </button>

                      <button
                        onClick={() => setBookmarked(!bookmarked)}
                        className={`w-full flex items-center justify-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                          bookmarked
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                            : "bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600"
                        }`}
                      >
                        {bookmarked ? (
                          <BookmarkSolidIcon className="w-5 h-5 mr-2" />
                        ) : (
                          <BookmarkIcon className="w-5 h-5 mr-2" />
                        )}
                        {bookmarked ? "Saved" : "Save"}
                      </button>

                      <button
                        onClick={handleShare}
                        className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors duration-200"
                      >
                        <ShareIcon className="w-5 h-5 mr-2" />
                        Share
                      </button>
                    </div>
                  </motion.div>

                  {/* Comments */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="card p-6"
                  >
                    <h3 className="font-semibold mb-4">Discussion</h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <ChatBubbleLeftIcon className="w-5 h-5 mr-2" />
                      <span>{post.comments} comments</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Join the conversation on social media or reach out
                      directly.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogDetails;
