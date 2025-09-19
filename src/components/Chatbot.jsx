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
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { personData, priorityMatches } from "../assets/personal_data";

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
    id: "frontend-skills", // default focus
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
  {
    icon: TrendingUp,
    text: "Key achievements",
    category: "achievements",
    popular: true,
    id: "achievements",
  },
  {
    icon: Mail,
    text: "Contact details",
    category: "contact",
    popular: true,
    id: "contact",
  },
  {
    icon: BookOpen,
    text: "Educational background",
    category: "education",
    popular: false,
    id: "education",
  },
  {
    icon: Compass,
    text: "Durga's vision & mission",
    category: "vision",
    popular: false,
    id: "vision",
  },
  {
    icon: Lightbulb,
    text: "Development philosophy",
    category: "philosophy",
    popular: false,
    id: "philosophy",
  },
  {
    icon: Cpu,
    text: "AI & automation expertise",
    category: "skills",
    popular: false,
    id: "ai-expertise",
  },
  {
    icon: PenTool,
    text: "Blog insights",
    category: "knowledge",
    popular: false,
    id: "blog-insights",
  },
];

const quickStarters = [
  "Show me his latest project",
  "How can I contact him?",
  "Is Durga available for projects?",
  "What are his key achievements?",
  "Tell me Durga's expertise",
  "Why should I hire him?",
  "Show me his GitHub",
  "What’s DevOS AI?",
  "What is his educational background?",
  "What’s his long-term vision?",
  "Explain his development philosophy",
  "Does he work with AI & automation?",
  "What does he write about in his blog?",
];

const PremiumChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);
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
  const messagesEndRef = useRef(null);

  const API_KEY = import.meta.env.VITE_GEMINI_KEY;

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

  const findLocalAnswer = (question) => {
    const lowerQuestion = question.toLowerCase().trim();

    // 1. Exact Match
    const exactMatch = personData.find(
      (item) => item.question.toLowerCase().trim() === lowerQuestion
    );
    if (exactMatch) {
      return exactMatch.answer;
    }

    for (const match of priorityMatches) {
      if (match.keywords.some((keyword) => lowerQuestion.includes(keyword))) {
        const faq = personData.find((item) => item.id === match.id);
        if (faq) return faq.answer;
      }
    }

    // 3. Fallback: search through all data for partial matches
    for (const item of personData) {
      const questionWords = lowerQuestion.split(" ");
      const itemTags = item.tags.join(" ").toLowerCase();
      const itemAnswer = item.answer.toLowerCase();

      if (
        questionWords.some(
          (word) =>
            word.length > 2 &&
            (itemTags.includes(word) || itemAnswer.includes(word))
        )
      ) {
        return item.answer;
      }
    }

    return null; // Return null if no local answer is found
  };

  const generateGeminiResponse = async (question) => {
    if (!API_KEY) {
      return "My apologies, but the Gemini API key is not configured. Please ensure REACT_APP_GEMINI_API_KEY is set in your environment variables.";
    }

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "models/gemini-1.5-flash",
      });

      // Create context from person data
      const context = personData
        .map(
          (item) =>
            `Q: ${item.question}\nA: ${item.answer}\nCategory: ${
              item.category
            }\nTags: ${item.tags.join(", ")}`
        )
        .join("\n\n");

      const prompt = `You are Durga Gairhe's AI assistant. Based on the following information about Durga, answer the user's question in a short, sweet, and helpful manner. Keep responses concise but informative.\n\nContext about Durga Gairhe:\n${context}\n\nUser Question: ${question}\n\nInstructions:\n- Keep responses short and sweet (2-3 sentences max unless more detail is specifically requested)\n- Use the provided context to answer accurately\n- If the question is not covered in the context, politely redirect to available information\n- Maintain a professional but friendly tone\n- Use emojis sparingly and appropriately\n\nAnswer:`;

      const generationConfig = {
        temperature: 0.2,
      };

      const result = await model.generateContent(prompt, generationConfig);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I'm having trouble connecting to the AI service. Please check your API key or try again later.";
    }
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
      // First try to find a local answer
      let responseText = findLocalAnswer(messageText);

      // If no local answer found, use Gemini API
      if (!responseText) {
        responseText = await generateGeminiResponse(messageText);
      }

      // Enhanced typing simulation
      const typingDelay = Math.min(messageText.length * 50 + 1000, 2500);

      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: formatAnswerToHTML(responseText),
          sender: "bot",
          timestamp: new Date(),
          type: "response",
        };

        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }, typingDelay);
    } catch (error) {
      console.error("Error generating response:", error);
      setTimeout(() => {
        const errorResponse = {
          id: Date.now() + 1,
          text: "I apologize, but I'm having trouble processing your request right now. Please try again.",
          sender: "bot",
          timestamp: new Date(),
          type: "error",
        };
        setMessages((prev) => [...prev, errorResponse]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Enhanced Floating Button
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="relative group w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <MessageCircle className="w-7 h-7 text-white z-10" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <Bell className="w-3 h-3 text-white" />
          </div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-500/20 rounded-full animate-ping"></div>
        </button>
      </div>
    );
  }

  const renderMessage = (message) => {
    const isBot = message.sender === "bot";
    const isWelcome = message.type === "welcome";
    const isSystem = message.type === "system";

    return (
      <div
        key={message.id}
        className={`flex ${
          isBot ? "justify-start" : "justify-end"
        } mb-6 transition-all duration-500`}
      >
        <div
          className={`lg:max-w-[80%] w-full h-full ${isBot ? "mr-12" : "ml-12"} relative`}
        >
          <div
            className={`p-5 rounded-3xl relative overflow-hidden backdrop-blur-xl border 
            ${
              isBot
                ? isWelcome || isSystem
                  ? "bg-gradient-to-br from-blue-50/70 to-purple-50/70 border-white/30 shadow-xl"
                  : "bg-white/80 border-gray-200/50 shadow-lg"
                : "bg-gradient-to-br  from-emerald-400 via-teal-500 to-green-600 text-white shadow-2xl"
            }`}
          >
            {/* Floating glowing elements for premium feel */}
            {(isWelcome || isSystem) && (
              <>
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400/10 blur-2xl rounded-full -mr-6 -mt-6 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-400/10 blur-2xl rounded-full -ml-6 -mb-6 animate-pulse"></div>
              </>
            )}

            <div className="flex items-start space-x-3 relative z-10">
              {isBot && (
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ring-2 ring-offset-2
                  ${
                    isWelcome || isSystem
                      ? "bg-gradient-to-br  from-emerald-400  to-green-600 ring-purple-300"
                      : "bg-gradient-to-br from-gray-100 to-gray-200 ring-gray-300"
                  }`}
                >
                  <Bot
                    className={`w-5 h-5 ${
                      isWelcome || isSystem ? "text-white" : "to-green-600"
                    }`}
                  />
                </div>
              )}

              <div className="flex-1">
                <p
                  dangerouslySetInnerHTML={{ __html: message.text }}
                  className={`lg:text-[15px] text-sm leading-relaxed tracking-wide whitespace-pre-line
                  ${
                    isBot
                      ? "text-gray-800 font-medium"
                      : "text-white font-semibold"
                  }`}
                ></p>
                <p
                  className={`text-xs mt-2 ${
                    isBot ? "text-gray-500" : "text-blue-100/80"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {!isBot && (
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 shadow-inner border border-white/20">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div
      className={`fixed z-50 transition-all duration-500 ease-in-out ${
        isExpanded
          ? "inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          : "right-0 bottom-0 lg:right-2"
      }`}
      onClick={(e) => {
        if (isExpanded && e.target === e.currentTarget) {
          setIsExpanded(false);
        }
      }}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-500 ${
          isExpanded
            ? "w-11/12 h-5/6 max-w-4xl"
            : "w-full lg:w-96 h-full max-h-[91vh] lg:h-[600px]"
        }`}
      >
        {/* Chat Header */}
        <div className="relative bg-gradient-to-r from-emerald-400 via-teal-500 to-green-600 text-white rounded-t-2xl p-4 shadow-lg flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm opacity-30"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Durga's AI Assistant</h3>
                <div className="text-xs opacity-90 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  {API_KEY ? "Gemini AI Powered" : "Local Knowledge Base"}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors duration-200"
                title={isExpanded ? "Minimize" : "Expand"}
              >
                {isExpanded ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Animated decorative elements */}
          <div className="absolute top-2 right-4 opacity-20">
            <Sparkles className="w-5 h-5 animate-spin" />
          </div>
          <div className="absolute bottom-2 left-4 opacity-20">
            <Code className="w-4 h-4 animate-bounce" />
          </div>
        </div>

        {/* Chat Body - Fixed layout with proper flex structure */}
       
          <div className="flex flex-col flex-1 min-h-0 bg-white border-x border-gray-100">
            {/* Messages Area - This will now properly scroll */}
            {showSuggestions && messages.length <= 2 ? (
              <div className="flex-1 px-4 py-3 bg-gradient-to-b from-gray-50/80 to-white border-t border-gray-100 overflow-y-auto">
                <div className="flex flex-col justify-center items-start h-full">
                  <div className="w-full">
                    <p className="text-xs font-semibold text-gray-600 mb-3 flex items-center">
                      <Lightbulb className="w-3 h-3 mr-1 text-blue-500" />
                      Popular Questions
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {smartSuggestions.slice(0, 4).map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickQuestion(suggestion.text)}
                          className={`text-xs h-8 px-3 rounded-lg flex items-center justify-center transition-all duration-200 ${
                            suggestion
                              ? "bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 text-blue-700 hover:shadow-md"
                              : "bg-white border border-gray-200 text-gray-700 hover:border-blue-300"
                          }`}
                        >
                          {suggestion.icon && (
                            <suggestion.icon className="w-3 h-3 mr-1" />
                          )}
                          {suggestion.text}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50/50 to-white min-h-0">
                <div className="space-y-2">
                  {messages.map((message) => renderMessage(message))}
                </div>
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="max-w-[85%] mr-6">
                      <div className="bg-white border border-gray-100 py-4 px-2 rounded-2xl shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center border border-gray-200">
                            <Bot className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
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

            {/* Input Area - Fixed at bottom */}
            <div className="flex-shrink-0 p-4 bg-white border-t border-gray-100">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about Durga..."
                    className="w-full h-12 px-4 pr-12 rounded-xl text-gray-600 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 shadow-sm"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className="absolute right-2 top-2 w-8 h-8 rounded-lg  bg-gradient-to-r from-emerald-400  to-green-600 text-white flex items-center justify-center hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick starters */}
              <div className="flex flex-wrap gap-2 mt-3">
                {quickStarters.slice(0, 4).map(
                  (starter, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(starter)}
                      className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-200 flex items-center"
                    >
                      <CornerDownRight className="w-3 h-3 mr-1" />
                      {starter}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
      

        {/* Chat Footer */}
        <div className="flex-shrink-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-500/10 rounded-b-2xl border-t border-gray-200 p-2 text-center">
          <p className="text-xs text-gray-500">
            {API_KEY ? "Powered by Gemini AI" : "Local Knowledge Base"} • Always
            learning
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumChatbot;
