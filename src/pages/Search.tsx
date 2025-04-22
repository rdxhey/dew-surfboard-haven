
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Info, News, Calendar, ChartLine, Database } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';

const Search = () => {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'web';
  const [safeSearch, setSafeSearch] = useState(true);
  const [activeFinanceTab, setActiveFinanceTab] = useState('overview');

  useEffect(() => {
    // Add a small delay for a smoother entrance animation
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Update the component when search parameters change
  useEffect(() => {
    // Handle type changes from URL
    console.log("Search type changed to:", type);
  }, [type]);

  const handleSearch = (newQuery: string) => {
    console.log('Searching for:', newQuery);
    navigate(`/search?q=${encodeURIComponent(newQuery)}&type=${type}`);
  };

  const handleTypeChange = (newType: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}&type=${newType}`);
  };

  // Mock data for financial search results
  const mockStockData = {
    ticker: "AAPL",
    name: "Apple Inc.",
    price: 198.75,
    change: 3.42,
    changePercent: 1.75,
    marketCap: "3.1T",
    volume: "45.2M",
    peRatio: 32.8,
    weekRange: "156.21 - 204.35",
    news: [
      { title: "Apple announces new iPhone features", date: "2h ago" },
      { title: "Tech stocks rally amid Fed rate decision", date: "5h ago" },
      { title: "Apple's AI strategy detailed in latest report", date: "1d ago" }
    ]
  };

  const renderFinancialSearchResults = () => {
    if (!query) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">Search for a stock ticker or company name</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Stock Overview Card */}
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-2xl font-bold">{mockStockData.ticker}</CardTitle>
              <p className="text-md text-gray-600">{mockStockData.name}</p>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-mono font-semibold">${mockStockData.price}</span>
              <div className={`ml-2 flex items-center ${mockStockData.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {mockStockData.change > 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                <span className="ml-1">
                  {mockStockData.change > 0 ? '+' : ''}{mockStockData.change} ({mockStockData.changePercent}%)
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
                    <p className="text-lg font-medium">${mockStockData.marketCap}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-500 mb-1">Volume</h3>
                    <p className="text-lg font-medium">{mockStockData.volume}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-500 mb-1">P/E Ratio</h3>
                    <p className="text-lg font-medium">{mockStockData.peRatio}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Recent News</h3>
                  <div className="space-y-2">
                    {mockStockData.news.map((item, i) => (
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
                
                <div className="mt-4 flex gap-2">
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
                  {[...mockStockData.news, 
                    { title: "Apple reports record quarterly earnings", date: "2d ago" },
                    { title: "New MacBook Pro models expected next month", date: "3d ago" },
                    { title: "Apple's services revenue continues to grow", date: "1w ago" }
                  ].map((item, i) => (
                    <div key={i} className="border-b pb-3">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.date} • Source: Financial Times
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
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col py-4 px-6 overflow-hidden">
      {/* Header */}
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
              onClick={() => handleTypeChange('finance')} 
              className={`text-sm ${type === 'finance' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              Finance
            </button>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className={`mb-4 ${loaded ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.25s' }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Filters:</span>
            
            <ToggleGroup type="single" defaultValue="all">
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
              onCheckedChange={setSafeSearch} 
              aria-label="Toggle safe search"
            />
          </div>
        </div>
      </div>
      
      {/* Search Results Content */}
      <div className={`flex-1 ${loaded ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.3s' }}>
        {type === 'finance' ? (
          renderFinancialSearchResults()
        ) : type === 'images' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            <div className="rounded-lg h-48 bg-gray-200 animate-pulse"></div>
            <div className="rounded-lg h-48 bg-gray-200 animate-pulse"></div>
            <div className="rounded-lg h-48 bg-gray-200 animate-pulse"></div>
            <div className="rounded-lg h-48 bg-gray-200 animate-pulse"></div>
            <div className="rounded-lg h-48 bg-gray-200 animate-pulse"></div>
            <div className="rounded-lg h-48 bg-gray-200 animate-pulse"></div>
          </div>
        ) : (
          <div className="space-y-6 mt-6">
            <div className="space-y-2">
              <div className="h-7 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-7 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-7 bg-gray-200 rounded w-2/5 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
          </div>
        )}

        <div className="text-center text-gray-500 mt-8">
          {type !== 'finance' && (
            <p>Showing search results for: {query || 'empty query'}</p>
          )}
          <p>Type: {
            type === 'images' ? 'Image Search' : 
            type === 'finance' ? 'Financial Search' : 'Web Search'
          }</p>
        </div>
      </div>
      
      {/* Footer */}
      <Footer 
        className={`${loaded ? 'animate-slide-in-right' : 'translate-x-full'}`} 
        style={{ transitionDelay: '0.4s', transitionDuration: '0.5s' }} 
      />
    </div>
  );
};

export default Search;
