import SignInPage from '@/components/AuthSheare/Sign-In';
import React, { Suspense } from 'react';

// Sign-In component er vitore useSearchParams() ache, tai Next.js build er somoy
// eta ke <Suspense> diye wrap korte hoy.
const page = () => {
    return (
        <main className="min-h-screen w-full relative overflow-hidden bg-[#030712] selection:bg-indigo-500 selection:text-white flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
            
            {/* Ambient Background Glowing Orbs for Modern Vibe */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none"></div>
            
            {/* Subtle Grid Texture for Depth */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

            {/* Page Wrapper Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="w-full transition-all duration-500 transform hover:scale-[1.005]">
                    <Suspense
                        fallback={
                            <div className="flex min-h-[400px] items-center justify-center">
                                <span className="size-6 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
                            </div>
                        }
                    >
                        <SignInPage />
                    </Suspense>
                </div>
            </div>
            
        </main>
    );
};

export default page;