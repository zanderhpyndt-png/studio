
'use client';

import { Button } from "@/components/ui/button";
import { useUser, useAuth } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";

export function AuthButton() {
  const { user, loading } = useUser();
  const auth = useAuth();

  const login = async () => {
    if (!auth) return;
    await signInWithPopup(auth, new GoogleAuthProvider());
  };

  if (loading) return <div className="h-10 w-10 bg-white/5 rounded-full animate-pulse" />;

  if (!user) {
    return (
      <Button onClick={login} variant="outline" className="rounded-full px-6 font-black uppercase text-[10px] tracking-widest border-white/10 hover:bg-white/5">
        Join the Loot
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="h-10 w-10 border border-primary/50 shadow-lg">
          <AvatarImage src={user.photoURL || undefined} />
          <AvatarFallback><User /></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-card border-white/10 w-48 mt-2">
        <DropdownMenuItem className="text-[10px] font-black uppercase opacity-60 px-4 py-2">{user.displayName}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut(auth!)} className="text-destructive font-black uppercase italic text-xs cursor-pointer px-4 py-3">
          <LogOut className="mr-2" size={16} /> Exit Base
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
