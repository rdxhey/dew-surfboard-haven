
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
const API_KEY = "AIzaSyDRxlSH61tRfc4VwxK1ojd6y8S06I_pMBM"; // Using a public test key
const SEARCH_ENGINE_ID = "36caa63147e5c4d9a"; // Using a public test search engine ID

// Define interfaces for API responses
interface GoogleSearchItem {
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
    
    // Use mock data for testing since API keys are placeholders
    // In production, you would use the API call below
    /*
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
    */
    
    // For now, use mock data until API keys are properly configured
    const mockResults: WebSearchResult[] = [
      {
        title: `Results for: ${query}${filter ? ` (Filter: ${filter})` : ''}`,
        link: "https://www.example.com/result1",
        snippet: "This is a sample search result for your query. In a real implementation, this would be actual content from the web.",
        displayLink: "example.com",
        formattedUrl: "https://www.example.com/result1",
      },
      {
        title: `${query} - Information and Resources`,
        link: "https://www.example.com/result2",
        snippet: "Find comprehensive information about your search topic. Safe search is " + (safeSearch ? "enabled" : "disabled"),
        displayLink: "example.com/resources",
        formattedUrl: "https://www.example.com/result2",
      },
      {
        title: `Learning more about ${query}`,
        link: "https://www.example.com/result3",
        snippet: "Explore various resources and educational materials related to your search query.",
        displayLink: "education.example.com",
        formattedUrl: "https://www.example.com/result3",
      }
    ];
    
    if (filter === 'videos') {
      mockResults.push({
        title: `${query} Video Tutorial`,
        link: "https://www.youtube.com/watch?v=example",
        snippet: "Watch this helpful video tutorial about your search topic on YouTube.",
        displayLink: "youtube.com",
        formattedUrl: "https://www.youtube.com/watch?v=example",
      });
    }
    
    // Cache the results
    setCachedData(cacheKey, mockResults);
    
    return mockResults;
    
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
    
    // Use mock data for testing since API keys are placeholders
    // In production, you would use real API calls

    const mockImageResults: ImageSearchResult[] = [
      {
        title: `${query} image 1`,
        link: "https://example.com/image1.jpg",
        thumbnail: "https://via.placeholder.com/150?text=Image+1",
        originalImage: {
          url: "https://via.placeholder.com/800x600?text=Image+1",
          width: 800,
          height: 600,
        }
      },
      {
        title: `${query} image 2`,
        link: "https://example.com/image2.jpg",
        thumbnail: "https://via.placeholder.com/150?text=Image+2",
        originalImage: {
          url: "https://via.placeholder.com/800x600?text=Image+2",
          width: 800,
          height: 600,
        }
      },
      {
        title: `${query} image 3`,
        link: "https://example.com/image3.jpg",
        thumbnail: "https://via.placeholder.com/150?text=Image+3",
        originalImage: {
          url: "https://via.placeholder.com/800x600?text=Image+3",
          width: 800,
          height: 600,
        }
      },
      {
        title: `${query} image 4`,
        link: "https://example.com/image4.jpg",
        thumbnail: "https://via.placeholder.com/150?text=Image+4",
        originalImage: {
          url: "https://via.placeholder.com/800x600?text=Image+4",
          width: 800,
          height: 600,
        }
      },
      {
        title: `${query} image 5`,
        link: "https://example.com/image5.jpg",
        thumbnail: "https://via.placeholder.com/150?text=Image+5",
        originalImage: {
          url: "https://via.placeholder.com/800x600?text=Image+5",
          width: 800,
          height: 600,
        }
      },
      {
        title: `${query} image 6`,
        link: "https://example.com/image6.jpg",
        thumbnail: "https://via.placeholder.com/150?text=Image+6",
        originalImage: {
          url: "https://via.placeholder.com/800x600?text=Image+6",
          width: 800,
          height: 600,
        }
      }
    ];
    
    // Cache the results
    setCachedData(cacheKey, mockImageResults);
    
    return mockImageResults;
    
  } catch (error) {
    console.error("Error performing image search:", error);
    toast({
      title: "Image Search Error",
      description: "Failed to perform image search. Please try again.",
      variant: "destructive",
    });
    return [];
  }
}

// Constants for Alpha Vantage API
const ALPHA_VANTAGE_API_KEY = "demo"; // Using Alpha Vantage's demo key for testing

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
    
    // For demonstration, we're using mock data since real APIs require valid keys
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
