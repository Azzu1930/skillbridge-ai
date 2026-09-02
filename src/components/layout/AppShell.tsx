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
    <div className="min-h-screen bg-[#080d1a] flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Mobile Sidebar Toggle Button */}
      <div className="lg:hidden flex items-center justify-between px-4 py-2 border-b border-slate-800/80 bg-slate-950/80">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg"
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
          <div className="lg:hidden fixed inset-0 z-40 bg-black/80 flex">
            <div className="w-72 bg-slate-950 h-full border-r border-slate-800">
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
