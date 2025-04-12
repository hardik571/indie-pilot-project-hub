
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="flex flex-col items-center text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Track Your <span className="text-primary">Projects</span> With Ease
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
            The minimal project management tool designed for solo developers and indie hackers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="rounded-full px-8">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20 border-t border-border">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Track Projects",
              description: "Manage all your projects in one place with easy status updates and progress tracking."
            },
            {
              title: "Task Management",
              description: "Create task checklists for each project and mark them as you complete them."
            },
            {
              title: "Calendar View",
              description: "Plan your work with a monthly calendar view to manage deadlines effectively."
            }
          ].map((feature, index) => (
            <div key={index} className="p-6 rounded-lg border border-border bg-card">
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 my-16 rounded-xl glassmorphism">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Organized?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            Start tracking your projects now and boost your productivity.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="rounded-full px-8">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
