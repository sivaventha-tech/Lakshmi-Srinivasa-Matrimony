import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  Search, 
  MessageSquare, 
  CheckCheck, 
  Sparkles, 
  ArrowLeft,
  ShieldCheck,
  Heart
} from 'lucide-react';

const QUICK_ICEBREAKERS = [
  'Namaste! We reviewed your biodata and find our family cultural values very compatible. Can we arrange a call?',
  'Our horoscopes indicate a divine 32 Guna match. Would your parents like to speak with ours this weekend?',
  'Hello! We would love to exchange full horoscopes (Jatakam) and arrange a family meeting.'
];

export const MessagesView: React.FC = () => {
  const { 
    conversations, 
    activeChatCandidateId, 
    setActiveChatCandidateId, 
    sendMessage, 
    allCandidates,
    navigateTo,
    unlockContact,
    isContactUnlocked
  } = useApp();

  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Active conversation or first conversation
  const activeConversation = conversations.find((c) => c.candidateId === activeChatCandidateId) || conversations[0];
  const activeCandidate = allCandidates.find((c) => c.id === activeConversation?.candidateId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeConversation) return;
    sendMessage(activeConversation.candidateId, messageInput.trim());
    setMessageInput('');
  };

  const handleIcebreakerClick = (text: string) => {
    if (!activeConversation) return;
    sendMessage(activeConversation.candidateId, text);
  };

  const filteredConversations = conversations.filter((c) =>
    c.candidateName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="messages-page" className="min-h-screen py-6 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Chat Wrapper Card */}
        <div className="bg-white rounded-3xl border border-amber-900/15 shadow-xl overflow-hidden h-[82vh] flex flex-col md:flex-row">
          
          {/* LEFT: Conversation Threads List */}
          <div className="w-full md:w-80 lg:w-96 border-r border-stone-200 flex flex-col bg-white">
            
            {/* Header & Search */}
            <div className="p-4 border-b border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-bold text-lg text-stone-900 flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-amber-700" />
                  <span>Family Messages</span>
                </h2>
                <span className="text-xs bg-rose-50 text-[#800020] font-bold px-2 py-0.5 rounded-full border border-rose-200">
                  {conversations.length} Active
                </span>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search matches or parents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:ring-2 focus:ring-[#800020]"
                />
              </div>
            </div>

            {/* Threads List */}
            <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
              {filteredConversations.map((thread) => {
                const isActive = thread.candidateId === activeConversation?.candidateId;
                return (
                  <div
                    key={thread.candidateId}
                    id={`thread-${thread.candidateId}`}
                    onClick={() => setActiveChatCandidateId(thread.candidateId)}
                    className={`p-3.5 flex items-center space-x-3 cursor-pointer transition ${
                      isActive ? 'bg-amber-50/80 border-l-4 border-[#800020]' : 'hover:bg-stone-50'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={thread.candidatePhoto}
                        alt={thread.candidateName}
                        className="w-12 h-12 rounded-2xl object-cover border border-amber-300"
                      />
                      {thread.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#800020] text-amber-100 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                          {thread.unreadCount}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-heading font-bold text-xs text-stone-900 truncate">
                          {thread.candidateName}
                        </h4>
                        <span className="text-[10px] text-stone-400 whitespace-nowrap">{thread.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 truncate mt-0.5">
                        {thread.lastMessage}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* RIGHT: Active Chat Window */}
          {activeConversation && activeCandidate ? (
            <div className="flex-1 flex flex-col bg-stone-50/50">
              
              {/* Chat Top Header Bar */}
              <div className="p-3.5 bg-white border-b border-stone-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={activeCandidate.photoUrl}
                    alt={activeCandidate.name}
                    className="w-10 h-10 rounded-xl object-cover border border-amber-300 cursor-pointer"
                    onClick={() => navigateTo('profile-view', activeCandidate.id)}
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 
                        onClick={() => navigateTo('profile-view', activeCandidate.id)}
                        className="font-heading font-bold text-sm text-stone-900 hover:text-[#800020] cursor-pointer"
                      >
                        {activeCandidate.name}
                      </h3>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                        Online
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500">
                      {activeCandidate.caste} ({activeCandidate.subcaste}) • {activeCandidate.location.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigateTo('profile-view', activeCandidate.id)}
                    className="px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50"
                  >
                    View Biodata
                  </button>

                  <button
                    onClick={() => unlockContact(activeCandidate.id)}
                    className="px-3 py-1.5 rounded-xl bg-[#800020] text-amber-100 text-xs font-bold flex items-center space-x-1 hover:bg-[#6A001A]"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Family</span>
                  </button>
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                
                {/* Kundali Auspicious Header Banner */}
                <div className="bg-amber-100/60 border border-amber-300/80 rounded-2xl p-3 text-center text-xs text-amber-950 flex items-center justify-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>
                    Auspicious <strong>{activeCandidate.horoscopeScore}/36 Guna Ashtakoota Match</strong> between families.
                  </span>
                </div>

                {/* Messages List */}
                {activeConversation.messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-xs ${
                          isUser
                            ? 'bg-[#800020] text-amber-100 rounded-br-none'
                            : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <div className="flex items-center space-x-1 text-[10px] text-stone-400 mt-1 px-1">
                        <span>{msg.timestamp}</span>
                        {isUser && <CheckCheck className="w-3 h-3 text-emerald-600" />}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Family Icebreakers */}
              <div className="px-4 py-2 bg-stone-100/60 border-t border-stone-200 overflow-x-auto flex space-x-2">
                {QUICK_ICEBREAKERS.map((ice, i) => (
                  <button
                    key={i}
                    onClick={() => handleIcebreakerClick(ice)}
                    className="px-3 py-1 bg-white hover:bg-amber-50 border border-amber-300/60 rounded-xl text-[11px] text-stone-700 whitespace-nowrap transition shadow-2xs font-medium"
                  >
                    💬 {ice.slice(0, 42)}...
                  </button>
                ))}
              </div>

              {/* Message Input Box */}
              <form onSubmit={handleSend} className="p-3 bg-white border-t border-stone-200 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Type an auspicious message or inquiry to family..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#800020]"
                />
                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="px-4 py-2.5 rounded-xl bg-[#800020] text-amber-100 font-bold text-xs hover:bg-[#6A001A] disabled:opacity-50 transition flex items-center space-x-1"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-stone-400">
              <MessageSquare className="w-12 h-12 mb-2" />
              <p className="text-sm font-semibold">Select a conversation thread to message</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
