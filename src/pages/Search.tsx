import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Newspaper, Calendar, ChartLine, Database, Loader, Star } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';
import { 
  performWebSearch,
  performImageSearch,
  performFinanceSearch,
  performVideoSearch,
  performNewsSearch,
  WebSearchResult,
  ImageSearchResult,
  FinanceSearchResult,
  VideoSearchResult,
  NewsSearchResult
} from '@/services/searchService';

const Search = () => {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'web';
  const [safeSearch, setSafeSearch] = useState(true);
  const [activeFinanceTab, setActiveFinanceTab] = useState('overview');
  const [activeFilter, setActiveFilter] = useState('all');
  const [favoriteStocks, setFavoriteStocks] = useState<string[]>([]);
  
  // State for search results
  const [isSearching, setIsSearching] = useState(false);
  const [webResults, setWebResults] = useState<WebSearchResult[]>([]);
  const [imageResults, setImageResults] = useState<ImageSearchResult[]>([]);
  const [financeResult, setFinanceResult] = useState<FinanceSearchResult | null>(null);
  const [videoResults, setVideoResults] = useState<VideoSearchResult[]>([]);
  const [newsResults, setNewsResults] = useState<NewsSearchResult[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Load favorite stocks from localStorage
    const savedFavorites = localStorage.getItem('favoriteStocks');
    if (savedFavorites) {
      try {
        setFavoriteStocks(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Error loading favorite stocks:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query, type, safeSearch]);

  const performSearch = async () => {
    if (!query) return;
    
    setIsSearching(true);
    
    try {
      if (type === 'web') {
        const results = await performWebSearch(query, safeSearch, activeFilter !== 'all' ? activeFilter : undefined);
        setWebResults(results);
      } else if (type === 'images') {
        const results = await performImageSearch(query, safeSearch);
        setImageResults(results);
      } else if (type === 'finance') {
        const result = await performFinanceSearch(query);
        setFinanceResult(result);
      } else if (type === 'videos') {
        const results = await performVideoSearch(query, safeSearch);
        setVideoResults(results);
      } else if (type === 'news') {
        const results = await performNewsSearch(query);
        setNewsResults(results);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Failed",
        description: "We couldn't complete your search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = (newQuery: string) => {
    console.log('Searching for:', newQuery);
    navigate(`/search?q=${encodeURIComponent(newQuery)}&type=${type}`);
  };

  const handleTypeChange = (newType: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}&type=${newType}`);
  };

  const handleFilterChange = (newFilter: string) => {
    setActiveFilter(newFilter);
    // Re-run search with new filter if we have a query
    if (query && type === 'web') {
      performWebSearch(query, safeSearch, newFilter !== 'all' ? newFilter : undefined)
        .then(results => setWebResults(results));
    }
  };

  const handleSafeSearchChange = (newValue: boolean) => {
    setSafeSearch(newValue);
  };
  
  const toggleFavoriteStock = (ticker: string) => {
    let updatedFavorites: string[];
    if (favoriteStocks.includes(ticker)) {
      updatedFavorites = favoriteStocks.filter(stock => stock !== ticker);
      toast({
        title: "Removed from Favorites",
        description: `${ticker} has been removed from your favorites`,
      });
    } else {
      updatedFavorites = [...favoriteStocks, ticker];
      toast({
        title: "Added to Favorites",
        description: `${ticker} has been added to your favorites`,
      });
    }
    
    setFavoriteStocks(updatedFavorites);
    localStorage.setItem('favoriteStocks', JSON.stringify(updatedFavorites));
  };

  const renderWebSearchResults = () => {
    if (isSearching) {
      return (
        <div className="space-y-6 mt-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-7 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      );
    }

    if (!query) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-2">Enter a search term above to begin</p>
          <p className="text-sm text-gray-400">Try searching for news, websites, information, and more</p>
        </div>
      );
    }

    if (webResults.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-2">No results found for "{query}"</p>
          <p className="text-sm text-gray-500">Try different keywords or check your spelling</p>
        </div>
      );
    }

    return (
      <div className="space-y-6 mt-6">
        {webResults.map((result, index) => (
          <div key={index} className="space-y-1">
            <a 
              href={result.link} 
              className="text-blue-600 hover:underline text-lg block"
              target="_blank"
              rel="noopener noreferrer"
            >
              {result.title}
            </a>
            <p className="text-sm text-green-800">{result.displayLink}</p>
            <p className="text-gray-600">{result.snippet}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderImageSearchResults = () => {
    if (isSearching) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="rounded-lg h-48" />
          ))}
        </div>
      );
    }

    if (!query) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-2">Enter a search term to find images</p>
          <p className="text-sm text-gray-400">Try searching for photos, artwork, illustrations, and more</p>
        </div>
      );
    }

    if (imageResults.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-2">No images found for "{query}"</p>
          <p className="text-sm text-gray-500">Try different keywords or check your spelling</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {imageResults.map((image, index) => (
          <a 
            key={index} 
            href={image.originalImage.url}
            target="_blank" 
            rel="noopener noreferrer"
            className="block rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative pb-[75%]">
              <img
                src={image.thumbnail}
                alt={image.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-2 text-xs text-gray-600 truncate">
              {image.title}
            </div>
          </a>
        ))}
      </div>
    );
  };

  const renderVideoSearchResults = () => {
    if (isSearching) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="rounded-lg h-48" />
          ))}
        </div>
      );
    }

    if (!query) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-2">Enter a search term to find videos</p>
          <p className="text-sm text-gray-400">Try searching for tutorials, reviews, demonstrations, and more</p>
        </div>
      );
    }

    if (videoResults.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-2">No videos found for "{query}"</p>
          <p className="text-sm text-gray-500">Try different keywords or check your spelling</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {videoResults.map((video, index) => (
          <a 
            key={index} 
            href={video.url}
            target="_blank" 
            rel="noopener noreferrer"
            className="block rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white"
          >
            <div className="relative pb-[56.25%]">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded">
                {video.duration}
              </span>
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm line-clamp-2 mb-1">{video.title}</h3>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{video.channel}</span>
                <span className="text-xs text-gray-500">{video.views} views</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    );
  };

  const renderNewsSearchResults = () => {
    if (isSearching) {
      return (
        <div className="space-y-6 mt-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-7 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      );
    }

    if (!query) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-2">Enter a search term to find news</p>
          <p className="text-sm text-gray-400">Try searching for current events, topics, or headlines</p>
        </div>
      );
    }

    if (newsResults.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-2">No news found for "{query}"</p>
          <p className="text-sm text-gray-500">Try different keywords or check your spelling</p>
        </div>
      );
    }

    return (
      <div className="space-y-6 mt-6">
        {newsResults.map((article, index) => (
          <div key={index} className="border-b pb-4 last:border-0">
            <a 
              href={article.url} 
              className="text-blue-600 hover:underline text-lg font-medium block"
              target="_blank"
              rel="noopener noreferrer"
            >
              {article.title}
            </a>
            <div className="flex items-center text-sm text-gray-500 mt-1 mb-2">
              <span>{article.source}</span>
              <span className="mx-2">•</span>
              <span>{article.publishedAt}</span>
            </div>
            <p className="text-gray-600">{article.description}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderFinancialSearchResults = () => {
    if (isSearching) {
      return (
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle><Skeleton className="h-8 w-1/3" /></CardTitle>
              <Skeleton className="h-4 w-1/4" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-64 rounded-lg bg-gray-100">
                  <Skeleton className="h-full w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (!query) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">Search for a stock ticker or company name</p>
        </div>
      );
    }

    if (!financeResult) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-2">No financial information found for "{query}"</p>
          <p className="text-sm text-gray-500">Try searching for a valid stock ticker or company name</p>
        </div>
      );
    }

    const isFavorite = favoriteStocks.includes(financeResult.ticker);

    return (
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl font-bold">{financeResult.ticker}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => toggleFavoriteStock(financeResult.ticker)}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <Star 
                    size={16} 
                    className={isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400"} 
                  />
                </Button>
              </div>
              <p className="text-md text-gray-600">{financeResult.name}</p>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-mono font-semibold">${financeResult.price.toFixed(2)}</span>
              <div className={`ml-2 flex items-center ${financeResult.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {financeResult.change > 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                <span className="ml-1">
                  {financeResult.change > 0 ? '+' : ''}{financeResult.change.toFixed(2)} ({financeResult.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveFinanceTab}>
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="charts">Charts</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="financials">Financials</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-500 mb-1">Market Cap</h3>
                    <p className="text-lg font-medium">${financeResult.marketCap}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-500 mb-1">Volume</h3>
                    <p className="text-lg font-medium">{financeResult.volume}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-500 mb-1">P/E Ratio</h3>
                    <p className="text-lg font-medium">{financeResult.peRatio}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Recent News</h3>
                  <div className="space-y-2">
                    {financeResult.news.map((item, i) => (
                      <div key={i} className="flex justify-between border-b pb-2">
                        <p className="text-sm">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="charts">
                <div className="bg-gray-50 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <ChartLine className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-gray-500">Interactive charts coming soon</p>
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2 flex-wrap">
                  <button className="px-3 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300">1D</button>
                  <button className="px-3 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300">1W</button>
                  <button className="px-3 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300">1M</button>
                  <button className="px-3 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300">3M</button>
                  <button className="px-3 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300">1Y</button>
                  <button className="px-3 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300">5Y</button>
                </div>
              </TabsContent>
              
              <TabsContent value="news">
                <div className="space-y-4">
                  {[...financeResult.news, 
                    { title: `${financeResult.ticker} reports record quarterly earnings`, date: "2d ago" },
                    { title: `New ${financeResult.ticker} product announcement expected soon`, date: "3d ago" },
                    { title: `${financeResult.ticker}'s revenue continues to grow`, date: "1w ago" }
                  ].map((item, i) => (
                    <div key={i} className="border-b pb-3">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.date} • Source: {item.source || "Financial Times"}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="financials">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2022</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2023</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2024</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Revenue</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">$394.3B</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">$383.3B</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">$390.3B</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Net Income</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">$99.8B</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">$96.9B</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">$97.2B</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">EPS</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">$6.11</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">$6.13</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">$6.27</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {favoriteStocks.length > 0 && (
          <Card className="overflow-hidden mt-6">
            <CardHeader>
              <CardTitle>Your Favorite Stocks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {favoriteStocks.map((ticker) => (
                  <div key={ticker} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{ticker}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6" 
                        onClick={() => toggleFavoriteStock(ticker)}
                      >
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      </Button>
                    </div>
                    <button 
                      className="text-primary text-sm mt-1 hover:underline"
                      onClick={() => navigate(`/search?q=${ticker}&type=finance`)}
                    >
                      View details
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col py-4 px-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className={`flex items-center gap-4 ${loaded ? 'animate-slide-in-right' : 'translate-x-full'}`} style={{ transitionDuration: '0.5s' }}>
          <Logo size="sm" />
          <SearchBar onSearch={handleSearch} initialValue={query} className="w-[500px]" />
        </div>
        
        <div className={`${loaded ? 'animate-slide-in-right' : 'translate-x-full'}`} style={{ transitionDuration: '0.5s', transitionDelay: '0.2s' }}>
          <div className="flex items-center gap-4">
            <a href="/" className="text-gray-600 hover:text-primary text-sm">Home</a>
            <button 
              onClick={() => handleTypeChange('web')}
              className={`text-sm ${type === 'web' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              Web
            </button>
            <button 
              onClick={() => handleTypeChange('images')} 
              className={`text-sm ${type === 'images' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              Images
            </button>
            <button 
              onClick={() => handleTypeChange('videos')} 
              className={`text-sm ${type === 'videos' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              Videos
            </button>
            <button 
              onClick={() => handleTypeChange('news')} 
              className={`text-sm ${type === 'news' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              News
            </button>
            <button 
              onClick={() => handleTypeChange('finance')} 
              className={`text-sm ${type === 'finance' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              Finance
            </button>
          </div>
        </div>
      </div>
      
      <div className={`mb-4 ${loaded ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.25s' }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Filters:</span>
            
            <ToggleGroup 
              type="single" 
              value={activeFilter}
              onValueChange={(value) => value && handleFilterChange(value)}
            >
              <ToggleGroupItem value="all" aria-label="All" className="text-xs px-3 py-1">All</ToggleGroupItem>
              <ToggleGroupItem value="news" aria-label="News" className="text-xs px-3 py-1">News</ToggleGroupItem>
              <ToggleGroupItem value="blogs" aria-label="Blogs" className="text-xs px-3 py-1">Blogs</ToggleGroupItem>
              <ToggleGroupItem value="forums" aria-label="Forums" className="text-xs px-3 py-1">Forums</ToggleGroupItem>
              <ToggleGroupItem value="videos" aria-label="Videos" className="text-xs px-3 py-1">Videos</ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Safe Search:</span>
            <Switch 
              checked={safeSearch} 
              onCheckedChange={handleSafeSearchChange} 
              aria-label="Toggle safe search"
            />
          </div>
        </div>
      </div>
      
      <div className={`flex-1 ${loaded ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.3s' }}>
        {isSearching && (
          <div className="flex justify-center items-center py-4">
            <Loader className="animate-spin text-primary h-6 w-6 mr-2" />
            <span className="text-gray-600">Searching...</span>
          </div>
        )}
      
        {type === 'finance' ? (
          renderFinancialSearchResults()
        ) : type === 'images' ? (
          renderImageSearchResults()
        ) : type === 'videos' ? (
          renderVideoSearchResults()
        ) : type === 'news' ? (
          renderNewsSearchResults()
        ) : (
          renderWebSearchResults()
        )}

        {query && !isSearching && (
          <div className="text-center text-gray-500 mt-8">
            {(type !== 'finance' && webResults.length > 0) || 
             (type === 'images' && imageResults.length > 0) || 
             (type === 'videos' && videoResults.length > 0) || 
             (type === 'news' && newsResults.length > 0) && (
              <p>Showing results for: {query}</p>
            )}
            <p className="text-xs mt-1">Type: {
              type === 'images' ? 'Image Search' : 
              type === 'finance' ? 'Financial Search' : 
              type === 'videos' ? 'Video Search' : 
              type === 'news' ? 'News Search' : 'Web Search'
            }</p>
          </div>
        )}
      </div>
      
      <Footer 
        className={`${loaded ? 'animate-slide-in-right' : 'translate-x-full'}`} 
        style={{ transitionDelay: '0.4s', transitionDuration: '0.5s' }} 
      />
    </div>
  );
};

export default Search;
