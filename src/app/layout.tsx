import type { Metadata } from 'next';
import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { site } from '@/data/site';
import { Header } from '@/components/header';
import './globals.css';
export const metadata: Metadata = {metadataBase:new URL(site.url),title:{default:`${site.name} | ${site.role}`,template:`%s | ${site.name}`},description:site.bio,openGraph:{type:'website',siteName:site.name,title:site.headline,description:site.bio},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Header/>{children}<footer className="container footer"><div><Link className="footer-name" href="/">{site.name}</Link><p>{site.role}</p></div><nav aria-label="Footer navigation">{site.navigation.map(([name,href])=><Link href={href} key={href}>{name}</Link>)}{site.email&&<a href={`mailto:${site.email}`} aria-label={`Email ${site.name}`}><Mail size={20}/></a>}{site.socials.linkedin&&<a href={site.socials.linkedin} aria-label="LinkedIn"><Linkedin size={20}/></a>}{site.socials.github&&<a href={site.socials.github} aria-label="GitHub"><Github size={20}/></a>}</nav></footer></body></html>; }
