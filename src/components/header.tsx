import Link from 'next/link';
import { site } from '@/data/site';

export function Header() {
  return <header className="site-header"><div className="container header-inner"><Link className="brand" href="/">{site.name}</Link></div></header>;
}
