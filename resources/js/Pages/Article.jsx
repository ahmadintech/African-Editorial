import { BreakingNewsTicker } from "@/Components/breaking-news-ticker"
import { Header } from "@/Components/header"
import { ArticleDetail } from "@/Components/article-detail"
import { Footer } from "@/Components/footer"
import { Head, usePage } from "@inertiajs/react"

export default function Article({ post, relatedPosts, settings = {}, app_url = "" }) {
    if (!post) {
        return (
            <>
                <Head title="Article Not Found" />
                <BreakingNewsTicker />
                <Header />
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <p className="text-center text-muted-foreground">Article not found</p>
                </div>
                <Footer />
            </>
        )
    }

    const canonicalUrl = `${app_url}/article/${post.slug}`;
    const siteName = settings?.site_name || "African Editorial";

    // ... existing articleData mapping ...
    const articleData = {
        // ... (preserving exact object structure for ArticleDetail)
        id: post.id,
        title: post.title,
        subtitle: post.excerpt,
        content: post.content,
        author: post.author?.name || 'Unknown Author',
        authorBio: "Investigative journalist covering African economics and development.",
        date: new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        readTime: post.read_time || '5 min',
        category: post.category?.name || 'News',
        image: post.featured_image_url || '/placeholder.jpg',
        source: post.source,
        tags: post.tags?.map(t => ({ name: t.name, slug: t.slug })) || [],
        relatedArticles: relatedPosts?.map(p => ({
            id: p.id,
            title: p.title,
            image: p.featured_image_url,
            slug: p.slug
        })) || []
    };

    return (
        <>
            <Head>
                <title>{`${post.title} | ${siteName}`}</title>
                <meta name="description" content={post.excerpt} />
                <link rel="canonical" href={canonicalUrl} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.featured_image_url || `${app_url}/placeholder.jpg`} />
                <meta property="og:site_name" content={siteName} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={canonicalUrl} />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.excerpt} />
                <meta name="twitter:image" content={post.featured_image_url || `${app_url}/placeholder.jpg`} />

                {/* Article Specific */}
                {post.published_at && <meta property="article:published_time" content={post.published_at} />}
                <meta property="article:author" content={post.author?.name} />
                <meta property="article:section" content={post.category?.name} />
                {post.tags?.map(t => (
                    <meta key={t.id} property="article:tag" content={t.name} />
                ))}
            </Head>
            <BreakingNewsTicker />
            <Header />
            <ArticleDetail {...articleData} />
            <Footer />
        </>
    )
}
