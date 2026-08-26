import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  Lock, 
  Eye, 
  Bell, 
  Trash2, 
  Save, 
  User, 
  Phone, 
  Mail,
  CheckCircle2
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { user, addToast, navigateTo } = useApp();

  const [photoPrivacy, setPhotoPrivacy] = useState<'Public' | 'OnRequest' | 'Protected'>(user.photoPrivacy || 'Public');
  const [phonePrivacy, setPhonePrivacy] = useState<'VerifiedOnly' | 'OnRequest'>('VerifiedOnly');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [matchAlertsFrequency, setMatchAlertsFrequency] = useState('Daily');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('success', 'Settings Updated', 'Your privacy and notification preferences have been saved.');
  };

  return (
    <div id="settings-page" className="min-h-screen py-10 bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 border border-amber-900/15 shadow-xs flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#800020] flex items-center justify-center border border-amber-200">
              <SettingsIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-stone-900">
                Account & Privacy Settings
              </h1>
              <p className="text-xs text-stone-500">
                Manage profile visibility, contact controls, notifications, and security.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateTo('dashboard')}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSaveSettings} className="space-y-6">
          
          {/* Section 1: Privacy Controls */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-sm space-y-5">
            <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
              <Eye className="w-5 h-5 text-[#800020]" />
              <h2 className="font-heading text-lg font-bold text-stone-900">
                Profile & Photo Privacy
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-2">
                  Photo Visibility
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'Public', title: 'Visible to All Members', desc: 'Anyone on the platform can see your photo' },
                    { id: 'Protected', title: 'Members Only', desc: 'Only logged in & verified members can view' },
                    { id: 'OnRequest', title: 'Visible on Request', desc: 'Others must request photo access from you' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPhotoPrivacy(opt.id as any)}
                      className={`p-3.5 rounded-2xl border text-left transition ${
                        photoPrivacy === opt.id
                          ? 'border-[#800020] bg-rose-50/50 text-[#800020]'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <p className="font-bold">{opt.title}</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <label className="block font-bold text-stone-700 mb-2">
                  Contact Number Access
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'VerifiedOnly', title: 'Paid Verified Members Only', desc: 'Only upgraded members can use contact credits' },
                    { id: 'OnRequest', title: 'Only Upon Mutual Interest Acceptance', desc: 'Visible only after you accept their interest' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPhonePrivacy(opt.id as any)}
                      className={`p-3.5 rounded-2xl border text-left transition ${
                        phonePrivacy === opt.id
                          ? 'border-[#800020] bg-rose-50/50 text-[#800020]'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <p className="font-bold">{opt.title}</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Notifications */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-sm space-y-5">
            <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
              <Bell className="w-5 h-5 text-[#800020]" />
              <h2 className="font-heading text-lg font-bold text-stone-900">
                Match Alerts & Notifications
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-stone-100">
                <div>
                  <p className="font-bold text-stone-800">Email Notifications</p>
                  <p className="text-stone-500">Receive new matching horoscope alerts & interest updates</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="w-4 h-4 text-[#800020] rounded-sm focus:ring-[#800020]"
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-stone-100">
                <div>
                  <p className="font-bold text-stone-800">SMS & WhatsApp Alerts</p>
                  <p className="text-stone-500">Get instant SMS when prospective families express interest</p>
                </div>
                <input
                  type="checkbox"
                  checked={smsNotifications}
                  onChange={(e) => setSmsNotifications(e.target.checked)}
                  className="w-4 h-4 text-[#800020] rounded-sm focus:ring-[#800020]"
                />
              </div>

              <div className="pt-2">
                <label className="block font-bold text-stone-700 mb-1">
                  Daily Match Recommendation Frequency
                </label>
                <select
                  value={matchAlertsFrequency}
                  onChange={(e) => setMatchAlertsFrequency(e.target.value)}
                  className="w-full sm:w-64 px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 text-xs"
                >
                  <option value="Daily">Daily (Every Morning)</option>
                  <option value="BiWeekly">Twice a Week</option>
                  <option value="Weekly">Weekly Digest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Password & Security */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-sm space-y-5">
            <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
              <Lock className="w-5 h-5 text-[#800020]" />
              <h2 className="font-heading text-lg font-bold text-stone-900">
                Security & Password
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end space-x-3">
            <button
              type="submit"
              className="px-8 py-3 bg-[#800020] text-amber-100 font-extrabold text-xs rounded-xl shadow-md hover:bg-[#6A001A] transition flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
