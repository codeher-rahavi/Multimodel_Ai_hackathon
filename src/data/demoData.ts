/**
 * DEMO DATA ONLY
 *
 * All data in this file is hardcoded sample data used to demonstrate the UI.
 * None of this comes from a real backend, database, or AI service.
 *
 * When the backend is implemented, these will be replaced with real API calls
 * to Supabase / edge functions.
 */

import type {
  TopicProgress,
  QuizSummary,
  WeakTopic,
  StudyRecommendation,
  StudyMaterial,
  ChatMessage,
  QuizQuestion,
  QuizResult,
  ProgressPoint,
  StatCard,
} from '@/types';

export const demoStats: StatCard[] = [
  {
    label: 'Overall Mastery',
    value: '74%',
    change: '+5.2%',
    trend: 'up',
    icon: 'TrendingUp',
  },
  {
    label: 'Quizzes Completed',
    value: '23',
    change: '+3 this week',
    trend: 'up',
    icon: 'CheckCircle',
  },
  {
    label: 'Study Hours',
    value: '47.5h',
    change: '+8.3h this week',
    trend: 'up',
    icon: 'Clock',
  },
  {
    label: 'Materials Uploaded',
    value: '12',
    change: '+2 this week',
    trend: 'up',
    icon: 'FileText',
  },
];

export const demoTopicProgress: TopicProgress[] = [
  { topic: 'Data Structures', mastery: 87, totalQuestions: 45, correctAnswers: 39, lastStudied: '2026-10-10' },
  { topic: 'Algorithms', mastery: 72, totalQuestions: 38, correctAnswers: 27, lastStudied: '2026-10-09' },
  { topic: 'Operating Systems', mastery: 68, totalQuestions: 30, correctAnswers: 20, lastStudied: '2026-10-08' },
  { topic: 'Computer Networks', mastery: 55, totalQuestions: 25, correctAnswers: 14, lastStudied: '2026-10-07' },
  { topic: 'Databases', mastery: 81, totalQuestions: 40, correctAnswers: 32, lastStudied: '2026-10-10' },
  { topic: 'Machine Learning', mastery: 42, totalQuestions: 22, correctAnswers: 9, lastStudied: '2026-10-06' },
  { topic: 'Discrete Math', mastery: 79, totalQuestions: 35, correctAnswers: 28, lastStudied: '2026-10-09' },
  { topic: 'Software Engineering', mastery: 63, totalQuestions: 28, correctAnswers: 18, lastStudied: '2026-10-05' },
];

export const demoRecentQuizzes: QuizSummary[] = [
  { id: 'q-001', title: 'Graph Algorithms Quiz', topic: 'Algorithms', score: 8, totalQuestions: 10, date: '2026-10-10', difficulty: 'medium' },
  { id: 'q-002', title: 'SQL Fundamentals', topic: 'Databases', score: 9, totalQuestions: 10, date: '2026-10-09', difficulty: 'easy' },
  { id: 'q-003', title: 'TCP/IP Protocol Stack', topic: 'Computer Networks', score: 5, totalQuestions: 10, date: '2026-10-08', difficulty: 'hard' },
  { id: 'q-004', title: 'Binary Trees & Heaps', topic: 'Data Structures', score: 9, totalQuestions: 10, date: '2026-10-07', difficulty: 'medium' },
  { id: 'q-005', title: 'Neural Networks Basics', topic: 'Machine Learning', score: 4, totalQuestions: 10, date: '2026-10-06', difficulty: 'medium' },
  { id: 'q-006', title: 'Process Scheduling', topic: 'Operating Systems', score: 7, totalQuestions: 10, date: '2026-10-05', difficulty: 'hard' },
];

export const demoWeakTopics: WeakTopic[] = [
  { topic: 'Machine Learning', mastery: 42, recommendation: 'Review supervised learning fundamentals and practice classification problems', attemptedQuestions: 22 },
  { topic: 'Computer Networks', mastery: 55, recommendation: 'Focus on the OSI model and TCP/IP protocol stack', attemptedQuestions: 25 },
  { topic: 'Operating Systems', mastery: 68, recommendation: 'Practice process scheduling and deadlock problems', attemptedQuestions: 30 },
  { topic: 'Software Engineering', mastery: 63, recommendation: 'Review design patterns and SOLID principles', attemptedQuestions: 28 },
];

export const demoRecommendations: StudyRecommendation[] = [
  { id: 'r-001', title: 'Review: Supervised Learning Algorithms', type: 'review', topic: 'Machine Learning', priority: 'high', estimatedTime: '30 min' },
  { id: 'r-002', title: 'Practice: OSI Model Layer Quiz', type: 'practice', topic: 'Computer Networks', priority: 'high', estimatedTime: '15 min' },
  { id: 'r-003', title: 'Watch: Process Scheduling Algorithms', type: 'watch', topic: 'Operating Systems', priority: 'medium', estimatedTime: '45 min' },
  { id: 'r-004', title: 'Read: SOLID Principles Deep Dive', type: 'read', topic: 'Software Engineering', priority: 'medium', estimatedTime: '25 min' },
  { id: 'r-005', title: 'Practice: Graph Traversal Problems', type: 'practice', topic: 'Algorithms', priority: 'low', estimatedTime: '20 min' },
];

