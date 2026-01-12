"use client"

import { Link } from "@inertiajs/react"

const popularTags = [
 { name: "Politics", count: 145 },
 { name: "Security", count: 128 },
 { name: "Economy", count: 142 },
 { name: "Education", count: 87 },
 { name: "Elections", count: 62 },
 { name: "Climate", count: 108 },
 { name: "Health", count: 94 },
 { name: "Conflict", count: 76 },
 { name: "Development", count: 119 },
 { name: "Governance", count: 85 },
 { name: "Technology", count: 73 },
 { name: "Trade", count: 58 },
]

export function TagCloud() {
 // Sort by count and calculate sizes
 const sorted = [...popularTags].sort((a, b) => b.count - a.count)
 const maxCount = sorted[0].count
 const minCount = sorted[sorted.length - 1].count

 const getSizeClass = (count: number) => {
 const ratio = (count - minCount) / (maxCount - minCount)
 if (ratio > 0.7) return "text-lg font-bold"
 if (ratio > 0.4) return "text-base font-semibold"
 return "text-sm font-medium"
 }

 return (
 <div className="flex flex-wrap gap-3 justify-center">
 {popularTags.map((tag) => (
 <Link
 key={tag.name}
 href={`/tag/${tag.name.toLowerCase()}`}
 className={`px-4 py-2 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors ${getSizeClass(tag.count)}`}
 >
 {tag.name}
 <span className="ml-2 text-xs opacity-75">({tag.count})</span>
 </Link>
 ))}
 </div>
 )
}
