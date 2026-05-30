import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

const facehuggerLogoSrc = '/facehugger.jpg'

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Facehugger logo"
      width={500}
      height={500}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('size-12 rounded-md object-cover', className)}
      src={facehuggerLogoSrc}
    />
  )
}

export const AdminLogo = () => {
  return <Logo className="size-24 rounded-xl" loading="eager" priority="high" />
}

export const AdminIcon = () => {
  return <Logo className="size-8 rounded-md" loading="eager" priority="high" />
}
