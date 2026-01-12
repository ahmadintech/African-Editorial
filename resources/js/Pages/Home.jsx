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
import { Head } from "@inertiajs/react"

export default function Home() {
 return (
 <>
 <Head title="Home" />
 <BreakingNewsTicker />
 <Header />

 <main className="bg-background">
 <HeroCarousel />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
 <div className="lg:col-span-2 space-y-0">
 <TopStoriesGrid />
 <EditorsPicksSection />
 <InvestigativeReportsSection />
 <AfricaWorldSection />
 <OpinionEditorialsSection />
 <BusinessEconomySection />
 <DataReportsSection />
 </div>

 {/* Right sidebar - hidden on mobile, visible on desktop */}
 <div className="hidden lg:block">
 <RecentNewsSidebar />
 </div>
 </div>

 <TagSection />
 <NewsletterSignup />
 </main>

 <Footer />
 </>
 )
}
