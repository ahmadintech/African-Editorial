import { BreakingNewsTicker } from "@/Components/breaking-news-ticker"
import { Header } from "@/Components/header"
import { HeroCarousel } from "@/Components/hero-carousel"
import { TopStoriesGrid } from "@/Components/top-stories-grid"
import { EditorsPicksSection } from "@/Components/editors-picks-section"
import { InvestigativeReportsSection } from "@/Components/investigative-reports-section"
import { AfricaWorldSection } from "@/Components/africa-world-section"
import { OpinionEditorialsSection } from "@/Components/opinion-editorials-section"
import { BusinessEconomySection } from "@/Components/business-economy-section"
import { DataReportsSection } from "@/Components/data-reports-section"
import { TagSection } from "@/Components/tag-section"
import { NewsletterSignup } from "@/Components/newsletter-signup"
import { Footer } from "@/Components/footer"
import { RecentNewsSidebar } from "@/Components/recent-news-sidebar"
import { Head, usePage } from "@inertiajs/react"

export default function Home({
    heroStories = [],
    topStories = [],
    editorsPicks = [],
    investigativeReports = [],
    africaWorld = [],
    opinionPieces = [],
    businessEconomy = [],
    dataReports = [],
    recentNews = [],
    settings = {},
    app_url = ""
}) {
    const siteName = settings?.site_name || "African Editorial";
    const description = settings?.site_description || "Premium African news platform featuring deep-dive journalism, investigative reporting, and policy analysis.";

    return (
        <>
            <Head>
                <title>{siteName}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={app_url} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={app_url} />
                <meta property="og:title" content={siteName} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={settings?.logo_url || `${app_url}/placeholder.jpg`} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={app_url} />
                <meta name="twitter:title" content={siteName} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={settings?.logo_url || `${app_url}/placeholder.jpg`} />
            </Head>
            <BreakingNewsTicker />
            <Header />

            <main className="bg-background">
                <HeroCarousel stories={heroStories} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
                    <div className="lg:col-span-2 space-y-0">
                        <TopStoriesGrid stories={topStories} />
                        <EditorsPicksSection stories={editorsPicks} />
                        <InvestigativeReportsSection stories={investigativeReports} />
                        <AfricaWorldSection stories={africaWorld} />
                        <OpinionEditorialsSection stories={opinionPieces} />
                        <BusinessEconomySection stories={businessEconomy} />
                        <DataReportsSection stories={dataReports} />
                    </div>

                    {/* Right sidebar - hidden on mobile, visible on desktop */}
                    <div className="hidden lg:block">
                        <RecentNewsSidebar stories={recentNews} />
                    </div>
                </div>

                <TagSection />
                <NewsletterSignup />
            </main>

            <Footer />
        </>
    )
}
