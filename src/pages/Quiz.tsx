import { useState } from 'react';
import {
  HelpCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  AlertCircle,
  Settings,
  Award,
  RotateCcw,
  Flag,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { demoQuizQuestions, availableTopics } from '@/data/demoData';
import type { QuizQuestion, PageId } from '@/types';

interface QuizProps {
  onNavigate: (page: PageId) => void;
}

type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed';
type QuizPhase = 'config' | 'taking' | 'complete';

const difficultyConfig: { id: Difficulty; label: string; description: string; color: 'green' | 'amber' | 'red' | 'brand' }[] = [
  { id: 'easy', label: 'Easy', description: 'Basic concepts', color: 'green' },
  { id: 'medium', label: 'Medium', description: 'Intermediate level', color: 'amber' },
  { id: 'hard', label: 'Hard', description: 'Advanced problems', color: 'red' },
  { id: 'mixed', label: 'Mixed', description: 'All difficulties', color: 'brand' },
];

const questionCountOptions = [5, 10, 15, 20];

export function Quiz({ onNavigate }: QuizProps) {
  const [phase, setPhase] = useState<QuizPhase>('config');
  const [selectedTopic, setSelectedTopic] = useState('Algorithms');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');
  const [questionCount, setQuestionCount] = useState(10);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  // DEMO: Filters the demo question bank. No real quiz generation happens.
  const startQuiz = () => {
    let filtered = [...demoQuizQuestions];
    if (selectedTopic !== 'All Topics') {
      filtered = filtered.filter((q) => q.topic === selectedTopic);
    }
    if (selectedDifficulty !== 'mixed') {
      filtered = filtered.filter((q) => q.difficulty === selectedDifficulty);
    }
    // Use available questions, cycle if not enough
    const quizQuestions: QuizQuestion[] = [];
    while (quizQuestions.length < questionCount && filtered.length > 0) {
      quizQuestions.push(...filtered);
    }
    setQuestions(quizQuestions.slice(0, questionCount));
    setCurrentQ(0);
    setAnswers({});
    setPhase('taking');
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setPhase('complete');
    }
  };

  const prevQuestion = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const restartQuiz = () => {
    setPhase('config');
    setCurrentQ(0);
    setAnswers({});
    setQuestions([]);
  };

  const score = questions.filter((q) => answers[q.id]?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()).length;

  if (phase === 'config') {
    return <QuizConfig
      selectedTopic={selectedTopic}
      setSelectedTopic={setSelectedTopic}
      selectedDifficulty={selectedDifficulty}
      setSelectedDifficulty={setSelectedDifficulty}
      questionCount={questionCount}
      setQuestionCount={setQuestionCount}
      onStart={startQuiz}
    />;
  }

  if (phase === 'complete') {
    return <QuizComplete
      score={score}
      total={questions.length}
      questions={questions}
      answers={answers}
      onNavigate={onNavigate}
      onRestart={restartQuiz}
    />;
  }

  return (
    <QuizTaking
      questions={questions}
      currentQ={currentQ}
      answers={answers}
      onAnswer={handleAnswer}
      onNext={nextQuestion}
      onPrev={prevQuestion}
      onQuit={restartQuiz}
    />
  );
}

interface QuizConfigProps {
  selectedTopic: string;
  setSelectedTopic: (t: string) => void;
  selectedDifficulty: Difficulty;
  setSelectedDifficulty: (d: Difficulty) => void;
  questionCount: number;
  setQuestionCount: (n: number) => void;
  onStart: () => void;
}

