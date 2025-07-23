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
        }, 5000);

        return () => clearInterval(interval);
    }, [messages.length]);

    return (
        <div className="w-full bg-[#f5ebdc] flex justify-center items-end h-[40px] overflow-hidden" data-component="PromotionStript-VariantA">
            <div className={`transition-transform duration-500 ease-in-out flex flex-col flex-reverse`} 
                style={{ transform: `translateY(${currentIndex*40}px)`}}>
                {messages.map((message) => {
                    return <div className='h-[40px] flex justify-center items-center'>
                        <span className="text-xs md:text-sm text-neautral-600 font-nromal">{message}</span>
                        </div>
                })}
            </div>
        </div>

    );
};
