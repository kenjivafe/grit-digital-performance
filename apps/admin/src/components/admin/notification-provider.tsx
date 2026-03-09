'use client'

import React, { createContext, useContext, useCallback } from 'react'
import { useNotifications as useAppNotifications } from './notifications'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface NotificationOptions {
  title?: string
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

type NotificationContextType = {
  notify: (type: NotificationType, options: NotificationOptions) => void
  success: (options: NotificationOptions) => void
  error: (options: NotificationOptions) => void
  warning: (options: NotificationOptions) => void
  info: (options: NotificationOptions) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider')
  return ctx
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { addNotification } = useAppNotifications()

  const notify = useCallback((type: NotificationType, options: NotificationOptions) => {
    const { title, description, duration, action } = options
    
    addNotification({
      type,
      title: title || 'Notification',
      message: description,
      duration: duration || 5000,
      action,
      dismissible: true
    })
  }, [addNotification])

  const success = useCallback((options: NotificationOptions) => notify('success', options), [notify])
  const error = useCallback((options: NotificationOptions) => notify('error', options), [notify])
  const warning = useCallback((options: NotificationOptions) => notify('warning', options), [notify])
  const info = useCallback((options: NotificationOptions) => notify('info', options), [notify])

  return (
    <NotificationContext.Provider value={{ notify, success, error, warning, info }}>
      {children}
    </NotificationContext.Provider>
  )
}


