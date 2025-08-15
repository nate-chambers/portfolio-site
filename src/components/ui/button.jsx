import React from 'react'

export function Button({ className = '', variant = 'default', size = 'md', asChild, children, ...props }) {
  const base = 'inline-flex items-center justify-center rounded-2xl font-medium transition-colors focus:outline-none focus:ring disabled:opacity-50 disabled:pointer-events-none shadow-sm'
  const variants = {
    default: 'bg-black text-white hover:opacity-90',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border border-gray-300 text-gray-900 hover:bg-gray-100 bg-transparent'
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-5 py-2.5',
    icon: 'p-2'
  }
  const cls = `${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { className: `${children.props.className || ''} ${cls}` })
  }
  return <button className={cls} {...props}>{children}</button>
}