import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import EngineeringPhilosophy from '../components/EngineeringPhilosophy';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import SplashScreen from '../components/SplashScreen';
import FlowingBackground from '../components/FlowingBackground';

const Home = () => {
    const [splashDone, setSplashDone] = useState(false);

    return (
        <>
            <SplashScreen onDone={() => setSplashDone(true)} />
            {splashDone && (
                <>
                    <ScrollProgress />
                    <div className="min-h-screen text-white relative">
                        <FlowingBackground />
                        {/* Noise texture overlay */}
                        <div
                            className="fixed inset-0 pointer-events-none z-[1]"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
                                opacity: 0.25,
                            }}
                        />
                        <Navbar />
                        <main>
                            <Hero />
                            <EngineeringPhilosophy />
                            <About />
                            <Skills />
                            <Projects />
                            <Contact />
                        </main>
                        <Footer />
                    </div>
                </>
            )}
        </>
    );
};

export default Home;
