import * as React from "react"

export type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export type Toast = ToastProps & {
  id: string
}

export interface ToastContextType {
  toast: (props: ToastProps) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const toast = React.useCallback((props: ToastProps) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = { ...props, id }
    
    setToasts(prev => [...prev, newToast])
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }, [])

  return React.createElement(
    ToastContext.Provider,
    { value: { toast } },
    children,
    React.createElement(
      "div",
      {
        className: "fixed top-4 right-4 z-50 space-y-2",
      },
      ...toasts.map((toast) =>
        React.createElement(
          "div",
          {
            key: toast.id,
            className: `p-4 rounded-lg shadow-lg border max-w-sm ${
              toast.variant === "destructive"
                ? "bg-red-50 border-red-200 text-red-800"
                : "bg-blue-50 border-blue-200 text-blue-800"
            }`.replace(/bg-red-50/g, 'bg-destructive').replace(/border-red-200/g, 'border-destructive').replace(/text-red-800/g, 'text-destructive-foreground').replace(/bg-blue-50/g, 'bg-card').replace(/border-blue-200/g, 'border-card').replace(/text-blue-800/g, 'text-card-foreground'),
          },
          toast.title && React.createElement("div", { className: "font-semibold" }, toast.title),
          toast.description && React.createElement("div", { className: "text-sm mt-1" }, toast.description)
        )
      )
    )
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
