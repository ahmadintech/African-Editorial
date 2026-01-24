<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // General
            ['key' => 'site_name', 'value' => 'African Editorial', 'group' => 'general', 'type' => 'string'],
            ['key' => 'site_description', 'value' => 'Premier destination for high-quality investigative reporting and analytical news across the African continent.', 'group' => 'general', 'type' => 'string'],
            ['key' => 'copyright_text', 'value' => '© 2026 African Editorial. All rights reserved.', 'group' => 'general', 'type' => 'string'],
            ['key' => 'maintenance_mode', 'value' => '0', 'group' => 'general', 'type' => 'boolean'],

            // Appearance
            ['key' => 'logo_url', 'value' => '/logo.png', 'group' => 'appearance', 'type' => 'string'],

            // Social Links
            ['key' => 'facebook_url', 'value' => 'https://facebook.com/africaneditorial', 'group' => 'social', 'type' => 'string'],
            ['key' => 'twitter_url', 'value' => 'https://twitter.com/africaneditorial', 'group' => 'social', 'type' => 'string'],
            ['key' => 'linkedin_url', 'value' => 'https://linkedin.com/company/africaneditorial', 'group' => 'social', 'type' => 'string'],
            ['key' => 'youtube_url', 'value' => 'https://youtube.com/africaneditorial', 'group' => 'social', 'type' => 'string'],
            ['key' => 'instagram_url', 'value' => 'https://instagram.com/africaneditorial', 'group' => 'social', 'type' => 'string'],

            // Contact Details
            ['key' => 'contact_email', 'value' => 'contact@african-editorial.com', 'group' => 'contact', 'type' => 'string'],
            ['key' => 'contact_address', 'value' => 'Kampala, Uganda, East Africa', 'group' => 'contact', 'type' => 'string'],
            ['key' => 'contact_phone', 'value' => '+256 (414) 252-600', 'group' => 'contact', 'type' => 'string'],
            ['key' => 'contact_map_url', 'value' => '', 'group' => 'contact', 'type' => 'string'],
            [
                'key' => 'department_emails',
                'value' => json_encode([
                    ['id' => 1, 'name' => 'Editorial', 'email' => 'editorial@africaneditorial.com'],
                    ['id' => 2, 'name' => 'Investigations', 'email' => 'investigations@africaneditorial.com'],
                    ['id' => 3, 'name' => 'Tips & Story Ideas', 'email' => 'tips@africaneditorial.com'],
                ]),
                'group' => 'contact',
                'type' => 'json'
            ],
            
            // Notifications
             // Add any notification settings if needed later
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
