
import React, { useState } from 'react';
import { Employee } from '@/pages/Employees';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Calendar, AlertCircle, Save } from 'lucide-react';

interface EmployeeScheduleProps {
  employees: Employee[];
}

interface Shift {
  employeeId: string;
  day: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
}

export const EmployeeSchedule: React.FC<EmployeeScheduleProps> = ({ employees }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek;
    return new Date(today.setDate(diff));
  });
  
  // Sample shift data
  const [shifts, setShifts] = useState<Shift[]>([
    { employeeId: '1', day: 1, startTime: '08:00', endTime: '16:00' },
    { employeeId: '1', day: 2, startTime: '08:00', endTime: '16:00' },
    { employeeId: '1', day: 3, startTime: '08:00', endTime: '16:00' },
    { employeeId: '1', day: 4, startTime: '08:00', endTime: '16:00' },
    { employeeId: '1', day: 5, startTime: '08:00', endTime: '16:00' },
    
    { employeeId: '2', day: 1, startTime: '10:00', endTime: '18:00' },
    { employeeId: '2', day: 2, startTime: '10:00', endTime: '18:00' },
    { employeeId: '2', day: 3, startTime: '10:00', endTime: '18:00' },
    { employeeId: '2', day: 4, startTime: '10:00', endTime: '18:00' },
    { employeeId: '2', day: 5, startTime: '10:00', endTime: '18:00' },
    
    { employeeId: '3', day: 0, startTime: '12:00', endTime: '20:00' },
    { employeeId: '3', day: 1, startTime: '12:00', endTime: '20:00' },
    { employeeId: '3', day: 2, startTime: '12:00', endTime: '20:00' },
    { employeeId: '3', day: 5, startTime: '12:00', endTime: '20:00' },
    { employeeId: '3', day: 6, startTime: '12:00', endTime: '20:00' },
    
    { employeeId: '4', day: 0, startTime: '10:00', endTime: '18:00' },
    { employeeId: '4', day: 3, startTime: '10:00', endTime: '18:00' },
    { employeeId: '4', day: 4, startTime: '10:00', endTime: '18:00' },
    { employeeId: '4', day: 5, startTime: '10:00', endTime: '18:00' },
    { employeeId: '4', day: 6, startTime: '10:00', endTime: '18:00' },
  ]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const getDateForDay = (dayOffset: number) => {
    const date = new Date(currentWeekStart);
    date.setDate(date.getDate() + dayOffset);
    return date;
  };

  const formatDateHeader = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const previousWeek = () => {
    const newStartDate = new Date(currentWeekStart);
    newStartDate.setDate(newStartDate.getDate() - 7);
    setCurrentWeekStart(newStartDate);
  };

  const nextWeek = () => {
    const newStartDate = new Date(currentWeekStart);
    newStartDate.setDate(newStartDate.getDate() + 7);
    setCurrentWeekStart(newStartDate);
  };

  const getShiftForEmployeeDay = (employeeId: string, day: number) => {
    return shifts.find(shift => shift.employeeId === employeeId && shift.day === day);
  };

  const handleSaveSchedule = () => {
    toast.success('Schedule saved successfully!');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="outline" size="icon" onClick={previousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="mx-4 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {currentWeekStart.toLocaleDateString()} - {getDateForDay(6).toLocaleDateString()}
            </span>
          </div>
          <Button variant="outline" size="icon" onClick={nextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <Button onClick={handleSaveSchedule}>
          <Save className="h-4 w-4 mr-2" />
          Save Schedule
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-4 py-2 text-left font-medium text-muted-foreground w-40">Employee</th>
              {daysOfWeek.map((day, index) => (
                <th key={day} className="px-4 py-2 text-center font-medium text-muted-foreground">
                  <div>{day}</div>
                  <div className="text-xs">{formatDateHeader(getDateForDay(index))}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.filter(emp => emp.status !== 'Terminated').map((employee) => (
              <tr key={employee.id} className="border-t">
                <td className="px-4 py-2 font-medium">
                  {employee.firstName} {employee.lastName}
                  <div className="text-xs text-muted-foreground">{employee.role}</div>
                </td>
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const shift = getShiftForEmployeeDay(employee.id, dayIndex);
                  return (
                    <td key={dayIndex} className="px-4 py-2 text-center">
                      {shift ? (
                        <div className="bg-primary/10 text-primary rounded p-1 text-sm">
                          {shift.startTime} - {shift.endTime}
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">Off</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="bg-muted/30 p-3 rounded-lg flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium">Schedule Notes</p>
          <p>Click on any cell to add or edit a shift. Remember that employees shouldn't be scheduled for more than 40 hours per week. All employees must have at least one day off each week.</p>
        </div>
      </div>
    </div>
  );
};
