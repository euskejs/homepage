import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { site } from '@/data/site';
import { Career, Focus, Portrait } from '@/components/content';
export default function Home() {return <main id="main"><section className="hero" aria-labelledby="hero-title"><div className="skyline-window" aria-hidden="true"><Image className="skyline" src={site.skyline} alt="" fill sizes="100vw" priority/></div><div className="container hero-inner"><div className="hero-copy"><p className="eyebrow">{site.eyebrow}</p><h1 id="hero-title">{site.headline}</h1><p className="hero-bio">{site.bio}</p><Link className="button" href="/ai-twin"><MessageCircle size={23} strokeWidth={1.5}/>{site.cta}</Link></div><Portrait/></div></section><div className="container overview"><section aria-labelledby="career-title"><h2 id="career-title">{site.careerHeading}</h2><p className="section-intro">{site.careerIntro}</p><Career/></section><section className="focus-section" aria-labelledby="focus-title"><h2 id="focus-title">{site.focusHeading}</h2><p className="section-intro">{site.focusIntro}</p><Focus/></section></div></main>;}
