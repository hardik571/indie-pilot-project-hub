
import React from 'react';
import ProjectCard from './ProjectCard';
import { Project, ProjectStatus } from '@/models/project.model';

interface ProjectGridProps {
  projects: Project[];
  filter?: ProjectStatus;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, filter }) => {
  const filteredProjects = filter 
    ? projects.filter(project => project.status === filter)
    : projects;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
      
      {filteredProjects.length === 0 && (
        <div className="col-span-full flex items-center justify-center p-8 border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground">No projects found</p>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;
