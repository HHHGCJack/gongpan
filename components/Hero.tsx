
import React, { useState, useEffect } from 'react';

const GREETINGS = ['你好', 'Hello', 'Hola', 'Bonjour', 'こんにちは', '안녕하세요'];

const Hero: React.FC = () => {
    const [greetingIndex, setGreetingIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setGreetingIndex(prevIndex => (prevIndex + 1) % GREETINGS.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="w-full h-[50vh] min-h-[300px] flex flex-col justify-center items-center text-center pt-12 px-4">
            <div className="relative flex justify-center items-center w-full my-8 h-24">
                {GREETINGS.map((word, index) => (
                    <h1 
                        key={word}
                        className="absolute text-6xl md:text-8xl font-bold text-gray-800 transition-all duration-500 ease-in-out"
                        style={{
                            opacity: greetingIndex === index ? 1 : 0,
                            transform: greetingIndex === index ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
                        }}
                    >
                        {word}
                    </h1>
                ))}
            </div>
            <p className="text-gray-500 text-sm tracking-widest uppercase opacity-80">Simple . Pure . Powerful</p>
        </section>
    );
};

export default Hero;