export const demoStudyMaterials: StudyMaterial[] = [
  { id: 'm-001', title: 'Data Structures — Complete Notes.pdf', type: 'pdf', size: '2.4 MB', uploadDate: '2026-10-10', topic: 'Data Structures', uploaded: true },
  { id: 'm-002', title: 'Algorithms — Lecture Slides Week 7.pptx', type: 'slides', size: '5.1 MB', uploadDate: '2026-10-09', topic: 'Algorithms', uploaded: true },
  { id: 'm-003', title: 'Operating Systems — Process Management.mp4', type: 'video', size: '124 MB', uploadDate: '2026-10-08', topic: 'Operating Systems', uploaded: true },
  { id: 'm-004', title: 'Computer Networks — TCP_IP.pdf', type: 'pdf', size: '1.8 MB', uploadDate: '2026-10-07', topic: 'Computer Networks', uploaded: true },
  { id: 'm-005', title: 'Databases — Normalization Slides.pptx', type: 'slides', size: '3.2 MB', uploadDate: '2026-10-06', topic: 'Databases', uploaded: true },
  { id: 'm-006', title: 'Machine Learning — Intro Lecture.mp4', type: 'video', size: '98 MB', uploadDate: '2026-10-05', topic: 'Machine Learning', uploaded: true },
  { id: 'm-007', title: 'Discrete Math — Logic & Proofs.pdf', type: 'pdf', size: '3.7 MB', uploadDate: '2026-10-04', topic: 'Discrete Math', uploaded: true },
];

export const demoChatMessages: ChatMessage[] = [
  {
    id: 'c-001',
    role: 'user',
    content: 'Can you explain the difference between BFS and DFS?',
    timestamp: '10:32 AM',
  },
  {
    id: 'c-002',
    role: 'tutor',
    content:
      'Great question! BFS (Breadth-First Search) and DFS (Depth-First Search) are two fundamental graph traversal algorithms, but they explore graphs in very different ways.\n\n**BFS** explores all neighbors at the current depth before moving deeper. It uses a **queue** (FIFO) and is optimal for finding the shortest path in unweighted graphs. Time complexity: O(V + E).\n\n**DFS** explores as far as possible along each branch before backtracking. It uses a **stack** or recursion (LIFO) and is useful for topological sorting, cycle detection, and solving puzzles. Time complexity: O(V + E).\n\n**Key difference:** BFS goes level-by-level (wide), while DFS goes deep before going wide.',
    timestamp: '10:32 AM',
    citations: [
      { id: 'cit-1', source: 'Data Structures — Complete Notes.pdf', page: 'Page 42', snippet: 'BFS uses a queue data structure to traverse nodes level by level, ensuring shortest path in unweighted graphs.' },
      { id: 'cit-2', source: 'Algorithms — Lecture Slides Week 7.pptx', page: 'Slide 15', snippet: 'DFS uses a stack or recursion. It explores each branch to its full depth before backtracking.' },
    ],
  },
  {
    id: 'c-003',
    role: 'user',
    content: 'When would I choose DFS over BFS?',
    timestamp: '10:34 AM',
  },
  {
    id: 'c-004',
    role: 'tutor',
    content:
      'Choose **DFS** when you need to:\n\n1. **Detect cycles** in a graph — DFS with a recursion stack naturally identifies back edges.\n2. **Topological sorting** — DFS post-order reversal gives a valid topological order for DAGs.\n3. **Find connected components** in an undirected graph.\n4. **Solve maze/puzzle problems** — DFS explores one path fully, which is efficient when solutions are deep.\n5. **Memory constraints** — DFS uses O(h) space (h = tree height), while BFS uses O(w) space (w = max width), which can be much larger.\n\nChoose **BFS** when you need the shortest path or shortest distance in an unweighted graph.',
    timestamp: '10:34 AM',
    citations: [
      { id: 'cit-3', source: 'Algorithms — Lecture Slides Week 7.pptx', page: 'Slide 18', snippet: 'DFS is preferred for topological sorting, cycle detection, and problems where solutions are likely deep in the search space.' },
    ],
  },
];

