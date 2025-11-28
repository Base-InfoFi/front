"use client";

import { useGlobalState } from "@/contexts/GlobalStateContext";
import ReactMarkdown from "react-markdown";

export default function ResultPage() {
  const { result, setResult } = useGlobalState();
  const { query, data, isLoading, error } = result;

  const setQuery = (val: string) => setResult(prev => ({ ...prev, query: val }));
  const setData = (val: any) => setResult(prev => ({ ...prev, data: val }));
  const setIsLoading = (val: boolean) => setResult(prev => ({ ...prev, isLoading: val }));
  const setError = (val: string) => setResult(prev => ({ ...prev, error: val }));

  const handleGenerateReport = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError("");
    setData(null);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
      const response = await fetch(`${backendUrl}/api/reports/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchQuery: query }),
      });

      const resultData = await response.json();
      
      if (!response.ok) {
        if (response.status === 404) {
            throw new Error("아직 분석된 데이터가 없습니다. 'Scoring' 메뉴에서 먼저 분석을 진행해주세요.");
        }
        throw new Error(resultData.error || "보고서 생성 실패");
      }

      setData(resultData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleGenerateReport();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Comprehensive Analysis Report
          </h1>
          <p className="text-gray-400">
            Scoring을 통해 누적된 데이터를 바탕으로 심층 인사이트 보고서를 생성합니다.
          </p>
        </div>

        {/* Search Input */}
        <div className="flex gap-4 items-center bg-gray-900 p-2 rounded-xl border border-gray-800 focus-within:border-green-500 transition-colors shadow-lg">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="보고서를 생성할 주제 입력 (예: Monad)"
                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-lg placeholder-gray-600 text-white"
            />
            <button
            onClick={handleGenerateReport}
            disabled={isLoading || !query.trim()}
            className={`px-8 py-3 rounded-lg font-bold text-base transition-all shadow-lg whitespace-nowrap
                ${isLoading || !query.trim()
                ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
                : "bg-green-600 hover:bg-green-500 text-white shadow-green-500/30"
                }`}
            >
            {isLoading ? "보고서 작성 중..." : "보고서 생성"}
            </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl text-center">
            {error}
          </div>
        )}

        {data && (
            <div className="space-y-6 animate-fade-in">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 text-center">
                        <div className="text-gray-400 text-sm mb-1">총 분석 트윗</div>
                        <div className="text-3xl font-bold text-white">{data.stats.total}</div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 text-center">
                        <div className="text-green-400 text-sm mb-1">유익한 정보 (Good)</div>
                        <div className="text-3xl font-bold text-green-400">{data.stats.goodCount}</div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 text-center">
                        <div className="text-red-400 text-sm mb-1">스팸/무의미 (Spam)</div>
                        <div className="text-3xl font-bold text-red-400">{data.stats.spamCount}</div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 text-center">
                        <div className="text-blue-400 text-sm mb-1">평균 정보 점수</div>
                        <div className="text-3xl font-bold text-blue-400">{data.stats.avgInfoScore}<span className="text-lg text-gray-500">/5</span></div>
                    </div>
                </div>

                {/* Markdown Report */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
                   <div className="prose prose-invert prose-lg max-w-none">
                     <ReactMarkdown
                       components={{
                         h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-green-300 mb-6 border-b border-gray-700 pb-4" {...props} />,
                         h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-4" {...props} />,
                         h3: ({ node, ...props }) => <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3" {...props} />,
                         strong: ({ node, ...props }) => <strong className="text-green-400 font-bold" {...props} />,
                         ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 my-4 text-gray-300" {...props} />,
                         li: ({ node, ...props }) => <li className="ml-4" {...props} />,
                         p: ({ node, ...props }) => <p className="text-gray-300 leading-relaxed mb-4" {...props} />,
                       }}
                     >
                       {data.report}
                     </ReactMarkdown>
                   </div>
                 </div>
            </div>
        )}
      </div>
    </div>
  );
}
