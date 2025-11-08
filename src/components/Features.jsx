import React from 'react';
import { Rocket, Star, Mic, FileText } from 'lucide-react';

const features = [
  {
    icon: Rocket,
    title: 'Cinematic Landing',
    desc: 'Spline-powered hero with GSAP/Framer micro-interactions and graceful fallbacks.',
  },
  {
    icon: Mic,
    title: 'Chat + Voice',
    desc: 'Token-streaming UI with voice input and TTS-ready states.',
  },
  {
    icon: FileText,
    title: 'AI Reports',
    desc: 'Queued generation and polished PDF exports in your dashboard.',
  },
  {
    icon: Star,
    title: 'Cosmic Visuals',
    desc: 'Three.js shaders and particles tuned for performance and accessibility.',
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-black py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-semibold md:text-4xl">What you get</h2>
        <p className="mt-3 text-center text-white/70">A focused preview of the AURA experience.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition hover:border-white/20">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium">{title}</h3>
              <p className="mt-2 text-sm text-white/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
