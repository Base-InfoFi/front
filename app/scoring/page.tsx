"use client";

import { useGlobalState } from "@/contexts/GlobalStateContext";

export default function ScoringPage() {
  const { scoring, setScoring } = useGlobalState();
  const { query, result, isProcessing, error } = scoring;

  const setQuery = (val: string) => setScoring(prev => ({ ...prev, query: val }));
  const setResult = (val: any) => setScoring(prev => ({ ...prev, result: val }));
  const setIsProcessing = (val: boolean) => setScoring(prev => ({ ...prev, isProcessing: val }));
  const setError = (val: string) => setScoring(prev => ({ ...prev, error: val }));

  const handleEvaluate = async () => {
    if (!query.trim()) {
        setError("검색어를 입력해주세요.");
        return;
    }

    setIsProcessing(true);
    setError("");
    setResult(null);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
      const response = await fetch(`${backendUrl}/api/tweets/evaluate-batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchQuery: query }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Evaluation failed");
      
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEvaluate();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-purple-400">Scoring System</h1>
          <p className="text-gray-400">
            저장된 트윗을 검색하고 AI로 분석하여 점수를 매깁니다.
          </p>
        </div>

        {/* Search Input */}
        <div className="flex gap-4 items-center bg-gray-900 p-2 rounded-xl border border-gray-800 focus-within:border-purple-500 transition-colors shadow-lg">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="DB에서 분석할 키워드 검색 (예: Monad, BTC...)"
                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-lg placeholder-gray-600 text-white"
            />
            <button
            onClick={handleEvaluate}
            disabled={isProcessing || !query.trim()}
            className={`px-6 py-3 rounded-lg font-bold text-base transition-all shadow-lg whitespace-nowrap
                ${isProcessing || !query.trim()
                ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
                : "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/30"
                }`}
            >
            {isProcessing ? "분석 중..." : "검색 및 분석"}
            </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl text-center">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 animate-fade-in">
            <p className="text-lg mb-6">
              <span className="font-bold text-white">{result.count}</span>개의 트윗 분석 결과입니다.
            </p>

            {result.results && result.results.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                    검색 결과가 없습니다. "Search on X" 메뉴에서 먼저 데이터를 수집해주세요.
                </p>
            )}
            
            <div className="grid gap-6">
              {result.results && result.results.map((item: any, index: number) => (
                <div key={index} className="bg-black/30 p-6 rounded-xl border border-gray-800 hover:border-purple-500/30 transition-colors">
                  <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                    <div className="flex-1">
                        <p className="text-gray-300 text-sm mb-2 line-clamp-3">{item.tweetContent}</p>
                        <div className="flex gap-2 flex-wrap">
                            {item.tweetTags && item.tweetTags.map((tag: string, i: number) => (
                                <span key={i} className="text-blue-400 text-xs bg-blue-500/10 px-2 py-1 rounded-full">#{tag}</span>
                            ))}
                            <span className="text-gray-500 text-xs bg-gray-800 px-2 py-1 rounded-full">@{item.tweetAuthor}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end min-w-[120px] gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase border
                        ${item.finalLabel === 'good' ? 'bg-green-500/10 text-green-400 border-green-500/50' : 
                            item.finalLabel === 'shitposting' ? 'bg-red-500/10 text-red-400 border-red-500/50' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/50'}`}>
                        {item.finalLabel}
                        </span>
                        <div className="flex gap-3 text-sm font-mono">
                            <div className="flex flex-col items-center">
                                <span className="text-gray-500 text-xs">Info</span>
                                <span className="text-white">{item.informationScore}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-gray-500 text-xs">Insight</span>
                                <span className="text-white">{item.insightScore}</span>
                            </div>
                        </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 p-3 rounded-lg text-sm">
                    <span className="text-purple-400 font-bold mr-2">AI 의견:</span>
                    <span className="text-gray-300">{item.reasons.join(", ")}</span>
                  </div>

                  {(item.rewardPoints > 0 || item.slashPoints > 0) && (
                      <div className="mt-3 flex gap-4 text-sm font-bold">
                          {item.rewardPoints > 0 && <span className="text-green-400">+ {item.rewardPoints} Points</span>}
                          {item.slashPoints > 0 && <span className="text-red-400">- {item.slashPoints} Penalty</span>}
                      </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
