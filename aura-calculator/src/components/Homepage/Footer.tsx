"use client";

import { motion } from "framer-motion";
import { Flame, ExternalLink, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0a0005]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent mb-12" />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Flame className="w-8 h-8 text-orange-500" />
            <span className="text-3xl font-black text-white/90">AURA CALCULATOR</span>
            <Flame className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-white/40 text-sm">
            The most dangerous personality test on the internet.
          </p>
        </motion.div>

        {/* Made by */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-white/30 text-sm mb-2">
            Engineered with psychological precision
          </p>
          <p className="text-xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Made by Harshit Mishra
            </span>
          </p>
        </motion.div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[
            { icon: <ExternalLink className="w-5 h-5" />, label: "GitHub", href: "https://github.com" },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:border-orange-500/50 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              aria-label={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <div className="flex items-center justify-center gap-2 text-white/30 text-xs">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          <span>and a lot of</span>
          <Flame className="w-3 h-3 text-orange-500" />
        </div>

        <p className="text-white/20 text-xs mt-4">
          © {new Date().getFullYear()} Aura Calculator. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
