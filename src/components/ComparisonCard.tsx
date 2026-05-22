
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink, TrendingDown, Truck, ShieldCheck } from 'lucide-react';

interface ComparisonCardProps {
  match: {
    productName: string;
    productUrl: string;
    storeName: string;
    price: number;
    shippingCost: number;
    estimatedDelivery: string;
  };
  originalPrice?: number;
  isBest?: boolean;
}

export function ComparisonCard({ match, originalPrice, isBest }: ComparisonCardProps) {
  const savings = originalPrice ? Math.round(((originalPrice - match.price) / originalPrice) * 100) : 0;

  return (
    <div className={`glass-card p-6 rounded-[2rem] flex flex-col md:flex-row items-center gap-8 border transition-all hover:border-primary/50 ${isBest ? 'border-primary/40 bg-primary/5' : 'border-white/5'}`}>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
           <span className="text-[10px] font-black uppercase tracking-widest text-primary px-3 py-1 bg-primary/10 rounded-full">{match.storeName}</span>
           <div className="flex items-center gap-1 text-xs font-bold text-accent">
              <ShieldCheck size={14} /> 99% MATCH
           </div>
        </div>
        <h4 className="text-2xl font-black italic uppercase tracking-tighter line-clamp-1">{match.productName}</h4>
        <div className="flex gap-4 text-[10px] font-bold text-muted-foreground uppercase">
          <span className="flex items-center gap-1"><Truck size={12} /> {match.shippingCost === 0 ? 'Free' : `$${match.shippingCost}`} Ship</span>
          <span>🚀 {match.estimatedDelivery}</span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3 shrink-0">
        <div className="text-right">
           <div className="flex items-center gap-2">
             <span className="text-4xl font-black italic">${match.price.toFixed(2)}</span>
             {savings > 0 && (
               <div className="bg-accent/20 text-accent text-[10px] font-black px-2 py-1 rounded-md flex items-center gap-1">
                 <TrendingDown size={12} /> {savings}% OFF
               </div>
             )}
           </div>
           <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Total Landed Price</p>
        </div>
        <Button asChild className="rounded-xl font-black uppercase italic tracking-tighter">
          <a href={match.productUrl} target="_blank">View Loot <ExternalLink size={14} className="ml-2" /></a>
        </Button>
      </div>
    </div>
  );
}
