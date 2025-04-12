
import React, { useState } from 'react';
import { Task } from '@/models/project.model';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleCheckboxChange = (checked: boolean) => {
    onComplete(task.id, checked);
  };
  
  return (
    <div 
      className={`flex items-center justify-between py-2 ${task.completed ? 'opacity-60' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3">
        <Checkbox 
          id={`task-${task.id}`}
          checked={task.completed} 
          onCheckedChange={handleCheckboxChange} 
        />
        <label 
          htmlFor={`task-${task.id}`} 
          className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}
        >
          {task.title}
        </label>
      </div>
      
      <div className="flex items-center gap-2">
        {task.dueDate && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="mr-1 h-3 w-3" />
            {format(new Date(task.dueDate), 'MMM d')}
          </div>
        )}
        
        {isHovered && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="h-3 w-3 text-destructive" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