function QuizConfig({ selectedTopic, setSelectedTopic, selectedDifficulty, setSelectedDifficulty, questionCount, setQuestionCount, onStart }: QuizConfigProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Create a Quiz</h1>
        <p className="text-sm text-slate-500 mt-1">Configure your quiz settings and test your knowledge</p>
      </div>

      {/* Demo notice */}
      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200/50">
        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700">
          <span className="font-medium">Demo Mode:</span> Quizzes use a small bank of sample questions.
          When the backend is connected, questions will be AI-generated from your uploaded materials.
        </p>
      </div>

      {/* Topic selection */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-brand-600" />
          <h3 className="font-semibold text-slate-900 text-sm">1. Select a Topic</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <button
            onClick={() => setSelectedTopic('All Topics')}
            className={`p-3 rounded-xl border text-sm font-medium transition-all ${
              selectedTopic === 'All Topics'
                ? 'border-brand-400 bg-brand-50 text-brand-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            All Topics
          </button>
          {availableTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                selectedTopic === topic
                  ? 'border-brand-400 bg-brand-50 text-brand-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </Card>

      {/* Difficulty selection */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Flag className="w-5 h-5 text-brand-600" />
          <h3 className="font-semibold text-slate-900 text-sm">2. Choose Difficulty</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {difficultyConfig.map((diff) => (
            <button
              key={diff.id}
              onClick={() => setSelectedDifficulty(diff.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedDifficulty === diff.id
                  ? 'border-brand-400 bg-brand-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-slate-800">{diff.label}</span>
                <Badge color={diff.color} size="sm">{diff.id !== 'mixed' ? diff.id : 'all'}</Badge>
              </div>
              <p className="text-xs text-slate-500">{diff.description}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Question count */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-brand-600" />
          <h3 className="font-semibold text-slate-900 text-sm">3. Number of Questions</h3>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {questionCountOptions.map((count) => (
            <button
              key={count}
              onClick={() => setQuestionCount(count)}
              className={`p-3 rounded-xl border text-center transition-all ${
                questionCount === count
                  ? 'border-brand-400 bg-brand-50 text-brand-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <span className="text-lg font-bold tabular-nums">{count}</span>
              <p className="text-[10px] text-slate-400 mt-0.5">questions</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Summary + start */}
      <Card className="p-6 bg-gradient-to-r from-slate-50 to-brand-50/30 border-brand-100/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-slate-400 font-medium mb-1">Quiz Summary</p>
            <p className="text-sm text-slate-700">
              <span className="font-semibold">{questionCount} questions</span> on
              <span className="font-semibold"> {selectedTopic}</span> ·
              <span className="font-semibold"> {selectedDifficulty}</span> difficulty
            </p>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Est. {Math.ceil(questionCount * 1.5)} minutes
            </p>
          </div>
          <Button size="lg" onClick={onStart} icon={<HelpCircle className="w-5 h-5" />}>
            Start Quiz
          </Button>
        </div>
      </Card>
    </div>
  );
}

interface QuizTakingProps {
  questions: QuizQuestion[];
  currentQ: number;
  answers: Record<string, string>;
  onAnswer: (id: string, answer: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onQuit: () => void;
}

function QuizTaking({ questions, currentQ, answers, onAnswer, onNext, onPrev, onQuit }: QuizTakingProps) {
  const question = questions[currentQ];
  const answeredCount = Object.keys(answers).filter((k) => answers[k]?.trim()).length;
  const isAnswered = answers[question?.id]?.trim()?.length > 0;

  if (!question) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button onClick={onQuit} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Quit Quiz
        </button>
        <div className="flex items-center gap-3">
          <Badge color="brand" size="md">{question.topic}</Badge>
          <Badge color={question.difficulty === 'easy' ? 'green' : question.difficulty === 'medium' ? 'amber' : 'red'} size="md">
            {question.difficulty}
          </Badge>
        </div>
      </div>

      {/* Progress */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">
            Question {currentQ + 1} of {questions.length}
          </span>
          <span className="text-xs text-slate-400 tabular-nums">{answeredCount}/{questions.length} answered</span>
        </div>
        <ProgressBar value={currentQ + 1} max={questions.length} showValue={false} color="brand" />
      </Card>

      {/* Question */}
      <Card className="p-6">
        <div className="flex items-start gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-brand-700 tabular-nums">{currentQ + 1}</span>
          </div>
          <div className="flex-1">
            <Badge color={question.type === 'multiple-choice' ? 'brand' : 'purple'} size="sm" className="mb-2">
              {question.type === 'multiple-choice' ? 'Multiple Choice' : 'Short Answer'}
            </Badge>
            <p className="text-base font-medium text-slate-900 leading-relaxed">{question.question}</p>
          </div>
        </div>

        {/* Answer area */}
        {question.type === 'multiple-choice' && question.options ? (
          <div className="space-y-2.5">
            {question.options.map((option, i) => {
              const isSelected = answers[question.id] === option;
              return (
                <button
                  key={i}
                  onClick={() => onAnswer(question.id, option)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-brand-400 bg-brand-50 ring-1 ring-brand-200'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected ? 'border-brand-500 bg-brand-500' : 'border-slate-300'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className={`text-sm ${isSelected ? 'text-brand-800 font-medium' : 'text-slate-700'}`}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            <textarea
              value={answers[question.id] ?? ''}
              onChange={(e) => onAnswer(question.id, e.target.value)}
              placeholder="Type your answer here..."
              rows={4}
              className="w-full p-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-200 transition-all resize-none"
            />
          </div>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="secondary" onClick={onPrev} disabled={currentQ === 0} icon={<ChevronLeft className="w-4 h-4" />}>
          Previous
        </Button>

        {/* Question dots */}
        <div className="hidden sm:flex items-center gap-1.5">
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => {
                // Jump to question
                const event = new CustomEvent('jumpQuestion', { detail: i });
                window.dispatchEvent(event);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentQ ? 'bg-brand-600 w-6' : answers[q.id]?.trim() ? 'bg-emerald-400' : 'bg-slate-300'
              }`}
            />
          ))}
        </div>

        <Button onClick={onNext} disabled={!isAnswered} icon={currentQ === questions.length - 1 ? <Check className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}>
          {currentQ === questions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
}

interface QuizCompleteProps {
  score: number;
  total: number;
  questions: QuizQuestion[];
  answers: Record<string, string>;
  onNavigate: (page: PageId) => void;
  onRestart: () => void;
}

function QuizComplete({ score, total, onNavigate, onRestart }: QuizCompleteProps) {
  const pct = Math.round((score / total) * 100);
  const grade = pct >= 90 ? 'A' : pct >= 80 ? 'B' : pct >= 70 ? 'C' : pct >= 60 ? 'D' : 'F';
  const gradeColor = pct >= 80 ? 'text-emerald-600' : pct >= 60 ? 'text-amber-600' : 'text-rose-600';

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-scale-in">
      <Card className="p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Quiz Complete!</h1>
        <p className="text-sm text-slate-500 mb-6">You've finished all {total} questions</p>

        <div className="flex items-center justify-center gap-8 mb-6">
          <div>
            <p className={`text-5xl font-bold ${gradeColor}`}>{grade}</p>
            <p className="text-xs text-slate-400 mt-1">Grade</p>
          </div>
          <div className="w-px h-16 bg-slate-200" />
          <div>
            <p className="text-5xl font-bold text-slate-900 tabular-nums">{score}/{total}</p>
            <p className="text-xs text-slate-400 mt-1">Score ({pct}%)</p>
          </div>
        </div>

        <ProgressBar value={pct} size="lg" color={pct >= 75 ? 'green' : pct >= 50 ? 'amber' : 'red'} showValue={false} />
      </Card>

      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={() => onNavigate('results')} icon={<HelpCircle className="w-4 h-4" />}>
          Review Answers
        </Button>
        <Button className="flex-1" onClick={onRestart} icon={<RotateCcw className="w-4 h-4" />}>
          New Quiz
        </Button>
      </div>
    </div>
  );
}
