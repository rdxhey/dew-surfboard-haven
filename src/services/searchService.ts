
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

export interface VideoSearchResult {
  title: string;
  url: string;
  thumbnail: string;
  duration: string;
  channel: string;
  views: string;
  publishedAt: string;
}

export interface NewsSearchResult {
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  description: string;
  thumbnail?: string;
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

// API Configuration
// In production, you should replace these with your actual API keys
const GOOGLE_API_KEY = "AIzaSyDRxlSH61tRfc4VwxK1ojd6y8S06I_pMBM"; // Replace with your actual API key
const SEARCH_ENGINE_ID = "36caa63147e5c4d9a"; // Replace with your actual search engine ID
const NEWS_API_KEY = "your_news_api_key"; // Replace with actual News API key
const ALPHA_VANTAGE_API_KEY = "demo"; // Replace with your actual Alpha Vantage API key
const YOUTUBE_API_KEY = "your_youtube_api_key"; // Replace with your actual YouTube API key

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

// Helper function to format relative time
function formatRelativeTime(date: Date): string {
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
function randomViewCount(): string {
  const num = Math.floor(Math.random() * 10000000);
  if (num < 1000) return `${num}`;
  if (num < 1000000) return `${Math.floor(num / 100) / 10}K`;
  return `${Math.floor(num / 100000) / 10}M`;
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
    
    // In production, uncomment and use the real API call
    /*
    // Build the API URL
    const url = new URL('https://www.googleapis.com/customsearch/v1');
    url.searchParams.append('key', GOOGLE_API_KEY);
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
    */
    
    // For now, use improved mock data until API keys are properly configured
    const mockResults: WebSearchResult[] = [
      {
        title: `Results for: ${query}${filter ? ` (Filter: ${filter})` : ''}`,
        link: "https://www.example.com/result1",
        snippet: "This is a comprehensive search result for your query. In a real implementation, this would contain actual content from the web that matches your search criteria.",
        displayLink: "example.com",
        formattedUrl: "https://www.example.com/result1",
      },
      {
        title: `${query} - Information and Resources | Official Site`,
        link: "https://www.example.com/result2",
        snippet: "Find comprehensive information about your search topic. Contains the most accurate and up-to-date information available. Safe search is " + (safeSearch ? "enabled" : "disabled") + " for your protection.",
        displayLink: "example.com/resources",
        formattedUrl: "https://www.example.com/result2",
      },
      {
        title: `Learning more about ${query} - Educational Resources`,
        link: "https://www.education.example.com/result3",
        snippet: "Explore various resources and educational materials related to your search query. Perfect for students, researchers, and anyone looking to expand their knowledge.",
        displayLink: "education.example.com",
        formattedUrl: "https://www.education.example.com/result3",
      },
      {
        title: `${query} - Wikipedia, the free encyclopedia`,
        link: "https://en.wikipedia.org/wiki/Example",
        snippet: `${query} is a term that refers to multiple concepts across various fields. This article provides an overview of the history, development, and current applications.`,
        displayLink: "en.wikipedia.org",
        formattedUrl: "https://en.wikipedia.org/wiki/Example",
      },
      {
        title: `Latest developments in ${query} research`,
        link: "https://www.research.example.com/latest",
        snippet: `Recent studies have shown significant advancements in ${query} technology. Researchers at leading institutions have developed new approaches that promise to revolutionize the field.`,
        displayLink: "research.example.com",
        formattedUrl: "https://www.research.example.com/latest",
      }
    ];
    
    // Add filter-specific results
    if (filter === 'videos') {
      mockResults.push({
        title: `${query} Video Tutorial - Complete Guide 2025`,
        link: "https://www.youtube.com/watch?v=example",
        snippet: "Watch this helpful video tutorial about your search topic on YouTube. Our expert instructor walks you through everything you need to know step by step.",
        displayLink: "youtube.com",
        formattedUrl: "https://www.youtube.com/watch?v=example",
      });
    } else if (filter === 'news') {
      mockResults.push({
        title: `Breaking: New developments in ${query} - CNN`,
        link: "https://www.cnn.com/2025/04/25/tech/example-news",
        snippet: `Latest news about ${query} reveals surprising developments. Industry experts weigh in on what this means for the future.`,
        displayLink: "cnn.com",
        formattedUrl: "https://www.cnn.com/2025/04/25/tech/example-news",
      });
    } else if (filter === 'blogs') {
      mockResults.push({
        title: `My experience with ${query} - Personal Blog`,
        link: "https://medium.com/@blogger/my-experience",
        snippet: `I've been working with ${query} for over 5 years now, and here's what I've learned. This comprehensive guide will help beginners avoid common mistakes.`,
        displayLink: "medium.com",
        formattedUrl: "https://medium.com/@blogger/my-experience",
      });
    } else if (filter === 'forums') {
      mockResults.push({
        title: `[Discussion] Problems with ${query}? - Reddit`,
        link: "https://www.reddit.com/r/technology/comments/example",
        snippet: `I've been having issues with ${query}. Has anyone else experienced this? Share your solutions and workarounds in this thread.`,
        displayLink: "reddit.com",
        formattedUrl: "https://www.reddit.com/r/technology/comments/example",
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
    
    // In production, uncomment and use the real API call
    /*
    // Build the API URL
    const url = new URL('https://www.googleapis.com/customsearch/v1');
    url.searchParams.append('key', GOOGLE_API_KEY);
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
    
    // Transform the API response to our ImageSearchResult type
    const results = data.items?.map(item => ({
      title: item.title,
      link: item.link,
      thumbnail: item.image?.thumbnailLink || '',
      originalImage: {
        url: item.link,
        width: item.image?.width || 800,
        height: item.image?.height || 600
      }
    })) || [];
    
    // Cache the results
    setCachedData(cacheKey, results);
    
    return results;
    */

    // Use enhanced mock data for testing
    const mockImageResults: ImageSearchResult[] = Array.from({ length: 12 }, (_, i) => ({
      title: `${query} image ${i + 1}`,
      link: `https://example.com/image${i + 1}.jpg`,
      thumbnail: `https://via.placeholder.com/150?text=${encodeURIComponent(query)}+${i + 1}`,
      originalImage: {
        url: `https://via.placeholder.com/800x600?text=${encodeURIComponent(query)}+${i + 1}`,
        width: 800,
        height: 600,
      }
    }));
    
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

export async function performVideoSearch(query: string, safeSearch: boolean = true): Promise<VideoSearchResult[]> {
  try {
    if (!query) return [];

    // Create a cache key based on the search parameters
    const cacheKey = `video-${query}-${safeSearch}`;
    
    // Check if we have cached results
    const cachedResults = getCachedData<VideoSearchResult[]>(cacheKey);
    if (cachedResults) return cachedResults;

    console.log(`Performing video search for: "${query}" with safe search: ${safeSearch}`);
    
    // In production, you would use the YouTube API or similar
    /*
    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.searchParams.append('part', 'snippet');
    url.searchParams.append('maxResults', '25');
    url.searchParams.append('q', query);
    url.searchParams.append('key', YOUTUBE_API_KEY);
    url.searchParams.append('type', 'video');
    url.searchParams.append('safeSearch', safeSearch ? 'strict' : 'none');
    
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`YouTube API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Would then need to make additional API calls to get video durations
    // ...
    */
    
    // For now, use mock data
    const durations = ['2:45', '10:32', '5:17', '3:09', '15:01', '7:23', '4:56', '8:30', '1:22', '6:11'];
    const channels = ['TechTutorials', 'LearnWithMe', 'ExpertGuides', 'HowToChannel', 'MasterClass', 'TutorialHub'];
    
    // Create a date in the past (random days)
    const getRandomDate = () => {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 60)); // Random date within last 60 days
      return date;
    };
    
    const mockVideoResults: VideoSearchResult[] = Array.from({ length: 9 }, (_, i) => {
      const publishDate = getRandomDate();
      return {
        title: `${query} - ${i === 0 ? 'Complete Tutorial' : i === 1 ? 'Quick Guide' : i === 2 ? 'Explained in 5 Minutes' : `Part ${i}`}`,
        url: `https://www.youtube.com/watch?v=example${i}`,
        thumbnail: `https://via.placeholder.com/320x180?text=Video:+${encodeURIComponent(query)}+${i + 1}`,
        duration: durations[i % durations.length],
        channel: channels[i % channels.length],
        views: randomViewCount(),
        publishedAt: formatRelativeTime(publishDate)
      };
    });
    
    // Cache the results
    setCachedData(cacheKey, mockVideoResults);
    
    return mockVideoResults;
  } catch (error) {
    console.error("Error performing video search:", error);
    toast({
      title: "Video Search Error",
      description: "Failed to perform video search. Please try again.",
      variant: "destructive",
    });
    return [];
  }
}

export async function performNewsSearch(query: string): Promise<NewsSearchResult[]> {
  try {
    if (!query) return [];

    // Create a cache key
    const cacheKey = `news-${query}`;
    
    // Check for cached results
    const cachedResults = getCachedData<NewsSearchResult[]>(cacheKey);
    if (cachedResults) return cachedResults;

    console.log(`Performing news search for: "${query}"`);
    
    // In production, you'd use a real news API
    /*
    const url = new URL('https://newsapi.org/v2/everything');
    url.searchParams.append('q', query);
    url.searchParams.append('sortBy', 'publishedAt');
    url.searchParams.append('apiKey', NEWS_API_KEY);
    
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`News API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    const newsResults = data.articles.map(article => ({
      title: article.title,
      url: article.url,
      source: article.source.name,
      publishedAt: formatRelativeTime(new Date(article.publishedAt)),
      description: article.description,
      thumbnail: article.urlToImage
    }));
    */
    
    // Mock news sources
    const sources = ['CNN', 'BBC', 'Reuters', 'The Guardian', 'Financial Times', 'The New York Times', 'Bloomberg'];
    
    // Create random dates within the last 7 days
    const getRecentDate = () => {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 7));
      return date;
    };
    
    // Generate mock news results
    const mockNewsResults: NewsSearchResult[] = [
      {
        title: `Breaking: Major Developments in ${query} Research Announced Today`,
        url: "https://example.com/news/breaking",
        source: sources[0],
        publishedAt: formatRelativeTime(getRecentDate()),
        description: `Scientists have announced groundbreaking discoveries related to ${query} that could revolutionize the industry. Experts weigh in on the implications.`,
        thumbnail: `https://via.placeholder.com/400x200?text=News:+${encodeURIComponent(query)}`
      },
      {
        title: `${query}: What You Need to Know in 2025`,
        url: "https://example.com/news/guide",
        source: sources[1],
        publishedAt: formatRelativeTime(getRecentDate()),
        description: `Our comprehensive guide to understanding ${query} and its importance in today's rapidly changing landscape. Industry leaders provide insights into future trends.`,
        thumbnail: `https://via.placeholder.com/400x200?text=Guide:+${encodeURIComponent(query)}`
      },
      {
        title: `Opinion: The Impact of ${query} on Global Markets`,
        url: "https://example.com/news/opinion",
        source: sources[2],
        publishedAt: formatRelativeTime(getRecentDate()),
        description: `Analysis of how ${query} is influencing economic trends worldwide. Financial experts predict significant shifts in investment strategies as a result.`,
        thumbnail: `https://via.placeholder.com/400x200?text=Analysis:+${encodeURIComponent(query)}`
      },
      {
        title: `${query} Conference Announces 2025 Schedule`,
        url: "https://example.com/news/conference",
        source: sources[3],
        publishedAt: formatRelativeTime(getRecentDate()),
        description: `The annual ${query} Conference has unveiled its schedule for next year, featuring prominent speakers and innovative sessions focused on the latest developments.`,
        thumbnail: `https://via.placeholder.com/400x200?text=Conference:+${encodeURIComponent(query)}`
      },
      {
        title: `Tech Giants Investing Heavily in ${query} Technology`,
        url: "https://example.com/news/tech",
        source: sources[4],
        publishedAt: formatRelativeTime(getRecentDate()),
        description: `Major technology companies are allocating substantial resources to ${query} initiatives, signaling confidence in its future potential and applications.`,
        thumbnail: `https://via.placeholder.com/400x200?text=Technology:+${encodeURIComponent(query)}`
      },
      {
        title: `${query} Experts Share Tips for Beginners`,
        url: "https://example.com/news/tips",
        source: sources[5],
        publishedAt: formatRelativeTime(getRecentDate()),
        description: `Leading professionals in the ${query} field offer valuable advice for newcomers looking to understand the basics and avoid common pitfalls.`,
        thumbnail: `https://via.placeholder.com/400x200?text=Tips:+${encodeURIComponent(query)}`
      }
    ];
    
    // Cache the results
    setCachedData(cacheKey, mockNewsResults);
    
    return mockNewsResults;
  } catch (error) {
    console.error("Error performing news search:", error);
    toast({
      title: "News Search Error",
      description: "Failed to perform news search. Please try again.",
      variant: "destructive",
    });
    return [];
  }
}

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
    
    // In production, you'd use a real financial API like Alpha Vantage
    /*
    const url = new URL(`https://www.alphavantage.co/query`);
    url.searchParams.append('function', 'GLOBAL_QUOTE');
    url.searchParams.append('symbol', ticker);
    url.searchParams.append('apikey', ALPHA_VANTAGE_API_KEY);
    
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Finance API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    // Process data and create result
    */
    
    // For demonstration, we're using enhanced mock data
    const companyNames: Record<string, string> = {
      'AAPL': 'Apple Inc.',
      'MSFT': 'Microsoft Corporation',
      'GOOGL': 'Alphabet Inc.',
      'AMZN': 'Amazon.com, Inc.',
      'META': 'Meta Platforms, Inc.',
      'TSLA': 'Tesla, Inc.',
      'NVDA': 'NVIDIA Corporation',
      'JPM': 'JPMorgan Chase & Co.',
      'V': 'Visa Inc.',
      'JNJ': 'Johnson & Johnson'
    };

    // Use the company name if we have it, otherwise create a generic one
    const companyName = companyNames[ticker] || `${ticker} Corporation`;
    
    // Create realistic-looking mock data
    const price = Math.floor(Math.random() * 500) + 50;
    const change = Math.random() * 10 - 5;
    const changePercent = (change / price) * 100;
    const marketCapValue = Math.floor(Math.random() * 2000) + 50;
    const marketCap = marketCapValue > 1000 
      ? `${(marketCapValue / 1000).toFixed(2)}T` 
      : `${marketCapValue}B`;
    
    // Generate financial news with realistic dates
    const getFinancialNews = () => {
      return [
        { title: `${ticker} announces new product line for 2025`, date: "2h ago", source: "Financial Times" },
        { title: `Industry analysis: ${companyName}'s market position strengthens`, date: "5h ago", source: "Bloomberg" },
        { title: `${ticker} quarterly earnings exceed expectations by 15%`, date: "1d ago", source: "CNBC" },
        { title: `Analysts upgrade ${ticker} stock rating to "Strong Buy"`, date: "2d ago", source: "MarketWatch" },
        { title: `${companyName} expanding into new international markets`, date: "3d ago", source: "Reuters" }
      ];
    };
    
    const mockResult: FinanceSearchResult = {
      ticker: ticker,
      name: companyName,
      price: price,
      change: change,
      changePercent: changePercent,
      marketCap: marketCap,
      volume: `${Math.floor(Math.random() * 100) + 1}M`,
      peRatio: Math.floor(Math.random() * 50) + 10,
      weekRange: `${(price - Math.random() * 50).toFixed(2)} - ${(price + Math.random() * 50).toFixed(2)}`,
      news: getFinancialNews()
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
