import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  HelpCircle, 
  PhoneCall, 
  Mail, 
  MessageSquare, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Clock,
  MapPin,
  HeartHandshake
} from 'lucide-react';

export const HelpSupportView: React.FC = () => {
  const { navigateTo, addToast } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs = [
    {
      q: 'How does Horoscope & Guna Milan matching work on Lakshmi Srinivasa Matrimony?',
      a: 'We use traditional Vedic astrology calculations based on birth Nakshatra, Rasi, and Gothram to calculate the 36 Gunas compatibility. Profiles with 18+ Gunas are considered astrologically auspicious.'
    },
    {
      q: 'How are candidate profiles and government IDs verified?',
      a: 'Every registered profile undergoes 4-step verification: Aadhaar / Passport ID authentication, mobile OTP verification, LinkedIn / company work verification, and family background check before earning the gold verified trust seal.'
    },
    {
      q: 'How can I view verified phone numbers of prospective brides and grooms?',
      a: 'You can upgrade to our Gold, Diamond, or Platinum Sacred Membership plans to get direct verified phone, WhatsApp, and family contact access.'
    },
    {
      q: 'Can I control who views my profile photo and contact info?',
      a: 'Yes! Under Account Settings & Privacy, you can set photo visibility to "Members Only", "Visible on Request", or "Hidden" anytime.'
    },
    {
      q: 'What is the Platinum Assisted Matchmaking service?',
      a: 'Platinum members get a dedicated senior relationship manager who handpicks compatible profiles, coordinates horoscope matching, and schedules introductory family meetings.'
    }
  ];

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setTicketSubject('');
      setTicketMessage('');
      addToast('success', 'Support Request Received', 'Our Senior Matchmaking Relationship Manager will contact your family within 2 hours.');
    }, 800);
  };

  return (
    <div id="help-support-page" className="min-h-screen py-10 bg-[#FDFBF7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#800020] text-amber-300 font-serif font-bold text-2xl flex items-center justify-center border-2 border-amber-400 shadow-md mb-2">
            ॐ
          </div>
          <h1 className="font-heading text-3xl font-extrabold text-stone-900">
            Sacred Assistance & Family Helpdesk
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Our experienced Telugu & South Indian matchmaking advisors are available 7 days a week to support your family in finding the ideal alliance.
          </p>
        </div>

        {/* 3 Contact Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-amber-900/15 shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#800020] flex items-center justify-center mx-auto border border-amber-200">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-stone-900">Dedicated Helpline</h3>
            <p className="text-xs text-stone-500">Speak directly with a senior matchmaking consultant</p>
            <p className="text-sm font-extrabold text-[#800020]">+91 98490 12345 / 040-2345678</p>
            <p className="text-[11px] text-stone-400">9:00 AM – 8:30 PM (Mon – Sun)</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-amber-900/15 shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#800020] flex items-center justify-center mx-auto border border-amber-200">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-stone-900">Family Email Support</h3>
            <p className="text-xs text-stone-500">Send biodata or verification queries anytime</p>
            <p className="text-sm font-extrabold text-[#800020]">support@lakshmisrinivasa.com</p>
            <p className="text-[11px] text-stone-400">Average response time: &lt; 2 hours</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-amber-900/15 shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#800020] flex items-center justify-center mx-auto border border-amber-200">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-stone-900">Regional Centers</h3>
            <p className="text-xs text-stone-500">Visit our matrimonial branches in person</p>
            <p className="text-xs font-bold text-stone-800">Hyderabad • Chennai • Bangalore • Vijayawada</p>
            <p className="text-[11px] text-stone-400">Family consultation by appointment</p>
          </div>
        </div>

        {/* FAQs & Contact Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FAQs */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
              <HelpCircle className="w-5 h-5 text-[#800020]" />
              <h2 className="font-heading text-lg font-bold text-stone-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className="border border-stone-200 rounded-2xl overflow-hidden transition"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-stone-800 hover:bg-stone-50"
                    >
                      <span className="pr-2">{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#800020] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-[#FDFBF7]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Direct Ticket / Query Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
              <MessageSquare className="w-5 h-5 text-[#800020]" />
              <h2 className="font-heading text-lg font-bold text-stone-900">
                Send a Message to Support
              </h2>
            </div>

            <form onSubmit={handleSupportSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Query Subject
                </label>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g. Horoscope Verification / Contact Credits"
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#800020]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Details of your Query
                </label>
                <textarea
                  rows={4}
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Describe your question or assistance needed..."
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#800020]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#800020] text-amber-100 rounded-xl font-extrabold text-xs shadow-md hover:bg-[#6A001A] transition flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isSubmitting ? 'Sending Request...' : 'Submit Support Request'}</span>
              </button>
            </form>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>All family requests are handled with absolute confidentiality.</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
