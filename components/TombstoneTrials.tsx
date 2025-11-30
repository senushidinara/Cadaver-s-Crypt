import React, { useState } from 'react';
import { Skull, Brain, Check, X, ArrowRight, RefreshCw, Trophy, Loader2 } from 'lucide-react';
import { QuizQuestion, UserStats } from '../types';
import { generateQuizQuestion } from '../services/geminiService';
import { MOCK_QUIZ_QUESTIONS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const TombstoneTrials: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [stats, setStats] = useState<UserStats>({ soulsSaved: 0, sanityLevel: 100, currentStreak: 0 });
  const [mode, setMode] = useState<'menu' | 'quiz'>('menu');

  const startQuiz = async (difficulty: 'easy' | 'medium' | 'hard') => {
    setLoading(true);
    setMode('quiz');
    // Try to get AI question, fallback to mock if API fails/quota
    const question = await generateQuizQuestion(difficulty);
    if (question) {
        setCurrentQuestion(question);
    } else {
        // Fallback random mock question
        const randomQ = MOCK_QUIZ_QUESTIONS[Math.floor(Math.random() * MOCK_QUIZ_QUESTIONS.length)];
        setCurrentQuestion(randomQ);
    }
    setLoading(false);
    setSelectedOption(null);
    setShowResult(false);
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);

    if (currentQuestion && index === currentQuestion.correctAnswerIndex) {
        setStats(prev => ({
            ...prev,
            soulsSaved: prev.soulsSaved + 1,
            currentStreak: prev.currentStreak + 1
        }));
    } else {
        setStats(prev => ({
            ...prev,
            sanityLevel: Math.max(0, prev.sanityLevel - 10),
            currentStreak: 0
        }));
    }
  };

  const nextQuestion = () => {
    startQuiz(currentQuestion?.difficulty || 'easy');
  };

  // Chart Data
  const chartData = [
      { name: 'Saved', value: stats.soulsSaved },
      { name: 'Sanity', value: stats.sanityLevel },
      { name: 'Streak', value: stats.currentStreak }
  ];

  if (mode === 'menu') {
      return (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-8 animate-fadeIn">
              <Skull className="w-20 h-20 text-ghost-white mb-4 animate-float" />
              <h2 className="text-4xl font-gothic text-blood-red tracking-widest uppercase">Tombstone Trials</h2>
              <p className="text-xl font-medical text-gray-400 max-w-md">
                  Prove your worth, mortal. Answer correctly to save souls. Fail, and your sanity will drain...
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mt-8">
                  {['easy', 'medium', 'hard'].map((diff) => (
                      <button
                        key={diff}
                        onClick={() => startQuiz(diff as any)}
                        className="group relative overflow-hidden bg-crypt-gray border border-gray-700 hover:border-blood-red p-6 rounded-lg transition-all duration-300"
                      >
                          <div className="absolute inset-0 bg-blood-red/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                          <h3 className="text-xl font-spooky capitalize relative z-10 text-ghost-white">{diff}</h3>
                          <p className="text-xs text-gray-500 relative z-10 mt-2">
                              {diff === 'easy' ? 'Fresh Meat' : diff === 'medium' ? 'Grave Robber' : 'Necromancer'}
                          </p>
                      </button>
                  ))}
              </div>
          </div>
      );
  }

  return (
    <div className="flex flex-col h-full p-4 md:p-8 max-w-5xl mx-auto w-full">
        {/* Header Stats */}
        <div className="flex justify-between items-center mb-8 bg-coffin-black/50 p-4 rounded-lg border border-gray-800 backdrop-blur-sm">
            <button onClick={() => setMode('menu')} className="text-gray-500 hover:text-white transition-colors">
                &larr; Escape
            </button>
            <div className="flex gap-6 font-medical text-lg">
                <span className="text-toxic-green flex items-center gap-2">
                    <Trophy className="w-4 h-4" /> Souls: {stats.soulsSaved}
                </span>
                <span className={`${stats.sanityLevel < 30 ? 'text-red-500 animate-pulse' : 'text-blue-400'} flex items-center gap-2`}>
                    <Brain className="w-4 h-4" /> Sanity: {stats.sanityLevel}%
                </span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
            {/* Question Area */}
            <div className="lg:col-span-2 space-y-6">
                {loading ? (
                    <div className="h-64 flex flex-col items-center justify-center space-y-4">
                        <Loader2 className="w-12 h-12 text-blood-red animate-spin" />
                        <p className="font-spooky text-xl animate-pulse">Summoning Question...</p>
                    </div>
                ) : currentQuestion ? (
                    <div className="animate-fadeIn">
                        <div className="bg-crypt-gray border border-gray-700 p-6 rounded-lg shadow-xl relative overflow-hidden">
                            {/* Question Text */}
                            <h3 className="text-2xl font-medical text-ghost-white mb-6 leading-relaxed">
                                {currentQuestion.question}
                            </h3>

                            {/* Options */}
                            <div className="space-y-3">
                                {currentQuestion.options.map((option, idx) => {
                                    let btnClass = "w-full p-4 text-left rounded border transition-all duration-200 font-medical text-lg ";
                                    if (showResult) {
                                        if (idx === currentQuestion.correctAnswerIndex) {
                                            btnClass += "bg-toxic-green/20 border-toxic-green text-toxic-green";
                                        } else if (idx === selectedOption) {
                                            btnClass += "bg-blood-red/20 border-blood-red text-blood-red";
                                        } else {
                                            btnClass += "bg-gray-900 border-gray-800 opacity-50";
                                        }
                                    } else {
                                        btnClass += "bg-gray-900 border-gray-700 hover:bg-gray-800 hover:border-gray-500";
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            disabled={showResult}
                                            onClick={() => handleAnswer(idx)}
                                            className={btnClass}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span>{option}</span>
                                                {showResult && idx === currentQuestion.correctAnswerIndex && <Check className="w-5 h-5" />}
                                                {showResult && idx === selectedOption && idx !== currentQuestion.correctAnswerIndex && <X className="w-5 h-5" />}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Explanation / Next Button */}
                            {showResult && (
                                <div className="mt-6 pt-6 border-t border-gray-800 animate-slideUp">
                                    <div className={`p-4 rounded mb-4 ${selectedOption === currentQuestion.correctAnswerIndex ? 'bg-toxic-green/10' : 'bg-blood-red/10'}`}>
                                        <p className="text-gray-300 italic">
                                            <span className="font-bold not-italic text-white block mb-1">
                                                Dr. Cadaverson says:
                                            </span>
                                            "{currentQuestion.explanation}"
                                        </p>
                                    </div>
                                    <button
                                        onClick={nextQuestion}
                                        className="w-full bg-ghost-white text-black font-gothic py-3 rounded hover:bg-white flex items-center justify-center gap-2 text-xl"
                                    >
                                        Next Trial <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : null}
            </div>

            {/* Stats Sidebar */}
            <div className="hidden lg:block bg-black/40 p-6 rounded-lg border border-gray-800 h-fit">
                <h4 className="text-toxic-green font-gothic text-xl mb-4 text-center">Vital Signs</h4>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                                itemStyle={{ color: '#e0e0e0' }}
                                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 1 ? (entry.value < 50 ? '#8b0000' : '#2a9d8f') : '#4a5568'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 text-center text-xs text-gray-500 italic">
                    <p>"Keep your sanity high, or join the collection..."</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default TombstoneTrials;