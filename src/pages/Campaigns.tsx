import { Navbar } from '@/components/Navbar';
import { CampaignIntegration } from '@/components/CampaignIntegration';
import { CallToAction } from '@/components/CallToAction';
import { PersonalizedEntryPoints } from '@/components/PersonalizedEntryPoints';
import { Separator } from '@/components/ui/separator';

export default function Campaigns() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-12 md:py-16 overflow-hidden">
          <div className="absolute inset-0 bg-blkout-800 -z-10 wave-bg" />
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join Our Community Campaigns
              </h1>
              <p className="mt-2 text-orange-400 font-medium">
                Black Queer Realness - Unleashed
              </p>
              <p className="mt-4 text-xl text-white/80">
                Participate in initiatives designed to support, connect, and empower Black queer men through collective action.
              </p>
            </div>
          </div>
        </section>

        {/* Campaigns Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container px-4 md:px-6">
            <CampaignIntegration />
          </div>
        </section>

        {/* Personalized Entry Points */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                Explore More Ways to Engage
              </h2>
              <p className="text-muted-foreground">
                Discover personalized opportunities to connect with our community and resources.
              </p>
            </div>
            
            <PersonalizedEntryPoints />
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                Our Collective Impact
              </h2>
              <p className="text-muted-foreground">
                Together, we're making a difference in our community.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="text-center p-6 bg-muted/30 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1,200+</div>
                <div className="text-sm text-muted-foreground">Community Members</div>
              </div>
              <div className="text-center p-6 bg-muted/30 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24</div>
                <div className="text-sm text-muted-foreground">Active Campaigns</div>
              </div>
              <div className="text-center p-6 bg-muted/30 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">85%</div>
                <div className="text-sm text-muted-foreground">Resource Accessibility</div>
              </div>
              <div className="text-center p-6 bg-muted/30 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">48</div>
                <div className="text-sm text-muted-foreground">Community Events</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <CallToAction 
              title="Start Your Own Campaign"
              description="Have an idea for a community initiative? We provide the platform and support to help you bring it to life."
              buttonText="Propose a Campaign"
              buttonHref="/campaigns/propose"
              secondaryButtonText="Learn More"
              secondaryButtonHref="/campaigns/guidelines"
              variant="gradient"
              size="lg"
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
                <li><a href="/community" className="hover:text-white">Community Support</a></li>
                <li><a href="/projects" className="hover:text-white">Network Building</a></li>
                <li><a href="/resources" className="hover:text-white">Resource Hub</a></li>
                <li><a href="/events" className="hover:text-white">Events & Programs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
                <li><a href="/faq" className="hover:text-white">FAQ</a></li>
                <li><a href="/blog" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="/cookies" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-white/10" />
          <div className="text-center text-sm text-white/70">
            <p>© 2023 BLKOUTNXT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}