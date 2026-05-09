import React, { useState, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { format, isSameDay, parseISO, subMonths, addMonths } from 'date-fns';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle, ChevronRight, ChevronLeft, Calendar as CalendarIcon, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Task, Project } from '@/types';
import { Button } from '@/components/ui/button';

interface TaskCalendarProps {
  tasks: Task[];
  projects: Project[];
  onTaskClick?: (task: Task) => void;
}

export function TaskCalendar({ tasks, projects, onTaskClick }: TaskCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const projectMap = useMemo(() => {
    return new Map(projects.map(p => [p.id, p.name]));
  }, [projects]);

  const tasksOnSelectedDate = useMemo(() => {
     return tasks.filter(task => 
      task.due_date && isSameDay(parseISO(task.due_date), selectedDate || new Date())
    );
  }, [tasks, selectedDate]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
      case 'urgent':
        return 'text-destructive shadow-destructive';
      case 'medium':
        return 'text-warning shadow-warning';
      case 'low':
        return 'text-success shadow-success';
      default:
        return 'text-primary shadow-primary';
    }
  };

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
      {/* Main Calendar View */}
      <div className="xl:col-span-3 space-y-6">
        <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-luxe overflow-hidden">
          {/* Custom Header - Removed the duplicate title by making this the ONLY header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                   <CalendarIcon size={24} />
                </div>
                <div>
                   <h3 className="font-heading font-bold text-2xl text-foreground tracking-tight">
                     {format(currentMonth, 'MMMM yyyy')}
                   </h3>
                   <div className="flex items-center gap-2 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Workspace View</p>
                   </div>
                </div>
             </div>
             
             <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-xl border border-white/5">
                <div className="flex items-center bg-black/20 rounded-lg p-0.5 border border-white/5">
                  <Button variant="ghost" size="icon" onClick={handlePrevMonth} className="h-8 w-8 hover:bg-white/5">
                     <ChevronLeft size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => { setCurrentMonth(new Date()); setSelectedDate(new Date()); }} className="h-8 px-3 text-[11px] font-bold uppercase tracking-wider hover:bg-white/10 transition-all">
                     Today
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleNextMonth} className="h-8 w-8 hover:bg-white/5">
                     <ChevronRight size={16} />
                  </Button>
                </div>
                <div className="w-px h-6 bg-white/10 mx-1" />
                <Button variant="ghost" size="icon" className="h-9 w-9 opacity-50 hover:opacity-100 transition-opacity">
                   <Filter size={16} />
                </Button>
             </div>
          </div>

          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            className="w-full p-0"
            classNames={{
              months: "w-full",
              month: "w-full",
              caption: "hidden", // HIDE the duplicate shadcn header
              table: "w-full h-full border-collapse",
              head_row: "grid grid-cols-7 w-full mb-6",
              head_cell: "text-muted-foreground/60 rounded-md w-full font-bold text-[10px] text-center uppercase tracking-[0.2em]",
              row: "grid grid-cols-7 w-full border-t border-white/[0.03]",
              cell: "min-h-[120px] w-full text-center text-sm p-0 relative border-r border-b border-white/[0.03] last:border-r-0",
              day: "h-full w-full p-0 font-normal aria-selected:opacity-100",
            }}
            components={{
              Day: ({ date, displayMonth }: { date: Date; displayMonth: Date }) => {
                const isToday = isSameDay(date, new Date());
                const isSelected = isSameDay(date, selectedDate || new Date());
                const dayTasks = tasks.filter(t => t.due_date && isSameDay(parseISO(t.due_date), date));
                const isOutside = date.getMonth() !== displayMonth.getMonth();

                return (
                  <button
                    onClick={() => setSelectedDate(date)}
                    className={cn(
                      "h-full w-full p-3 font-normal transition-all duration-300 flex flex-col items-start justify-start gap-1 group relative overflow-hidden",
                      isSelected ? "bg-primary/10 z-10" : "hover:bg-white/[0.02]",
                      isToday && !isSelected && "bg-primary/[0.03]",
                      isOutside && "opacity-20 pointer-events-none"
                    )}
                  >
                    {/* Visual markers for selected/today */}
                    {isSelected && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                    )}
                    
                    <span className={cn(
                      "text-xs font-bold w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-300 relative z-10",
                      isToday ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : 
                      isSelected ? "text-primary font-black" : "text-muted-foreground group-hover:text-foreground"
                    )}>
                      {format(date, 'd')}
                    </span>
                    
                    {/* Task Indicators - Refined to dots/subtle glow to prevent overcrowding */}
                    <div className="flex flex-wrap gap-1.5 mt-2 w-full relative z-10">
                      {dayTasks.map(task => (
                        <div 
                          key={task.id}
                          className={cn(
                            "w-2 h-2 rounded-full shadow-[0_0_8px] transition-all duration-300 group-hover:scale-125",
                            getPriorityColor(task.priority),
                            task.status === 'completed' && "opacity-30"
                          )}
                          title={`${task.title} (${task.priority})`}
                        />
                      ))}
                    </div>

                    {/* Subtle underline for dates with tasks */}
                    {dayTasks.length > 0 && (
                       <div className="mt-auto w-full pt-1">
                           <div className={cn(
                             "h-0.5 w-1/3 rounded-full transition-all duration-500",
                             isSelected ? "bg-primary w-full" : "bg-primary/20 group-hover:bg-primary/40 group-hover:w-1/2"
                           )} />
                       </div>
                    )}
                  </button>
                );
              }
            }}
          />
        </div>
      </div>

      {/* Selected Day Details Panel */}
      <div className="flex flex-col gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-luxe overflow-hidden flex flex-col h-full min-h-[500px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-heading font-bold text-xl text-foreground tracking-tight">
                {selectedDate ? format(selectedDate, 'MMMM d') : 'Schedule'}
              </h3>
              <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest mt-1 opacity-70">
                {tasksOnSelectedDate.length} {tasksOnSelectedDate.length === 1 ? 'Task' : 'Tasks'} Scheduled
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
               <Clock size={20} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
            <AnimatePresence mode="wait">
              {tasksOnSelectedDate.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/5">
                     <CheckCircle2 size={32} className="text-muted-foreground/40" />
                  </div>
                  <p className="text-sm font-bold text-foreground">Nothing Scheduled</p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-[150px]">Your agenda is completely clear for this date.</p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {tasksOnSelectedDate.map((task, idx) => (
                    <motion.div 
                      key={task.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05, type: 'spring', stiffness: 100 }}
                      className="group glass-panel p-4 rounded-xl border border-white/5 hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 cursor-pointer relative overflow-hidden"
                      onClick={() => onTaskClick?.(task)}
                    >
                      <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-500" />
                      
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h4 className="font-bold text-sm text-foreground leading-snug group-hover:text-primary transition-colors">
                          {task.title}
                        </h4>
                        <Badge variant="outline" className={cn(
                          "text-[9px] h-4 capitalize px-2 font-black tracking-tighter border-0 rounded-md",
                          task.priority === 'high' || task.priority === 'urgent' ? "text-destructive bg-destructive/10" :
                          task.priority === 'medium' ? "text-warning bg-warning/10" :
                          "text-success bg-success/10"
                        )}>
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-medium text-muted-foreground">
                         <div className="flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                            <div className={cn(
                              "w-1.5 h-1.5 rounded-full shadow-[0_0_4px_currentcolor]",
                              task.status === 'completed' ? "text-success bg-success" : "text-primary bg-primary"
                            )} />
                            <span className="capitalize">{task.status.replace('-', ' ')}</span>
                         </div>
                         <span>•</span>
                         <span className="truncate max-w-[100px] opacity-60 group-hover:opacity-100 transition-opacity">
                           {projectMap.get(task.project_id) || 'Loading...'}
                         </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Task Health Card */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 shadow-luxe flex items-center justify-between group cursor-pointer hover:border-primary/40 transition-all duration-500">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center text-success border border-success/20 shadow-inner group-hover:scale-110 transition-transform">
               <AlertCircle size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-foreground">Task Velocity</h4>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">Workflow Optimized</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/5 group-hover:bg-primary/10 group-hover:text-primary transition-all">
             <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
