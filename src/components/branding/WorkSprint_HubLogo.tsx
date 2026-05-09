import { cn } from '@/lib/utils';
import projectFlowLogoImage from '@/assets/projectflow-logo.jpeg';

type WorkSprint_HubLogoProps = {
  showWordmark?: boolean;
  variant?: 'trajectory' | 'facet' | 'grid';
  containerClassName?: string;
  iconWrapClassName?: string;
  iconClassName?: string;
  wordmarkClassName?: string;
};

export function WorkSprint_HubLogo({
  showWordmark = false,
  variant: _variant = 'trajectory',
  containerClassName,
  iconWrapClassName,
  iconClassName,
  wordmarkClassName,
}: WorkSprint_HubLogoProps) {
  return (
    <div className={cn('flex items-center gap-3', containerClassName)}>
      <div
        className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl',
          iconWrapClassName,
        )}
        aria-hidden="true"
      >
        <img
          src={projectFlowLogoImage}
          alt=""
          className={cn('h-full w-full object-contain', iconClassName)}
          loading="eager"
          decoding="async"
        />
      </div>

      {showWordmark && (
        <span className={cn('font-heading text-xl font-bold tracking-wide text-foreground', wordmarkClassName)}>
          Worksprint Hub
        </span>
      )}
    </div>
  );
}