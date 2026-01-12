"use client"

import { useState, useCallback } from "react"
import { X, Search } from "lucide-react"
import { Link } from "@inertiajs/react"


interface SearchResult {
 id: number
 title: string
 category: string
 image: string
 date: string
}

const allArticles: SearchResult[] = [
 {
 id: 1,
 title: "Investigations Reveal Hidden Impact of Trade Agreements on African Economy",
 category: "Investigations",
 image: "/african-trade-investigation.jpg",
 date: "Jan 10, 2024",
 },
 {
 id: 2,
 title: "Climate Crisis: East Africa Faces Unprecedented Water Shortage",
 category: "Environment",
 image: "/east-africa-drought-water.jpg",
 date: "Jan 9, 2024",
 },
 {
 id: 3,
 title: "Tech Innovation: Nigeria's Startups Leading Digital Revolution",
 category: "Business",
 image: "/nigeria-tech-startup-innovation.jpg",
 date: "Jan 8, 2024",
 },
 {
 id: 4,
 title: "Political Tensions Rise Over Border Disputes",
 category: "Politics",
 image: "/african-political-meeting.jpg",
 date: "Jan 7, 2024",
 },
 {
 id: 5,
 title: "Inflation Crisis: Central Banks Take Action",
 category: "Economy",
 image: "/african-economy-finance.jpg",
 date: "Jan 6, 2024",
 },
]

interface SearchModalProps {
 isOpen: boolean
 onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
 const [query, setQuery] = useState("")
 const [results, setResults] = useState<SearchResult[]>([])

 const handleSearch = useCallback((value: string) => {
 setQuery(value)
 if (value.trim().length > 0) {
 const filtered = allArticles.filter(
 (article) =>
 article.title.toLowerCase().includes(value.toLowerCase()) ||
 article.category.toLowerCase().includes(value.toLowerCase()),
 )
 setResults(filtered)
 } else {
 setResults([])
 }
 }, [])

 if (!isOpen) return null

 return (
 <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20">
 <div className="w-full max-w-2xl mx-4">
 <div className="bg-card rounded-lg shadow-xl overflow-hidden">
 {/* Search input */}
 <div className="flex items-center gap-4 p-6 border-b border-border">
 <Search className="w-6 h-6 text-muted-foreground flex-shrink-0" />
 <input
 type="text"
 placeholder="Search articles, categories, tags..."
 value={query}
 onChange={(e) => handleSearch(e.target.value)}
 autoFocus
 className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none text-lg"
 />
 <button
 onClick={onClose}
 className="p-2 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground"
 >
 <X className="w-6 h-6" />
 </button>
 </div>

 {/* Results */}
 <div className="max-h-96 overflow-y-auto">
 {results.length > 0 ? (
 <div className="divide-y divide-border">
 {results.map((result) => (
 <Link
 key={result.id}
 href={`/article/${result.id}`}
 onClick={onClose}
 className="flex gap-4 p-4 hover:bg-muted transition-colors"
 >
 <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
 <img src={result.image || "/placeholder.svg"} alt={result.title} className="object-cover w-full h-full absolute inset-0" />
 </div>
 <div className="flex-1 min-w-0">
 <h3 className="font-semibold text-card-foreground text-sm leading-tight line-clamp-2">
 {result.title}
 </h3>
 <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
 <span className="inline-block px-2 py-1 rounded bg-muted">{result.category}</span>
 <span>{result.date}</span>
 </div>
 </div>
 </Link>
 ))}
 </div>
 ) : query.trim().length > 0 ? (
 <div className="p-8 text-center text-muted-foreground">
 <p>No articles found matching "{query}"</p>
 </div>
 ) : (
 <div className="p-8 text-center text-muted-foreground">
 <p>Start typing to search articles</p>
 </div>
 )}
 </div>
 </div>
 </div>
 </div>
 )
}
