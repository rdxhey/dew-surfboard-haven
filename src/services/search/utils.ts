
import { toast } from "@/hooks/use-toast";

// API Configuration
export interface ApiConfig {
  googleApiKey: string;
  searchEngineId: string;
  newsApiKey: string;
  alphaVantageApiKey: string;
  youtubeApiKey: string;
  useMockData: boolean;
}

// Get API configuration from localStorage
export const getApiConfig = (): ApiConfig => {
  const defaultConfig: ApiConfig = {
    googleApiKey: "",
    searchEngineId: "",
    newsApiKey: "",
    alphaVantageApiKey: "demo",
    youtubeApiKey: "",
    useMockData: true
  };
  
  try {
    const storedKeys = localStorage.getItem("searchApiKeys");
    const storedUseMock = localStorage.getItem("useMockData");
    
    if (storedKeys) {
      const parsedKeys = JSON.parse(storedKeys);
      return {
        ...defaultConfig,
        ...parsedKeys,
        useMockData: storedUseMock === null ? true : storedUseMock === "true"
      };
    }
  } catch (e) {
    console.error("Error reading API configuration:", e);
  }
  
  return defaultConfig;
};

// Define interfaces for Google API responses (used by web and image search)
export interface GoogleSearchItem {
  title: string;
  link: string;
  displayLink: string;
  snippet: string;
  formattedUrl?: string;
  pagemap?: {
    cse_thumbnail?: Array<{
      src: string;
      width: string;
      height: string;
    }>;
    cse_image?: Array<{
      src: string;
    }>;
  };
  image?: {
    contextLink: string;
    height: number;
    width: number;
    byteSize: number;
    thumbnailLink: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
  };
}

export interface GoogleSearchResponse {
  items?: GoogleSearchItem[];
  searchInformation?: {
    formattedTotalResults: string;
    formattedSearchTime: string;
    totalResults: string;
    searchTime: number;
  };
  spelling?: {
    correctedQuery: string;
    htmlCorrectedQuery: string;
  };
  error?: {
    code: number;
    message: string;
    errors: Array<{
      message: string;
      domain: string;
      reason: string;
    }>;
  };
}

// Simple cache implementation to reduce API calls
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function getCachedData<T>(key: string): T | null {
  const cachedItem = cache[key];
  if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_DURATION) {
    console.log(`Using cached data for: ${key}`);
    return cachedItem.data as T;
  }
  return null;
}

export function setCachedData<T>(key: string, data: T): void {
  cache[key] = { data, timestamp: Date.now() };
}

// Helper function to format relative time
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  
  return `${Math.floor(diffInMonths / 12)}y ago`;
}

// Generate a random number format with suffix (K, M, B)
export function randomViewCount(): string {
  const num = Math.floor(Math.random() * 10000000);
  if (num < 1000) return `${num}`;
  if (num < 1000000) return `${Math.floor(num / 100) / 10}K`;
  return `${Math.floor(num / 100000) / 10}M`;
}

// Helper function to format market cap
export function formatMarketCap(marketCap: number): string {
  if (marketCap >= 1000000000000) {
    return `${(marketCap / 1000000000000).toFixed(2)}T`;
  } else if (marketCap >= 1000000000) {
    return `${(marketCap / 1000000000).toFixed(2)}B`;
  } else if (marketCap >= 1000000) {
    return `${(marketCap / 1000000).toFixed(2)}M`;
  } else {
    return `${marketCap.toFixed(2)}`;
  }
}

// Helper function to format volume
export function formatVolume(volume: number): string {
  if (volume >= 1000000000) {
    return `${(volume / 1000000000).toFixed(2)}B`;
  } else if (volume >= 1000000) {
    return `${(volume / 1000000).toFixed(2)}M`;
  } else if (volume >= 1000) {
    return `${(volume / 1000).toFixed(2)}K`;
  } else {
    return `${volume}`;
  }
}

