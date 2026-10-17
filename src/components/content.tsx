import Image from 'next/image';
import { RadioTower, Radar, Settings, Glasses, UserRound } from 'lucide-react';
import { site } from '@/data/site';
const icons = [RadioTower, Radar, Settings, Glasses];
export function Portrait() { return site.portrait ? <Image className="portrait" src={site.portrait} alt={site.name} width={340} height={410} priority/> : <div className="portrait-placeholder"><UserRound aria-hidden="true" strokeWidth={0.7}/><span>{site.portraitPlaceholder}</span></div>; }
export function Career({expanded=false}:{expanded?:boolean}) { return <ol className={expanded?'career career-expanded':'career'}>{site.career.map(item=><li key={item.company}><h3>{expanded ? item.company : <Image className="company-logo" src={item.logo.src} alt={item.company} width={item.logo.width} height={item.logo.height} sizes="125px"/>}</h3><div className="timeline-marker"/><p className="years">{item.years}</p><p className="muted">{item.description}</p></li>)}</ol>; }
export function Focus() { return <ul className="focus-grid">{site.focus.map((item,i)=>{const Icon=icons[i];return <li key={item.title}><Icon aria-hidden="true" strokeWidth={1.5}/><div><h3>{item.title}</h3><p className="muted">{item.description}</p></div></li>;})}</ul>; }
