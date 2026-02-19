"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import Image from "next/image";

export const Hero = () => {
    return (
        <div className="min-h-[100vh] w-full flex items-center justify-center bg-black antialiased relative overflow-hidden">
            {/* Ambient background orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[150px]" />
            </div>

            {/* Grid background */}
            <div className="absolute inset-0 bg-grid-white/[0.02]" />

            {/* Spotlight */}
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />

            {/* Split Layout Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16 py-24 md:py-0">

                {/* Left side — Text */}
                <div className="flex-1 text-center md:text-left max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Premium "Available for Work" Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-flex mb-12"
                        >
                            <div className="available-badge-wrapper">
                                <div className="available-badge-border" />
                                <div className="available-badge-inner">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                                    </span>
                                    <span className="text-xs font-semibold tracking-[0.2em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-300">
                                        Available for work
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-neutral-400">
                            Rushabh
                        </span>
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
                            Ramani
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-8 text-lg md:text-xl text-neutral-400 leading-relaxed"
                    >
                        Full Stack Developer crafting digital experiences that merge{" "}
                        <span className="text-white font-medium">creativity</span> with{" "}
                        <span className="text-white font-medium">engineering</span>.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="mt-14 flex flex-wrap gap-5 justify-center md:justify-start"
                    >
                        <a
                            href="/projects"
                            style={{ padding: '14px 36px', fontSize: '16px' }}
                            className="rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold tracking-wide transition-all duration-300 hover:from-blue-500 hover:to-cyan-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] hover:scale-105 active:scale-[0.98] inline-block"
                        >
                            Explore My Work
                        </a>
                        <a
                            href="/contact"
                            style={{ padding: '14px 36px', fontSize: '16px' }}
                            className="rounded-full border border-white/25 text-neutral-200 font-semibold tracking-wide transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] hover:scale-105 active:scale-[0.98] inline-block backdrop-blur-sm"
                        >
                            Get in Touch
                        </a>
                    </motion.div>
                </div>

                {/* Right side — Portrait Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-shrink-0 relative group"
                >
                    {/* Ambient glow behind portrait */}
                    <div className="absolute -inset-8 bg-gradient-to-br from-blue-500/12 via-blue-400/8 to-cyan-500/12 rounded-[2rem] blur-[60px] opacity-40 group-hover:opacity-55 transition-opacity duration-700 animate-portrait-glow" />

                    {/* Rotating gradient border ring */}
                    <div className="relative p-[3px] rounded-[1.5rem] bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 animate-gradient-rotate shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                        <div className="rounded-[calc(1.5rem-3px)] overflow-hidden bg-black/80 backdrop-blur-sm">
                            <div className="relative w-[280px] h-[340px] md:w-[320px] md:h-[400px] lg:w-[360px] lg:h-[450px] overflow-hidden rounded-[calc(1.5rem-3px)]">
                                <Image
                                    src="/porfolio.png"
                                    alt="Rushabh Ramani"
                                    fill
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                                {/* Subtle vignette overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Decorative floating elements */}
                    <motion.div
                        animate={{ y: [-8, 8, -8] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-4 -right-4 w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/20 backdrop-blur-sm"
                    />
                    <motion.div
                        animate={{ y: [6, -6, 6] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-blue-400/15 border border-blue-400/20 backdrop-blur-sm"
                    />
                    <motion.div
                        animate={{ y: [-4, 4, -4] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 -right-6 w-4 h-4 rounded-full bg-cyan-500/15 border border-cyan-500/20 backdrop-blur-sm"
                    />
                </motion.div>
            </div>


        </div>
    );
};

export const Spotlight = ({
    className,
    fill,
}: {
    className?: string;
    fill?: string;
}) => {
    return (
        <svg
            className={cn(
                "animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0",
                className
            )}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 3787 2842"
            fill="none"
        >
            <g filter="url(#filter0_f_292_213)">
                <ellipse
                    cx="1924.71"
                    cy="273.501"
                    rx="1924.71"
                    ry="273.501"
                    transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
                    fill={fill || "white"}
                    fillOpacity="0.10"
                ></ellipse>
            </g>
            <defs>
                <filter
                    id="filter0_f_292_213"
                    x="0.860352"
                    y="0.838989"
                    width="3785.16"
                    height="2840.26"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    ></feBlend>
                    <feGaussianBlur
                        stdDeviation="151"
                        result="effect1_foregroundBlur_292_213"
                    ></feGaussianBlur>
                </filter>
            </defs>
        </svg>
    );
};
