
import { toast } from "@/hooks/use-toast";

// Define types for search results
export interface WebSearchResult {
  title: string;
  link: string;
  snippet: string;
  displayLink: string;
  formattedUrl?: string;
  pagemap?: {
    cse_thumbnail?: Array<{
      src: string;
      width: string;
      height: string;
    }>;
  };
}

export interface ImageSearchResult {
  title: string;
  link: string;
  thumbnail: string;
  originalImage: {
    url: string;
    width: number;
    height: number;
  };
}

export interface FinanceSearchResult {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: string;
  peRatio: number;
  weekRange: string;
  news: Array<{
    title: string;
    date: string;
    source?: string;
    link?: string;
  }>;
}

// Google API Configuration
const API_KEY = "YOUR_API_KEY"; // Replace this with your actual Google API key
const SEARCH_ENGINE_ID = "YOUR_SEARCH_ENGINE_ID"; // Replace with your actual Search Engine ID

// Define interfaces for API responses
interface GoogleSearchItem {
  title: string;
  link: string;
  displayLink: string;
  snippet: string;
  formattedUrl?: string;  // Added this property to fix the TypeScript error
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

interface GoogleSearchResponse {
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

function getCachedData<T>(key: string): T | null {
  const cachedItem = cache[key];
  if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_DURATION) {
    console.log(`Using cached data for: ${key}`);
    return cachedItem.data as T;
  }
  return null;
}

function setCachedData<T>(key: string, data: T): void {
  cache[key] = { data, timestamp: Date.now() };
}

// Search API functions
export async function performWebSearch(query: string, safeSearch: boolean = true, filter?: string): Promise<WebSearchResult[]> {
  try {
    if (!query) return [];

    // Create a cache key based on the search parameters
    const cacheKey = `web-${query}-${safeSearch}-${filter || 'none'}`;
    
    // Check if we have cached results
    const cachedResults = getCachedData<WebSearchResult[]>(cacheKey);
    if (cachedResults) return cachedResults;

    console.log(`Performing web search for: "${query}" with safe search: ${safeSearch} and filter: ${filter || 'none'}`);
    
    // Build query parameters
    let searchQuery = query;
    if (filter) {
      switch(filter) {
        case 'news':
          searchQuery += ' site:news.google.com OR site:cnn.com OR site:bbc.com OR site:reuters.com';
          break;
        case 'blogs':
          searchQuery += ' site:medium.com OR site:wordpress.com OR site:blogger.com';
          break;
        case 'forums':
          searchQuery += ' site:reddit.com OR site:quora.com OR site:stackoverflow.com';
          break;
        case 'videos':
          searchQuery += ' site:youtube.com OR site:vimeo.com';
          break;
      }
    }
    
    // Build the API URL
    const url = new URL('https://www.googleapis.com/customsearch/v1');
    url.searchParams.append('key', API_KEY);
    url.searchParams.append('cx', SEARCH_ENGINE_ID);
    url.searchParams.append('q', searchQuery);
    
    if (safeSearch) {
      url.searchParams.append('safe', 'active');
    }
    
    // Make the API call
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    const data = await response.json() as GoogleSearchResponse;
    
    // Check for errors in the response
    if (data.error) {
      console.error("Google API error:", data.error);
      throw new Error(`Google API error: ${data.error.message}`);
    }
    
    // Handle case when no results are found
    if (!data.items || data.items.length === 0) {
      console.log("No search results found for:", query);
      return [];
    }
    
    // Transform the API response to our WebSearchResult type
    const results = data.items.map(item => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      displayLink: item.displayLink,
      formattedUrl: item.formattedUrl,
      pagemap: item.pagemap
    })) as WebSearchResult[];
    
    // Cache the results
    setCachedData(cacheKey, results);
    
    return results;
    
  } catch (error) {
    console.error("Error performing web search:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    // Show a more specific error message to the user
    if (errorMessage.includes("API key")) {
      toast({
        title: "API Key Error",
        description: "There's an issue with the API key. Please check your configuration.",
        variant: "destructive",
      });
    } else if (errorMessage.includes("quota")) {
      toast({
        title: "Search Quota Exceeded",
        description: "The daily search quota has been exceeded. Please try again later.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Search Error",
        description: "Failed to perform search. Please try again.",
        variant: "destructive",
      });
    }
    
    return [];
  }
}

