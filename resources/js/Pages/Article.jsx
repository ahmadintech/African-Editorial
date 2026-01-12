import { BreakingNewsTicker } from "@/Components/breaking-news-ticker"
import { Header } from "@/Components/header"
import { ArticleDetail } from "@/Components/article-detail"
import { Footer } from "@/Components/footer"
import { Head } from "@inertiajs/react"

// Mock article content - in production, this would come from a database/CMS
const articles = {
 1: {
 id: 1,
 title: "Investigations Reveal Hidden Impact of Trade Agreements on African Economy",
 subtitle:
 "A comprehensive investigation uncovers how recent trade deals are reshaping the continent's economic landscape and impacting communities.",
 content: `
 <p>Trade agreements have long been presented as solutions to economic growth across Africa. However, a six-month investigative project reveals a more complex picture, where the promised benefits often come with hidden costs for local communities.</p>
 
 <p>Our investigation, conducted across 12 African countries, examined the actual implementation of major trade agreements signed in the past decade. The findings show that while some sectors have seen growth, traditional industries have been devastated, and wealth concentration has increased significantly.</p>
 
 <h2>The Implementation Gap</h2>
 <p>What makes these findings particularly significant is the gap between what was promised during negotiations and what has actually transpired. Government officials who signed these agreements often cited job creation and increased exports as primary benefits.</p>
 
 <p>Yet on the ground, in the manufacturing hubs of Nigeria, Kenya, and South Africa, workers report factory closures and reduced opportunities. Small-scale traders, particularly women engaged in informal cross-border commerce, have seen their livelihoods threatened.</p>
 
 <h2>Case Study: The Textile Industry</h2>
 <p>The textile sector provides one of the most compelling examples. In West Africa, the influx of cheap imported fabrics has decimated local textile production. Production facilities that once employed thousands have shut down or drastically reduced their workforce.</p>
 
 <p>Our interviews with 200+ textile workers revealed that retraining programs promised as part of the trade agreements never materialized, leaving experienced workers with few alternatives.</p>
 
 <h2>Looking Forward</h2>
 <p>Policymakers across Africa must now confront these realities. The question is no longer whether trade agreements are necessary—it's how to structure them in ways that ensure broad-based benefits rather than concentrated gains for a few sectors and actors.</p>
 `,
 author: "Sarah Okonkwo",
 authorBio:
 "Sarah Okonkwo is an investigative journalist with over 15 years of experience covering African economics and development. She has won multiple international awards for her reporting on trade policy and its impacts.",
 date: "January 10, 2024",
 readTime: "12 min",
 category: "Investigations",
 image: "/african-trade-investigation.jpg",
 relatedArticles: [
 {
 id: 19,
 title: "Energy Transition: Renewable Power Projects Transform Infrastructure",
 image: "/renewable-energy-solar-africa.jpg",
 },
 {
 id: 20,
 title: "Financial Inclusion: Banking the Unbanked Population",
 image: "/mobile-banking-financial-inclusion.jpg",
 },
 ],
 },
}

export default function Article({ id }) {
 const article = articles[id]

 if (!article) {
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

 return (
 <>
 <Head title={article.title} />
 <BreakingNewsTicker />
 <Header />
 <ArticleDetail {...article} />
 <Footer />
 </>
 )
}