export const demoQuizQuestions: QuizQuestion[] = [
  {
    id: 'qq-001',
    type: 'multiple-choice',
    question: 'What data structure does BFS use for traversal?',
    options: ['Stack', 'Queue', 'Heap', 'Tree'],
    correctAnswer: 'Queue',
    explanation: 'BFS uses a queue (FIFO) to ensure nodes are visited level by level. Each node\'s neighbors are enqueued and processed in the order they were discovered.',
    topic: 'Algorithms',
    difficulty: 'easy',
  },
  {
    id: 'qq-002',
    type: 'multiple-choice',
    question: 'What is the time complexity of DFS on a graph with V vertices and E edges?',
    options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V * E)'],
    correctAnswer: 'O(V + E)',
    explanation: 'DFS visits every vertex once and explores every edge once, giving a time complexity of O(V + E) using an adjacency list representation.',
    topic: 'Algorithms',
    difficulty: 'medium',
  },
  {
    id: 'qq-003',
    type: 'multiple-choice',
    question: 'Which algorithm is best for finding the shortest path in an unweighted graph?',
    options: ['DFS', 'BFS', 'Dijkstra\'s', 'Bellman-Ford'],
    correctAnswer: 'BFS',
    explanation: 'BFS explores nodes level by level, so the first time a destination is reached, it is guaranteed to be via the shortest path. Dijkstra\'s and Bellman-Ford are for weighted graphs.',
    topic: 'Algorithms',
    difficulty: 'easy',
  },
  {
    id: 'qq-004',
    type: 'short-answer',
    question: 'Explain what a "back edge" is in the context of DFS-based cycle detection.',
    correctAnswer: 'A back edge is an edge that connects a vertex to an ancestor in the DFS recursion stack, indicating a cycle exists in the graph.',
    explanation: 'During DFS, if an edge leads to a vertex that is already in the current recursion stack (marked as "in progress"), it is a back edge. The presence of a back edge means the graph contains a cycle.',
    topic: 'Algorithms',
    difficulty: 'hard',
  },
  {
    id: 'qq-005',
    type: 'multiple-choice',
    question: 'In a binary tree, which traversal visits root, then left subtree, then right subtree?',
    options: ['In-order', 'Pre-order', 'Post-order', 'Level-order'],
    correctAnswer: 'Pre-order',
    explanation: 'Pre-order traversal visits the root first, then the left subtree, then the right subtree. In-order visits left-root-right, post-order visits left-right-root.',
    topic: 'Data Structures',
    difficulty: 'easy',
  },
  {
    id: 'qq-006',
    type: 'multiple-choice',
    question: 'What is the space complexity of BFS in the worst case?',
    options: ['O(V)', 'O(E)', 'O(V + E)', 'O(1)'],
    correctAnswer: 'O(V)',
    explanation: 'In the worst case (a wide graph), the BFS queue may need to hold all vertices at the widest level, requiring O(V) space.',
    topic: 'Algorithms',
    difficulty: 'medium',
  },
  {
    id: 'qq-007',
    type: 'short-answer',
    question: 'What is topological sorting and which graph type requires it?',
    correctAnswer: 'Topological sorting is a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u→v, u comes before v in the ordering.',
    explanation: 'Topological sorting applies only to DAGs. It is commonly used for task scheduling, dependency resolution, and build systems. DFS-based topological sort uses post-order reversal.',
    topic: 'Algorithms',
    difficulty: 'hard',
  },
  {
    id: 'qq-008',
    type: 'multiple-choice',
    question: 'Which of the following is NOT an application of DFS?',
    options: ['Cycle detection', 'Topological sorting', 'Shortest path in unweighted graph', 'Finding connected components'],
    correctAnswer: 'Shortest path in unweighted graph',
    explanation: 'DFS does not guarantee the shortest path. BFS is the algorithm used for finding shortest paths in unweighted graphs.',
    topic: 'Algorithms',
    difficulty: 'medium',
  },
];

export const demoQuizResult: QuizResult = {
  quizId: 'q-001',
  title: 'Graph Algorithms Quiz',
  topic: 'Algorithms',
  difficulty: 'medium',
  score: 7,
  totalQuestions: 8,
  date: '2026-10-10',
  questions: demoQuizQuestions.map((q) => ({
    ...q,
    userAnswer: q.type === 'multiple-choice' ? q.options?.[0] : 'A back edge connects two nodes.',
    isCorrect: q.id === 'qq-001' || q.id === 'qq-003' || q.id === 'qq-005' || q.id === 'qq-008' || q.id === 'qq-002' || q.id === 'qq-006' || q.id === 'qq-004',
  })),
  weakTopics: [
    { topic: 'Graph Traversal', mastery: 50, recommendation: 'Practice more BFS vs DFS problems and review back edge detection', attemptedQuestions: 4 },
    { topic: 'Topological Sorting', mastery: 40, recommendation: 'Review DAG properties and practice topological sort implementations', attemptedQuestions: 2 },
  ],
};

export const demoProgressOverTime: ProgressPoint[] = [
  { date: 'Sep 1', mastery: 45, quizzesTaken: 2 },
  { date: 'Sep 8', mastery: 48, quizzesTaken: 3 },
  { date: 'Sep 15', mastery: 52, quizzesTaken: 5 },
  { date: 'Sep 22', mastery: 58, quizzesTaken: 8 },
  { date: 'Sep 29', mastery: 61, quizzesTaken: 12 },
  { date: 'Oct 6', mastery: 68, quizzesTaken: 18 },
  { date: 'Oct 13', mastery: 74, quizzesTaken: 23 },
];

export const availableTopics: string[] = [
  'Algorithms',
  'Data Structures',
  'Operating Systems',
  'Computer Networks',
  'Databases',
  'Machine Learning',
  'Discrete Math',
  'Software Engineering',
];
