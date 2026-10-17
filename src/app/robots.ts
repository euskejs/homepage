import { site } from '@/data/site';
export default function robots(){return {rules:{userAgent:'*',allow:'/',disallow:'/reference-homepage.png'},sitemap:`${site.url}/sitemap.xml`};}
