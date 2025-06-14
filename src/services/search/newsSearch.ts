import { toast } from "@/hooks/use-toast";
import { getApiConfig, getCachedData, setCachedData, formatRelativeTime } from "./utils";

export interface NewsSearchResult {
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  description: string;
  thumbnail?: string;
}

export async function performNewsSearch(query: string): Promise<NewsSearchResult[]> {
  try {
    if (!query) return [];

    const cacheKey = `news-${query}`;
    const cachedResults = getCachedData<NewsSearchResult[]>(cacheKey);
    if (cachedResults) return cachedResults;

    console.log(`Performing news search for: "${query}"`);
    
    const config = getApiConfig();
    
    if (!config.useMockData && config.newsApiKey) {
      try {
        const url = new URL('https://newsapi.org/v2/everything');
        url.searchParams.append('q', query);
        url.searchParams.append('sortBy', 'publishedAt');
        url.searchParams.append('apiKey', config.newsApiKey);
        
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`News API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        const newsResults = data.articles.map((article: any) => ({
          title: article.title,
          url: article.url,
          source: article.source.name,
          publishedAt: formatRelativeTime(new Date(article.publishedAt)),
          description: article.description,
          thumbnail: article.urlToImage
        }));
        
        setCachedData(cacheKey, newsResults);
        return newsResults;
      } catch (error) {
        console.error("Error with News API:", error);
        toast({
          title: "API Error",
          description: "There was an error with the News API. Falling back to mock data.",
          variant: "destructive",
        });
      }
    }
    
    const sources = ['CNN', 'BBC', 'Reuters', 'The Guardian', 'Financial Times', 'The New York Times', 'Bloomberg'];
    
    const getRecentDate = () => {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 7));
      return date;
    };
    
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
