import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import {
  Code2,
  Sparkles,
  BarChart3,
  Compass,
  Trophy,
  Play,
  CheckCircle2,
  Database,
  Cpu,
  BookOpen
} from 'lucide-react';

const LANGUAGE_TEMPLATES = {
  cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write C++ solution here\n        return {};\n    }\n};`,
  python: `def twoSum(nums: list[int], target: int) -> list[int]:\n    # Context-Aware AI Coding Mentor Solution\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []`,
  javascript: `function twoSum(nums, target) {\n    // Write JavaScript solution here\n    return [];\n}`,
  java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write Java solution here\n        return new int[]{};\n    }\n}`
};

export default function App() {
  const [activeTab, setActiveTab] = useState('workspace');
  const [rightTab, setRightTab] = useState('hints');
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState(LANGUAGE_TEMPLATES.cpp);

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    if (LANGUAGE_TEMPLATES[selectedLang]) {
      setCode(LANGUAGE_TEMPLATES[selectedLang]);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#0b0f17] text-gray-100 flex flex-col font-sans overflow-hidden">
      {/* Top Navbar */}
      <header className="border-b border-gray-800 bg-[#0d111a] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-blue-500" />
            <span className="font-bold text-base tracking-wide text-white">CodeMentor AI</span>
          </div>
          <span className="bg-red-950/80 text-red-400 border border-red-800/60 text-xs px-2 py-0.5 rounded font-mono">
            GEHU CSE27-450
          </span>
          <span className="text-xs text-gray-500 hidden md:inline">
            Graphic Era Hill University, Dehradun
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-gray-900/80 p-1 rounded-lg border border-gray-800 text-xs">
          <button
            onClick={() => setActiveTab('workspace')}
            className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'workspace' ? 'bg-amber-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" /> Coding Workspace
          </button>
          <button
            onClick={() => setActiveTab('rag')}
            className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'rag' ? 'bg-amber-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" /> RAG Pipeline
          </button>
          <button
            onClick={() => setActiveTab('benchmark')}
            className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'benchmark' ? 'bg-amber-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> RAG Benchmark
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'roadmap' ? 'bg-amber-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> Learning Roadmap
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'leaderboard' ? 'bg-amber-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" /> Leaderboard
          </button>
        </nav>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex overflow-hidden">
        {/* Panel 1: Problem Description */}
        <div className="w-[30%] border-r border-gray-800/80 bg-[#0d111a] p-5 flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-white">1. Two Sum</h2>
            <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-xs px-2 py-0.5 rounded font-medium">
              Easy
            </span>
          </div>
          <div className="text-xs text-gray-400 mb-4 pb-3 border-b border-gray-800/60">
            Topic: <span className="text-gray-300">Arrays & Hash Maps</span>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed mb-4">
            Given an array of integers <code className="bg-gray-800 text-gray-200 px-1 py-0.5 rounded">nums</code> and an integer{' '}
            <code className="bg-gray-800 text-gray-200 px-1 py-0.5 rounded">target</code>, return indices of the two numbers such that they add up to target.
          </p>

          <div className="space-y-3 text-xs mb-6">
            <div className="bg-gray-900/60 p-3 rounded-lg border border-gray-800">
              <span className="font-semibold text-gray-300 block mb-1">Example 1:</span>
              <code className="block text-gray-400 font-mono">Input: nums = [2,7,11,15], target = 9</code>
              <code className="block text-gray-300 font-mono mt-1">Output: [0,1]</code>
            </div>
          </div>

          <div className="mt-auto">
            <h4 className="text-xs font-semibold text-gray-400 mb-2">Constraints:</h4>
            <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside font-mono">
              <li>2 &lt;= nums.length &lt;= 10⁴</li>
              <li>-10⁹ &lt;= nums[i] &lt;= 10⁹</li>
              <li>Only one valid answer exists.</li>
            </ul>
          </div>
        </div>

        {/* Panel 2: Code Editor & Console */}
        <div className="flex-1 flex flex-col border-r border-gray-800/80 bg-[#090d14]">
          {/* Action Header */}
          <div className="bg-[#0d111a] px-4 py-2 border-b border-gray-800/80 flex items-center justify-between">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-gray-900 text-gray-200 text-xs px-3 py-1.5 rounded-md border border-gray-700/80 focus:outline-none focus:border-blue-500 font-mono"
            >
              <option value="cpp">C++ GCC 11</option>
              <option value="python">Python 3</option>
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
            </select>

            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-md font-medium text-xs flex items-center gap-1.5 transition-colors shadow-sm">
              <Play className="w-3.5 h-3.5 fill-current" /> Run & Submit
            </button>
          </div>

          {/* Monaco Editor Component */}
          <div className="flex-1 relative">
            <Editor
              height="100%"
              theme="vs-dark"
              language={language === 'cpp' ? 'cpp' : language}
              value={code}
              onChange={(val) => setCode(val || '')}
              options={{
                fontSize: 13,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 12 }
              }}
            />
          </div>

          {/* Execution Output Panel */}
          <div className="border-t border-gray-800/80 bg-[#0d111a] p-3 text-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-emerald-400">Accepted</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400 font-mono">
                <span>Runtime: <strong className="text-gray-200">38.5 ms</strong></span>
                <span>Memory: <strong className="text-gray-200">14.8 MB</strong></span>
              </div>
            </div>
            <div className="bg-gray-950 p-2.5 rounded font-mono text-gray-300 space-y-0.5 border border-gray-800/60">
              <div>Input: nums = [2, 7, 11, 15], target = 9</div>
              <div className="text-emerald-400">Output: [0, 1]</div>
            </div>
          </div>
        </div>

        {/* Panel 3: Right AI / RAG Panel */}
        <div className="w-[28%] bg-[#0d111a] p-4 flex flex-col overflow-y-auto">
          <div className="flex border-b border-gray-800/80 pb-2 mb-4 gap-2 text-xs">
            <button
              onClick={() => setRightTab('hints')}
              className={`pb-1 px-2 font-medium flex items-center gap-1 ${
                rightTab === 'hints' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-400'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Progressive Hints
            </button>
            <button
              onClick={() => setRightTab('rag')}
              className={`pb-1 px-2 font-medium flex items-center gap-1 ${
                rightTab === 'rag' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> RAG Knowledge
            </button>
          </div>

          {rightTab === 'hints' ? (
            <div className="space-y-3">
              <div className="bg-gray-900/80 p-3 rounded-lg border border-gray-800 text-xs">
                <p className="text-gray-300 leading-relaxed">
                  Utilize a data structure that allows constant time lookup for the complement (<code className="text-amber-400">target - num</code>).
                </p>
              </div>

              <div className="bg-amber-950/30 border border-amber-800/50 p-3 rounded-lg text-xs">
                <span className="font-semibold text-amber-400 block mb-1">RAG Retrieved Knowledge:</span>
                <p className="text-gray-300">
                  The Hash Map approach stores array elements as keys and indices as values.
                  Time Complexity: <code className="text-amber-300">O(N)</code> | Space Complexity: <code className="text-amber-300">O(N)</code>.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900/80 p-3 rounded-lg border border-gray-800 text-xs text-gray-300">
              RAG indexing complete. Vector index loaded via FAISS.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
