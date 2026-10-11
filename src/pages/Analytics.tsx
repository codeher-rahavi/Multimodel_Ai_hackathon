import {
  TrendingUp,
  BarChart3,
  Target,
  Award,
  Calendar,
  Download,
  Brain,
  Zap,
} from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { BarChart } from '@/components/charts/BarChart';
import { LineChart } from '@/components/charts/LineChart';
import { RadialProgress } from '@/components/charts/RadialProgress';
import {
  demoTopicProgress,
  demoProgressOverTime,
  demoRecentQuizzes,
} from '@/data/demoData';

export function Analytics() {
  const masteryData = demoTopicProgress.map((tp) => ({
    label: tp.topic.split(' ').map((w) => w[0]).join(''),
    value: tp.mastery,
  }));

  const progressData = demoProgressOverTime.map((p) => ({
    label: p.date,
    value: p.mastery,
  }));

  const strongestTopic = [...demoTopicProgress].sort((a, b) => b.mastery - a.mastery)[0];
  const weakestTopic = [...demoTopicProgress].sort((a, b) => a.mastery - b.mastery)[0];
  const avgMastery = Math.round(demoTopicProgress.reduce((sum, t) => sum + t.mastery, 0) / demoTopicProgress.length);
  const totalQuestions = demoTopicProgress.reduce((sum, t) => sum + t.totalQuestions, 0);
  const totalCorrect = demoTopicProgress.reduce((sum, t) => sum + t.correctAnswers, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top summary cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-6 flex items-center gap-5">
          <RadialProgress value={avgMastery} size={90} strokeWidth={8} />
          <div>
            <p className="text-xs text-slate-400 font-medium">Average Mastery</p>
            <p className="text-2xl font-bold text-slate-900">{avgMastery}%</p>
            <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +5.2% this week
            </p>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Award className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Strongest Topic</p>
              <p className="text-sm font-bold text-slate-900">{strongestTopic.topic}</p>
            </div>
          </div>
          <ProgressBar value={strongestTopic.mastery} color="green" size="sm" />
          <p className="text-xs text-slate-500 mt-2">
            {strongestTopic.correctAnswers}/{strongestTopic.totalQuestions} questions correct
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
              <Target className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Focus Area</p>
              <p className="text-sm font-bold text-slate-900">{weakestTopic.topic}</p>
            </div>
          </div>
          <ProgressBar value={weakestTopic.mastery} color="red" size="sm" />
          <p className="text-xs text-slate-500 mt-2">
            {weakestTopic.correctAnswers}/{weakestTopic.totalQuestions} questions correct
          </p>
        </Card>
      </div>

      {/* Progress over time */}
      <Card>
        <CardHeader
          title="Mastery Progress Over Time"
          subtitle="Your overall mastery trend across the past 7 weeks"
          icon={<TrendingUp className="w-5 h-5" />}
          action={
            <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />}>
              <span className="hidden sm:inline">Export</span>
            </Button>
          }
        />
        <div className="p-5">
          <LineChart data={progressData} height={260} />
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100">
            <div>
              <p className="text-xs text-slate-400">Starting mastery</p>
              <p className="text-lg font-bold text-slate-700 tabular-nums">{demoProgressOverTime[0].mastery}%</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Current mastery</p>
              <p className="text-lg font-bold text-brand-600 tabular-nums">{demoProgressOverTime[demoProgressOverTime.length - 1].mastery}%</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Total improvement</p>
              <p className="text-lg font-bold text-emerald-600 tabular-nums">
                +{demoProgressOverTime[demoProgressOverTime.length - 1].mastery - demoProgressOverTime[0].mastery}%
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Topic mastery bar chart */}
      <Card>
        <CardHeader
          title="Topic Mastery Breakdown"
          subtitle="Mastery level for each subject area"
          icon={<BarChart3 className="w-5 h-5" />}
        />
        <div className="p-5">
          <BarChart data={masteryData} height={250} />
          <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-emerald-500" />
              <span className="text-xs text-slate-500">75%+</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-brand-500" />
              <span className="text-xs text-slate-500">50-74%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-amber-500" />
              <span className="text-xs text-slate-500">30-49%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-rose-500" />
              <span className="text-xs text-slate-500">Below 30%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Detailed topic table + activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic table */}
        <Card>
          <CardHeader
            title="Detailed Topic Performance"
            subtitle="Per-topic statistics"
            icon={<Brain className="w-5 h-5" />}
          />
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Topic</th>
                  <th className="text-right text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-3">Questions</th>
                  <th className="text-right text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-3">Accuracy</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3">Mastery</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {demoTopicProgress.map((tp) => {
                  const accuracy = Math.round((tp.correctAnswers / tp.totalQuestions) * 100);
                  return (
                    <tr key={tp.topic} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3">
                        <span className="text-sm font-medium text-slate-700">{tp.topic}</span>
                      </td>
                      <td className="px-3 py-3 text-right text-sm text-slate-600 tabular-nums">{tp.totalQuestions}</td>
                      <td className="px-3 py-3 text-right">
                        <span className={`text-sm font-medium tabular-nums ${
                          accuracy >= 75 ? 'text-emerald-600' : accuracy >= 50 ? 'text-amber-600' : 'text-rose-600'
                        }`}>
                          {accuracy}%
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="w-24">
                          <ProgressBar value={tp.mastery} size="sm" showValue={false} color={tp.mastery >= 75 ? 'green' : tp.mastery >= 50 ? 'brand' : tp.mastery >= 30 ? 'amber' : 'red'} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quiz activity */}
        <Card>
          <CardHeader
            title="Recent Quiz Activity"
            subtitle="Quiz scores over time"
            icon={<Zap className="w-5 h-5" />}
          />
          <div className="p-5">
            <div className="space-y-3">
              {demoRecentQuizzes.slice(0, 6).map((quiz) => {
                const pct = Math.round((quiz.score / quiz.totalQuestions) * 100);
                return (
                  <div key={quiz.id} className="flex items-center gap-3">
                    <div className="text-xs text-slate-400 font-medium w-16 flex-shrink-0 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {quiz.date.slice(5)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">{quiz.title}</p>
                    </div>
                    <div className="w-20 flex-shrink-0">
                      <ProgressBar value={pct} size="sm" showValue={false} color={pct >= 75 ? 'green' : pct >= 50 ? 'amber' : 'red'} />
                    </div>
                    <span className={`text-sm font-bold tabular-nums w-12 text-right flex-shrink-0 ${
                      pct >= 75 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Overall stats footer */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-slate-900 tabular-nums">{totalQuestions}</p>
          <p className="text-xs text-slate-400 mt-1">Total Questions Attempted</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600 tabular-nums">{totalCorrect}</p>
          <p className="text-xs text-slate-400 mt-1">Total Correct Answers</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-brand-600 tabular-nums">{demoRecentQuizzes.length}</p>
          <p className="text-xs text-slate-400 mt-1">Quizzes Completed</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-slate-900 tabular-nums">{Math.round((totalCorrect / totalQuestions) * 100)}%</p>
          <p className="text-xs text-slate-400 mt-1">Overall Accuracy</p>
        </Card>
      </div>
    </div>
  );
}
