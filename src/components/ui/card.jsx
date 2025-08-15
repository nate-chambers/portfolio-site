import React from 'react'

export function Card({ className = '', children }) {
  return <div className={`rounded-2xl border border-gray-200 bg-white dark:bg-neutral-900 dark:border-neutral-800 ${className}`}>{children}</div>
}
export function CardHeader({ className = '', children }) {
  return <div className={`p-4 ${className}`}>{children}</div>
}
export function CardTitle({ className = '', children }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
}
export function CardContent({ className = '', children }) {
  return <div className={`p-4 pt-0 ${className}`}>{children}</div>
}