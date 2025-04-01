
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, CheckCircle, Clock, Calendar } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed';
  category: 'daily' | 'weekly' | 'monthly' | 'opening';
  assignedTo?: string;
  description?: string;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Clean gelato display case',
      dueDate: '2023-05-10',
      priority: 'high',
      status: 'pending',
      category: 'daily',
      assignedTo: 'All Staff',
      description: 'Thoroughly clean and sanitize the gelato display case at closing time.'
    },
    {
      id: '2',
      title: 'Inventory check - ingredients',
      dueDate: '2023-05-11',
      priority: 'medium',
      status: 'pending',
      category: 'weekly',
      assignedTo: 'Marco Rossi',
      description: 'Perform a complete inventory check of all ingredients and update the system.'
    },
    {
      id: '3',
      title: 'Prepare pistachio gelato batch',
      dueDate: '2023-05-10',
      priority: 'high',
      status: 'completed',
      category: 'daily',
      assignedTo: 'Sofia Bianchi',
      description: 'Make a fresh batch of pistachio gelato for tomorrow.'
    },
    {
      id: '4',
      title: 'Staff meeting - new flavors discussion',
      dueDate: '2023-05-15',
      priority: 'medium',
      status: 'pending',
      category: 'monthly',
      assignedTo: 'All Staff',
      description: 'Discuss potential new seasonal flavors to add to the menu.'
    },
    {
      id: '5',
      title: 'Deep clean kitchen',
      dueDate: '2023-05-14',
      priority: 'medium',
      status: 'pending',
      category: 'weekly',
      assignedTo: 'Cleaning Team',
      description: 'Perform a thorough deep clean of the kitchen area and equipment.'
    },
    {
      id: '6',
      title: 'Renew food handler certificates',
      dueDate: '2023-05-20',
      priority: 'high',
      status: 'pending',
      category: 'monthly',
      assignedTo: 'Marco Rossi',
      description: 'Ensure all staff have up-to-date food handler certifications.'
    },
    {
      id: '7',
      title: 'Source new organic fruit supplier',
      dueDate: '2023-05-30',
      priority: 'low',
      status: 'pending',
      category: 'opening',
      assignedTo: 'Marco Rossi',
      description: 'Research and contact potential new organic fruit suppliers for better quality ingredients.'
    },
    {
      id: '8',
      title: 'Finalize store layout design',
      dueDate: '2023-05-25',
      priority: 'high',
      status: 'pending',
      category: 'opening',
      assignedTo: 'Management Team',
      description: 'Complete the interior design and layout plans for the new store location.'
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'daily' | 'weekly' | 'monthly' | 'opening'>('all');

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } 
        : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = selectedFilter === 'all' || task.status === selectedFilter;
    const categoryMatch = selectedCategory === 'all' || task.category === selectedCategory;
    return statusMatch && categoryMatch;
  });

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive/10 text-destructive hover:bg-destructive/20';
      case 'medium':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'low':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gelato-chocolate">Task Management</h1>
          <p className="text-muted-foreground">Organize and track store operations and expansion tasks</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Task
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <Tabs defaultValue="all" value={selectedFilter} onValueChange={(value) => setSelectedFilter(value as any)} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Pending
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Completed
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <Input placeholder="Search tasks..." className="w-full" />
          </div>

          <select 
            className="border rounded px-3 py-2 bg-background"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
          >
            <option value="all">All Categories</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="opening">Store Opening</option>
          </select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task List</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No tasks found. Add some tasks to get started.
            </div>
          ) : (
            <ul className="space-y-3">
              {filteredTasks.map((task) => (
                <li key={task.id} className={`border rounded-lg p-4 ${task.status === 'completed' ? 'bg-muted/30' : ''}`}>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={task.status === 'completed'}
                      onCheckedChange={() => toggleTaskStatus(task.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className={getPriorityColor(task.priority)}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                          </Badge>
                          <Badge variant="outline" className="bg-secondary/10 text-secondary">
                            {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                          </Badge>
                          <Badge variant="outline" className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(task.dueDate).toLocaleDateString()}
                          </Badge>
                        </div>
                      </div>
                      {task.description && (
                        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                      )}
                      {task.assignedTo && (
                        <p className="text-sm mt-2">
                          <span className="text-muted-foreground">Assigned to:</span> {task.assignedTo}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Tasks;
