import { useState } from "react"
import { BreakingNewsTicker } from "@/Components/breaking-news-ticker"
import { Header } from "@/Components/header"
import { InfiniteScrollNews } from "@/Components/infinite-scroll-news"
import { Footer } from "@/Components/footer"
import { BookmarksSidebar } from "@/Components/bookmarks-sidebar"
import { Bookmark } from "lucide-react"
import { Head } from "@inertiajs/react"

export default function LatestNews() {
 const [bookmarksOpen, setBookmarksOpen] = useState(false)
 const [bookmarks] = useState([
 {
 id: 1,
 title: "Investigations Reveal Hidden Impact of Trade Agreements",
 image: "/african-trade-investigation.jpg",
 date: "Jan 10, 2024",
 },
 ])

 return (
 <>
 <Head title="Latest News" />
 <BreakingNewsTicker />
 <Header />

 <main className="bg-background">
 <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
 <div className="flex items-center justify-between mb-8">
 <div>
 <h1 className="editorial-headline text-3xl mb-2">Latest News</h1>
 <p className="text-muted-foreground">Stay updated with the latest African Editorial stories</p>
 </div>
 <button
 onClick={() => setBookmarksOpen(!bookmarksOpen)}
 className="p-3 rounded-full hover:bg-muted transition-colors relative"
 title="View saved articles"
 >
 <Bookmark className="w-6 h-6 text-foreground" />
 {bookmarks.length > 0 && (
 <span className="absolute top-0 right-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
 {bookmarks.length}
 </span>
 )}
 </button>
 </div>

 <InfiniteScrollNews />
 </section>
 </main>

 <BookmarksSidebar isOpen={bookmarksOpen} onClose={() => setBookmarksOpen(false)} bookmarks={bookmarks} />

 <Footer />
 </>
 )
}
