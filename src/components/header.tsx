'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { site } from '@/data/site';
export function Header() {
 const path = usePathname(); const [open,setOpen] = useState(false);
 return <header className="site-header"><div className="container header-inner"><Link className="brand" href="/" onClick={()=>setOpen(false)}>{site.name}</Link><button className="menu-toggle" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="main-nav" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><nav id="main-nav" aria-label="Main navigation" className={open?'main-nav is-open':'main-nav'}>{site.navigation.map(([label,href])=><Link key={href} href={href} aria-current={path===href?'page':undefined} onClick={()=>setOpen(false)}>{label}</Link>)}</nav></div></header>;
}
