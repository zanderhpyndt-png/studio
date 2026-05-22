
import React from 'react';
import { LinkLootLogo } from "@/components/LinkLootLogo";
import { SearchContainer } from "@/components/SearchContainer";
import { AuthButton } from "@/components/AuthButton";
import { Zap, Globe, Shield, Rocket, Info } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic News Banner */}
      <div className="w-full bg-primary/20 py-2 border-b border-white/5 overflow-hidden">
        <div className="animate-marquee gap-12 text-[10px] font-black uppercase tracking-widest text-white/80">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex gap-12 shrink-0">
              <span>🔥 Found 90% Off Viral Lamp</span>
              <span>🚀 AliExpress Direct Match: Keyboards</span>
              <span>💎 Drop-shipping Scam Exposed: $120 &rarr; $15</span>
              <span>⚡️ Match System Online v4.2</span>
            </div>
          ))}
        </div>
      </div>

      <header className="fixed top-12 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 px-6 py-3 flex items-center justify-between glass-card rounded-full border-white/10">
        <LinkLootLogo />
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6 text-xs font-black uppercase tracking-tighter">
            <a href="#how" className="hover:text-primary">How it works</a>
          </nav>
          <AuthButton />
        </div>
      </header>

      <main className="flex-1 pt-48 pb-20 px-6 max-w-7xl mx-auto w-full">
        <section className="text-center space-y-12 mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
            < Zap size={14} className="animate-pulse" /> Live Factory Matching
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.85]">
            STOP GETTING <br />
            <span className="text-gradient">ROBBED.</span>
          </h1>

          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            LinkLoot bypasses middleman markups by finding the <span className="text-white">original source</span> of any product link instantly.
          </p>

          <SearchContainer />
        </section>

        <section id="how" className="grid md:grid-cols-3 gap-8 mb-40">
          {[
            { title: "Source Tracking", desc: "We scan factory-direct sites like Alibaba and AliExpress.", icon: Globe, color: "text-accent" },
            { title: "Markup Expose", desc: "Exposing stores that mark up prices by 500% or more.", icon: Shield, color: "text-primary" },
            { title: "Loot Verified", desc: "Every match is ranked by reliability and total landed cost.", icon: Zap, color: "text-accent" }
          ].map((item, i) => (
            <div key={i} className="glass-card p-10 rounded-[3rem] space-y-4 hover:-translate-y-2 transition-transform">
              <div className={`h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center ${item.color}`}>
                <item.icon size={24} />
              </div>
              <h3 className="text-2xl font-black italic uppercase tracking-tighter">{item.title}</h3>
              <p className="text-muted-foreground font-medium text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="p-8 glass-card border-dashed border-primary/30 rounded-[2.5rem] bg-primary/5">
          <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-4">
            <Rocket size={14} className="text-primary" /> Deployment Guide
          </h4>
          <div className="grid md:grid-cols-2 gap-8 text-sm text-muted-foreground">
            <div className="space-y-4">
              <p>1. Create a GitHub repo named <strong>link-loot</strong>.</p>
              <p>2. Upload these files to that repo.</p>
              <p>3. Connect the repo to <strong>Firebase App Hosting</strong>.</p>
            </div>
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex gap-3 text-yellow-500">
              <Info size={20} className="shrink-0" />
              <div>
                <p className="font-bold">Important Note:</p>
                <p>The Search feature requires your API keys to be set in the Firebase Hosting Settings.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 bg-black px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-40">
          <span>&copy; {new Date().getFullYear()} LINKLOOT AI LABS</span>
          <div className="flex gap-8">
            <a href="#">X / Twitter</a>
            <a href="#">TikTok</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
