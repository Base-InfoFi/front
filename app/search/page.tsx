"use client";

import { useGlobalState } from "@/contexts/GlobalStateContext";

interface Tweet {
  id: string;
  text: string;
  tags: string[];
  created_at: string;
  author: {
    name: string;
    screen_name: string;
    profile_image_url: string;
  };
  metrics: {
    likes: number;
    retweets: number;
    replies: number;
    quotes: number;
    views: number;
  };
  url: string;
}

export default function SearchPage() {
  const { search, setSearch } = useGlobalState();
  const { query, tweets, isLoading, error } = search;

  const setQuery = (val: string) => setSearch(prev => ({ ...prev, query: val }));
  const setTweets = (val: any[]) => setSearch(prev => ({ ...prev, tweets: val }));
  const setIsLoading = (val: boolean) => setSearch(prev => ({ ...prev, isLoading: val }));
  const setError = (val: string) => setSearch(prev => ({ ...prev, error: val }));

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setTweets([]);
    setError("");

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
      const response = await fetch(`${backendUrl}/api/twitter/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, maxResults: 100 }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to search tweets");
      }

      setTweets(data.tweets || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "트위터 검색 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-400">Search on X</h1>
          <p className="text-gray-400">
            실시간 트위터 데이터를 검색합니다. (Powered by Python Crawler)
          </p>
        </div>

        {/* Search Input */}
        <div className="flex gap-4 items-center bg-gray-900 p-2 rounded-xl border border-gray-800 focus-within:border-blue-500 transition-colors shadow-lg">
          <span className="pl-4 text-gray-500">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="검색어 입력 (예: $BTC, AI Agent...)"
            className="flex-1 bg-transparent border-none outline-none px-2 py-3 text-lg placeholder-gray-600 text-white"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading || !query.trim()}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors
              ${isLoading ? "bg-gray-700 text-gray-400" : "bg-blue-500 hover:bg-blue-400 text-white"}`}
          >
            {isLoading ? "검색 중..." : "검색"}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl">
            {error}
          </div>
        )}

        {/* Results List */}
        <div className="space-y-4">
          {tweets.map((tweet: Tweet) => (
            <div key={tweet.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
              <div className="flex gap-4">
                <img
                  src={tweet.author.profile_image_url}
                  alt={tweet.author.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="font-bold text-white truncate">{tweet.author.name}</h3>
                    <span className="text-gray-500 text-sm truncate">@{tweet.author.screen_name}</span>
                    <span className="text-gray-600 text-xs ml-auto">{new Date(tweet.created_at).toLocaleDateString()}</span>
                  </div>
                  
                  {tweet.tags && tweet.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tweet.tags.map((tag, i) => (
                        <span key={i} className="text-blue-400 text-xs bg-blue-500/10 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-gray-300 whitespace-pre-wrap mb-4">{tweet.text}</p>
                  
                  {/* Metrics */}
                  <div className="flex gap-6 text-sm text-gray-500">
                    <span className="flex items-center gap-1">❤️ {tweet.metrics.likes}</span>
                    <span className="flex items-center gap-1">RT {tweet.metrics.retweets}</span>
                    <span className="flex items-center gap-1">💬 {tweet.metrics.replies}</span>
                    <a href={tweet.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-auto">
                      Twitter에서 보기 ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {!isLoading && tweets.length === 0 && query && !error && (
            <div className="text-center text-gray-500 py-10">검색 결과가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
