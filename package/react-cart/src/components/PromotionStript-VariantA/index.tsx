import { useState, useEffect } from 'react';

export const TopStrip = () => {
    const messages = [
        "Get 10% off on your first purchase with code \"PastelWave Fashion Store\".",
        "Look Fabulous while Empowering Artisans.",
        "Meticulously Designed & Handmade in Heirloom Indian Crafts."
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [messages.length]);

    return (
        <div className="fixed top-0 left-0 w-full z-[1000] shadow-sm">

            <div className="w-full bg-[#f5ebdc] px-4 py-2 flex justify-between items-center min-h-[40px]">

                <div className="w-16"></div>


                <div className="flex-1 flex justify-center items-center">
                    <span className="text-sm text-gray-700 font-medium">
                        {messages[currentIndex]}
                    </span>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-gray-700 w-16 justify-end">
                    <span>🇮🇳</span>
                    <span>INR ▼</span>
                </div>
            </div>
        </div>
    );
};