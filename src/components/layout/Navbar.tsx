import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  MessageSquare, 
  Crown, 
  Search, 
  LogOut, 
  Menu, 
  X, 
  LayoutDashboard, 
  ChevronDown,
  HelpCircle,
  Settings as SettingsIcon,
  UserCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    navigateTo, 
    user, 
    isAuthenticated, 
    logout, 
    setIsLoginModalOpen,
    activity,
    conversations
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const totalUnreadMessages = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const totalShortlisted = activity.shortlistedIds.length;

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-[#FDFBF7] border-b border-amber-900/15 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            id="brand-logo-button"
            onClick={() => navigateTo('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-[#800020] border-2 border-[#D4AF37] flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
              <span className="text-[#D4AF37] font-serif font-bold text-2xl">ॐ</span>
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-[#800020] block leading-tight">
                LAKSHMI SRINIVASA
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-widest uppercase font-semibold text-[#8C6D37] block">
                Matrimony • Sacred Indian Alliances
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              id="nav-home-btn"
              onClick={() => navigateTo('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                currentView === 'home' 
                  ? 'text-[#800020] bg-amber-100/60 font-bold' 
                  : 'text-stone-700 hover:text-[#800020] hover:bg-stone-100/60'
              }`}
            >
              Home
            </button>

            <button
              id="nav-find-matches-btn"
              onClick={() => navigateTo('matches')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1.5 transition ${
                currentView === 'matches' 
                  ? 'text-[#800020] bg-amber-100/60 font-bold' 
                  : 'text-stone-700 hover:text-[#800020] hover:bg-stone-100/60'
              }`}
            >
              <Search className="w-4 h-4 text-[#8C6D37]" />
              <span>Find Matches</span>
            </button>

            {isAuthenticated && (
              <button
                id="nav-dashboard-btn"
                onClick={() => navigateTo('dashboard')}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1.5 transition ${
                  currentView === 'dashboard' 
                    ? 'text-[#800020] bg-amber-100/60 font-bold' 
                    : 'text-stone-700 hover:text-[#800020] hover:bg-stone-100/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-[#8C6D37]" />
                <span>Dashboard</span>
              </button>
            )}

            <button
              id="nav-shortlisted-btn"
              onClick={() => {
                if (!isAuthenticated) {
                  setIsLoginModalOpen(true);
                } else {
                  navigateTo('shortlisted');
                }
              }}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1.5 transition relative ${
                currentView === 'shortlisted' 
                  ? 'text-[#800020] bg-amber-100/60 font-bold' 
                  : 'text-stone-700 hover:text-[#800020] hover:bg-stone-100/60'
              }`}
            >
              <Heart className="w-4 h-4 text-[#800020]" />
              <span>Shortlisted</span>
              {totalShortlisted > 0 && (
                <span className="bg-[#800020] text-amber-100 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {totalShortlisted}
                </span>
              )}
            </button>

            <button
              id="nav-messages-btn"
              onClick={() => {
                if (!isAuthenticated) {
                  setIsLoginModalOpen(true);
                } else {
                  navigateTo('messages');
                }
              }}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1.5 transition relative ${
                currentView === 'messages' 
                  ? 'text-[#800020] bg-amber-100/60 font-bold' 
                  : 'text-stone-700 hover:text-[#800020] hover:bg-stone-100/60'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-[#8C6D37]" />
              <span>Messages</span>
              {totalUnreadMessages > 0 && (
                <span className="bg-[#800020] text-amber-100 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {totalUnreadMessages}
                </span>
              )}
            </button>

            <button
              id="nav-membership-btn"
              onClick={() => navigateTo('membership')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1.5 transition ${
                currentView === 'membership' || currentView === 'payment' || currentView === 'payment-success'
                  ? 'text-[#800020] bg-amber-100/60 font-bold' 
                  : 'text-stone-700 hover:text-[#800020] hover:bg-stone-100/60'
              }`}
            >
              <Crown className="w-4 h-4 text-[#D4AF37]" />
              <span>Membership</span>
            </button>

            <button
              id="nav-help-btn"
              onClick={() => navigateTo('help')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1.5 transition ${
                currentView === 'help' 
                  ? 'text-[#800020] bg-amber-100/60 font-bold' 
                  : 'text-stone-700 hover:text-[#800020] hover:bg-stone-100/60'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-stone-500" />
              <span>Help</span>
            </button>
          </nav>

          {/* Right Action Area */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  id="user-profile-menu-button"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2.5 p-1.5 rounded-xl border border-amber-900/20 bg-white hover:bg-amber-50/50 transition shadow-xs"
                >
                  <img
                    src={user.photoUrl}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#D4AF37]"
                  />
                  <div className="text-left leading-tight pr-1">
                    <p className="text-xs font-bold text-stone-900 truncate max-w-[110px]">{user.name}</p>
                    <p className="text-[10px] text-[#800020] font-semibold">{user.id}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div 
                    id="user-dropdown-menu"
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-amber-900/15 py-2 z-50 animate-in fade-in"
                  >
                    <div className="px-4 py-2.5 border-b border-stone-100 bg-[#FDFBF7]">
                      <p className="text-xs font-bold text-stone-900">{user.name}</p>
                      <p className="text-[11px] text-stone-500">{user.occupation}</p>
                    </div>

                    <button
                      id="dropdown-dashboard-btn"
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        navigateTo('dashboard');
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-stone-700 hover:bg-amber-50 flex items-center space-x-2"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-[#800020]" />
                      <span>Member Dashboard</span>
                    </button>

                    <button
                      id="dropdown-shortlisted-btn"
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        navigateTo('shortlisted');
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-stone-700 hover:bg-amber-50 flex items-center space-x-2"
                    >
                      <Heart className="w-3.5 h-3.5 text-[#800020]" />
                      <span>Shortlisted Profiles</span>
                    </button>

                    <button
                      id="dropdown-membership-btn"
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        navigateTo('membership');
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-stone-700 hover:bg-amber-50 flex items-center space-x-2"
                    >
                      <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Membership</span>
                    </button>

                    <button
                      id="dropdown-settings-btn"
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        navigateTo('settings');
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-stone-700 hover:bg-amber-50 flex items-center space-x-2"
                    >
                      <SettingsIcon className="w-3.5 h-3.5 text-stone-600" />
                      <span>Settings & Privacy</span>
                    </button>

                    <button
                      id="dropdown-help-btn"
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        navigateTo('help');
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-stone-700 hover:bg-amber-50 flex items-center space-x-2"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-stone-600" />
                      <span>Help & Support</span>
                    </button>

                    <div className="border-t border-stone-100 my-1"></div>

                    <button
                      id="dropdown-logout-btn"
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-[#800020] hover:bg-rose-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-3.5 h-3.5 text-[#800020]" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2.5">
                <button
                  id="header-login-btn"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#800020] hover:bg-amber-100/50 transition border border-[#800020]/30"
                >
                  Login
                </button>
                <button
                  id="header-register-btn"
                  onClick={() => navigateTo('register')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#800020] text-amber-100 hover:bg-[#6A001A] transition shadow-xs"
                >
                  Register Free
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-[#800020]" /> : <Menu className="w-6 h-6 text-[#800020]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden border-t border-amber-900/15 bg-white px-4 pt-3 pb-6 space-y-2">
          <button
            id="mobile-nav-home"
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigateTo('home');
            }}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-stone-800 hover:bg-amber-50"
          >
            Home
          </button>
          <button
            id="mobile-nav-matches"
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigateTo('matches');
            }}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-stone-800 hover:bg-amber-50 flex items-center justify-between"
          >
            <span>Find Matches</span>
            <Search className="w-4 h-4 text-[#8C6D37]" />
          </button>
          {isAuthenticated && (
            <button
              id="mobile-nav-dashboard"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigateTo('dashboard');
              }}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-stone-800 hover:bg-amber-50"
            >
              Member Dashboard
            </button>
          )}
          <button
            id="mobile-nav-shortlisted"
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (!isAuthenticated) setIsLoginModalOpen(true);
              else navigateTo('shortlisted');
            }}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-stone-800 hover:bg-amber-50 flex items-center justify-between"
          >
            <span>Shortlisted Profiles</span>
            <span className="bg-[#800020] text-amber-100 text-xs px-2 py-0.5 rounded-full font-bold">
              {totalShortlisted}
            </span>
          </button>
          <button
            id="mobile-nav-messages"
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (!isAuthenticated) setIsLoginModalOpen(true);
              else navigateTo('messages');
            }}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-stone-800 hover:bg-amber-50 flex items-center justify-between"
          >
            <span>Messages</span>
            {totalUnreadMessages > 0 && (
              <span className="bg-[#800020] text-amber-100 text-xs px-2 py-0.5 rounded-full font-bold">
                {totalUnreadMessages}
              </span>
            )}
          </button>
          <button
            id="mobile-nav-membership"
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigateTo('membership');
            }}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-amber-900 bg-amber-50 flex items-center justify-between"
          >
            <span>Membership Plans</span>
            <Crown className="w-4 h-4 text-[#D4AF37]" />
          </button>
          <button
            id="mobile-nav-help"
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigateTo('help');
            }}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-stone-800 hover:bg-amber-50"
          >
            Help & Support
          </button>
          <button
            id="mobile-nav-settings"
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigateTo('settings');
            }}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-stone-800 hover:bg-amber-50"
          >
            Settings & Privacy
          </button>

          <div className="pt-3 border-t border-stone-100">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                }}
                className="w-full py-2.5 text-center text-xs font-bold text-[#800020] bg-rose-50 rounded-xl"
              >
                Sign Out ({user.name})
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="py-2.5 text-center text-xs font-bold text-[#800020] border border-[#800020] rounded-xl"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('register');
                  }}
                  className="py-2.5 text-center text-xs font-bold bg-[#800020] text-amber-100 rounded-xl"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
