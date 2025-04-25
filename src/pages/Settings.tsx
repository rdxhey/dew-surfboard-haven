
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Info, Save, Key, Search, Image, Video, Newspaper, TrendingUp } from "lucide-react";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";

interface APIKeys {
  googleApiKey: string;
  searchEngineId: string;
  newsApiKey: string;
  alphaVantageApiKey: string;
  youtubeApiKey: string;
}

const Settings = () => {
  const navigate = useNavigate();
  const [useMockData, setUseMockData] = useState(true);
  const [apiKeys, setApiKeys] = useState<APIKeys>({
    googleApiKey: "",
    searchEngineId: "",
    newsApiKey: "",
    alphaVantageApiKey: "",
    youtubeApiKey: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const storedKeys = localStorage.getItem("searchApiKeys");
    const storedUseMock = localStorage.getItem("useMockData");
    
    if (storedKeys) {
      try {
        setApiKeys(JSON.parse(storedKeys));
      } catch (e) {
        console.error("Error parsing stored API keys:", e);
      }
    }
    
    if (storedUseMock !== null) {
      setUseMockData(storedUseMock === "true");
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApiKeys(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleChange = (checked: boolean) => {
    setUseMockData(checked);
  };

  const saveSettings = () => {
    setIsSaving(true);
    
    try {
      localStorage.setItem("searchApiKeys", JSON.stringify(apiKeys));
      localStorage.setItem("useMockData", String(useMockData));
      
      toast({
        title: "Settings saved",
        description: "Your API keys have been saved successfully.",
      });
      
      setTimeout(() => {
        setIsSaving(false);
      }, 500);
    } catch (e) {
      console.error("Error saving settings:", e);
      toast({
        title: "Error saving settings",
        description: "There was an error saving your settings.",
        variant: "destructive",
      });
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col py-4 px-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Logo size="sm" />
          <h1 className="text-2xl font-semibold">Settings</h1>
        </div>
        
        <div>
          <Button variant="outline" onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
      
      <div className="flex-1">
        <Tabs defaultValue="apikeys" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="apikeys"><Key className="mr-2 h-4 w-4" /> API Keys</TabsTrigger>
            <TabsTrigger value="search"><Search className="mr-2 h-4 w-4" /> Search Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="apikeys">
            <Card>
              <CardHeader>
                <CardTitle>API Keys Configuration</CardTitle>
                <CardDescription>
                  Enter your API keys to enable real data search functionality.
                  Your keys are stored locally and never sent to our servers.
                </CardDescription>
                
                <div className="flex items-center space-x-2 mt-2">
                  <Switch
                    id="mock-data-toggle"
                    checked={useMockData}
                    onCheckedChange={handleToggleChange}
                  />
                  <Label htmlFor="mock-data-toggle">Use Mock Data</Label>
                  <div className="text-gray-500 text-sm ml-2">
                    (Use this if you don't have API keys)
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="googleApiKey" className="flex items-center">
                    <Search className="h-4 w-4 mr-1" /> 
                    Google API Key <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="googleApiKey"
                    name="googleApiKey"
                    placeholder="Enter your Google API Key"
                    value={apiKeys.googleApiKey}
                    onChange={handleInputChange}
                    disabled={useMockData}
                  />
                  <p className="text-sm text-gray-500">Used for web and image search</p>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="searchEngineId" className="flex items-center">
                    <Image className="h-4 w-4 mr-1" /> 
                    Custom Search Engine ID <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="searchEngineId"
                    name="searchEngineId"
                    placeholder="Enter your Custom Search Engine ID"
                    value={apiKeys.searchEngineId}
                    onChange={handleInputChange}
                    disabled={useMockData}
                  />
                  <p className="text-sm text-gray-500">Required for Google Custom Search</p>
                </div>
                
                <Separator />
                
                <div className="space-y-1">
                  <Label htmlFor="alphaVantageApiKey" className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" /> 
                    Alpha Vantage API Key
                  </Label>
                  <Input
                    id="alphaVantageApiKey"
                    name="alphaVantageApiKey"
                    placeholder="Enter your Alpha Vantage API Key"
                    value={apiKeys.alphaVantageApiKey}
                    onChange={handleInputChange}
                    disabled={useMockData}
                  />
                  <p className="text-sm text-gray-500">For stock and financial data</p>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="newsApiKey" className="flex items-center">
                    <Newspaper className="h-4 w-4 mr-1" /> 
                    News API Key
                  </Label>
                  <Input
                    id="newsApiKey"
                    name="newsApiKey"
                    placeholder="Enter your News API Key"
                    value={apiKeys.newsApiKey}
                    onChange={handleInputChange}
                    disabled={useMockData}
                  />
                  <p className="text-sm text-gray-500">For news search functionality</p>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="youtubeApiKey" className="flex items-center">
                    <Video className="h-4 w-4 mr-1" /> 
                    YouTube API Key
                  </Label>
                  <Input
                    id="youtubeApiKey"
                    name="youtubeApiKey"
                    placeholder="Enter your YouTube API Key"
                    value={apiKeys.youtubeApiKey}
                    onChange={handleInputChange}
                    disabled={useMockData}
                  />
                  <p className="text-sm text-gray-500">For video search functionality</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500 flex items-center">
                  <Info className="h-4 w-4 mr-1" />
                  <span>Fields marked with <span className="text-red-500">*</span> are required for real search</span>
                </div>
                <Button onClick={saveSettings} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Settings"}
                  <Save className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="search">
            <Card>
              <CardHeader>
                <CardTitle>Search Settings</CardTitle>
                <CardDescription>
                  Configure how search results are displayed and what data sources are used.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="safe-search" defaultChecked />
                    <Label htmlFor="safe-search">Safe Search</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-suggest" defaultChecked />
                    <Label htmlFor="auto-suggest">Search Suggestions</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="trending" defaultChecked />
                    <Label htmlFor="trending">Show Trending Topics</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="save-history" defaultChecked />
                    <Label htmlFor="save-history">Save Search History</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveSettings} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Settings"}
                  <Save className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Settings;
