<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Media;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create specific admin user if not exists (fallback)
        $admin = User::firstOrCreate(
            ['email' => 'admin@africaneditorial.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
            ]
        );

        // 2. Define Categories
        $categories = [
            'Investigations',
            'Environment',
            'Business',
            'Politics',
            'Economy',
            'Education',
            'Health',
            'Technology',
            'Features',
            'Culture',
            'Development',
            'Africa',
            'World',
            'Opinion',
            'Data & Reports',
        ];

        foreach ($categories as $catName) {
            Category::firstOrCreate(
                ['slug' => Str::slug($catName)],
                ['name' => $catName]
            );
        }

        // 3. Define Posts Data
        $postsData = [
            // Hero Carousel
            [
                'title' => "Investigations Reveal Hidden Impact of Trade Agreements on African Economy",
                'excerpt' => "Deep-dive analysis shows how recent trade deals are reshaping the continent's economic landscape",
                'category' => "Investigations",
                'author' => "Sarah Okonkwo",
                'date' => "2024-01-10",
                'image' => "african-trade-investigation.jpg",
                'read_time' => "12 min",
            ],
            [
                'title' => "Climate Crisis: East Africa Faces Unprecedented Water Shortage",
                'excerpt' => "Exclusive report on how prolonged drought is affecting communities across Kenya, Ethiopia, and beyond",
                'category' => "Environment",
                'author' => "James Kipchoge",
                'date' => "2024-01-09",
                'image' => "east-africa-drought-water.jpg",
                'read_time' => "10 min",
            ],
            [
                'title' => "Tech Innovation: Nigeria's Startups Leading Digital Revolution",
                'excerpt' => "How West African entrepreneurs are building solutions for continental challenges",
                'category' => "Business",
                'author' => "Chioma Adeyemi",
                'date' => "2024-01-08",
                'image' => "nigeria-tech-startup-innovation.jpg",
                'read_time' => "8 min",
            ],
            // Top Stories
            [
                'title' => "Political Tensions Rise Over Border Disputes",
                'excerpt' => "Regional leaders meet to discuss long-standing territorial issues",
                'category' => "Politics",
                'author' => "Amina Hassan",
                'date' => "2024-01-07",
                'image' => "african-political-meeting.jpg",
                'read_time' => "7 min",
            ],
            [
                'title' => "Inflation Crisis: Central Banks Take Action",
                'excerpt' => "Economic policy shifts aim to stabilize currencies across the continent",
                'category' => "Economy",
                'author' => "David Kwesi",
                'date' => "2024-01-06",
                'image' => "african-economy-finance.jpg",
                'read_time' => "9 min",
            ],
            [
                'title' => "Education Reform Initiatives Show Early Success",
                'excerpt' => "New policies in South Africa and Rwanda demonstrate promising results",
                'category' => "Education",
                'author' => "Grace Mwangi",
                'date' => "2024-01-05",
                'image' => "africa-education-classroom.jpg",
                'read_time' => "6 min",
            ],
            [
                'title' => "Health Crisis: Mpox Outbreak Updates",
                'excerpt' => "WHO coordinates response as cases increase in multiple regions",
                'category' => "Health",
                'author' => "Dr. Kofi Mensah",
                'date' => "2024-01-04",
                'image' => "health-crisis-medical.jpg",
                'read_time' => "8 min",
            ],
            [
                'title' => "Tech Innovation: AI Research Centers Launch",
                'excerpt' => "African universities establish hubs for artificial intelligence development",
                'category' => "Technology",
                'author' => "Samuel Okafor",
                'date' => "2024-01-03",
                'image' => "nigeria-tech-startup-innovation.jpg", // Reusing image as per source
                'read_time' => "7 min",
            ],
            [
                'title' => "Trade Summit: New Regional Markets Emerge",
                'excerpt' => "Continental partnerships create fresh economic opportunities",
                'category' => "Business",
                'author' => "Naledi Sibiya",
                'date' => "2024-01-02",
                'image' => "african-trade-investigation.jpg", // Reusing image
                'read_time' => "8 min",
            ],
            // Editor's Picks
            [
                'title' => "Behind the Scenes: How African Journalists Cover Breaking News",
                'excerpt' => "An intimate look at the challenges and triumphs of investigative reporting on the continent",
                'category' => "Features",
                'author' => "Isabel Munhuirire",
                'date' => "2024-01-03",
                'image' => "african-journalist-newsroom.jpg",
                'read_time' => "11 min",
            ],
            [
                'title' => "Cultural Renaissance: Art and Music Shape African Identity",
                'excerpt' => "Emerging artists are redefining what it means to create contemporary African culture",
                'category' => "Culture",
                'author' => "Thierry Ngandu",
                'date' => "2024-01-02",
                'image' => "african-art-culture-music.jpg",
                'read_time' => "9 min",
            ],
            [
                'title' => "Infrastructure Development: Building the Future Africa",
                'excerpt' => "Major projects across the continent aim to transform connectivity and commerce",
                'category' => "Development",
                'author' => "Adeyemi Olakunle",
                'date' => "2024-01-01",
                'image' => "african-infrastructure-construction.jpg",
                'read_time' => "10 min",
            ],
            // Investigative Reports (Full Content inferred or placeholder)
            [
                'title' => "Corruption Networks: Following the Money Across African Borders",
                'excerpt' => "Deep-dive journalism uncovering stories that matter about illicit financial flows.",
                'category' => "Investigations",
                'author' => "Investigative Desk",
                'date' => "2024-01-11",
                'image' => "corruption-investigation-files.jpg",
                'read_time' => "15 min",
            ],
            [
                'title' => "Environmental Crime: The Illegal Wildlife Trade Exposed",
                'excerpt' => "Tracking the syndicates responsible for poaching and environmental degradation.",
                'category' => "Environment",
                'author' => "Wildlife Watch",
                'date' => "2024-01-12",
                'image' => "wildlife-poaching-investigation.jpg",
                'read_time' => "12 min",
            ],
            [
                'title' => "Labor Rights: Uncovering Exploitation in African Supply Chains",
                'excerpt' => "A look into the working conditions in major manufacturing hubs.",
                'category' => "Features",
                'author' => "Labor Monitor",
                'date' => "2024-01-13",
                'image' => "labor-rights-factory-workers.jpg",
                'read_time' => "14 min",
            ],
            // Africa & World
            [
                'title' => "Continental Integration: The AfCFTA Effect",
                'excerpt' => "Analysis of how the African Continental Free Trade Area is reshaping business",
                'category' => "Africa",
                'author' => "Nandi Mthembu",
                'date' => "2024-01-10",
                'image' => "afcfta-trade-agreement.jpg",
                'read_time' => "10 min",
            ],
            [
                'title' => "Global Partnerships: African Influence on World Stage",
                'excerpt' => "How the continent is building strategic relationships with major world powers",
                'category' => "World",
                'author' => "Charles Andile",
                'date' => "2024-01-09",
                'image' => "african-global-diplomacy.jpg",
                'read_time' => "9 min",
            ],
            [
                'title' => "Migration Crisis: Understanding African Diaspora",
                'excerpt' => "Exploring the economic and social impacts of African migration patterns",
                'category' => "World",
                'author' => "Amina Suleiman",
                'date' => "2024-01-08",
                'image' => "african-migration-diaspora.jpg",
                'read_time' => "11 min",
            ],
            // Opinion
            [
                'title' => "Why African Countries Must Lead the Climate Discussion",
                'excerpt' => "Opinion: The continent's voice cannot be overlooked in global climate negotiations",
                'category' => "Opinion",
                'author' => "Dr. Kwame Asante",
                'date' => "2024-01-07",
                'image' => "climate-policy-opinion-editorial.jpg",
                'read_time' => "6 min",
            ],
            [
                'title' => "Tech and Tradition: Finding Balance in Digital Africa",
                'excerpt' => "Editorial perspective on preserving cultural values amid rapid technological change",
                'category' => "Opinion",
                'author' => "Zainab Mohamed",
                'date' => "2024-01-06",
                'image' => "tech-tradition-balance-africa.jpg",
                'read_time' => "7 min",
            ],
            [
                'title' => "The Future of African Leadership: A Generational Shift",
                'excerpt' => "Analysis of how younger leaders are reshaping political and economic landscapes",
                'category' => "Opinion",
                'author' => "Prof. Emeka Okoye",
                'date' => "2024-01-05",
                'image' => "african-leadership-generation.jpg",
                'read_time' => "8 min",
            ],
            // Business & Economy (Additional)
            [
                'title' => "Tech Unicorns: African Startups Reaching New Heights",
                'excerpt' => "Venture capital flows surge into promising African technology companies",
                'category' => "Business",
                'author' => "Obi Okoro",
                'date' => "2024-01-10",
                'image' => "african-startup-unicorn.jpg",
                'read_time' => "8 min",
            ],
            [
                'title' => "Energy Transition: Renewable Power Projects Transform Infrastructure",
                'excerpt' => "Investment in solar and wind energy reshaping the continent's power sector",
                'category' => "Economy",
                'author' => "Lerato Makhanya",
                'date' => "2024-01-09",
                'image' => "renewable-energy-solar-africa.jpg",
                'read_time' => "9 min",
            ],
            [
                'title' => "Financial Inclusion: Banking the Unbanked Population",
                'excerpt' => "Mobile money and digital services are expanding access to financial services",
                'category' => "Economy",
                'author' => "Ibrahim Hassan",
                'date' => "2024-01-08",
                'image' => "mobile-banking-financial-inclusion.jpg",
                'read_time' => "7 min",
            ],
            // Data & Reports
            [
                'title' => "Data Dashboard: African Economic Indicators Q4 2024",
                'excerpt' => "Comprehensive analysis of GDP, inflation, and employment across the continent",
                'category' => "Data & Reports",
                'author' => "Dr. Zainab Okafor",
                'date' => "2024-01-10",
                'image' => "economic-data-dashboard.jpg",
                'read_time' => "12 min",
            ],
            [
                'title' => "Population Growth: Demographic Shifts and Future Implications",
                'excerpt' => "Statistical analysis of Africa's youth population and economic opportunities",
                'category' => "Data & Reports",
                'author' => "Prof. Kofi Mensah",
                'date' => "2024-01-09",
                'image' => "demographic-population-statistics.jpg",
                'read_time' => "10 min",
            ],
            [
                'title' => "Education Statistics: Progress Toward Universal Enrollment",
                'excerpt' => "Annual report on literacy rates and educational achievement across Africa",
                'category' => "Data & Reports",
                'author' => "Grace Mwangi",
                'date' => "2024-01-08",
                'image' => "education-statistics-school.jpg",
                'read_time' => "9 min",
            ],
        ];

        // Process existing files in the directory to find sizes if possible, otherwise mock sizes.
        // For this seeder, we will just create Media records assuming the files act compatible.

        foreach ($postsData as $data) {
            // 1. Find or Create Author
            $author = User::firstOrCreate(
                ['email' => Str::slug($data['author']) . '@africaneditorial.com'],
                [
                    'name' => $data['author'],
                    'password' => Hash::make('password'),
                ]
            );

            // 2. Find Category
            $category = Category::where('name', $data['category'])->first();

            // 3. Create Media for Featured Image
            // We assume the images are in 'posts/' folder in public disk as per user instruction
             $media = Media::firstOrCreate(
                ['filename' => $data['image']],
                [
                    'filename' => $data['image'],
                    'mime_type' => 'image/jpeg', // Assumption
                    'path' => 'posts/' . $data['image'],
                    'disk' => 'public',
                    'size' => 102400, // Mock size 100KB
                    'user_id' => $admin->id,
                ]
            );

            // 4. Create Post
            Post::firstOrCreate(
                ['title' => $data['title']],
                [
                    'slug' => Str::slug($data['title']),
                    'content' => $this->generateContent($data['title'], $data['excerpt']),
                    'excerpt' => $data['excerpt'],
                    'status' => 'published',
                    'user_id' => $author->id,
                    'category_id' => $category ? $category->id : null,
                    'featured_image_id' => $media->id,
                    'read_time' => $data['read_time'],
                    'source' => 'African Editorial',
                    'published_at' => $data['date'] . ' 09:00:00',
                    'created_at' => $data['date'] . ' 09:00:00',
                    'updated_at' => $data['date'] . ' 09:00:00',
                ]
            );
        }
    }

    private function generateContent($title, $excerpt)
    {
        return "
            <p class='lead font-medium text-xl mb-6'>{$excerpt}</p>
            <p class='mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <h2 class='text-2xl font-bold mt-8 mb-4'>Key Findings</h2>
            <p class='mb-4'>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p class='mb-4'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <blockquote class='border-l-4 border-primary pl-4 italic my-6 text-gray-700 bg-gray-50 p-4 rounded-r'>
                \"This is a significant development for the region and marks a turning point in our approach to sustainable growth.\"
            </blockquote>
            <h2 class='text-2xl font-bold mt-8 mb-4'>Future Implications</h2>
            <p class='mb-4'>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
        ";
    }
}
