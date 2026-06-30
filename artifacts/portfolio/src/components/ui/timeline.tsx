import { cva } from 'class-variance-authority'
import { Check, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TimelineItemData {
  id: string
  title: string
  description?: string
  timestamp?: string
  status?: 'default' | 'completed' | 'active' | 'pending' | 'error'
  icon?: React.ReactNode
}

const timelineItemVariants = cva('relative flex gap-3 pb-2', {
  variants: {
    orientation: {
      vertical: 'flex-row items-start',
      horizontal: 'flex-col min-w-64 shrink-0',
    },
  },
  defaultVariants: { orientation: 'vertical' },
})

const timelineConnectorVariants = cva('bg-border', {
  variants: {
    orientation: {
      vertical: 'absolute left-3 top-9 h-full w-px',
      horizontal: 'absolute top-3 left-8 w-full h-px',
    },
    status: {
      default: 'bg-border',
      completed: 'bg-primary',
      active: 'bg-primary',
      pending: 'bg-muted-foreground/30',
      error: 'bg-destructive',
    },
  },
  defaultVariants: { orientation: 'vertical', status: 'default' },
})

const timelineIconVariants = cva(
  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 bg-background text-xs font-medium',
  {
    variants: {
      status: {
        default: 'border-border text-muted-foreground',
        completed: 'border-primary bg-primary text-primary-foreground',
        active: 'border-primary bg-primary text-primary-foreground',
        pending: 'border-muted-foreground/30 text-muted-foreground',
        error: 'border-destructive bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: { status: 'default' },
  },
)

function getStatusIcon(status?: TimelineItemData['status']) {
  if (status === 'completed') return <Check className="h-3 w-3" />
  return <Circle className="h-2 w-2 fill-current" />
}

interface TimelineProps {
  items: TimelineItemData[]
  className?: string
  timestampPosition?: 'top' | 'bottom' | 'inline'
  showConnectors?: boolean
  showTimestamps?: boolean
}

export function Timeline({
  items,
  className,
  timestampPosition = 'bottom',
  showConnectors = true,
  showTimestamps = true,
}: TimelineProps) {
  return (
    <div className={cn(className)}>
      {items.map((item, index) => (
        <div key={item.id} className={cn(timelineItemVariants({ orientation: 'vertical' }))}>
          {showConnectors && index < items.length - 1 && (
            <div
              className={cn(
                timelineConnectorVariants({
                  orientation: 'vertical',
                  status: item.status ?? 'completed',
                }),
              )}
            />
          )}

          <div className="relative z-10 mt-1 flex shrink-0">
            <div className={cn(timelineIconVariants({ status: item.status ?? 'completed' }))}>
              {item.icon ?? getStatusIcon(item.status ?? 'completed')}
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            {showTimestamps && timestampPosition === 'top' && item.timestamp && (
              <time className="text-xs text-muted-foreground">{item.timestamp}</time>
            )}

            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium leading-tight">{item.title}</h3>
              {showTimestamps && timestampPosition === 'inline' && item.timestamp && (
                <time className="shrink-0 text-xs text-muted-foreground">{item.timestamp}</time>
              )}
            </div>

            {item.description && (
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            )}

            {showTimestamps && timestampPosition === 'bottom' && item.timestamp && (
              <time className="text-xs text-muted-foreground">{item.timestamp}</time>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
