import React from 'react';
import { motion } from 'framer-motion';

const features = [
    {
        title: "High Performance",
        description: "Optimized for speed with zero bloat.",
        icon: "⚡"
    },
    {
        title: "Modern Design",
        description: "Glassmorphism and gradients out of the box.",
        icon: "🎨"
    },
    {
        title: "Responsive",
        description: "Looks perfect on all devices and screens.",
        icon: "📱"
    }
];

export const Features = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="glass-card p-8 hover:bg-white/5 border border-white/10"
                >
                    <div className="text-4xl mb-6">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3 font-outfit">
                        {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                        {feature.description}
                    </p>
                </motion.div>
            ))}
        </div>
    );
};
