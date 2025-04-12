
export type ProjectStatus = 'planning' | 'in-progress' | 'completed' | 'on-hold' | 'archived';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  githubUrl?: string;
  deploymentUrl?: string;
  tags: string[];
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}
