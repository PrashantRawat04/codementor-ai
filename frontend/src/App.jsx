import React, { useState } from 'react';
import { 
  Code2, 
  Sparkles, 
  BarChart3, 
  Compass, 
  Trophy, 
  Play, 
  CheckCircle2, 
  Zap, 
  Send, 
  Database, 
  Key
} from 'lucide-react';

const LANGUAGE_TEMPLATES = {
  cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write C++ solution here\n        return {};\n    }\n};`,
  python: `def twoSum(nums: list[int], target: int) -> list[int]:\n    # Context-Aware AI Coding Mentor Solution\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []`,
  javascript: `function twoSum(nums, target) {\n    // Write JavaScript solution here\n    return [];\n}`,
  java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write Java solution here\n        return new int[]{};\n    }\n}`
};

export default function App() {
  const [activeTab, setActiveTab] = useState('workspace');
  const [apiKey, setApiKey] = useState('');
  const [code, setCode] = useState(LANGUAGE_TEMPLATES.python);
  const [language, setLanguage] = useState('python');
  const [executing, setExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  
  const [mentorTab, setMentorTab] = useState('hints');
  const [hintLevel, setHintLevel] = useState(1);
  const [aiLoading, setAiLoading] = useState(false);
  const [mentorQuery, setMentorQuery] = useState('');
  const [mentorResponse, setMentorResponse] = useState(null);

  // Live Backend Code Execution
  const handleRunCode = async () => {
    setExecuting(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://codementor-ai-backend-qivy.onrender.com';
      const res = await fetch(`${baseUrl}/api/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language })
      });
      const data = await res.json();
      setExecutionResult(data);
    } catch (err) {
      setExecutionResult({
        verdict: 'Runtime Error',
        runtime: '0 ms',
        memory: '0 MB',
        testCases: '0 / 3 Passed',
        output: 'Failed to connect to execution server.'
      });
    } finally {
      setExecuting(false);
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    if (LANGUAGE_TEMPLATES[selectedLang]) {
      setCode(LANGUAGE_TEMPLATES[selectedLang]);
    }
  };

  const handleGetHint = (level) => {
    setHintLevel(level);
  };

  // Live Backend Gemini Mentor AI Query
  const handleAskMentor = async (e) => {
    e.preventDefault();
    if (!mentorQuery.trim()) return;
    setAiLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://codementor-ai-backend-qivy.onrender.com';
      const res = await fetch(`${baseUrl}/api/mentor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, query: mentorQuery, apiKey })
      });
      const data = await res.json();
      if (res.ok) {
        setMentorResponse({
          query: mentorQuery,
          answer: data.answer,
          ragUsed: true
        });
      } else {
        setMentorResponse({
          query: mentorQuery,
          answer: `Error: ${data.detail || 'Failed to fetch AI response.'}`,
          ragUsed: false
        });
      }
    } catch (err) {
      setMentorResponse({
        query: mentorQuery,
        answer: "Error: Please check your network connection or Gemini API key in the top header.",
        ragUsed: false
      });
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* HEADER NAVBAR */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-amber-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-900/30">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-100 via-slate-200 to-amber-400 bg-clip-text text-transparent">
                  CodeMentor AI
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-red-950 text-red-400 border border-red-800/50 rounded-full">
                  GEHU CSE27-450
                </span>
              </div>
              <p className="text-xs text-slate-400">Graphic Era Hill University, Dehradun</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {[
              { id: 'workspace', label: 'Coding Workspace', icon: Code2 },
              { id: 'rag', label: 'RAG Pipeline', icon: Database },
              { id: 'evaluation', label: 'RAG Benchmark', icon: BarChart3 },
              { id: 'roadmap', label: 'Learning Roadmap', icon: Compass },
              { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <input
                type="password"
                placeholder="Gemini API Key..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none w-28"
              />
            </div>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-amber-400">
                PR
              </div>
              <div className="hidden sm:block text-left text-xs">
                <p className="font-medium text-slate-200 leading-none">Prashant Rawat</p>
                <p className="text-[10px] text-slate-500 mt-0.5">2319255</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4">
        {activeTab === 'workspace' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-6rem)]">
            {/* PROBLEM DESCRIPTION (3 Cols) */}
            <div className="lg:col-span-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Problem Statement</span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800/50 rounded">Easy</span>
              </div>
              <div className="p-4 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed">
                <div>
                  <h2 className="text-base font-bold text-slate-100 mb-1">1. Two Sum</h2>
                  <p className="text-slate-400 text-[11px]">Topic: Arrays & Hash Maps</p>
                </div>
                <p>
                  Given an array of integers <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">nums</code> and an integer <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">target</code>, return indices of the two numbers such that they add up to target.
                </p>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 space-y-2 font-mono text-[11px]">
                  <p className="text-slate-400">// Example 1:</p>
                  <p><span className="text-slate-500">Input:</span> nums = [2,7,11,15], target = 9</p>
                  <p><span className="text-slate-500">Output:</span> [0,1]</p>
                </div>
                <div className="border-t border-slate-800 pt-3">
                  <h4 className="font-semibold text-slate-200 mb-1">Constraints:</h4>
                  <ul className="list-disc pl-4 space-y-1 text-slate-400 font-mono text-[11px]">
                    <li>2 &lt;= nums.length &lt;= 10⁴</li>
                    <li>-10⁹ &lt;= nums[i] &lt;= 10⁹</li>
                    <li>Only one valid answer exists.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CODE EDITOR (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-900 rounded-xl border border-slate-800 flex flex-col overflow-hidden">
              <div className="p-3 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
                <select 
                  value={language} 
                  onChange={handleLanguageChange}
                  className="bg-slate-900 text-xs text-slate-200 border border-slate-700 rounded px-2 py-1 focus:outline-none"
                >
                  <option value="python">Python 3.10</option>
                  <option value="cpp">C++ GCC 11</option>
                  <option value="java">Java OpenJDK 17</option>
                  <option value="javascript">JavaScript Node 18</option>
                </select>

                <button
                  onClick={handleRunCode}
                  disabled={executing}
                  className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium text-xs shadow-md transition-all disabled:opacity-50"
                >
                  {executing ? <Zap className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  {executing ? 'Executing...' : 'Run & Submit'}
                </button>
              </div>

              <div className="flex-1 bg-slate-950 p-4 font-mono text-xs leading-relaxed
