import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { Dashboard } from '@/pages/Dashboard';
import { StudyMaterials } from '@/pages/StudyMaterials';
import { AITutor } from '@/pages/AITutor';
import { Quiz } from '@/pages/Quiz';
import { Results } from '@/pages/Results';
import { Analytics } from '@/pages/Analytics';
import type { PageId } from '@/types';

const pageInfo: Record<PageId, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Your learning overview at a glance' },
  materials: { title: 'Study Materials', subtitle: 'Upload and manage your study resources' },
  tutor: { title: 'AI Tutor', subtitle: 'Ask questions and get answers with source citations' },
  quiz: { title: 'Quiz', subtitle: 'Test your knowledge with AI-generated questions' },
  results: { title: 'Results', subtitle: 'Review your quiz performance and learn from mistakes' },
  analytics: { title: 'Learning Analytics', subtitle: 'Track your mastery and progress over time' },
};

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const info = pageInfo[currentPage];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          title={info.title}
          subtitle={info.subtitle}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
          {currentPage === 'materials' && <StudyMaterials />}
          {currentPage === 'tutor' && <AITutor />}
          {currentPage === 'quiz' && <Quiz onNavigate={handleNavigate} />}
          {currentPage === 'results' && <Results onNavigate={handleNavigate} />}
          {currentPage === 'analytics' && <Analytics />}
        </main>
      </div>
    </div>
  );
}

export default App;
