import { useEffect, useMemo, useState } from 'react'
import {
  Cloud,
  fetchSimpleIcons,
  renderSimpleIcon,
  type SimpleIcon,
} from 'react-icon-cloud'
import { useTheme } from '@/hooks/useTheme'

const cloudProps = {
  containerProps: {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: 'default',
    tooltip: 'native' as const,
    initial: [0.1, -0.1] as [number, number],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: '#0000',
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
}

function renderCustomIcon(icon: SimpleIcon, theme: 'light' | 'dark') {
  return renderSimpleIcon({
    icon,
    bgHex: theme === 'light' ? '#ffffff' : '#121212',
    fallbackHex: theme === 'light' ? '#242424' : '#ffffff',
    minContrastRatio: theme === 'dark' ? 2 : 1.2,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: React.MouseEvent) => e.preventDefault(),
    },
  })
}

interface IconCloudProps {
  iconSlugs: string[]
}

export function IconCloud({ iconSlugs }: IconCloudProps) {
  const { theme } = useTheme()
  const [data, setData] = useState<Awaited<ReturnType<typeof fetchSimpleIcons>> | null>(null)

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData).catch(console.error)
  }, [iconSlugs])

  const renderedIcons = useMemo(
    () =>
      data
        ? Object.values(data.simpleIcons).map((icon) => renderCustomIcon(icon, theme))
        : null,
    [data, theme],
  )

  if (!renderedIcons) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Loading icons...
      </div>
    )
  }

  return (
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  )
}

export type { SimpleIcon }
