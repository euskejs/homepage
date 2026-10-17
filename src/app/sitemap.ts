import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
export default function sitemap():MetadataRoute.Sitemap{return [...site.navigation, ['Contact', '/contact']].map(([,path])=>({url:`${site.url}${path}`,changeFrequency:'monthly',priority:path==='/'?1:0.7}));}
