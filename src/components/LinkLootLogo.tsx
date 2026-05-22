
import React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export function LinkLootLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
        <Zap className="text-white fill-current" size={20} />
      </div>
      <span className="text-2xl font-black italic tracking-tighter uppercase">Link<span className="text-primary">Loot</span></span>
    </Link>
  );
}
