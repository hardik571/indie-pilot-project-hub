
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { mockProjects } from '@/data/projectData';
import { Project, ProjectStatus, Task } from '@/models/project.model';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Github, ExternalLink, Plus, X } from 'lucide-react';
import TaskList from '@/components/projects/TaskList';
import { format } from 'date-fns';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [newTag, setNewTag] = useState('');
  
  useEffect(() => {
    const foundProject = mockProjects.find(p => p.id === id);
    if (foundProject) {
      setProject(foundProject);
    }
  }, [id]);
  
  if (!project) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <p className="text-muted-foreground">Project not found</p>
          <Link to="/dashboard">
            <Button variant="link" className="mt-4">
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject({ ...project, title: e.target.value });
  };
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProject({ ...project, description: e.target.value });
  };
  
  const handleStatusChange = (value: string) => {
    setProject({ ...project, status: value as ProjectStatus });
  };
  
  const handleGithubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject({ ...project, githubUrl: e.target.value });
  };
  
  const handleDeploymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject({ ...project, deploymentUrl: e.target.value });
  };
  
  const handleTasksChange = (newTasks: Task[]) => {
    setProject({ ...project, tasks: newTasks });
  };
  
  const handleAddTag = () => {
    if (!newTag.trim() || project.tags.includes(newTag.trim())) return;
    setProject({ ...project, tags: [...project.tags, newTag.trim()] });
    setNewTag('');
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setProject({
      ...project,
      tags: project.tags.filter(tag => tag !== tagToRemove)
    });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTag();
    }
  };
  
  // Auto save would be implemented here in a real app, 
  // simulating that behavior for now
  useEffect(() => {
    if (!project) return;
    
    const timeoutId = setTimeout(() => {
      // Would normally save to a backend here
      console.log('Auto-saving...', project);
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [project]);
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-6">
          <Link to="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Dashboard
          </Link>
          
          <div className="space-y-4">
            <Input 
              value={project.title}
              onChange={handleTitleChange}
              className="text-2xl font-bold bg-transparent border-none h-auto px-0 text-foreground focus-visible:ring-0"
              onBlur={() => console.log('Saved title')}
            />
            
            <div className="flex flex-wrap gap-2 items-center">
              <Select 
                value={project.status} 
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              
              <span className="text-sm text-muted-foreground">
                Created {format(new Date(project.createdAt), 'MMM d, yyyy')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6 mt-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Description</h3>
                  <Textarea 
                    value={project.description}
                    onChange={handleDescriptionChange}
                    className="min-h-[150px] resize-none"
                    placeholder="Project description..."
                    onBlur={() => console.log('Saved description')}
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Links</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Github className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        value={project.githubUrl || ''}
                        onChange={handleGithubChange}
                        placeholder="GitHub repository URL"
                        onBlur={() => console.log('Saved GitHub URL')}
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <ExternalLink className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        value={project.deploymentUrl || ''}
                        onChange={handleDeploymentChange}
                        placeholder="Deployment URL"
                        onBlur={() => console.log('Saved deployment URL')}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Technologies</h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} className="pl-2 pr-1 py-1 bg-secondary flex items-center gap-1">
                        {tag}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveTag(tag)}
                          className="h-4 w-4 rounded-full hover:bg-destructive/20"
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </Badge>
                    ))}
                    
                    <div className="flex items-center">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add tech..."
                        className="w-32 h-8"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={handleAddTag}
                        disabled={!newTag.trim() || project.tags.includes(newTag.trim())}
                        className="ml-1"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tasks" className="mt-6">
                <TaskList 
                  tasks={project.tasks} 
                  onTasksChange={handleTasksChange} 
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-medium mb-3">Project Stats</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span>{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tasks</span>
                  <span>
                    {project.tasks.filter(t => t.completed).length}/{project.tasks.length} completed
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>{format(new Date(project.createdAt), 'MMM d, yyyy')}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last updated</span>
                  <span>{format(new Date(project.updatedAt), 'MMM d, yyyy')}</span>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-medium mb-3">Actions</h3>
              
              <div className="space-y-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center text-sm text-foreground hover:text-primary"
                  >
                    <Github className="mr-2 h-4 w-4" /> View on GitHub
                  </a>
                )}
                
                {project.deploymentUrl && (
                  <a
                    href={project.deploymentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center text-sm text-foreground hover:text-primary"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> View deployment
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetails;
