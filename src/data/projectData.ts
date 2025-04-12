
import { Project, ProjectStatus } from "@/models/project.model";
import { v4 as uuidv4 } from "uuid";

export const generateMockProjects = (): Project[] => {
  const statuses: ProjectStatus[] = ['planning', 'in-progress', 'completed', 'on-hold', 'archived'];
  const tags = ['React', 'TypeScript', 'JavaScript', 'Next.js', 'Node.js', 'Tailwind', 'Express', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Redux', 'Firebase'];

  return Array.from({ length: 8 }).map((_, i) => {
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30));
    
    const updatedAt = new Date(createdAt);
    updatedAt.setDate(updatedAt.getDate() + Math.floor(Math.random() * 10));
    
    const projectTags = Array.from(
      { length: Math.floor(Math.random() * 4) + 1 },
      () => tags[Math.floor(Math.random() * tags.length)]
    );
    
    // Ensure unique tags
    const uniqueTags = [...new Set(projectTags)];
    
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      id: uuidv4(),
      title: `Project ${i + 1}`,
      description: `This is a description for Project ${i + 1}. This is a mock project for demonstration purposes.`,
      status,
      githubUrl: Math.random() > 0.3 ? `https://github.com/user/project-${i + 1}` : undefined,
      deploymentUrl: Math.random() > 0.5 ? `https://project-${i + 1}.vercel.app` : undefined,
      tags: uniqueTags,
      tasks: Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map((_, j) => {
        const taskCreatedAt = new Date(createdAt);
        taskCreatedAt.setDate(taskCreatedAt.getDate() + j);
        
        const dueDate = new Date(taskCreatedAt);
        dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 14) + 1);
        
        return {
          id: uuidv4(),
          title: `Task ${j + 1} for Project ${i + 1}`,
          completed: Math.random() > 0.5,
          createdAt: taskCreatedAt.toISOString(),
          dueDate: Math.random() > 0.3 ? dueDate.toISOString() : undefined
        };
      }),
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString()
    };
  });
};

export const mockProjects = generateMockProjects();
