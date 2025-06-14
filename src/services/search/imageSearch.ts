
import { toast } from "@/hooks/use-toast";
import { getApiConfig, getCachedData, setCachedData, GoogleSearchResponse } from "./utils";

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

export async function performImageSearch(query: string, safeSearch: boolean = true): Promise<ImageSearchResult[]> {
  try {
    if (!query) return [];

    const cacheKey = `image-${query}-${safeSearch}`;
    const cachedResults = getCachedData<ImageSearchResult[]>(cacheKey);
    if (cachedResults) return cachedResults;

    console.log(`Performing image search for: "${query}" with safe search: ${safeSearch}`);
    
    const config = getApiConfig();
    
    if (!config.useMockData && config.googleApiKey && config.searchEngineId) {
      try {
        const url = new URL('https://www.googleapis.com/customsearch/v1');
        url.searchParams.append('key', config.googleApiKey);
        url.searchParams.append('cx', config.searchEngineId);
        url.searchParams.append('q', query);
        url.searchParams.append('searchType', 'image');
        
        if (safeSearch) {
          url.searchParams.append('safe', 'active');
        }
        
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        
        const data = await response.json() as GoogleSearchResponse;
        
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
        
        setCachedData(cacheKey, results);
        return results;
      } catch (error) {
        console.error("Error with Google Image Search API:", error);
        toast({
          title: "API Error",
          description: "There was an error with the Google Image Search API. Falling back to mock data.",
          variant: "destructive",
        });
      }
    }

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

