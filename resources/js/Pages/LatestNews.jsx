import { useState } from "react"
import { BreakingNewsTicker } from "@/Components/breaking-news-ticker"
import { Header } from "@/Components/header"
import { Footer } from "@/Components/footer"
import { BookmarksSidebar } from "@/Components/bookmarks-sidebar"
import { Bookmark } from "lucide-react"
import { Head, Link } from "@inertiajs/react"
import { NewsCard } from "@/Components/news-card"

export default function LatestNews({ posts }) {
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

                    {posts.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.data.map((article) => (
                                <NewsCard key={article.id} {...article} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <p className="text-muted-foreground text-lg">No visible articles found.</p>
                            <Link href="/" className="text-primary font-bold hover:underline mt-4 inline-block">
                                Return Home
                            </Link>
                        </div>
                    )}

                    {/* Simple Pagination */}
                    {posts.links && posts.links.length > 3 && (
                        <div className="mt-12 flex justify-center gap-2">
                            {posts.links.map((link, i) => (
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${link.active
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted hover:bg-muted/80 text-foreground"
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={i}
                                        className="px-4 py-2 rounded-lg text-sm font-bold bg-transparent text-muted-foreground opacity-50 cursor-not-allowed"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <BookmarksSidebar isOpen={bookmarksOpen} onClose={() => setBookmarksOpen(false)} bookmarks={bookmarks} />

            <Footer />
        </>
    )
}
