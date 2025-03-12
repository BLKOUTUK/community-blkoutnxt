
import { Navbar } from "@/components/Navbar";
import { Shield, Lock, FileText, Info } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-4xl mx-auto px-4 pt-24 pb-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-card rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Overview</h2>
            </div>
            <p className="text-card-foreground">
              BLKOUTNXT ("we", "us", or "our") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
              We will never sell your personal information to third parties.
            </p>
          </section>

          <section className="bg-card rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Information We Collect</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
                <p className="text-card-foreground">
                  We may collect personal information that you voluntarily provide to us when you register on our platform, 
                  including your name, email address, and any other information you choose to provide.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Usage Information</h3>
                <p className="text-card-foreground">
                  We may collect information about how you use our platform, including log data, device information, 
                  and analytics data to improve our services and user experience.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">How We Use Your Information</h2>
            </div>
            <div className="space-y-2">
              <p className="text-card-foreground">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 text-card-foreground">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and complete transactions</li>
                <li>Send you technical notices, updates, and administrative messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Understand how users interact with our platform</li>
                <li>Detect, prevent, and address technical issues</li>
              </ul>
            </div>
          </section>

          <section className="bg-card rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Info className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Your Rights</h2>
            </div>
            <p className="text-card-foreground mb-4">
              You have the right to access, correct, or delete your personal information. You can:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-card-foreground">
              <li>Access and update your account information at any time through your account settings</li>
              <li>Request a copy of the personal data we hold about you</li>
              <li>Ask us to delete your personal information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
            <p className="mt-4 text-card-foreground">
              To exercise these rights, please contact us at <span className="text-primary">privacy@blkoutnxt.com</span>
            </p>
          </section>

          <section className="bg-card rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Security</h2>
            </div>
            <p className="text-card-foreground">
              We implement appropriate technical and organizational measures to protect your personal information. 
              However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>
          </section>

          <section className="bg-card rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Contact Us</h2>
            </div>
            <p className="text-card-foreground">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2 text-primary">privacy@blkoutnxt.com</p>
          </section>
        </div>

        <div className="mt-10 text-center">
          <Link to="/" className="text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
