"use client";
import React from "react";
import { motion } from "framer-motion";

export const AmbientBackground = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.05, 0.08, 0.05],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[20%] -left-[10%] w-[100vw] h-[100vh] bg-[var(--sony-accent-blue)] rounded-full blur-[180px]"
            />
        </div>
    );
};
