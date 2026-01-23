import { BreakingNewsTicker } from "@/Components/breaking-news-ticker"
import { Header } from "@/Components/header"
import { ArticleDetail } from "@/Components/article-detail"
import { Footer } from "@/Components/footer"
import { Head } from "@inertiajs/react"

export default function Article({ post, relatedPosts }) {
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

    // Map database post to component expected format
    const articleData = {
        id: post.id,
        title: post.title,
        subtitle: post.excerpt,
        content: post.content,
        author: post.author?.name || 'Unknown Author',
        authorBio: "Investigative journalist covering African economics and development.", // Placeholder as we don't have bio in DB yet
        date: new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        readTime: post.read_time || '5 min',
        category: post.category?.name || 'News',
        image: post.featured_image_url || '/placeholder.jpg',
        source: post.source,
        relatedArticles: relatedPosts?.map(p => ({
            id: p.id,
            title: p.title,
            image: p.featured_image_url,
            slug: p.slug
        })) || []
    };

    return (
        <>
            <Head title={post.title} />
            <BreakingNewsTicker />
            <Header />
            <ArticleDetail {...articleData} />
            <Footer />
        </>
    )
}
