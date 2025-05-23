import React from 'react'

export default function SkeletonItem({
    className,
    style
}) {
  return (
    <div className={`skeleton-box ${className ?? ''}`} style={style}></div>
  )
}
