
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ProjectGrid from '@/components/projects/ProjectGrid';
import { Button } from '@/components/ui/button';
import { mockProjects } from '@/data/projectData';
import { Input } from '@/components/ui/input';
import { ProjectStatus } from '@/models/project.model';
import { Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredProjects = mockProjects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const tabs: { value: ProjectStatus | 'all', label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'planning', label: 'Planning' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' },
    { value: 'archived', label: 'Archived' }
  ];

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Projects</h1>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-8">
            {tabs.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {tabs.map(tab => (
            <TabsContent key={tab.value} value={tab.value}>
              <ProjectGrid 
                projects={filteredProjects} 
                filter={tab.value === 'all' ? undefined : tab.value as ProjectStatus} 
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
