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
  Lightbulb,
  Plus,
  MessageSquare,
  Trash2,
  Edit,
  Minimize2,
  Maximize2,
} from "lucide-react";
import Modal from "./ui/Modal";

const smartSuggestions = [
  {
    icon: Sparkles,
    text: "Why hire Durga?",
    category: "why-hire",
  },
  {
    icon: Code,
    text: "Show me his frontend & backend skills",
    category: "skills",
  },
  {
    icon: Award,
    text: "Latest & featured projects",
    category: "projects",
  },
  {
    icon: Zap,
    text: "What's DevOS AI?",
    category: "projects",
  },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true); // Expanded by default in modal view
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const { name, email } = JSON.parse(userInfo);
      setUserName(name);
      setUserEmail(email);
      setShowModal(false);
      const savedHistory = localStorage.getItem("chatHistory");
      if (savedHistory) {
        setChatHistory(JSON.parse(savedHistory));
      }
    } else {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const createNewChat = () => {
    const newChatId = Date.now();
    const newChat = {
      id: newChatId,
      title: "New Chat",
      messages: [
        {
          id: Date.now(),
          text: "👋 Hello! I'm Durga's AI Assistant. How can I help you today?",
          sender: "bot",
          type: "welcome",
        },
      ],
    };
    setChatHistory((prev) => [newChat, ...prev]);
    setActiveChatId(newChatId);
    setMessages(newChat.messages);
  };

  useEffect(() => {
    if (isOpen && !activeChatId) {
      if (chatHistory.length > 0) {
        const lastChat = chatHistory[0];
        setActiveChatId(lastChat.id);
        setMessages(lastChat.messages);
      } else {
        createNewChat();
      }
    }
  }, [isOpen, activeChatId, chatHistory]);

  const handleSendMessage = async (messageText = inputValue) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
    };

    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInputValue("");
    setIsTyping(true);

    const updatedChatHistory = chatHistory.map((chat) =>
      chat.id === activeChatId
        ? { ...chat, messages: currentMessages }
        : chat
    );
    setChatHistory(updatedChatHistory);

    if (messages.length === 1) {
      const updatedChatHistoryWithTitle = updatedChatHistory.map((chat) =>
        chat.id === activeChatId ? { ...chat, title: messageText } : chat
      );
      setChatHistory(updatedChatHistoryWithTitle);
    }

    try {
      const response = await fetch(
        "https://ai-chatbot-api-ten.vercel.app/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: messageText,
            user: { name: userName, email: userEmail },
          }),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      const botResponse = {
        id: Date.now() + 1,
        text: data.response.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
        sender: "bot",
      };

      const finalMessages = [...currentMessages, botResponse];
      setMessages(finalMessages);
      setChatHistory(
        chatHistory.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: finalMessages }
            : chat
        )
      );
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      const errorResponse = {
        id: Date.now() + 1,
        text: "Sorry, something went wrong. Please try again.",
        sender: "bot",
      };
      const finalMessages = [...currentMessages, errorResponse];
      setMessages(finalMessages);
      setChatHistory(
        chatHistory.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: finalMessages }
            : chat
        )
      );
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

  const switchChat = (chatId) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setActiveChatId(chatId);
      setMessages(chat.messages);
    }
  };

  const deleteChat = (chatId) => {
    const updatedHistory = chatHistory.filter((c) => c.id !== chatId);
    setChatHistory(updatedHistory);
    if (activeChatId === chatId) {
      if (updatedHistory.length > 0) {
        switchChat(updatedHistory[0].id);
      } else {
        createNewChat();
      }
    }
  };

  const handleStartChat = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      localStorage.setItem("userInfo", JSON.stringify({ name: userName, email: userEmail }));
      setShowModal(false);
      setIsOpen(true);
    }
  };

  if (!isOpen) {
    return (
      <>
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
          <button
            onClick={() => setShowModal(true)}
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
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Before we start..."
        >
          <form onSubmit={handleStartChat}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email (Optional)
              </label>
              <input
                type="email"
                id="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors duration-300"
            >
              Start Chat
            </button>
          </form>
        </Modal>
      </>
    );
  }

  const renderMessage = (message) => {
    const isBot = message.sender === "bot";
    const isWelcome = message.type === "welcome";

    return (
      <div
        key={message.id}
        className={`flex ${isBot ? "" : "justify-end"} mb-4`}
      >
        <div className={`flex items-start gap-3 max-w-[85%]`}>
          {isBot && (
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ring-1 ring-offset-1 ${
                isWelcome
                  ? "bg-gradient-to-br from-emerald-400 to-green-600 ring-emerald-300/50"
                  : "bg-gradient-to-br from-gray-100 to-gray-200 ring-gray-300/50"
              }`}>
              <Bot
                className={`w-5 h-5 ${
                  isWelcome ? "text-white" : "text-emerald-600"
                }`}
              />
            </div>
          )}
          <div
            className={`px-4 py-3 rounded-2xl relative overflow-hidden backdrop-blur-sm border transition-all duration-300 ${
              isBot
                ? isWelcome
                  ? "bg-gradient-to-br from-blue-50/90 to-purple-50/90 border-blue-200/30 shadow-md"
                  : "bg-white/90 border-gray-200/50 shadow-sm"
                : "bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600 text-white shadow-md border-transparent"
            }`}>
            <p
              dangerouslySetInnerHTML={{ __html: message.text }}
              className={`text-sm leading-relaxed ${isBot ? "text-gray-800" : "text-white"}`}>
            </p>
          </div>
          {!isBot && (
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 shadow-inner border border-white/30">
              <User className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div
        style={{
          width: isExpanded ? '95vw' : '1000px',
          height: isExpanded ? '90vh' : '800px',
          maxWidth: '1000px',
          maxHeight: '800px',
        }}
        className="relative w-full h-full rounded-lg bg-white flex shadow-2xl transition-all duration-300"
      >
        {/* Sidebar */}
        <div className="w-1/4 bg-teal-900/95 text-white p-3 flex flex-col rounded-l-lg backdrop-blur-sm">
          <button
            onClick={createNewChat}
            className="flex items-center justify-between p-2.5 mb-4 rounded-lg hover:bg-white/10 transition-colors duration-200 border border-white/20"
          >
            <div className="flex items-center">
              <Bot size={18} className="mr-2" />
              <span className="font-semibold">New Chat</span>
            </div>
            <Edit size={16} />
          </button>
          <div className="flex-grow overflow-y-auto -mr-2 pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors duration-200 ${
                  activeChatId === chat.id
                    ? "bg-white/20"
                    : "hover:bg-white/10"
                }`}
                onClick={() => switchChat(chat.id)}
              >
                <MessageSquare size={16} className="mr-2 flex-shrink-0" />
                <span className="flex-grow truncate text-sm font-medium">
                  {chat.title}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className="ml-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="border-t border-white/20 pt-3 mt-2">
            <div className="flex items-center p-2.5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors duration-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center mr-2">
                <User size={18} />
              </div>
              <div>
                <span className="font-semibold">{userName}</span>
                <p className="text-xs text-gray-400">{userEmail}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="w-3/4 flex flex-col bg-gradient-to-b from-gray-50/50 to-white rounded-r-lg">
          <div className="p-3 border-b border-gray-200/80 flex justify-between items-center bg-white/50 backdrop-blur-sm rounded-tr-lg">
            <h2 className="text-base font-bold text-gray-700">
              {chatHistory.find((c) => c.id === activeChatId)?.title || "Chat"}
            </h2>
            <div className="flex items-center gap-1">
              {/* <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-md bg-green-400 text-white hover:bg-gray-200 transition-colors duration-200"
                title={isExpanded ? "Minimize" : "Expand"}>
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button> */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md bg-green-400 text-white transition-colors duration-200">
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-grow p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {messages.length > 1 ? (
              messages.map(renderMessage)
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center mb-4">
                  <Bot size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  How can I help you today?
                </h3>
                <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                  {smartSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(suggestion.text)}
                      className="text-sm p-3 rounded-xl flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 hover:shadow-md hover:scale-[1.02] transition-all duration-200 text-left"
                    >
                      <suggestion.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{suggestion.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm ring-1 ring-offset-1 ring-gray-300/50">
                    <Bot className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="bg-white/90 border border-gray-100 py-3 px-4 rounded-2xl shadow-sm">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200/80 bg-white/50 backdrop-blur-sm rounded-br-lg">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about Durga..."
                className="w-full h-12 px-4 pr-12 rounded-xl text-sm text-gray-700 border-2 border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 shadow-sm bg-white"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-2 top-2 w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-400 to-green-600 text-white flex items-center justify-center hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-center text-gray-500 mt-2">
              AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;