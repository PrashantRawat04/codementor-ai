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

// Starter code templates for each supported language
const LANGUAGE_TEMPLATES = {
  cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write C++ solution here\n        return {};\n    }\n};`,
  python: `def twoSum(nums: list[int], target: int) -> list[int]:\n    # Context-Aware AI Coding Mentor Solution\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []`,
  javascript: `function twoSum(nums, target) {\n    // Write JavaScript solution here\n    return [];\n}`,
  java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write Java solution here\n        return new int[]{};\n    }\n}`
};

export default function App() {
  const [activeTab, setActiveTab] = useState('workspace');
  const [apiKey, setApiKey] = useState('');
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(LANGUAGE_TEMPLATES.python);

  // Update both language state and code boilerplate when dropdown changes
  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    if (LANGUAGE_TEMPLATES[selectedLang]) {
      setCode(LANGUAGE_TEMPLATES[selectedLang]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header Bar */}
      <header className="border-b border-gray-800 bg-gray-950 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="w-6 h-6 text-blue-500" />
          <span className="font-bold text-lg">CodeMentor AI</span>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex gap-2">
          <button
            onClick={() => setActiveTab('workspace')}
            className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 ${
              activeTab === 'workspace' ? 'bg-amber-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" /> Coding Workspace
          </button>
          <button
            onClick={() => setActiveTab('rag')}
            className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 ${
              activeTab === 'rag' ? 'bg-amber-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" /> RAG Pipeline
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 ${
              activeTab === 'roadmap' ? 'bg-amber-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" /> Learning Roadmap
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 ${
              activeTab === 'leaderboard' ? 'bg-amber-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4" /> Leaderboard
          </button>
        </nav>
      </header>

      {/* Workspace Body */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Problem Statement */}
        <div className="w-1/3 border-r border-gray-800 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">1. Two Sum</h2>
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs px-2 py-0.5 rounded">
              Easy
            </span>
          </div>
          <p className="text-gray-300 text-sm mb-4">
            Given an array of integers <code className="bg-gray-800 px-1 rounded">nums</code> and an integer{' '}
            <code className="bg-gray-800 px-1 rounded">target</code>, return indices of the two numbers such that they add up to target.
          </p>
        </div>

        {/* Center: Code Editor Area */}
        <div className="flex-1 flex flex-col border-r border-gray-800">
          <div className="bg-gray-950 px-4 py-2 border-b border-gray-800 flex items-center justify-between">
            {/* Language Selector Dropdown */}
            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-700 text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="cpp">C++ GCC 11</option>
              <option value="python">Python 3</option>
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
            </select>

            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded font-medium text-sm flex items-center gap-2">
              <Play className="w-4 h-4" /> Run & Submit
            </button>
          </div>

          {/* Editor Input Box */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-gray-900 text-gray-100 font-mono p-4 text-sm resize-none focus:outline-none"
            spellCheck="false"
          />
        </div>

        {/* Right Side: AI Hints & Analysis */}
        <div className="w-1/4 p-6 overflow-y-auto bg-gray-950">
          <h3 className="font-semibold text-sm text-gray-400 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" /> Progressive Hints
          </h3>
          <p className="text-sm text-gray-300 bg-gray-900 p-3 rounded border border-gray-800">
            Utilize a data structure that allows constant time lookup for the complement.
          </p>
        </div>
      </main>
    </div>
  );
}
