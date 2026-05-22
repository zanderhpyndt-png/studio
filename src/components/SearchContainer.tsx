
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from 'lucide-react';

export function SearchContainer() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    router.push(`/search?url=${encodeURIComponent(url)}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto w-full group">
      <div className="relative">
        <Input 
          placeholder="Paste Amazon, IKEA, or Viral Product link..."
          className="h-20 pl-14 pr-40 text-lg rounded-[2rem] bg-card/50 backdrop-blur-md border-white/10 focus:border-primary/50 transition-all shadow-2xl"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={24} />
        <Button 
          type="submit" 
          className="absolute right-3 top-1/2 -translate-y-1/2 h-14 px-8 rounded-2xl bg-primary text-white font-black italic uppercase tracking-tighter hover:scale-105 transition-transform"
          disabled={loading || !url}
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Loot It'}
        </Button>
      </div>
      <div className="mt-4 flex justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
        <span className="flex items-center gap-1">● Direct Factory Linking</span>
        <span className="flex items-center gap-1">● Middleman Expose</span>
      </div>
    </form>
  );
}
