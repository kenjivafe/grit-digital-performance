'use client'

import * as React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type OverviewPoint = {
  month: string
  registrations: number
  revenue: number
}

type DashboardOverviewChartProps = {
  data: OverviewPoint[]
}

export default function DashboardOverviewChart({
  data,
}: DashboardOverviewChartProps) {
  return (
    <div className="h-[200px] sm:h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="month" 
            tickLine={false} 
            axisLine={false} 
            fontSize={10}
            tick={{ fontSize: 10 }}
          />
          <YAxis 
            tickLine={false} 
            axisLine={false} 
            fontSize={10} 
            width={32}
            tick={{ fontSize: 10 }}
          />
          <Tooltip
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null
              return (
                <div className="rounded-lg border px-3 py-2 text-sm shadow-md bg-background border-border">
                  <p className="font-medium mb-1">
                    {label}
                  </p>
                  {payload.map((entry, index) => (
                    <div key={index} className="flex flex-col">
                      <span style={{ color: entry.color || entry.fill }}>
                        {entry.name || 'Registrations'}: {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              )
            }}
          />
          <Bar dataKey="registrations" fill="#e8192c" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}


