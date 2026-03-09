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
            cursor={{ fill: 'oklch(20.8% 0.042 265.755)' }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null
              return (
                <div
                  className="rounded-lg border px-3 py-2 text-sm shadow-md"
                  style={{
                    backgroundColor: 'oklch(21% 0.034 264.665)',
                    borderColor: 'oklch(37.2% 0.044 257.287)',
                  }}
                >
                  <p className="font-medium mb-1" style={{ color: 'white' }}>
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


