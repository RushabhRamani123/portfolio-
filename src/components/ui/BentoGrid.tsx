"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={cn(
                "row-span-1 rounded-2xl group/bento transition-all duration-300 p-5",
                "bg-gradient-to-br from-neutral-900/80 to-neutral-950/80",
                "border border-white/[0.08] hover:border-white/[0.15]",
                "backdrop-blur-xl shadow-xl",
                "hover:shadow-2xl hover:shadow-blue-500/5",
                "justify-between flex flex-col space-y-4",
                "relative overflow-hidden",
                className
            )}
        >
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
            {header}
            <div className="group-hover/bento:translate-x-2 transition duration-300 relative z-10">
                {icon}
                <div className="font-sans font-bold text-white text-lg mb-1 mt-2 tracking-tight">
                    {title}
                </div>
                <div className="font-sans font-normal text-neutral-400 text-sm leading-relaxed">
                    {description}
                </div>
            </div>
        </motion.div>
    );
};
