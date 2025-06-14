
import { toast } from "@/hooks/use-toast";
import { getApiConfig, getCachedData, setCachedData, formatMarketCap, formatVolume } from "./utils";

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

export async function performFinanceSearch(query: string): Promise<FinanceSearchResult | null> {
  try {
    if (!query) return null;

    const cacheKey = `finance-${query}`;
    const cachedResults = getCachedData<FinanceSearchResult>(cacheKey);
    if (cachedResults) return cachedResults;

    console.log(`Performing finance search for: "${query}"`);
    
    const ticker = query.toUpperCase();
    const config = getApiConfig();
    
    if (!config.useMockData && config.alphaVantageApiKey && config.alphaVantageApiKey !== 'demo') {
      try {
        const url = new URL(`https://www.alphavantage.co/query`);
        url.searchParams.append('function', 'GLOBAL_QUOTE');
        url.searchParams.append('symbol', ticker);
        url.searchParams.append('apikey', config.alphaVantageApiKey);
        
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`Finance API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data['Global Quote'] && Object.keys(data['Global Quote']).length > 0) {
          const quote = data['Global Quote'];
          
          const overviewUrl = new URL(`https://www.alphavantage.co/query`);
          overviewUrl.searchParams.append('function', 'OVERVIEW');
          overviewUrl.searchParams.append('symbol', ticker);
          overviewUrl.searchParams.append('apikey', config.alphaVantageApiKey);
          
          const overviewResponse = await fetch(overviewUrl.toString());
          const overviewData = await overviewResponse.json();
          
          const price = parseFloat(quote['05. price']);
          // const previousClose = parseFloat(quote['08. previous close']); // Not used in current result
          const change = parseFloat(quote['09. change']);
          const changePercent = parseFloat(quote['10. change percent'].replace('%', ''));
          
          const getFinancialNews = () => {
            return [
              { title: `${ticker} announces new product line for 2025`, date: "2h ago", source: "Financial Times" },
              { title: `Industry analysis: ${overviewData.Name || ticker}'s market position strengthens`, date: "5h ago", source: "Bloomberg" },
              { title: `${ticker} quarterly earnings exceed expectations by 15%`, date: "1d ago", source: "CNBC" },
              { title: `Analysts upgrade ${ticker} stock rating to "Strong Buy"`, date: "2d ago", source: "MarketWatch" },
              { title: `${overviewData.Name || ticker} expanding into new international markets`, date: "3d ago", source: "Reuters" }
            ];
          };
          
          const result: FinanceSearchResult = {
            ticker: ticker,
            name: overviewData.Name || `${ticker} Corporation`,
            price: price,
            change: change,
            changePercent: changePercent,
            marketCap: overviewData.MarketCapitalization 
              ? formatMarketCap(parseFloat(overviewData.MarketCapitalization)) 
              : "N/A",
            volume: formatVolume(parseInt(quote['06. volume'] || '0')),
            peRatio: parseFloat(overviewData.PERatio || '0'),
            weekRange: `${overviewData['52WeekLow'] || 'N/A'} - ${overviewData['52WeekHigh'] || 'N/A'}`,
            news: getFinancialNews() // Real API would need actual news fetching
          };
          
          setCachedData(cacheKey, result);
          return result;
        } else {
          throw new Error("Invalid ticker symbol or API response from Alpha Vantage");
        }
      } catch (error) {
        console.error("Error with Alpha Vantage API:", error);
        toast({
          title: "API Error",
          description: "There was an error with the financial data API. Falling back to mock data.",
          variant: "destructive",
        });
      }
    }
    
    const companyNames: Record<string, string> = {
      'AAPL': 'Apple Inc.', 'MSFT': 'Microsoft Corporation', 'GOOGL': 'Alphabet Inc.',
      'AMZN': 'Amazon.com, Inc.', 'META': 'Meta Platforms, Inc.', 'TSLA': 'Tesla, Inc.',
      'NVDA': 'NVIDIA Corporation', 'JPM': 'JPMorgan Chase & Co.', 'V': 'Visa Inc.', 'JNJ': 'Johnson & Johnson'
    };

    const companyName = companyNames[ticker] || `${ticker} Corporation`;
    
    const price = Math.floor(Math.random() * 500) + 50;
    const change = Math.random() * 10 - 5;
    const changePercent = (change / price) * 100;
    const marketCapValue = Math.floor(Math.random() * 2000) + 50;
    const marketCap = marketCapValue > 1000 
      ? `${(marketCapValue / 1000).toFixed(2)}T` 
      : `${marketCapValue}B`;
    
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

