'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { CommandPalette } from '@/components/search/CommandPalette';
import { DemoTour } from '@/components/demo/DemoTour';
import { Menu, X } from 'lucide-react';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white font-sans">
      {/* Top Navbar */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Mobile Sidebar Toggle Button */}
      <div className="lg:hidden flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-white shadow-sm">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          {isMobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>{isMobileSidebarOpen ? 'Close Navigation' : 'Portal Menu'}</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex w-full relative">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block shrink-0">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Drawer */}
        {isMobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm flex animate-in fade-in duration-150">
            <div className="w-72 bg-white h-full border-r border-slate-200 shadow-xl">
              <Sidebar />
            </div>
            <div
              className="flex-1"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 min-w-0 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Command Palette & Demo Tour Modals */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <DemoTour />
    </div>
  );
}
