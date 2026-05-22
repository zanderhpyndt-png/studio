
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { extractProductDetails, ProductDetails } from '@/ai/flows/extract-product';
import { findProductMatches, ProductMatch } from '@/ai/flows/match-product';
import { LinkLootLogo } from "@/components/LinkLootLogo";
import { ComparisonCard } from "@/components/ComparisonCard";
import { AuthButton } from "@/components/AuthButton";
import { Loader2, Zap, ArrowLeft, ShieldAlert } from 'lucide-react';
import { Button } from "@/components/ui/button";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get('url');

  const [status, setStatus] = useState<'extracting' | 'matching' | 'completed' | 'error'>('extracting');
  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [matches, setMatches] = useState<ProductMatch[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      router.push('/');
      return;
    }

    const run = async () => {
      try {
        setStatus('extracting');
        const d = await extractProductDetails(url);
        setDetails(d);

        setStatus('matching');
        const m = await findProductMatches(d.productName, d.price);
        setMatches(m);

        setStatus('completed');
      } catch (err: any) {
        console.error(err);
        setError("AI Analysis failed. Please ensure the URL is correct and your API keys are set up.");
        setStatus('error');
      }
    };

    run();
  }, [url, router]);

  if (status === 'error') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-6">
        <ShieldAlert size={64} className="text-destructive animate-bounce" />
        <h1 className="text-4xl font-black uppercase italic tracking-tighter">Analysis Blocked</h1>
        <p className="text-muted-foreground max-w-sm">{error}</p>
        <Button onClick={() => router.push('/')} className="rounded-2xl px-8 font-black uppercase italic">
          <ArrowLeft className="mr-2" /> Abort Mission
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-40">
      <header className="fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between glass-card border-b-white/5">
        <LinkLootLogo />
        <AuthButton />
      </header>

      <main className="pt-32 px-6 max-w-4xl mx-auto space-y-12">
        {status !== 'completed' && (
          <div className="glass-card rounded-[3rem] p-20 text-center space-y-8 relative overflow-hidden">
             <div className="absolute top-0 left-0 h-1 bg-primary w-full animate-pulse" />
             <div className="flex justify-center">
               <Loader2 className="animate-spin text-primary" size={64} />
             </div>
             <div className="space-y-2">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter">
                  {status === 'extracting' ? 'Decoding Link...' : 'Finding Source...'}
                </h2>
                <p className="text-muted-foreground font-medium">Bypassing middleman markups across 200+ marketplaces.</p>
             </div>
          </div>
        )}

        {details && (
          <div className="glass-card rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-10 items-start">
            <div className="w-full md:w-64 aspect-square relative rounded-3xl overflow-hidden shadow-2xl shrink-0">
               <img src={details.productImages[0]} alt={details.productName} className="object-cover w-full h-full" />
            </div>
            <div className="space-y-6 pt-4">
              <span className="bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{details.category}</span>
              <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-[0.9]">{details.productName}</h1>
              <p className="text-3xl font-black italic">${details.price?.toFixed(2) || '???'}</p>
              <div className="p-4 bg-accent/10 border border-accent/20 rounded-2xl flex items-center gap-3">
                 <Zap className="text-accent" size={20} />
                 <p className="text-sm font-bold tracking-tight">AI Matching system is scanning factory direct stores.</p>
              </div>
            </div>
          </div>
        )}

        {status === 'completed' && (
          <div className="space-y-8">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter">Verified Loots Found</h3>
            <div className="grid gap-6">
              {matches.sort((a,b) => a.price - b.price).map((match, i) => (
                <ComparisonCard key={i} match={match} originalPrice={details?.price} isBest={i === 0} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-primary" size={64} />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
