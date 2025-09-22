import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  User,
  Bot,
  Sparkles,
  Award,
  Code,
  Zap,
  Bell,
  Star,
  Github,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  TrendingUp,
  Shield,
  Coffee,
  BookOpen,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Settings,
  Maximize2,
  Minimize2,
  CornerDownRight,
  Compass,
  Cpu,
  PenTool,
  Menu,
  Grid3X3,
} from "lucide-react";

const smartSuggestions = [
  {
    icon: Sparkles,
    text: "Why hire Durga?",
    category: "why-hire",
    popular: true,
    id: "why-hire",
  },
  {
    icon: Code,
    text: "Show me his frontend & backend skills",
    category: "skills",
    popular: true,
    id: "frontend-skills",
  },
  {
    icon: Award,
    text: "Latest & featured projects",
    category: "projects",
    popular: true,
    id: "featured-projects",
  },
  {
    icon: Zap,
    text: "What's DevOS AI?",
    category: "projects",
    popular: true,
    id: "current-project",
  },
  {
    icon: Github,
    text: "GitHub portfolio",
    category: "contact",
    popular: true,
    id: "contact",
  },
  {
    icon: Briefcase,
    text: "Is he available?",
    category: "availability",
    popular: true,
    id: "availability",
  },
];

const quickStarters = [
  "Show me his latest project",
  "How can I contact him?",
  "Is Durga available for projects?",
  "What are his key achievements?",
  "Tell me Durga's expertise",
  "Why should I hire him?",
];

const PremiumChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hello! I'm Durga's AI Assistant. I can tell you everything about his expertise, projects, and why he's the perfect developer for your next project. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
      type: "welcome",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const messagesEndRef = useRef(null);

  // Prevent background scrolling when chatbot is open
  useEffect(() => {
    if (isOpen) {
      // Store original body styles
      const originalStyle = window.getComputedStyle(document.body);
      const originalOverflow = originalStyle.overflow;
      const originalPaddingRight = originalStyle.paddingRight;
      
      // Get scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      return () => {
        // Restore original styles when chatbot closes
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isOpen]);

  // Detect mobile device and screen size changes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleResize = () => {
      checkMobile();
    };

    const handleVisualViewport = () => {
      if (window.visualViewport && isMobile) {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;
        const keyboardHeight = windowHeight - viewportHeight;
        setKeyboardHeight(keyboardHeight > 100 ? keyboardHeight : 0);
        
        // Force a small delay to ensure proper rendering
        setTimeout(() => {
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    };

    checkMobile();
    window.addEventListener('resize', handleResize);
    
    // Handle virtual keyboard on mobile
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleVisualViewport);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleVisualViewport);
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatAnswerToHTML = (answer) => {
    return answer
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n\n/g, "<br><br>")
      .replace(/\n/g, "<br>");
  };

  const handleSendMessage = async (messageText = inputValue) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setShowSuggestions(false);

    try {
      const response = await fetch("https://ai-chatbot-api-ten.vercel.app/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: messageText }),
      });

      console.log('response',response)

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const botResponse = {
        id: Date.now() + 1,
        text: formatAnswerToHTML(data.response),
        sender: "bot",
        timestamp: new Date(),
        type: "response",
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      const errorResponse = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting to my brain right now. Please try again in a moment.",
        sender: "bot",
        timestamp: new Date(),
        type: "response",
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle input focus for mobile keyboard
  useEffect(() => {
    if (isOpen && inputRef.current && !isTyping) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isTyping]);

  const handleInputFocus = () => {
    if (isMobile) {
      // Small delay to allow keyboard to appear
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }, 300);
    }
  };

  const handleInputBlur = () => {
    if (isMobile) {
      // Reset any transforms when keyboard disappears
      setTimeout(() => {
        setKeyboardHeight(0);
      }, 100);
    }
  };

  // Floating Action Button
  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="relative group w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600 shadow-lg md:shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center backdrop-blur-sm"
        >
          <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white z-10" />
          <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <Bell className="w-2 h-2 md:w-3 md:h-3 text-white" />
          </div>
          <div className="absolute -bottom-1 -left-1 w-6 h-6 md:w-8 md:h-8 bg-emerald-500/20 rounded-full animate-ping"></div>
        </button>
      </div>
    );
  }

  const renderMessage = (message) => {
    const isBot = message.sender === "bot";
    const isWelcome = message.type === "welcome";

    return (
      <div
        key={message.id}
        className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4 md:mb-6 px-2 md:px-4`}
      >
        <div className={`max-w-[85%] md:max-w-[80%] ${isBot ? "mr-2" : "ml-2"}`}>
          <div
            className={`px-3 py-3 md:px-4 md:py-4 rounded-2xl md:rounded-3xl relative overflow-hidden backdrop-blur-sm border transition-all duration-300
            ${
              isBot
                ? isWelcome
                  ? "bg-gradient-to-br from-blue-50/90 to-purple-50/90 border-blue-200/30 shadow-md"
                  : "bg-white/90 border-gray-200/50 shadow-sm"
                : "bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600 text-white shadow-md border-transparent"
            }`}
          >
            {/* Premium effects for welcome messages */}
            {isWelcome && (
              <>
                <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-xl rounded-full -mr-4 -mt-4 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 blur-xl rounded-full -ml-4 -mb-4 animate-pulse"></div>
              </>
            )}

            <div className="flex items-start space-x-2 md:space-x-3 relative z-10">
              {isBot && (
                <div
                  className={`w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ring-1 ring-offset-1
                  ${
                    isWelcome
                      ? "bg-gradient-to-br from-emerald-400 to-green-600 ring-emerald-300/50"
                      : "bg-gradient-to-br from-gray-100 to-gray-200 ring-gray-300/50"
                  }`}
                >
                  <Bot
                    className={`w-4 h-4 md:w-5 md:h-5 ${
                      isWelcome ? "text-white" : "text-emerald-600"
                    }`}
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p
                  dangerouslySetInnerHTML={{ __html: message.text }}
                  className={`text-sm md:text-[15px] leading-relaxed tracking-wide whitespace-pre-line break-words
                  ${
                    isBot
                      ? "text-gray-800 font-medium"
                      : "text-white font-semibold"
                  }`}
                ></p>
                <p
                  className={`text-xs mt-1 md:mt-2 ${
                    isBot ? "text-gray-500" : "text-emerald-100/80"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {!isBot && (
                <div className="w-7 h-7 md:w-9 md:h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 shadow-inner border border-white/30">
                  <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Responsive container styles
  const getContainerStyles = () => {
    if (isMobile && !isExpanded) {
      const availableHeight = keyboardHeight > 0 
        ? `${window.visualViewport?.height || window.innerHeight}px`
        : '100vh';
        
      return {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: availableHeight,
        width: '100vw',
        borderRadius: 0,
        maxHeight: 'none',
        overflow: 'hidden',
      };
    }
    
    if (isExpanded) {
      return {
        width: '95vw',
        height: '90vh',
        maxWidth: '1000px',
        maxHeight: '800px',
        borderRadius: '1rem',
      };
    }
    
    return {
      width: '384px', // w-96
      height: '600px',
      borderRadius: '1rem',
    };
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ease-out ${
        isExpanded
          ? "inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          : isMobile
          ? ""
          : "bottom-2 right-2 md:bottom-4 md:right-4"
      }`}
      onClick={(e) => {
        if (isExpanded && e.target === e.currentTarget) {
          setIsExpanded(false);
        }
      }}
    >
      <div
        className="bg-white shadow-2xl flex flex-col overflow-hidden"
        style={getContainerStyles()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-400 via-teal-500 to-green-600 text-white p-3 md:p-4 shadow-lg flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm opacity-30"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-inner">
                <Bot className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold">Durga's AI Assistant</h3>
                <div className="text-xs opacity-90 flex items-center">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Online & Ready to Help
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2">
              {!isMobile && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 md:p-2 rounded-lg hover:bg-white/20 transition-colors duration-200"
                  title={isExpanded ? "Minimize" : "Expand"}
                >
                  {isExpanded ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 md:p-2 rounded-lg hover:bg-white/20 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-2 right-16 md:right-20 opacity-20">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
          </div>
          <div className="absolute bottom-2 left-16 md:left-20 opacity-20">
            <Code className="w-3 h-3 md:w-4 md:h-4 animate-bounce" />
          </div>
        </div>

        {/* Messages Area - Scrollable */}
        <div 
          className="flex-1 min-h-0 bg-gradient-to-b from-gray-50/50 to-white"
          style={{
            maxHeight: isMobile && keyboardHeight > 0 
              ? `calc(${window.visualViewport?.height || window.innerHeight}px - 120px)` 
              : 'auto'
          }}
        >
          {showSuggestions && messages.length <= 1 ? (
            <div className="h-full p-3 md:p-4 overflow-y-auto">
              <div className="flex flex-col justify-center items-center h-full space-y-4">
                <div className="w-full">
                  <p className="text-xs font-semibold text-gray-600 mb-3 flex items-center justify-center md:justify-start">
                    <Lightbulb className="w-3 h-3 mr-1 text-emerald-500" />
                    Quick Start Questions
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                    {smartSuggestions.slice(0, isMobile ? 4 : 6).map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(suggestion.text)}
                        className="text-xs md:text-sm p-3 md:p-3 rounded-xl flex items-center justify-start bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 hover:shadow-md hover:scale-[1.02] transition-all duration-200 text-left"
                      >
                        <suggestion.icon className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{suggestion.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div 
              ref={messagesContainerRef}
              className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
              style={{
                paddingBottom: isMobile ? '1rem' : '0.5rem',
                paddingTop: '0.5rem',
              }}
            >
              {messages.map((message) => renderMessage(message))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start mb-4 px-2 md:px-4">
                  <div className="max-w-[85%]">
                    <div className="bg-white/90 border border-gray-100 py-3 md:py-4 px-3 md:px-4 rounded-2xl md:rounded-3xl shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-7 h-7 md:w-9 md:h-9 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center border border-gray-200">
                          <Bot className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area - Sticky */}
        <div 
          className="flex-shrink-0 bg-white border-t border-gray-200 p-3 md:p-4"
          style={{
            position: 'sticky',
            bottom: 8,
            zIndex: 10,
            // Ensure input stays visible above keyboard
            transform: isMobile && keyboardHeight > 0 ? 'translateY(0)' : 'none',
          }}
        >
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder="Ask me anything about Durga..."
                className="w-full h-10 md:h-12 px-3 md:px-4 pr-10 md:pr-12 rounded-xl text-sm md:text-base text-gray-700 border-2 border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 shadow-sm bg-white"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-1 md:right-2 top-1 md:top-2 w-8 h-8 md:w-8 md:h-8 rounded-lg bg-gradient-to-r from-emerald-400 to-green-600 text-white flex items-center justify-center hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
          </div>

          {/* Quick starters */}
          <div className="flex flex-wrap gap-1 md:gap-2 mt-2 md:mt-3">
            {quickStarters.slice(0, isMobile ? 3 : 4).map((starter, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(starter)}
                className="text-xs px-2 md:px-3 py-1 md:py-1.5 bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-600 rounded-lg transition-all duration-200 border border-transparent hover:border-emerald-200 flex items-center whitespace-nowrap"
                disabled={isTyping}
              >
                <CornerDownRight className="w-2 h-2 md:w-3 md:h-3 mr-1 flex-shrink-0" />
                <span className="truncate max-w-[120px] md:max-w-none">{starter}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumChatbot;