import  { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  User,
  Bot,
  Sparkles,
  Award,
  Code,
  Rocket,
  Scale,
  Brain,

  MessageSquare,
  Trash2,
  Edit,
  Menu,
} from "lucide-react";
import Modal from "./ui/Modal";
import {
  createUser,
  createChatHistory,
  getChatHistories,
  getChatHistory,
  updateChatHistoryTitle,
  deleteChatHistory,
  updateChatHistory,
  createChat,
} from "../api/chat";

const smartSuggestions = [
  {
    icon: Sparkles,
    displayText: "Why hire?",
    text: "Why hire Durga?",
    category: "why-hire",
  },
  {
    icon: Code,
    displayText: "Skills",
    text: "Show me his frontend & backend skills",
    category: "skills",
  },
  {
    icon: Award,
    displayText: "Projects",
    text: "Latest & featured projects",
    category: "projects",
  },
  {
    icon: Rocket,
    displayText: "After 5 years",
    text: "Where do you see yourself in 5 years?",
    category: "future",
  },
  {
    icon: Scale,
    displayText: "Strengths & Weaknesses",
    text: "What are your strengths and weaknesses?",
    category: "personality",
  },
  {
    icon: Brain,
    displayText: "Mindset",
    text: "What is his core mindset?",
    category: "mindset",
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
  const [userId, setUserId] = useState(null);
  const [editingChatId, setEditingChatId] = useState(null);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [isNewChat, setIsNewChat] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chatUser"));
    if (user) {
      setUserName(user.payload.fullName);
      setUserEmail(user.payload.email);
      setUserId(user.id);
      setShowModal(false);
      fetchHistory(user.id);
    } else {
      setShowModal(true);
    }

    setHistoryLoaded(true);
  }, []);

  const fetchHistory = async (id) => {
    const response = await getChatHistories(id);
    if (response.success) {
      // Sort chatHistory by ID in descending order (latest first)
      const sortedChatHistory = response.chatHistory.sort((a, b) => b.id - a.id);
      setChatHistory(sortedChatHistory);
    }
  };

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
    setIsNewChat(true);
    setMessages([
      {
        id: Date.now(),
        text: "👋 Hello! I'm Durga's AI Assistant. How can I help you today?",
        sender: "bot",
        type: "welcome",
      },
    ]);
    setIsSidebarOpen(false);
    inputRef.current.focus();
  };

  useEffect(() => {
    if (historyLoaded && setIsOpen && !activeChatId && userId) {
      if (chatHistory.length > 0) {
        const lastChat = chatHistory[0];
        setActiveChatId(lastChat?.id);
        setMessages(lastChat?.messages);
        setIsNewChat(false); // It's an existing chat
      } else {
        createNewChat();
      }
    }
  }, [setIsOpen, activeChatId, chatHistory, historyLoaded, userId]);

  const handleSendMessage = async (messageText = inputValue) => {
    const text = messageText.trim();
    if (!text) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp,
    };

    const messagesWithUser = [...messages, userMessage];
    setMessages(messagesWithUser);
    setInputValue("");
    setIsTyping(true);

    try {
      const chatResponse = await createChat(text);
      const botText =
        chatResponse?.response?.replace(
          /\*\*(.*?)\*\*/g,
          "<strong>$1</strong>"
        ) || "Sorry, I didn’t understand that.";

      const botMessage = {
        id: Date.now() + 1,
        text: botText,
        sender: "bot",
        timestamp,
      };

      setIsTyping(false);

      const finalMessages = [...messagesWithUser, botMessage];
      setMessages(finalMessages);

      if (isNewChat) {
        // This is a new chat, so create a new history entry (POST)
        const newHistory = await createChatHistory(userId, text, finalMessages);
        if (newHistory.success) {
          setActiveChatId(newHistory.chatHistory.id);
          setIsNewChat(false); // Reset the flag
        }
      } else if (activeChatId) {
        // This is an existing chat, so update it (PATCH)
        await updateChatHistory(userId, activeChatId, {
          messages: [userMessage, botMessage],
        });
      }

      await fetchHistory(userId);
    } catch (error) {
      console.error("Error during message handling:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "⚠️ Sorry, something went wrong. Please try again.",
        sender: "bot",
        timestamp,
      };
      setMessages([...messagesWithUser, errorMessage]);
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

  const switchChat = async (chatId) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setActiveChatId(chat.id);
      setIsNewChat(false); // It's an existing chat
      const response = await getChatHistory(userId, chatId);
      if (response.success) {
        setMessages(response.chatHistory.payload.messages);
      }
      setIsSidebarOpen(false);
    }
  };

  const handleDeleteChat = async (chatId) => {
    if (window.confirm("Are you sure you want to delete this chat?")) {
      const response = await deleteChatHistory(userId, chatId);
      if (response.success) {
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
    }
  };

  const handleEditTitle = (chatId) => {
    setEditingChatId(chatId);
  };

  const handleUpdateTitle = async (chatId, newTitle) => {
    const response = await updateChatHistoryTitle(userId, chatId, newTitle);
    if (response.success) {
      const updatedHistory = chatHistory.map((chat) =>
        chat.id === chatId ? { ...chat, title: newTitle } : chat
      );
      setChatHistory(updatedHistory);
      setEditingChatId(null);
    }
  };

  const handleStartChat = async (e) => {
    e.preventDefault();
    if (userName.trim()) {
      const response = await createUser(userName, userEmail);
      if (response.success) {
        localStorage.setItem("chatUser", JSON.stringify(response.user));
        localStorage.setItem("userId", response.user.id);
        setUserId(response.user.id);
        setShowModal(false);
        setIsOpen(true);
      }
    }
  };

  const openChatModal = () => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      setShowModal(true);
      return;
    }
    setIsOpen(true);
  };

  if (!setIsOpen) {
    return (
      <button
        onClick={openChatModal}
        className="fixed invisible bottom-5 right-5 bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-600 transition-colors duration-300 z-40"
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
        description="To begin a conversation, please enter your name and email(optional)."
      >
        <form onSubmit={handleStartChat} className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name*
            </label>
            <input
              type="text"
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border text-gray-700 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              placeholder="Durga Gairhe"
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
              placeholder="gairhedurga13@gmail.com"
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
    const timestamp = new Date(
      message.timestamp || Date.now()
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <div
        key={message.id}
        className={`flex ${
          isBot ? "" : "justify-end"
        } mb-5 transition-all duration-300`}
      >
        <div
          className={`flex flex-col ${
            isBot ? "items-start" : "items-end"
          } max-w-full md:max-w-[85%]`}
        >
          <div className="flex items-end gap-3 w-full">
            <div
              className={`px-4 py-3 rounded-2xl relative overflow-hidden backdrop-blur-md border shadow-sm transition-all duration-300 ${
                isBot
                  ? isWelcome
                    ? "bg-gradient-to-br from-blue-50/80 to-purple-50/80 border-blue-200/30 text-gray-800"
                    : "bg-white/90 border-gray-200/50 text-gray-800"
                  : "bg-gradient-to-br from-emerald-500 via-teal-500 to-green-600 text-white border-transparent"
              }`}
            >
              <p
                className={`text-sm leading-relaxed ${
                  isBot ? "text-gray-800" : "text-white"
                }`}
                dangerouslySetInnerHTML={{ __html: message.text }}
              ></p>
            </div>
          </div>

          {/* 🕒 Timestamp below the message */}
          <span
            className={`mt-1 text-xs ${
              isBot ? "text-gray-400 pl-4" : "text-gray-400 pr-4 text-right"
            }`}
          >
            {message?.timestamp || timestamp}
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0  backdrop-blur-sm flex justify-center items-center z-50 p-0 md:p-4">
        <div className="relative w-full h-full md:w-[95vw] md:h-[90vh] max-w-5xl rounded-none md:rounded-lg bg-white flex shadow-2xl transition-all duration-300">
          <div
            className={`fixed top-0 left-0  h-full w-3/4 sm:w-2/3 md:w-1/3 bg-gradient-to-br from-emerald-400 to-green-600 text-white p-3 flex flex-col 
        rounded-r-none md:rounded-l-lg  backdrop-blur-sm transition-transform duration-300 z-10
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:relative md:flex`}
          >
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

            <div className="flex-grow  overflow-y-auto -mr-2 pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {chatHistory?.map((chat) => (
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

          {isSidebarOpen && (
            <div
              className="fixed inset-0 backdrop-blur-sm z-5 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <div className="w-full flex flex-col bg-gradient-to-b from-gray-50/50 to-white rounded-lg md:rounded-r-lg md:rounded-l-none">
            <div className="p-3 border-b border-gray-200/80 flex justify-between items-center bg-gradient-to-r from-emerald-400 to-green-600 text-white md:rounded-t-lg md:rounded-tr-lg md:rounded-tl-none">
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
              {messages?.length > 1 ? (
                messages?.map(renderMessage)
              ) : (
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 rounded-full p-[4px] bg-gradient-to-br from-emerald-400 to-green-600">
                      <div
                        className="w-full h-full rounded-full bg-center bg-cover"
                        style={{
                          backgroundImage:
                            "url('https://dpgaire.github.io/image-server/projects/durga.png')",
                        }}
                      ></div>
                    </div>
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-emerald-500 p-1.5 rounded-full shadow-md">
                      <Bot size={20} className="text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    How can I help you today?
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-3 w-full max-w-md">
                    {smartSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(suggestion.text)}
                        className="text-sm p-3 rounded-xl flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 hover:shadow-md hover:scale-[1.02] transition-all duration-200 text-left"
                      >
                        <suggestion.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{suggestion.displayText}</span>
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
