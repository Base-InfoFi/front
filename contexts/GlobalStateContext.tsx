"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Flock LLM State
interface FlockLLMState {
  projectName: string;
  report: string;
  isLoading: boolean;
  error: string;
}

// Search State
interface SearchState {
  query: string;
  tweets: any[];
  isLoading: boolean;
  error: string;
}

// Scoring State
interface ScoringState {
  query: string;
  result: any;
  isProcessing: boolean;
  error: string;
}

// Result State
interface ResultState {
  query: string;
  data: any;
  isLoading: boolean;
  error: string;
}

interface GlobalStateContextType {
  flockLLM: FlockLLMState;
  setFlockLLM: React.Dispatch<React.SetStateAction<FlockLLMState>>;
  
  search: SearchState;
  setSearch: React.Dispatch<React.SetStateAction<SearchState>>;
  
  scoring: ScoringState;
  setScoring: React.Dispatch<React.SetStateAction<ScoringState>>;
  
  result: ResultState;
  setResult: React.Dispatch<React.SetStateAction<ResultState>>;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export function GlobalStateProvider({ children }: { children: ReactNode }) {
  // Flock LLM
  const [flockLLM, setFlockLLM] = useState<FlockLLMState>({
    projectName: "",
    report: "",
    isLoading: false,
    error: "",
  });

  // Search
  const [search, setSearch] = useState<SearchState>({
    query: "",
    tweets: [],
    isLoading: false,
    error: "",
  });

  // Scoring
  const [scoring, setScoring] = useState<ScoringState>({
    query: "",
    result: null,
    isProcessing: false,
    error: "",
  });

  // Result
  const [result, setResult] = useState<ResultState>({
    query: "",
    data: null,
    isLoading: false,
    error: "",
  });

  return (
    <GlobalStateContext.Provider
      value={{
        flockLLM,
        setFlockLLM,
        search,
        setSearch,
        scoring,
        setScoring,
        result,
        setResult,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
}

