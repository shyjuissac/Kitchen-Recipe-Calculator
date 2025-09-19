import React, { useState } from 'react';
import { User } from '../types/Auth';
import { User as UserIcon, LogOut, Settings, ChevronDown } from 'lucide-react';

interface UserMenuProps {
  user: User;
  onLogout: () => void;
  isManager: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout, isManager }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getRoleBadge = () => {
    if (isManager) {
      return (
        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
          Manager
        </span>
      );
    }
    return (
      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
        Kitchen Staff
      </span>
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <UserIcon className="w-4 h-4 text-white" />
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-gray-800">{user.name}</div>
          <div className="text-xs text-gray-600">{user.username}</div>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.username}</div>
                  <div className="mt-1">{getRoleBadge()}</div>
                </div>
              </div>
            </div>
            
            <div className="p-2">
              {user.lastLogin && (
                <div className="px-3 py-2 text-xs text-gray-500">
                  Last login: {new Date(user.lastLogin).toLocaleString()}
                </div>
              )}
              
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;