import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ links }) {
    if (links.length <= 3) return null;

    return (
        <div className="flex flex-wrap justify-center gap-1">
            {links.map((link, key) => {
                let label = link.label;
                if (label.includes('Previous')) {
                    label = <ChevronLeft className="w-4 h-4" />;
                } else if (label.includes('Next')) {
                    label = <ChevronRight className="w-4 h-4" />;
                } else {
                    // Remove HTML entities like &laquo;
                    label = label.replace(/&[^\s;]+;/g, '');
                }

                return (
                    link.url === null ? (
                        <div
                            key={key}
                            className="mr-1 mb-1 px-3 py-2 text-sm leading-4 text-muted-foreground border border-border rounded opacity-50 cursor-not-allowed flex items-center justify-center"
                        >
                            {label}
                        </div>
                    ) : (
                        <Link
                            key={key}
                            className={`mr-1 mb-1 px-3 py-2 text-sm leading-4 border border-border rounded hover:bg-muted focus:border-primary focus:text-primary transition-colors flex items-center justify-center ${link.active ? 'bg-primary text-primary-foreground hover:bg-primary' : 'bg-card text-foreground'}`}
                            href={link.url}
                        >
                            {label}
                        </Link>
                    )
                );
            })}
        </div>
    );
}
