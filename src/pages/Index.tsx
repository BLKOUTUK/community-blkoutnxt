
import { Link } from 'react-router-dom';
import { ArrowRightIcon, HeartIcon, Users2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { CallToAction } from '@/components/CallToAction';
import { SignupForm } from '@/components/SignupForm';

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-blkout-800 -z-10 wave-bg" />
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                    Supporting Black Queer Men Through Community
                  </h1>
                  <p className="max-w-[600px] text-white/80 md:text-xl">
                    Join our community-focused initiative designed to empower, connect, and support Black queer men through multiple interconnected projects.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="gap-1">
                    <Link to="/auth/signup">
                      Join the Community
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-white border-white/20 bg-white/10 hover:bg-white/20">
                    <Link to="/about">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full aspect-square max-w-md overflow-hidden rounded-xl">
                  <img 
                    src="/lovable-uploads/cfbe1b06-27fa-4552-8bf6-59e5c580f8b6.png" 
                    alt="BLKOUTNXT Community" 
                    className="object-cover w-full h-full animate-flow" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Signup Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-purple-900 to-blkout-900">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                REGISTER NOW
              </h2>
              <p className="text-orange-400 text-xl md:text-2xl font-bold">
                GET BLKOUTNXT IN YOUR INBOX
              </p>
            </div>
            
            <div className="flex justify-center">
              <iframe 
                src="/embed/signup-form.html" 
                width="100%" 
                height="1200" 
                frameBorder="0"
                className="max-w-[1200px] mx-auto"
                title="BLKOUTNXT Signup Form"
              />
            </div>
          </div>
        </section>

        {/* Principles Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Our Guiding Principles</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Our work is guided by these core principles that drive all of our initiatives.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="flow-card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10">
                <CardHeader>
                  <CardTitle>Change is constant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">We embrace transformation and evolve with the needs of our community.</p>
                </CardContent>
              </Card>
              <Card className="flow-card bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10">
                <CardHeader>
                  <CardTitle>Small is good, small is all</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">We value the impact of small, meaningful actions and connections.</p>
                </CardContent>
              </Card>
              <Card className="flow-card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10">
                <CardHeader>
                  <CardTitle>Trust the people</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">We believe in the wisdom and capabilities of our community members.</p>
                </CardContent>
              </Card>
              <Card className="flow-card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10">
                <CardHeader>
                  <CardTitle>Move at the speed of trust</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">We build relationships and progress at a pace that honors authentic connection.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Project Areas Section */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Our Project Areas</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Explore the different initiatives that make up the BLKOUTNXT ecosystem.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="flow-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-2">
                    <HeartIcon className="h-6 w-6 text-purple-500" />
                  </div>
                  <CardTitle>Community Support</CardTitle>
                  <CardDescription>Resources and programs for Black queer men</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Access mentorship, mental health resources, and community gatherings designed to support your wellbeing.</p>
                </CardContent>
                <CardFooter>
                  <Link to="/projects/community-support" className="text-sm text-primary flex items-center gap-1 hover:underline">
                    Learn more
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="flow-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-2">
                    <Users2Icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <CardTitle>Network Building</CardTitle>
                  <CardDescription>Connecting individuals and organizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Join our network of professionals, creatives, and change-makers to expand your connections and opportunities.</p>
                </CardContent>
                <CardFooter>
                  <Link to="/projects/network-building" className="text-sm text-primary flex items-center gap-1 hover:underline">
                    Learn more
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="flow-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-500">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                      <path d="M5 3v4"/>
                      <path d="M19 17v4"/>
                      <path d="M3 5h4"/>
                      <path d="M17 19h4"/>
                    </svg>
                  </div>
                  <CardTitle>Resource Hub</CardTitle>
                  <CardDescription>Knowledge sharing and educational content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Discover curated resources, articles, and learning opportunities focused on Black queer experiences and growth.</p>
                </CardContent>
                <CardFooter>
                  <Link to="/projects/resource-hub" className="text-sm text-primary flex items-center gap-1 hover:underline">
                    Learn more
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <CallToAction 
              title="Join Our Community Today"
              description="Be part of a movement that celebrates, supports, and amplifies Black queer voices. Your journey with us starts here."
              buttonText="Sign Up Now"
              buttonHref="/auth/signup"
            />
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-blkout-900 text-white py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-bold">BLKOUTNXT</h3>
              <p className="text-sm text-white/70">Supporting Black queer men through community-focused initiatives and interconnected projects.</p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-3">Projects</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link to="/community" className="hover:text-white">Community Support</Link></li>
                <li><Link to="/projects" className="hover:text-white">Network Building</Link></li>
                <li><Link to="/resources" className="hover:text-white">Resource Hub</Link></li>
                <li><Link to="/events" className="hover:text-white">Events & Programs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/70">
            <p>© 2023 BLKOUTNXT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
