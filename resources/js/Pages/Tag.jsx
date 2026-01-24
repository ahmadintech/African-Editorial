import React from "react"
import { BreakingNewsTicker } from "@/Components/breaking-news-ticker"
import { Header } from "@/Components/header"
import { NewsCard } from "@/Components/news-card"
import { Footer } from "@/Components/footer"
import { Head } from "@inertiajs/react"

const tagArticles = {
    politics: [
        {
            id: 4,
            title: "Political Tensions Rise Over Border Disputes",
            summary: "Regional leaders meet to discuss long-standing territorial issues",
            category: "Politics",
            author: "Amina Hassan",
            date: "2024-01-07",
            image: "/african-political-meeting.jpg",
            readTime: "7 min",
        },
        {
            id: 12,
            title: "Why African Countries Must Lead the Climate Discussion",
            summary: "Opinion: The continent's voice cannot be overlooked in global climate negotiations",
            category: "Opinion",
            author: "Dr. Kwame Asante",
            date: "2024-01-07",
            image: "/climate-policy-opinion-editorial.jpg",
            readTime: "6 min",
        },
    ],
    economy: [
        {
            id: 5,
            title: "Inflation Crisis: Central Banks Take Action",
            summary: "Economic policy shifts aim to stabilize currencies across the continent",
            category: "Economy",
            author: "David Kwesi",
            date: "2024-01-06",
            image: "/african-economy-finance.jpg",
            readTime: "9 min",
        },
        {
            id: 19,
            title: "Financial Inclusion: Banking the Unbanked Population",
            summary: "Mobile money and digital services are expanding access to financial services",
            category: "Economy",
            author: "Ibrahim Hassan",
            date: "2024-01-08",
            image: "/mobile-banking-financial-inclusion.jpg",
            readTime: "7 min",
        },
    ],
    technology: [
        {
            id: 3,
            title: "Tech Innovation: Nigeria's Startups Leading Digital Revolution",
            summary: "How West African entrepreneurs are building solutions for continental challenges",
            category: "Business",
            author: "Chioma Adeyemi",
            date: "2024-01-08",
            image: "/nigeria-tech-startup-innovation.jpg",
            readTime: "8 min",
        },
    ],
    climate: [
        {
            id: 2,
            title: "Climate Crisis: East Africa Faces Unprecedented Water Shortage",
            summary: "Exclusive report on how prolonged drought is affecting communities across Kenya, Ethiopia, and beyond",
            category: "Environment",
            author: "James Kipchoge",
            date: "2024-01-09",
            image: "/east-africa-drought-water.jpg",
            readTime: "10 min",
        },
    ],
}

export default function Tag({ slug }) {
    const articles = tagArticles[slug] || []

    return (
        <>
            <Head title={`#${slug}`} />
            <BreakingNewsTicker />
            <Header />

            <main className="bg-background text-foreground min-h-screen">
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="mb-12">
                        <h1 className="editorial-headline text-3xl capitalize mb-2">#{slug}</h1>
                        <p className="text-muted-foreground text-lg">
                            Showing {articles.length} article{articles.length !== 1 ? "s" : ""} tagged with {slug}
                        </p>
                    </div>

                    {articles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.map((article) => (
                                <NewsCard key={article.id} {...article} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground text-lg">No articles found for this tag</p>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </>
    )
}
