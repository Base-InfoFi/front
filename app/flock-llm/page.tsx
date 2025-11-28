"use client";

import { useGlobalState } from "@/contexts/GlobalStateContext";
import ReactMarkdown from "react-markdown";

export default function FlockLLMPage() {
  const { flockLLM, setFlockLLM } = useGlobalState();
  const { projectName, report, isLoading, error } = flockLLM;

  const setProjectName = (val: string) => setFlockLLM(prev => ({ ...prev, projectName: val }));
  const setReport = (val: string) => setFlockLLM(prev => ({ ...prev, report: val }));
  const setIsLoading = (val: boolean) => setFlockLLM(prev => ({ ...prev, isLoading: val }));
  const setError = (val: string) => setFlockLLM(prev => ({ ...prev, error: val }));

  const handleAnalyze = async () => {
    if (!projectName.trim()) return;

    setIsLoading(true);
    setReport("");
    setError("");

    try {
      // .env.local 등에서 Backend URL을 가져오거나 하드코딩
      // 개발 환경에서는 localhost:3000을 가리키도록 설정 필요
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
      
      const response = await fetch(`${backendUrl}/api/projects/generate-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectName }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch report");
      }

      const data = await response.json();
      setReport(data.content);
    } catch (err) {
      console.error(err);
      setError("분석 보고서를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAnalyze();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Flock LLM Project Analyzer
          </h1>
          <p className="text-gray-400">
            Web3 프로젝트의 이름을 입력하면 AI가 심층 분석 보고서를 작성해드립니다.
          </p>
        </div>

        {/* Search Input */}
        <div className="flex gap-4 items-center bg-gray-900 p-2 rounded-xl border border-gray-800 focus-within:border-blue-500 transition-colors shadow-lg">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="프로젝트 이름 입력 (예: Monad, Uniswap...)"
            className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-lg placeholder-gray-600 text-white"
          />
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !projectName.trim()}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200
              ${
                isLoading || !projectName.trim()
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20 shadow-lg"
              }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                분석 중...
              </span>
            ) : (
              "분석하기"
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl">
            {error}
          </div>
        )}

        {/* Report Result */}
        {report && (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl animate-fade-in">
            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-blue-300 mb-6 border-b border-gray-700 pb-4" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold text-purple-300 mt-8 mb-4" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-3" {...props} />,
                  strong: ({ node, ...props }) => <strong className="text-blue-400 font-bold" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 my-4 text-gray-300" {...props} />,
                  li: ({ node, ...props }) => <li className="ml-4" {...props} />,
                  p: ({ node, ...props }) => <p className="text-gray-300 leading-relaxed mb-4" {...props} />,
                }}
              >
                {report}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Empty State / Initial Placeholder */}
        {!report && !isLoading && !error && (
          <div className="text-center py-20 text-gray-600">
            <div className="text-6xl mb-4 opacity-20">🤖</div>
            <p>궁금한 프로젝트 이름을 입력하고 분석 결과를 받아보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}
