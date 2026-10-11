import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  FileText,
  ArrowRight,
  AlertCircle,
  BookOpen,
  Video,
  PenTool,
  Eye,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { RadialProgress } from '@/components/charts/RadialProgress';
import {
  demoStats,
  demoTopicProgress,
  demoRecentQuizzes,
  demoWeakTopics,
  demoRecommendations,
} from '@/data/demoData';
import type { PageId, StatCard } from '@/types';

interface DashboardProps {
  onNavigate: (page: PageId) => void;
}

const statIcons: Record<string, typeof TrendingUp> = {
  TrendingUp,
  CheckCircle,
  Clock,
  FileText,
};

const recommendationIcons = {
  review: BookOpen,
  practice: PenTool,
  watch: Video,
  read: FileText,
};

const priorityColors = {
  high: 'red' as const,
  medium: 'amber' as const,
  low: 'slate' as const,
};

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero greeting */}
      <div className="rounded-2xl bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800 p-6 lg:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 right-12 w-32 h-32 bg-white/5 rounded-full translate-y-16" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-brand-200" />
            <span className="text-sm text-brand-100 font-medium">Welcome back, Jane!</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">You're on a 5-day study streak</h1>
          <p className="text-brand-100 text-sm max-w-lg">
            Keep the momentum going. You've improved your overall mastery by 5.2% this week.
            Focus on Machine Learning to boost your weakest area.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <button
              onClick={() => onNavigate('quiz')}
              className="inline-flex items-center gap-2 bg-white text-brand-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-50 transition-colors"
            >
              Take a Quiz <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('tutor')}
              className="inline-flex items-center gap-2 bg-brand-500/30 text-white border border-white/20 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-500/40 transition-colors"
            >
              Ask AI Tutor
            </button>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {demoStats.map((stat: StatCard) => {
          const Icon = statIcons[stat.icon] ?? TrendingUp;
          return (
            <Card key={stat.label} hover className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-slate-600" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${
                  stat.trend === 'up' ? 'text-emerald-600' : stat.trend === 'down' ? 'text-rose-600' : 'text-slate-500'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-900 tabular-nums">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Topic progress + recent quizzes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Topic mastery */}
          <Card>
            <CardHeader
              title="Topic Mastery"
              subtitle="Your progress across all subjects"
              icon={<TrendingUp className="w-5 h-5" />}
              action={
                <button onClick={() => onNavigate('analytics')} className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
                  View analytics <ArrowRight className="w-3.5 h-3.5" />
                </button>
              }
            />
            <div className="p-5 space-y-4">
              {demoTopicProgress.slice(0, 5).map((tp) => (
                <div key={tp.topic} className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-slate-700">{tp.topic}</span>
                      <span className="text-xs text-slate-400 tabular-nums">
                        {tp.correctAnswers}/{tp.totalQuestions} correct
                      </span>
                    </div>
                    <ProgressBar
                      value={tp.mastery}
                      color={tp.mastery >= 75 ? 'green' : tp.mastery >= 50 ? 'brand' : tp.mastery >= 30 ? 'amber' : 'red'}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent quizzes */}
          <Card>
            <CardHeader
              title="Recent Quizzes"
              subtitle="Your latest quiz attempts"
              icon={<CheckCircle className="w-5 h-5" />}
              action={
                <button onClick={() => onNavigate('results')} className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
                  All results <ArrowRight className="w-3.5 h-3.5" />
                </button>
              }
            />
            <div className="divide-y divide-slate-100">
              {demoRecentQuizzes.slice(0, 5).map((quiz) => {
                const pct = (quiz.score / quiz.totalQuestions) * 100;
                return (
                  <div key={quiz.id} className="flex items-center gap-4 p-4 hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => onNavigate('results')}>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      pct >= 70 ? 'bg-emerald-50 text-emerald-600' : pct >= 50 ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      <span className="text-sm font-bold tabular-nums">{quiz.score}/{quiz.totalQuestions}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{quiz.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge color="brand" size="sm">{quiz.topic}</Badge>
                        <Badge color={quiz.difficulty === 'easy' ? 'green' : quiz.difficulty === 'medium' ? 'amber' : 'red'} size="sm">
                          {quiz.difficulty}
                        </Badge>
                        <span className="text-[11px] text-slate-400">{quiz.date}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right column: Overall progress + weak topics + recommendations */}
        <div className="space-y-6">
          {/* Overall progress ring */}
          <Card className="p-6 flex flex-col items-center">
            <h3 className="text-sm font-semibold text-slate-900 mb-1">Overall Mastery</h3>
            <p className="text-xs text-slate-400 mb-4">Across all topics</p>
            <RadialProgress value={74} size={140} strokeWidth={12} label="Mastery" sublabel="74% overall" />
            <div className="w-full mt-5 pt-5 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Strongest topic</span>
                <span className="font-medium text-emerald-600">Data Structures (87%)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Weakest topic</span>
                <span className="font-medium text-rose-600">Machine Learning (42%)</span>
              </div>
            </div>
          </Card>

          {/* Weak topics */}
          <Card>
            <CardHeader
              title="Weak Topics"
              subtitle="Areas needing attention"
              icon={<AlertCircle className="w-5 h-5" />}
            />
            <div className="p-4 space-y-3">
              {demoWeakTopics.slice(0, 3).map((wt) => (
                <div key={wt.topic} className="p-3 rounded-xl bg-rose-50/50 border border-rose-100/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{wt.topic}</span>
                    <Badge color="red" size="sm">{wt.mastery}%</Badge>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{wt.recommendation}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader
              title="Study Recommendations"
              subtitle="AI-suggested next steps"
              icon={<Sparkles className="w-5 h-5" />}
            />
            <div className="p-4 space-y-2.5">
              {demoRecommendations.map((rec) => {
                const Icon = recommendationIcons[rec.type];
                return (
                  <div key={rec.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                      <Icon className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 leading-snug">{rec.title}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Badge color={priorityColors[rec.priority]} size="sm" dot>{rec.priority}</Badge>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {rec.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
