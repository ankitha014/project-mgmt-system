import { AppLayout } from '@/components/layout/AppLayout';
import { TaskCalendar } from '@/components/calendar/TaskCalendar';
import { TypingText } from '@/components/ui/typing-text';
import { useAllTasks } from '@/hooks/useTasks';
import { useProjects } from '@/hooks/useProjects';

export default function CalendarPage() {
  const { data: tasks = [], isLoading: tasksLoading } = useAllTasks();
  const { data: projects = [], isLoading: projectsLoading } = useProjects();

  const isLoading = tasksLoading || projectsLoading;

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">
            <TypingText text="Workspace Calendar" />
          </h1>
          <p className="text-muted-foreground mt-1">
            Visualise your task deadlines across this workspace
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="glass-panel p-12 rounded-2xl border border-white/10 flex items-center justify-center h-[600px]">
           <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      ) : (
        <TaskCalendar tasks={tasks} projects={projects} />
      )}
    </AppLayout>
  );
}
