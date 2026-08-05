import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 ${className}`}
    >
      <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-border">
        <Image
          src="/logo.png"
          alt="MaillotABJ"
          width={40}
          height={40}
          className="h-full w-full object-cover"
          priority
        />
      </span>
      <span className="hidden text-lg font-black uppercase tracking-tight text-foreground sm:inline">
        Maillot<span className="text-accent">ABJ</span>
      </span>
    </Link>
  );
}
