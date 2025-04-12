
import React, { useState, useEffect } from 'react';
import { format, addDays, startOfMonth, endOfMonth, isSameMonth, isToday, isSameDay, addMonths, subMonths } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { mockProjects } from '@/data/projectData';
import { Task } from '@/models/project.model';

type TaskWithProject = Task & {
  projectId: string;
  projectTitle: string;
  projectStatus: string;
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [allTasks, setAllTasks] = useState<TaskWithProject[]>([]);
  
  useEffect(() => {
    // Flatten all tasks from all projects
    const tasks: TaskWithProject[] = [];
    
    mockProjects.forEach(project => {
      project.tasks.forEach(task => {
        if (task.dueDate) {
          tasks.push({
            ...task,
            projectId: project.id,
            projectTitle: project.title,
            projectStatus: project.status
          });
        }
      });
    });
    
    setAllTasks(tasks);
  }, []);
  
  const getMonthDays = () => {
    const firstDay = startOfMonth(currentDate);
    const lastDay = endOfMonth(currentDate);
    const startDate = firstDay;
    
    // Get starting day of week (0 = Sunday)
    let startDayOfWeek = startDate.getDay();
    if (startDayOfWeek === 0) startDayOfWeek = 7; // Make Sunday the last day
    
    const totalDays = [];
    
    // Add days from previous month to start the calendar from Monday
    for (let i = 1; i < startDayOfWeek; i++) {
      totalDays.push({
        date: addDays(firstDay, -i),
        isCurrentMonth: false
      });
    }
    totalDays.reverse();
    
    // Add all days in current month
    let daysInMonth = lastDay.getDate();
    for (let i = 0; i < daysInMonth; i++) {
      totalDays.push({
        date: addDays(firstDay, i),
        isCurrentMonth: true
      });
    }
    
    // Add days from next month to complete the grid
    const remainingDays = 7 - (totalDays.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        totalDays.push({
          date: addDays(lastDay, i),
          isCurrentMonth: false
        });
      }
    }
    
    return totalDays;
  };
  
  const getDayTasks = (date: Date) => {
    return allTasks.filter(task => {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate);
      return isSameDay(date, dueDate);
    });
  };
  
  const days = getMonthDays();
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Calendar</h1>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-1 px-2">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span className="font-medium">
                {format(currentDate, 'MMMM yyyy')}
              </span>
            </div>
            
            <Button variant="outline" size="icon" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="grid grid-cols-7 bg-muted">
            {weekdays.map((day) => (
              <div key={day} className="p-3 text-center text-sm font-medium">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 divide-x divide-y divide-border">
            {days.map(({ date, isCurrentMonth }, index) => {
              const dayTasks = getDayTasks(date);
              const isTodays = isToday(date);
              
              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 ${isCurrentMonth ? '' : 'bg-muted/50'} ${
                    isTodays ? 'bg-accent/30' : ''
                  }`}
                >
                  <div className={`text-right text-sm mb-1 ${
                    isCurrentMonth 
                      ? isTodays 
                        ? 'font-bold text-primary' 
                        : '' 
                      : 'text-muted-foreground'
                  }`}>
                    {format(date, 'd')}
                  </div>
                  
                  <div className="space-y-1">
                    {dayTasks.slice(0, 3).map((task) => (
                      <div 
                        key={task.id} 
                        className={`text-xs p-1 rounded truncate ${
                          task.completed 
                            ? 'bg-green-500/20 line-through' 
                            : 'bg-accent'
                        }`}
                      >
                        {task.title}
                      </div>
                    ))}
                    
                    {dayTasks.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{dayTasks.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;