export async function performImageSearch(query: string, safeSearch: boolean = true): Promise<ImageSearchResult[]> {
  try {
    if (!query) return [];

    // Create a cache key based on the search parameters
    const cacheKey = `image-${query}-${safeSearch}`;
    
    // Check if we have cached results
    const cachedResults = getCachedData<ImageSearchResult[]>(cacheKey);
    if (cachedResults) return cachedResults;

    console.log(`Performing image search for: "${query}" with safe search: ${safeSearch}`);
    
    // Build the API URL
    const url = new URL('https://www.googleapis.com/customsearch/v1');
    url.searchParams.append('key', API_KEY);
    url.searchParams.append('cx', SEARCH_ENGINE_ID);
    url.searchParams.append('q', query);
    url.searchParams.append('searchType', 'image');
    
    if (safeSearch) {
      url.searchParams.append('safe', 'active');
    }
    
    // Make the API call
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    const data = await response.json() as GoogleSearchResponse;
    
    // Check for errors in the response
    if (data.error) {
      console.error("Google API error:", data.error);
      throw new Error(`Google API error: ${data.error.message}`);
    }
    
    // Handle case when no results are found
    if (!data.items || data.items.length === 0) {
      console.log("No image results found for:", query);
      return [];
    }
    
    // Transform the API response to our ImageSearchResult type
    const results = data.items
      .filter(item => item.image && item.pagemap?.cse_image?.[0]?.src)
      .map(item => ({
        title: item.title,
        link: item.link,
        thumbnail: item.image?.thumbnailLink || item.pagemap?.cse_thumbnail?.[0]?.src || '',
        originalImage: {
          url: item.pagemap?.cse_image?.[0]?.src || item.link,
          width: item.image?.width || parseInt(item.pagemap?.cse_thumbnail?.[0]?.width || '0'),
          height: item.image?.height || parseInt(item.pagemap?.cse_thumbnail?.[0]?.height || '0'),
        },
      })) as ImageSearchResult[];
    
    // Cache the results
    setCachedData(cacheKey, results);
    
    return results;
    
  } catch (error) {
    console.error("Error performing image search:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    // Show a more specific error message to the user
    if (errorMessage.includes("API key")) {
      toast({
        title: "API Key Error",
        description: "There's an issue with the API key. Please check your configuration.",
        variant: "destructive",
      });
    } else if (errorMessage.includes("quota")) {
      toast({
        title: "Search Quota Exceeded",
        description: "The daily search quota has been exceeded. Please try again later.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Search Error",
        description: "Failed to perform image search. Please try again.",
        variant: "destructive",
      });
    }
    
    return [];
  }
}

// Constants for Alpha Vantage API
const ALPHA_VANTAGE_API_KEY = "YOUR_ALPHA_VANTAGE_API_KEY"; // Replace with your actual Alpha Vantage API key
const ALPHA_VANTAGE_BASE_URL = "https://www.alphavantage.co/query";

export async function performFinanceSearch(query: string): Promise<FinanceSearchResult | null> {
  try {
    if (!query) return null;

    // Create a cache key based on the search parameters
    const cacheKey = `finance-${query}`;
    
    // Check if we have cached results
    const cachedResults = getCachedData<FinanceSearchResult>(cacheKey);
    if (cachedResults) return cachedResults;

    console.log(`Performing finance search for: "${query}"`);
    
    const ticker = query.toUpperCase();
    
    // For now, use the mock implementation until we can integrate a real financial API
    // In a production environment, you would replace this with actual API calls
    
    // Example of how to call Alpha Vantage API (uncomment and modify as needed)
    /*
    // 1. Get Quote Endpoint
    const quoteUrl = `${ALPHA_VANTAGE_BASE_URL}?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`;
    const quoteResponse = await fetch(quoteUrl);
    const quoteData = await quoteResponse.json();
    
    // 2. Get Company Overview
    const overviewUrl = `${ALPHA_VANTAGE_BASE_URL}?function=OVERVIEW&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`;
    const overviewResponse = await fetch(overviewUrl);
    const overviewData = await overviewResponse.json();
    
    // 3. Get News Sentiment
    const newsUrl = `${ALPHA_VANTAGE_BASE_URL}?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`;
    const newsResponse = await fetch(newsUrl);
    const newsData = await newsResponse.json();
    
    // Process and combine the data from multiple endpoints
    // ...
    */
    
    // For now, return mock data based on the query
    const mockResult: FinanceSearchResult = {
      ticker: ticker,
      name: `${ticker} Corporation`,
      price: Math.floor(Math.random() * 500) + 50,
      change: Math.random() * 10 - 5,
      changePercent: Math.random() * 5 - 2.5,
      marketCap: `${Math.floor(Math.random() * 10) + 1}${Math.random() > 0.5 ? 'B' : 'T'}`,
      volume: `${Math.floor(Math.random() * 100) + 1}M`,
      peRatio: Math.floor(Math.random() * 50) + 10,
      weekRange: `${Math.floor(Math.random() * 100) + 50} - ${Math.floor(Math.random() * 200) + 150}`,
      news: [
        { title: `${ticker} announces new product line`, date: "2h ago", source: "Financial Times" },
        { title: `Industry analysis of ${ticker}'s market position`, date: "5h ago", source: "Bloomberg" },
        { title: `${ticker} quarterly earnings exceed expectations`, date: "1d ago", source: "CNBC" },
        { title: `${ticker} stock upgraded by analysts`, date: "2d ago", source: "MarketWatch" },
        { title: `${ticker} expanding into new markets`, date: "3d ago", source: "Reuters" }
      ]
    };
    
    // Cache the results
    setCachedData(cacheKey, mockResult);
    
    return mockResult;
    
  } catch (error) {
    console.error("Error performing finance search:", error);
    toast({
      title: "Finance Search Error",
      description: "Failed to perform finance search. Please try again.",
      variant: "destructive",
    });
    return null;
  }
}
