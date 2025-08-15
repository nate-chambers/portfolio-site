export function Badge({ children, variant='secondary' }){
  const cls = variant === 'secondary' 
    ? 'inline-flex items-center rounded-full bg-gray-200 px-2.5 py-1 text-xs font-medium text-gray-800'
    : 'inline-flex items-center rounded-full bg-black px-2.5 py-1 text-xs font-medium text-white'
  return <span className={cls}>{children}</span>
}