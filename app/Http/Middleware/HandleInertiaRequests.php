<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'settings' => \Illuminate\Support\Facades\Cache::remember('site_settings', 3600, function () {
                return \App\Models\Setting::all()->mapWithKeys(function ($item) {
                    $value = $item->value;
                    if ($item->type === 'boolean') {
                        $value = (bool) $value;
                    } elseif ($item->type === 'json') {
                        $value = json_decode($value, true) ?? [];
                    }
                    return [$item->key => $value];
                })->toArray();
            }),
            'app_url' => config('app.url'),
        ];
    }
}
