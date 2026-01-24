
import { Link } from "@inertiajs/react"

interface MinimalNewsCardProps {
    id: number
    title: string
    image: string
    slug?: string
}

export function MinimalNewsCard({ id, title, image, slug }: MinimalNewsCardProps) {
    return (
        <Link href={slug ? `/article/${slug}` : `/article/${id}`}>
            <article className="news-card group overflow-hidden transition-all hover:shadow-lg">
                <div className="relative w-full pt-[56.25%] bg-muted overflow-hidden">
                    <img src={image || "/placeholder.svg"} alt={title} className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-full absolute inset-0" />
                </div>

                <div className="p-5 sm:p-6">
                    <h3 className="font-bold text-card-foreground leading-tight text-balance group-hover:text-primary transition-colors line-clamp-3 text-base sm:text-lg">
                        {title}
                    </h3>
                </div>
            </article>
        </Link>
    )
}
