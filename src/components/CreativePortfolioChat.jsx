import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  X,
  Loader2,
  MessageSquare,
  Linkedin,
  Trash2,
} from "lucide-react";
import { useLanguage } from '../context/LanguageContext';

const API_URL = "https://llme-me.everyappswhere.me";

const CreativePortfolioChat = () => {
  // États
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [guestId, setGuestId] = useState("");
  const [error, setError] = useState(null);

  // Refs
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Traductions
  const { translations } = useLanguage();

  // Questions suggérées
  const suggestionQuestions = [
    translations.chat.suggestions.services,
    translations.chat.suggestions.experience,
    translations.chat.suggestions.projects,
    translations.chat.suggestions.skills,
    translations.chat.suggestions.availability,
  ];

  // Effets
  useEffect(() => {
    scrollToBottom();
  }, [messages, currentResponse]);

  useEffect(() => {
    const savedGuestId = localStorage.getItem("chatGuestId");
    if (savedGuestId) {
      setGuestId(savedGuestId);
      loadChatHistory(savedGuestId);
    }
  }, []);

  // Fonctions
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadChatHistory = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/chat-history/${id}`);
      if (!response.ok) throw new Error("Failed to load chat history");

      const history = await response.json();
      const formattedMessages = history.flatMap((msg) => [
        {
          type: "user",
          content: msg.question,
          timestamp: new Date(msg.timestamp).toLocaleTimeString(),
        },
        {
          type: "bot",
          content: msg.response,
          timestamp: new Date(msg.timestamp).toLocaleTimeString(),
        },
      ]);
      setMessages(formattedMessages);
      setShowSuggestions(false);
    } catch (error) {
      console.error("Error loading chat history:", error);
      setError(translations.chat.errors.loadHistory);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = {
      type: "user",
      content: messageText,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setShowSuggestions(false);
    setIsLoading(true);
    setIsStreaming(true);
    setCurrentResponse("");
    setError(null);

    let fullResponse = "";

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          history: messages.map((msg) => ({
            role: msg.type === "user" ? "user" : "assistant",
            content: msg.content,
          })),
          guest_id: guestId,
        }),
      });

      if (!response.ok) throw new Error(translations.chat.errors.failed);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                fullResponse += data.content;
                setCurrentResponse(fullResponse);

                if (!guestId && data.guest_id) {
                  setGuestId(data.guest_id);
                  localStorage.setItem("chatGuestId", data.guest_id);
                }
              }
              if (data.error) {
                throw new Error(data.error);
              }
            } catch (e) {
              console.error("Error parsing SSE data:", e);
              throw e;
            }
          }
        }
      }

      const botMessage = {
        type: "bot",
        content: fullResponse,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: translations.chat.errors.failed,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setIsStreaming(false);
        setCurrentResponse("");
      }, 100);
      inputRef.current?.focus();
    }
  };

  const clearHistory = () => {
    setMessages([]);
    setCurrentResponse("");
    setError(null);
    setShowSuggestions(true);
    localStorage.removeItem("chatGuestId");
    setGuestId("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputMessage);
    }
  };

  // Rendu pour l'état minimisé
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2">
        <button
          onClick={() => setIsMinimized(false)}
          className="group flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageSquare size={20} className="text-blue-500" />
          <span className="text-sm text-gray-600 font-medium">
            {translations.chat.title}
          </span>
        </button>
      </div>
    );
  }

  // Rendu principal
  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2">
      <div className="bg-white rounded-xl shadow-2xl w-96 h-[32rem] relative overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
        <div className="absolute top-1 right-0 w-1/3 h-1 bg-gradient-to-l from-blue-300 to-transparent"></div>

        {/* En-tête */}
        <div className="relative p-4 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <Linkedin size={22} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800">
                  {translations.chat.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {translations.chat.subtitle}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearHistory}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                title={translations.chat.clearHistory}
              >
                <Trash2 size={16} className="text-gray-600" />
              </button>
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Zone des messages */}
        <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 bg-gradient-to-br from-gray-50 to-white">
          {error && (
            <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {showSuggestions && messages.length === 0 && (
            <div className="grid gap-2">
              {suggestionQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(question)}
                  className="text-left p-3 text-sm bg-white rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MessageSquare size={14} />
                    </span>
                    <span className="text-gray-700">{question}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.type === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block max-w-[80%] rounded-xl px-4 py-2 ${
                  message.type === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800 border border-gray-100 shadow-sm"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <span className="text-xs opacity-75 mt-1 block">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isStreaming && currentResponse && (
            <div className="mb-4 text-left">
              <div className="inline-block max-w-[80%] rounded-xl px-4 py-2 bg-white text-gray-800 border border-gray-100 shadow-sm">
                <p className="text-sm whitespace-pre-wrap">
                  {currentResponse}
                  <span className="inline-block animate-pulse ml-1">▊</span>
                </p>
                <span className="text-xs opacity-75 mt-1 block">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          )}

          {isLoading && !isStreaming && (
            <div className="flex justify-center">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <Loader2 className="animate-spin text-blue-500" size={20} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Zone de saisie */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputMessage);
          }}
          className="p-4 bg-white border-t border-gray-100"
        >
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={translations.chat.placeholder}
              className="flex-1 p-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50 bg-gray-50"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all disabled:opacity-50 disabled:hover:bg-blue-500 shadow-sm hover:shadow"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreativePortfolioChat;
