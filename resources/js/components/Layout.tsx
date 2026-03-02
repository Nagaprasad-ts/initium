import { Link } from '@inertiajs/react';
import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="text-2xl font-black tracking-tight text-blue-600">
                            Initium
                        </Link>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                            Home
                        </Link>
                        <Link href="/events" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                            Events
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="flex-1">
                {children}
            </main>

            <footer className="bg-white border-t border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-sm text-gray-500">
                        &copy; 2026 Initium Event Management. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
