import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Phone, MessageCircle, Bot, User, Sparkles } from 'lucide-react';
import { SILPHOR_CONTACT, SILPHOR_COURSES_DATA } from '../data/silphorData';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  quickAction?: {
    label: string;
    url?: string;
    actionType?: 'whatsapp' | 'call' | 'contact';
  };
}

export const LiveChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: 'Hello! Welcome to Silphor Technologies. I can help you with course details, batch schedules, fees, or connecting directly with our engineering admissions team in Bangalore.',
      time: 'Just now'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'Course Fees & Durations',
    'Next Upcoming Batches',
    'Campus Location & Hours',
    'Connect on WhatsApp (+91 7829455663)'
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');

    // Generate responsive bot reply
    setTimeout(() => {
      const q = query.toLowerCase();
      let botResponse = '';
      let quickAction = undefined;

      if (q.includes('fee') || q.includes('cost') || q.includes('price')) {
        botResponse = 'Our industrial programs range from ₹28,000 to ₹45,000 depending on specialization:\n• VLSI Design (6 Months): ₹45,000\n• RTL & UVM (4 Months): ₹35,000\n• Power Electronics (3.5 Months): ₹38,000\n• Embedded Systems (4 Months): ₹30,000\n• PCB Design (3 Months): ₹28,000\nFlexible installment options and early-bird scholarship discounts are available!';
        quickAction = {
          label: 'Inquire About Fee Discounts on WhatsApp',
          url: SILPHOR_CONTACT.whatsappUrl,
          actionType: 'whatsapp' as const
        };
      } else if (q.includes('batch') || q.includes('schedule') || q.includes('timing') || q.includes('start')) {
        botResponse = 'Upcoming cohorts starting soon at our Malleswaram Bangalore campus & online:\n• Autumn VLSI Batch: Starts Nov 15 (Evening)\n• RTL & UVM Verification: Starts Nov 20 (Tue & Thu)\n• High-Speed PCB Lab: Starts Nov 18 (Weekend Lab)\n• Embedded Firmware: Starts Dec 01\nSeats are strictly limited to 20-30 students per cohort for 1-on-1 mentor guidance.';
        quickAction = {
          label: 'Reserve a Seat via WhatsApp (+91 7829455663)',
          url: SILPHOR_CONTACT.whatsappUrl,
          actionType: 'whatsapp' as const
        };
      } else if (q.includes('address') || q.includes('location') || q.includes('where') || q.includes('hours') || q.includes('campus')) {
        botResponse = `📍 Campus Address:\n${SILPHOR_CONTACT.address}\nLandmark: ${SILPHOR_CONTACT.landmark}\nCoordinates: ${SILPHOR_CONTACT.coordinates}\n\n🕒 Hours: ${SILPHOR_CONTACT.workingHours}\n📞 Direct Phone: ${SILPHOR_CONTACT.phoneDisplay}`;
        quickAction = {
          label: 'Open WhatsApp for Directions',
          url: SILPHOR_CONTACT.whatsappUrl,
          actionType: 'whatsapp' as const
        };
      } else if (q.includes('whatsapp') || q.includes('call') || q.includes('contact') || q.includes('phone') || q.includes('talk')) {
        botResponse = `You can reach our Senior Academic Counselor directly:\n• WhatsApp: +91 7829455663\n• Email: silphortechnologies@gmail.com\n• Direct Line: +91 7829455663`;
        quickAction = {
          label: 'Open WhatsApp (+91 7829455663)',
          url: SILPHOR_CONTACT.whatsappUrl,
          actionType: 'whatsapp' as const
        };
      } else if (q.includes('placement') || q.includes('job') || q.includes('hiring') || q.includes('company')) {
        botResponse = 'We provide 100% placement assistance, technical mock interviews, and resume forwarding to top semiconductor design houses in Bangalore and Hyderabad including Synopsys, Qualcomm, Intel, Bosch, and Texas Instruments.';
      } else {
        botResponse = `Thank you for your message! Our admissions counselors are available right now. Would you like to chat directly on WhatsApp or receive our full course brochure?`;
        quickAction = {
          label: 'Chat on WhatsApp (+91 7829455663)',
          url: SILPHOR_CONTACT.whatsappUrl,
          actionType: 'whatsapp' as const
        };
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          quickAction
        }
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 no-print">
      {/* Closed Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 bg-[#0B2545] hover:bg-[#07172C] text-white px-4 py-3 rounded-full shadow-2xl border border-slate-700 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Open Admissions Chat"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-[#FF6B00]" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-1 -right-1 border border-[#0B2545]" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">
              Questions?
            </div>
            <div className="text-xs font-bold text-white">
              Chat with Course Advisor
            </div>
          </div>
        </button>
      )}

      {/* Open Chat Box Modal */}
      {isOpen && (
        <div className="bg-white w-[92vw] sm:w-[380px] h-[520px] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Chat Header */}
          <div className="bg-[#07172C] text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0B2545] border border-[#00828A] flex items-center justify-center text-[#00828A]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Silphor Course Advisor</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[10px] text-slate-300 font-mono">
                  Malleswaram, Bangalore · Fast Reply
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href={SILPHOR_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Switch to WhatsApp"
                className="p-1.5 text-emerald-400 hover:text-emerald-300 rounded cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#FF6B00] text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Quick Action Button if provided */}
                {msg.quickAction && (
                  <div className="mt-1.5">
                    <a
                      href={msg.quickAction.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg text-[11px] font-bold shadow-xs cursor-pointer transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{msg.quickAction.label}</span>
                    </a>
                  </div>
                )}

                <span className="text-[9px] text-slate-400 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 overflow-x-auto flex gap-1.5">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 bg-white hover:bg-slate-200 text-slate-700 rounded-md text-[11px] font-semibold border border-slate-200 whitespace-nowrap cursor-pointer transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about batches, fees, eligibility..."
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF6B00]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2 bg-[#0B2545] hover:bg-[#FF6B00] text-white rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
