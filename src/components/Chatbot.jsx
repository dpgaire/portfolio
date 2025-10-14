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
  Menu,
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

const Chatbot = ({ setIsOpen }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [editingChatId, setEditingChatId] = useState(null);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

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
    setHistoryLoaded(true);
  }, []);

  useEffect(() => {
    if (historyLoaded) {
      if (chatHistory.length > 0) {
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
      } else {
        localStorage.removeItem("chatHistory");
      }
    }
  }, [chatHistory, historyLoaded]);

  useEffect(() => {
    const handleStorageChange = () => {
      const userInfo = localStorage.getItem("userInfo");
      if (!userInfo) {
        setChatHistory([]);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (setIsOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [setIsOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const createNewChat = () => {
    const newChatId = Date.now();
    inputRef.current.focus();
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
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    if (historyLoaded && setIsOpen && !activeChatId) {
      if (chatHistory.length > 0) {
        const lastChat = chatHistory[0];
        setActiveChatId(lastChat.id);
        setMessages(lastChat.messages);
      } else {
        createNewChat();
      }
    }
  }, [setIsOpen, activeChatId, chatHistory, historyLoaded]);

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
      chat.id === activeChatId ? { ...chat, messages: currentMessages } : chat
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
          chat.id === activeChatId ? { ...chat, messages: finalMessages } : chat
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
          chat.id === activeChatId ? { ...chat, messages: finalMessages } : chat
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
      setIsSidebarOpen(false);
    }
  };

  const handleDeleteChat = (chatId) => {
    if (window.confirm("Are you sure you want to delete this chat?")) {
      const updatedHistory = chatHistory.filter((c) => c.id !== chatId);
      setChatHistory(updatedHistory);
      if (activeChatId === chatId) {
        if (updatedHistory.length > 0) {
          switchChat(updatedHistory[0].id);
        } else {
          setActiveChatId(null);
          setMessages([]);
        }
      }
    }
  };

  const handleEditTitle = (chatId) => {
    setEditingChatId(chatId);
  };

  const handleUpdateTitle = (chatId, newTitle) => {
    const updatedHistory = chatHistory.map((chat) =>
      chat.id === chatId ? { ...chat, title: newTitle } : chat
    );
    setChatHistory(updatedHistory);
    setEditingChatId(null);
  };

  const handleStartChat = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ name: userName, email: userEmail })
      );
      setShowModal(false);
      setIsOpen(true);
    }
  };

  const openChatModal = () => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      setShowModal(true);
      return;
    }
    setIsOpen(true);
  };

    useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  if (!setIsOpen) {
    return (
      <button
        onClick={openChatModal}
        className="fixed bottom-5 right-5 bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-600 transition-colors duration-300 z-40"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  if (showModal) {
    return (
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Welcome to Durga's AI Assistant"
        description="To begin a conversation, please enter your name. Email is optional."
      >
        <form onSubmit={handleStartChat} className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border text-gray-700 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email (Optional)
            </label>
            <input
              type="email"
              id="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="mt-1 block w-full px-3 text-gray-700 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              placeholder="john.doe@example.com"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Start Chat
            </button>
          </div>
        </form>
      </Modal>
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
              }`}
            >
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
            }`}
          >
            <p
              dangerouslySetInnerHTML={{ __html: message.text }}
              className={`text-sm leading-relaxed ${
                isBot ? "text-gray-800" : "text-white"
              }`}
            ></p>
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
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div className="relative w-full h-full md:w-[95vw] md:h-[90vh] max-w-5xl rounded-lg bg-white flex shadow-2xl transition-all duration-300">
          {/* Sidebar */}
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden fixed top-6 left-6 z-20 p-2 bg-emerald-500 text-white rounded-md shadow-md focus:outline-none"
            >
              <Menu size={22} />
            </button>
          )}

          {/* X icon (shows when sidebar is open) */}
          {isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden fixed bottom-6 right-24 z-30 p-2 bg-emerald-500 text-white rounded-md shadow-md focus:outline-none"
            >
              <X size={22} />
            </button>
          )}

          {/* 🟢 Sidebar */}
          <div
            className={`fixed top-0 left-0  h-full w-3/4 sm:w-2/3 md:w-1/3 bg-gradient-to-br from-emerald-400 to-green-600 text-white p-3 flex flex-col 
        rounded-r-none md:rounded-l-lg  backdrop-blur-sm transition-transform duration-300 z-10
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:relative md:flex`}
          >
            {/* New Chat Button */}
            <button
              onClick={createNewChat}
              className="flex items-center justify-between p-2.5 mb-4 rounded-lg hover:bg-white/10 transition-colors duration-200 border border-white/20"
            >
              <div className="flex items-center gap-2">
                <Bot size={18} className="mr-2" />
                <span className="font-semibold">New Chat</span>
              </div>
              <Edit size={16} />
            </button>

            {/* Chat History */}
            <div className="flex-grow  overflow-y-auto -mr-2 pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-center mt-2 gap-2 justify-between p-2.5 rounded-lg cursor-pointer transition-colors duration-200 ${
                    activeChatId === chat.id
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                  }`}
                  onClick={() => {
                    switchChat(chat.id);
                    setIsSidebarOpen(false); // close on mobile
                  }}
                >
                  <MessageSquare size={16} className="mr-2 flex-shrink-0" />
                  {editingChatId === chat.id ? (
                    <input
                      type="text"
                      defaultValue={chat.title}
                      onBlur={(e) => handleUpdateTitle(chat.id, e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleUpdateTitle(chat.id, e.target.value);
                        }
                      }}
                      className="flex-grow bg-transparent text-sm font-medium outline-none"
                      autoFocus
                    />
                  ) : (
                    <span className="flex-grow truncate text-sm font-medium">
                      {chat.title}
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditTitle(chat.id);
                    }}
                    className="ml-2 text-white transition-colors duration-200"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat.id);
                    }}
                    className="ml-2 text-white transition-colors duration-200"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* User Info */}
            <div className="border-t border-white/20 pt-3 mt-2">
              <div className="flex items-center p-2.5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors duration-200">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center mr-2">
                  <User size={18} />
                </div>
                <div>
                  <span className="font-semibold">{userName}</span>
                  <p className="text-xs text-white">{userEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Optional overlay (dark background when open on mobile) */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-5 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main Chat Area */}
          <div className="w-full flex flex-col bg-gradient-to-b from-gray-50/50 to-white rounded-lg md:rounded-r-lg md:rounded-l-none">
            <div className="p-3 border-b border-gray-200/80 flex justify-between items-center bg-gradient-to-r from-emerald-400 to-green-600 text-white rounded-t-lg md:rounded-tr-lg md:rounded-tl-none">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-1.5 rounded-md bg-white/20 hover:bg-white/30 transition-colors duration-200"
              >
                <Menu size={18} />
              </button>
              <h2 className="text-base font-bold">Durga's AI Assistant</h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-md bg-white/20 hover:bg-white/30 transition-colors duration-200"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-grow p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {messages.length > 1 ? (
                messages.map(renderMessage)
              ) : (
                <div className="h-full flex flex-col justify-center items-center text-center">
                  {/* <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center mb-4">
                  <Bot size={32} className="text-white" />
                </div> */}
                  <div className="relative w-20 h-20 mb-6">
                    {/* 🟢 Thick gradient border */}
                    <div className="absolute inset-0 rounded-full p-[4px] bg-gradient-to-br from-emerald-400 to-green-600">
                      {/* Inner image circle */}
                      <div
                        className="w-full h-full rounded-full bg-center bg-cover"
                        style={{
                          backgroundImage:
                            "url('https://dpgaire.github.io/image-server/projects/durga.png')",
                        }}
                      ></div>
                    </div>

                    {/* 🤖 Bot icon at the top center */}
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-emerald-500 p-1.5 rounded-full shadow-md">
                      <Bot size={20} className="text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    How can I help you today?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
                    {smartSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(suggestion.text)}
                        className="text-sm p-3 rounded-xl flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 hover:shadow-md hover:scale-[1.02] transition-all duration-200 text-left"
                      >
                        <suggestion.icon
                          className="w-4 h-4 mr-2 flex-shrink-0"
                        />
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

            <div className="p-4 border-t border-white/20 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-md rounded-b-lg shadow-inner">
              <div className="flex items-center gap-3">
                {/* Input Field */}
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about Durga..."
                    disabled={isTyping}
                    className="w-full h-12 md:h-14 pl-4 py-2 pr-14 text-sm md:text-base text-gray-800 placeholder-gray-400 bg-white/80 border border-gray-200 rounded-xl shadow-sm outline-none transition-all duration-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 focus:bg-white"
                  />

                  {/* Send Button */}
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-400 to-green-600 text-white flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-center text-gray-500 mt-3 italic">
                AI can make mistakes — double-check important info.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
