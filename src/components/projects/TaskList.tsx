
import React, { useState } from 'react';
import { Task } from '@/models/project.model';
import TaskItem from './TaskItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface TaskListProps {
  tasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTasksChange }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: uuidv4(),
      title: newTaskTitle.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    onTasksChange([...tasks, newTask]);
    setNewTaskTitle('');
  };
  
  const handleCompleteTask = (id: string, completed: boolean) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed } : task
    );
    onTasksChange(updatedTasks);
  };
  
  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    onTasksChange(updatedTasks);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input 
          placeholder="Add a new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow"
        />
        <Button size="icon" onClick={handleAddTask} disabled={!newTaskTitle.trim()}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="border rounded-md divide-y divide-border">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onComplete={handleCompleteTask} 
              onDelete={handleDeleteTask} 
            />
          ))
        ) : (
          <div className="py-4 text-center text-muted-foreground text-sm">
            No tasks yet. Add one above to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
