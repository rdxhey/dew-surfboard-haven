import { toast } from "@/hooks/use-toast";
import { getApiConfig, getCachedData, setCachedData, GoogleSearchResponse } from "./utils";

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

export async function performWebSearch(query: string, safeSearch: boolean = true, filter?: string): Promise<WebSearchResult[]> {
  try {
    if (!query) return [];

    const cacheKey = `web-${query}-${safeSearch}-${filter || 'none'}`;
    const cachedResults = getCachedData<WebSearchResult[]>(cacheKey);
    if (cachedResults) return cachedResults;

    console.log(`Performing web search for: "${query}" with safe search: ${safeSearch} and filter: ${filter || 'none'}`);
    
    const config = getApiConfig();
    
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
    
    if (!config.useMockData && config.googleApiKey && config.searchEngineId) {
      const url = new URL('https://www.googleapis.com/customsearch/v1');
      url.searchParams.append('key', config.googleApiKey);
      url.searchParams.append('cx', config.searchEngineId);
      url.searchParams.append('q', searchQuery);
      
      if (safeSearch) {
        url.searchParams.append('safe', 'active');
      }
      
      try {
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        const data = await response.json() as GoogleSearchResponse;
        
        if (data.error) {
          console.error("Google API error:", data.error);
          throw new Error(`Google API error: ${data.error.message}`);
        }
        
        if (!data.items || data.items.length === 0) {
          console.log("No search results found for:", query);
          return [];
        }
        
        const results = data.items.map(item => ({
          title: item.title,
          link: item.link,
          snippet: item.snippet,
          displayLink: item.displayLink,
          formattedUrl: item.formattedUrl,
          pagemap: item.pagemap
        })) as WebSearchResult[];
        
        setCachedData(cacheKey, results);
        return results;
      } catch (error) {
        console.error("Error with Google Search API:", error);
        toast({
          title: "API Error",
          description: "There was an error with the Google Search API. Falling back to mock data.",
          variant: "destructive",
        });
      }
    }
    
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
        formattedUrl: "https://www.wikipedia.org/wiki/Example",
      },
      {
        title: `Latest developments in ${query} research`,
        link: "https://www.research.example.com/latest",
        snippet: `Recent studies have shown significant advancements in ${query} technology. Researchers at leading institutions have developed new approaches that promise to revolutionize the field.`,
        displayLink: "research.example.com",
        formattedUrl: "https://www.research.example.com/latest",
      }
    ];

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
    
    setCachedData(cacheKey, mockResults);
    return mockResults;
    
  } catch (error) {
    console.error("Error performing web search:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
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
