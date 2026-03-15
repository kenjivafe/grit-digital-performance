"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CheckCircleIcon, InfoIcon, WarningIcon, XCircleIcon, SpinnerIcon } from "@phosphor-icons/react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CheckCircleIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <WarningIcon className="size-4" />
        ),
        error: (
          <XCircleIcon className="size-4" />
        ),
        loading: (
          <SpinnerIcon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
          title: "group-[.cn-toast]:!text-white group-[.cn-toast]:!font-semibold",
          description: "group-[.cn-toast]:!text-white/90 group-[.cn-toast]:!text-[0.8rem]",
          success: "group-[.toaster]:!bg-[oklch(25.8%_0.042_265.755)] group-[.toaster]:!text-white group-[.toaster]:!border-[oklch(25.8%_0.042_265.755)]",
          error: "group-[.toaster]:!bg-[oklch(0.6152_0.1657_26.98)] group-[.toaster]:!text-white group-[.toaster]:!border-[oklch(0.6152_0.1657_26.98)]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }


