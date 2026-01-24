<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->mapWithKeys(function ($item) {
            $value = $item->value;
            if ($item->type === 'boolean') {
                $value = (bool) $value;
            } elseif ($item->type === 'json') {
                $value = json_decode($value, true) ?? [];
            }
            return [$item->key => $value];
        });

        return Inertia::render('Admin/Settings', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->except(['_token', '_method']);

        foreach ($data as $key => $value) {
            // Handle File Uploads
            if ($request->hasFile($key)) {
                $file = $request->file($key);
                $path = $file->store('settings', 'public');
                $value = '/storage/' . $path;
            }

            // Check if value is array/json
            if (is_array($value)) {
                $value = json_encode($value);
            }
            // Use boolean 0/1 for checks
            if (is_bool($value)) {
                $value = $value ? '1' : '0';
            }

            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        // Clear cache if you implement caching later
        Cache::forget('site_settings');

        return back()->with('success', 'Settings updated successfully.');
    }
}
