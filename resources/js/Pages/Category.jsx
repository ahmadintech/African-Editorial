import { Head, Link, usePage } from "@inertiajs/react"
import { Header } from "@/Components/header"
import { Footer } from "@/Components/footer"
import { BreakingNewsTicker } from "@/Components/breaking-news-ticker"
import { NewsCard as Card } from "@/Components/news-card"

export default function Category({ category, posts, settings = {}, app_url = "" }) {
    const siteName = settings?.site_name || "African Editorial";
    const canonicalUrl = `${app_url}/category/${category.slug}`;
    const description = category.description || `Read the latest articles in ${category.name} on ${siteName}.`;

    return (
        <>
            <Head>
                <title>{`${category.name} | ${siteName}`}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonicalUrl} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:title" content={`${category.name} | ${siteName}`} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={settings?.logo_url || `${app_url}/placeholder.jpg`} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={canonicalUrl} />
                <meta name="twitter:title" content={`${category.name} | ${siteName}`} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={settings?.logo_url || `${app_url}/placeholder.jpg`} />
            </Head>
            <BreakingNewsTicker />
            <Header />

            <main className="bg-background min-h-screen">
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                                <span className="news-badge">{category.name}</span>
                            </div>
                            <h1 className="text-4xl font-black tracking-tight text-foreground">
                                {category.name}
                            </h1>
                            {category.description && (
                                <p className="text-muted-foreground mt-2 max-w-2xl">{category.description}</p>
                            )}
                        </div>
                    </div>

                    {posts.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.data.map((article) => (
                                <Card key={article.id} {...article} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <p className="text-muted-foreground text-lg">No articles found in this category yet.</p>
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

            <Footer />
        </>
    )
}
