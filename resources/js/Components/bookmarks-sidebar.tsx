"use client"
import { X, Bookmark } from "lucide-react"
import { Link } from "@inertiajs/react"


interface BookmarkedArticle {
 id: number
 title: string
 image: string
 date: string
}

interface BookmarksSidebarProps {
 isOpen: boolean
 onClose: () => void
 bookmarks: BookmarkedArticle[]
}

export function BookmarksSidebar({ isOpen, onClose, bookmarks }: BookmarksSidebarProps) {
 return (
 <>
 {/* Overlay */}
 {isOpen && <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />}

 {/* Sidebar */}
 <div
 className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-card border-l border-border shadow-lg transition-transform duration-300 z-40 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
 >
 <div className="flex items-center justify-between p-6 border-b border-border">
 <div className="flex items-center gap-2">
 <Bookmark className="w-5 h-5 text-primary" />
 <h2 className="text-lg font-bold text-card-foreground">Saved Articles</h2>
 </div>
 <button onClick={onClose} className="p-2 hover:bg-muted rounded transition-colors">
 <X className="w-5 h-5" />
 </button>
 </div>

 <div className="overflow-y-auto h-[calc(100%-80px)]">
 {bookmarks.length > 0 ? (
 <div className="divide-y divide-border">
 {bookmarks.map((article) => (
 <Link
 key={article.id}
 href={`/article/${article.id}`}
 onClick={onClose}
 className="flex gap-3 p-4 hover:bg-muted transition-colors"
 >
 <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
 <img src={article.image || "/placeholder.svg"} alt={article.title} className="object-cover w-full h-full absolute inset-0" />
 </div>
 <div className="flex-1 min-w-0">
 <h3 className="font-semibold text-card-foreground text-xs leading-tight line-clamp-2">
 {article.title}
 </h3>
 <p className="text-xs text-muted-foreground mt-1">{article.date}</p>
 </div>
 </Link>
 ))}
 </div>
 ) : (
 <div className="flex flex-col items-center justify-center h-full gap-2 text-center p-6">
 <Bookmark className="w-8 h-8 text-muted-foreground" />
 <p className="text-muted-foreground text-sm">No saved articles yet</p>
 <p className="text-xs text-muted-foreground/60">Bookmark articles to read them later</p>
 </div>
 )}
 </div>
 </div>
 </>
 )
}
