
import { toast } from "@/hooks/use-toast";
import { getApiConfig, getCachedData, setCachedData, formatRelativeTime, randomViewCount } from "./utils";

export interface VideoSearchResult {
  title: string;
  url: string;
  thumbnail: string;
  duration: string;
  channel: string;
  views: string;
  publishedAt: string;
}

export async function performVideoSearch(query: string, safeSearch: boolean = true): Promise<VideoSearchResult[]> {
  try {
    if (!query) return [];

    const cacheKey = `video-${query}-${safeSearch}`;
    const cachedResults = getCachedData<VideoSearchResult[]>(cacheKey);
    if (cachedResults) return cachedResults;

    console.log(`Performing video search for: "${query}" with safe search: ${safeSearch}`);
    
    const config = getApiConfig();
    
    if (!config.useMockData && config.youtubeApiKey) {
      try {
        const url = new URL('https://www.googleapis.com/youtube/v3/search');
        url.searchParams.append('part', 'snippet');
        url.searchParams.append('maxResults', '25');
        url.searchParams.append('q', query);
        url.searchParams.append('key', config.youtubeApiKey);
        url.searchParams.append('type', 'video');
        url.searchParams.append('safeSearch', safeSearch ? 'strict' : 'none');
        
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`YouTube API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        const videoResults = await Promise.all(data.items.map(async (item: any) => {
          return {
            title: item.snippet.title,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            thumbnail: item.snippet.thumbnails.high.url,
            duration: "3:42", // Placeholder, real duration requires another API call
            channel: item.snippet.channelTitle,
            views: "125K", // Placeholder, real views require another API call
            publishedAt: formatRelativeTime(new Date(item.snippet.publishedAt))
          };
        }));
        
        setCachedData(cacheKey, videoResults);
        return videoResults;
      } catch (error) {
        console.error("Error with YouTube API:", error);
        toast({
          title: "API Error",
          description: "There was an error with the YouTube API. Falling back to mock data.",
          variant: "destructive",
        });
      }
    }
    
    const durations = ['2:45', '10:32', '5:17', '3:09', '15:01', '7:23', '4:56', '8:30', '1:22', '6:11'];
    const channels = ['TechTutorials', 'LearnWithMe', 'ExpertGuides', 'HowToChannel', 'MasterClass', 'TutorialHub'];
    
    const getRandomDate = () => {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 60));
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

