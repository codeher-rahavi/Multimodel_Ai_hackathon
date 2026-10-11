import {
  LayoutDashboard,
  FolderOpen,
  MessageSquareText,
  HelpCircle,
  ClipboardList,
  BarChart3,
  GraduationCap,
  X,
  Sparkles,
} from 'lucide-react';
import type { PageId } from '@/types';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navItems: { id: PageId; label: string; icon: typeof LayoutDashboard; description: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, description: 'Overview & progress' },
  { id: 'materials', label: 'Study Materials', icon: FolderOpen, description: 'Upload & manage' },
  { id: 'tutor', label: 'AI Tutor', icon: MessageSquareText, description: 'Ask questions' },
  { id: 'quiz', label: 'Quiz', icon: HelpCircle, description: 'Test knowledge' },
  { id: 'results', label: 'Results', icon: ClipboardList, description: 'Review answers' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Track mastery' },
];

export function Sidebar({ currentPage, onNavigate, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-slate-200/80 z-40 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-sm shadow-brand-600/30">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-sm leading-tight">Study Companion</h1>
              <p className="text-[10px] text-slate-400 font-medium">AI-Powered Learning</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
          <p className="px-3 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Menu
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 transition-colors ${
                        isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    <div className="text-left flex-1 min-w-0">
                      <div className={`text-sm font-medium leading-tight ${isActive ? 'text-brand-700' : ''}`}>
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">{item.description}</div>
                    </div>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* AI Badge */}
        <div className="px-3 pb-4">
          <div className="rounded-xl bg-gradient-to-br from-brand-50 to-violet-50 border border-brand-100/50 p-3.5">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span className="text-xs font-semibold text-slate-700">Demo Mode</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Using sample data. Backend integration coming soon.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
