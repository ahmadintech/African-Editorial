import { Header } from "@/Components/header"
import { Footer } from "@/Components/footer"
import { NewsCard } from "@/Components/news-card"
import { BreakingNewsTicker } from "@/Components/breaking-news-ticker"
import { Head, Link, usePage } from "@inertiajs/react"

export default function Search({ posts, query }) {
    const { settings } = usePage().props;
    const siteName = settings?.site_name || "African Editorial";

    return (
        <>
            <Head>
                <title>{`Search results for "${query}" | ${siteName}`}</title>
                <meta name="robots" content="noindex, follow" />
            </Head>
            <BreakingNewsTicker />
            <Header />

            <main className="bg-background min-h-screen py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <h1 className="editorial-headline mb-4">
                            Search Results
                        </h1>
                        <p className="text-muted-foreground">
                            {posts.total > 0
                                ? `Showing ${posts.total} results for "${query}"`
                                : `No results found for "${query}"`}
                        </p>
                    </div>

                    {posts.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.data.map((post) => (
                                <NewsCard key={post.id} {...post} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-muted/30 rounded-2xl border-2 border-dashed border-border">
                            <h3 className="text-xl font-bold mb-2">Nothing found</h3>
                            <p className="text-muted-foreground mb-8">Try searching for something else or check your spelling.</p>
                            <Link
                                href="/"
                                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-colors"
                            >
                                Back to Home
                            </Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {posts.links && posts.total > posts.per_page && (
                        <div className="mt-12 flex justify-center gap-2">
                            {posts.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`px-4 py-2 rounded-lg border text-sm font-bold transition-all ${link.active
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-card text-foreground border-border hover:bg-muted"
                                        } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    )
}
