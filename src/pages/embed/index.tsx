import { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CopyIcon, CheckIcon, RefreshCwIcon } from 'lucide-react';

export default function EmbedPage() {
  const [campaignId, setCampaignId] = useState('1');
  const [variant, setVariant] = useState('full');
  const [theme, setTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('#7c3aed');
  const [secondaryColor, setSecondaryColor] = useState('#e5e7eb');
  const [showBranding, setShowBranding] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timestamp, setTimestamp] = useState(Date.now());
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Generate embed code
  const generateEmbedCode = () => {
    return `<!-- BLKOUTNXT Campaign Widget -->
<div class="blkoutnxt-campaign-widget" 
     data-campaign-id="${campaignId}" 
     data-variant="${variant}" 
     data-theme="${theme}"
     data-primary-color="${primaryColor}"
     data-secondary-color="${secondaryColor}"
     data-show-branding="${showBranding}"></div>
<script src="https://blkoutnxt.org/embed/campaign-widget.js" async></script>`;
  };
  
  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateEmbedCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Preview URL with cache-busting timestamp
  const previewUrl = `/embed/campaign-widget.html?campaignId=${campaignId}&variant=${variant}&theme=${theme}&primaryColor=${encodeURIComponent(primaryColor)}&secondaryColor=${encodeURIComponent(secondaryColor)}&showBranding=${showBranding}&t=${timestamp}`;
  
  // Force iframe refresh when configuration changes
  useEffect(() => {
    setIsLoading(true);
    setTimestamp(Date.now());
    
    // Force reload the iframe
    if (iframeRef.current) {
      iframeRef.current.src = previewUrl;
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [campaignId, variant, theme, primaryColor, secondaryColor, showBranding]);
  
  // Manual refresh button handler
  const handleRefresh = () => {
    setIsLoading(true);
    setTimestamp(Date.now());
    
    // Force reload the iframe
    if (iframeRef.current) {
      iframeRef.current.src = previewUrl;
    }
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Widget Embed</h1>
          <p className="text-muted-foreground">
            Embed BLKOUTNXT campaign widgets on your website to help spread awareness and support our initiatives.
          </p>
        </div>
        
        <Tabs defaultValue="generator" className="space-y-4">
          <TabsList>
            <TabsTrigger value="generator">Widget Generator</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generator" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configure Your Widget</CardTitle>
                  <CardDescription>
                    Customize how the campaign widget will appear on your website.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="campaign">Campaign</Label>
                    <Select value={campaignId} onValueChange={setCampaignId}>
                      <SelectTrigger id="campaign">
                        <SelectValue placeholder="Select a campaign" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Mental Health Support Fund</SelectItem>
                        <SelectItem value="2">Professional Development Scholarships</SelectItem>
                        <SelectItem value="3">Community Center Renovation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="variant">Widget Style</Label>
                    <Select value={variant} onValueChange={setVariant}>
                      <SelectTrigger id="variant">
                        <SelectValue placeholder="Select a style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full (Detailed view)</SelectItem>
                        <SelectItem value="compact">Compact (Minimal view)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="primary-color" 
                        type="color" 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)} 
                        className="w-12 p-1 h-10"
                      />
                      <Input 
                        type="text" 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)} 
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="secondary-color" 
                        type="color" 
                        value={secondaryColor} 
                        onChange={(e) => setSecondaryColor(e.target.value)} 
                        className="w-12 p-1 h-10"
                      />
                      <Input 
                        type="text" 
                        value={secondaryColor} 
                        onChange={(e) => setSecondaryColor(e.target.value)} 
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="show-branding" 
                      checked={showBranding} 
                      onCheckedChange={(checked) => setShowBranding(checked as boolean)} 
                    />
                    <Label htmlFor="show-branding">Show "Powered by BLKOUTNXT" branding</Label>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>
                      This is how your widget will appear on your website.
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleRefresh}
                    disabled={isLoading}
                  >
                    <RefreshCwIcon className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    <span className="sr-only">Refresh preview</span>
                  </Button>
                </CardHeader>
                <CardContent className="flex justify-center p-6 relative min-h-[200px]">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                      <div className="flex flex-col items-center gap-2">
                        <RefreshCwIcon className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">Loading preview...</p>
                      </div>
                    </div>
                  )}
                  <iframe 
                    ref={iframeRef}
                    src={previewUrl}
                    className="border rounded-lg shadow-sm w-full max-w-sm"
                    style={{ 
                      height: variant === 'compact' ? '180px' : '450px',
                      opacity: isLoading ? 0.5 : 1,
                      transition: 'opacity 0.2s'
                    }}
                    frameBorder="0"
                  />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Embed Code</CardTitle>
                <CardDescription>
                  Copy and paste this code into your website where you want the widget to appear.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    {generateEmbedCode()}
                  </pre>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="absolute top-2 right-2"
                    onClick={copyToClipboard}
                  >
                    {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documentation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  Learn how to embed BLKOUTNXT campaign widgets on your website.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Basic Implementation</h3>
                  <p className="text-sm text-muted-foreground">
                    To embed a campaign widget on your website, add the following code to your HTML:
                  </p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`<!-- BLKOUTNXT Campaign Widget -->
<div class="blkoutnxt-campaign-widget"></div>
<script src="https://blkoutnxt.org/embed/campaign-widget.js" async></script>`}
                  </pre>
                  <p className="text-sm text-muted-foreground">
                    This will display the default campaign widget. You can customize it using data attributes.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Customization Options</h3>
                  <p className="text-sm text-muted-foreground">
                    You can customize the widget by adding data attributes to the container element:
                  </p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`<div class="blkoutnxt-campaign-widget" 
     data-campaign-id="1" 
     data-variant="full" 
     data-theme="light"
     data-primary-color="#7c3aed"
     data-secondary-color="#e5e7eb"
     data-show-branding="true"></div>`}
                  </pre>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Available options:</p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li><strong>data-campaign-id</strong>: The ID of the campaign to display (default: "1")</li>
                      <li><strong>data-variant</strong>: The widget style - "full" or "compact" (default: "full")</li>
                      <li><strong>data-theme</strong>: The color theme - "light" or "dark" (default: "light")</li>
                      <li><strong>data-primary-color</strong>: The primary color in hex format (default: "#7c3aed")</li>
                      <li><strong>data-secondary-color</strong>: The secondary color in hex format (default: "#e5e7eb")</li>
                      <li><strong>data-show-branding</strong>: Whether to show BLKOUTNXT branding - "true" or "false" (default: "true")</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Multiple Widgets</h3>
                  <p className="text-sm text-muted-foreground">
                    You can add multiple widgets to a single page by creating multiple container elements:
                  </p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`<!-- First widget -->
<div class="blkoutnxt-campaign-widget" data-campaign-id="1"></div>

<!-- Second widget -->
<div class="blkoutnxt-campaign-widget" data-campaign-id="2" data-variant="compact"></div>

<!-- Include the script only once -->
<script src="https://blkoutnxt.org/embed/campaign-widget.js" async></script>`}
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Responsive Behavior</h3>
                  <p className="text-sm text-muted-foreground">
                    The widgets are responsive and will adapt to the width of their container. You can control the width by placing the widget in a container with a specific width:
                  </p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`<div style="max-width: 400px; margin: 0 auto;">
  <div class="blkoutnxt-campaign-widget"></div>
</div>`}
                  </pre>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Advanced Usage</CardTitle>
                <CardDescription>
                  Additional options for developers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Dynamic Insertion</h3>
                  <p className="text-sm text-muted-foreground">
                    If you're dynamically adding widgets to the page after it has loaded, the script will automatically detect and initialize them.
                  </p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`// Example with JavaScript
const container = document.createElement('div');
container.className = 'blkoutnxt-campaign-widget';
container.dataset.campaignId = '2';
container.dataset.variant = 'compact';
document.getElementById('widget-container').appendChild(container);`}
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Troubleshooting</h3>
                  <p className="text-sm text-muted-foreground">
                    If you encounter issues with the widget, check the following:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Ensure the script is loaded correctly</li>
                    <li>Check that the container element has the correct class name</li>
                    <li>Verify that all data attributes have valid values</li>
                    <li>Make sure your website allows iframes from blkoutnxt.org</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Support</h3>
                  <p className="text-sm text-muted-foreground">
                    If you need help implementing the widget or have any questions, please contact our support team at <a href="mailto:support@blkoutnxt.org" className="text-primary hover:underline">support@blkoutnxt.org</a>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}