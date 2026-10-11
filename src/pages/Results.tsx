import { useState } from 'react';
import {
  Check,
  X,
  Award,
  TrendingDown,
  AlertCircle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Target,
  ClipboardList,
} from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { RadialProgress } from '@/components/charts/RadialProgress';
import { demoQuizResult } from '@/data/demoData';
import type { PageId, QuizQuestion } from '@/types';

interface ResultsProps {
  onNavigate: (page: PageId) => void;
}

export function Results({ onNavigate }: ResultsProps) {
  const result = demoQuizResult;
  const pct = Math.round((result.score / result.totalQuestions) * 100);
  const [expandedQs, setExpandedQs] = useState<Set<string>>(new Set([result.questions[0]?.id]));

  const toggleExpand = (id: string) => {
    setExpandedQs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const correctCount = result.questions.filter((q) => q.isCorrect).length;
  const incorrectCount = result.totalQuestions - correctCount;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header card with score */}
      <Card className="overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left: Score ring */}
          <div className="flex items-center justify-center p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-brand-50/30 lg:w-72 flex-shrink-0">
            <div className="text-center">
              <RadialProgress value={pct} size={130} strokeWidth={12} label="Score" />
              <div className="mt-4">
                <Badge color={pct >= 75 ? 'green' : pct >= 50 ? 'amber' : 'red'} size="md" dot>
                  {pct >= 90 ? 'Excellent' : pct >= 75 ? 'Good' : pct >= 50 ? 'Needs Work' : 'Review Needed'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex-1 p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardList className="w-5 h-5 text-brand-600" />
              <h2 className="text-lg font-bold text-slate-900">{result.title}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <Badge color="brand" size="sm">{result.topic}</Badge>
              <Badge color={result.difficulty === 'easy' ? 'green' : result.difficulty === 'medium' ? 'amber' : 'red'} size="sm">
                {result.difficulty}
              </Badge>
              <span className="text-xs text-slate-400">{result.date}</span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100/50">
                <div className="flex items-center gap-2 mb-1">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs text-emerald-700 font-medium">Correct</span>
                </div>
                <p className="text-2xl font-bold text-emerald-700 tabular-nums">{correctCount}</p>
              </div>
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-100/50">
                <div className="flex items-center gap-2 mb-1">
                  <X className="w-4 h-4 text-rose-600" />
                  <span className="text-xs text-rose-700 font-medium">Incorrect</span>
                </div>
                <p className="text-2xl font-bold text-rose-700 tabular-nums">{incorrectCount}</p>
              </div>
              <div className="p-3 rounded-xl bg-brand-50 border border-brand-100/50">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-brand-600" />
                  <span className="text-xs text-brand-700 font-medium">Grade</span>
                </div>
                <p className="text-2xl font-bold text-brand-700">
                  {pct >= 90 ? 'A' : pct >= 80 ? 'B' : pct >= 70 ? 'C' : pct >= 60 ? 'D' : 'F'}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" size="sm" onClick={() => onNavigate('quiz')} icon={<ClipboardList className="w-4 h-4" />}>
                Retake Quiz
              </Button>
              <Button variant="secondary" size="sm" onClick={() => onNavigate('analytics')} icon={<Target className="w-4 h-4" />}>
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Weak topic analysis */}
      <Card>
        <CardHeader
          title="Weak Topic Analysis"
          subtitle="Areas that need more study based on this quiz"
          icon={<TrendingDown className="w-5 h-5" />}
        />
        <div className="p-5 space-y-4">
          {result.weakTopics.map((wt) => (
            <div key={wt.topic} className="p-4 rounded-xl bg-amber-50/50 border border-amber-100/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-semibold text-slate-800">{wt.topic}</span>
                </div>
                <Badge color="amber" size="sm">{wt.mastery}% mastery</Badge>
              </div>
              <ProgressBar value={wt.mastery} color="amber" size="sm" showValue={false} />
              <div className="flex items-start gap-2 mt-3">
                <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">{wt.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Question review */}
      <Card>
        <CardHeader
          title="Question Review"
          subtitle="Review each question with correct answers and explanations"
          icon={<BookOpen className="w-5 h-5" />}
        />
        <div className="divide-y divide-slate-100">
          {result.questions.map((q, i) => (
            <QuestionReview
              key={q.id}
              question={q}
              index={i}
              isExpanded={expandedQs.has(q.id)}
              onToggle={() => toggleExpand(q.id)}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}

interface QuestionReviewProps {
  question: QuizQuestion;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function QuestionReview({ question, index, isExpanded, onToggle }: QuestionReviewProps) {
  const isCorrect = question.isCorrect ?? false;

  return (
    <div className="p-4">
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-3 text-left"
      >
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isCorrect ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        }`}>
          {isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-slate-400 font-medium">Q{index + 1}</span>
            <Badge color={question.type === 'multiple-choice' ? 'brand' : 'purple'} size="sm">
              {question.type === 'multiple-choice' ? 'MC' : 'SA'}
            </Badge>
            <Badge color={isCorrect ? 'green' : 'red'} size="sm">
              {isCorrect ? 'Correct' : 'Incorrect'}
            </Badge>
          </div>
          <p className="text-sm font-medium text-slate-800 leading-snug">{question.question}</p>
        </div>
        <div className="flex-shrink-0 mt-1">
          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </button>

      {isExpanded && (
        <div className="mt-4 ml-10 space-y-3 animate-slide-up">
          {/* User answer */}
          <div className={`p-3 rounded-xl border ${isCorrect ? 'bg-emerald-50/50 border-emerald-100/50' : 'bg-rose-50/50 border-rose-100/50'}`}>
            <p className="text-xs font-medium text-slate-500 mb-1">Your Answer</p>
            <p className={`text-sm ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
              {question.userAnswer || 'No answer provided'}
            </p>
          </div>

          {/* Correct answer */}
          {!isCorrect && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100/50">
              <p className="text-xs font-medium text-slate-500 mb-1">Correct Answer</p>
              <p className="text-sm text-emerald-700 font-medium">{question.correctAnswer}</p>
            </div>
          )}

          {/* Explanation */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/50">
            <div className="flex items-center gap-2 mb-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <p className="text-xs font-medium text-slate-600">Explanation</p>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{question.explanation}</p>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-2">
            <Badge color="slate" size="sm">{question.topic}</Badge>
            <Badge color={question.difficulty === 'easy' ? 'green' : question.difficulty === 'medium' ? 'amber' : 'red'} size="sm">
              {question.difficulty}
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
}
