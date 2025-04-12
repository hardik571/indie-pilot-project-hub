
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Project } from '@/models/project.model';
import { CheckCircle2, AlertCircle, Clock, PauseCircle, Archive } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const statusIcons = {
  'planning': <Clock className="h-4 w-4" />,
  'in-progress': <AlertCircle className="h-4 w-4" />,
  'completed': <CheckCircle2 className="h-4 w-4" />,
  'on-hold': <PauseCircle className="h-4 w-4" />,
  'archived': <Archive className="h-4 w-4" />
};

const statusClasses = {
  'planning': 'bg-blue-500/20 text-blue-400',
  'in-progress': 'bg-amber-500/20 text-amber-400',
  'completed': 'bg-green-500/20 text-green-400',
  'on-hold': 'bg-purple-500/20 text-purple-400',
  'archived': 'bg-gray-500/20 text-gray-400'
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { id, title, description, status, tags, tasks } = project;
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const truncatedDescription = description.length > 100
    ? `${description.substring(0, 100)}...`
    : description;

  return (
    <Link to={`/project/${id}`}>
      <Card className="h-full project-card">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            <Badge variant="outline" className={statusClasses[status]}>
              <span className="flex items-center gap-1">
                {statusIcons[status]}
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">{truncatedDescription}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs bg-secondary">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="w-full bg-secondary rounded-full h-1.5 mt-4">
            <div
              className="bg-primary h-1.5 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            {completedTasks}/{totalTasks} tasks completed
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
