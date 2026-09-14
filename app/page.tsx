import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {Header,Footer,Art,ArticleCard,SeriesBanner} from '@/components/magazine';
import {getArticles} from '@/lib/db';
export const dynamic='force-dynamic';
export default async function Home(){
 let articles;try{articles=await getArticles();}catch{return <><Header/><main className="empty-page"><h1>A edição está temporariamente indisponível.</h1><p>Tente abrir a página novamente em instantes.</p></main><Footer/></>}
 const hero=articles[0];
 return <><Header/><main><section className="masthead"><div className="masthead-line"><span>REVISTA INDEPENDENTE</span><span>SOBRE IA E TUDO O QUE SOMOS.</span></div><div className="masthead-word" aria-label="NOEMA">NOEMA<span className="masthead-asterisk" aria-hidden="true">✳</span></div></section>
 {hero?<section className="lead-story"><div className="lead-copy"><span className="eyebrow"><span className="red-rule"/> EM DESTAQUE / {hero.category}</span><h1><Link href={'/artigos/'+hero.slug}>{hero.title}</Link></h1><p>{hero.excerpt}</p><Link className="round-link" href={'/artigos/'+hero.slug}>Ler o artigo <span><ArrowUpRight size={25}/></span></Link></div><Link href={'/artigos/'+hero.slug} className="lead-art" aria-label={hero.title}><Art cover={hero.cover}/><span className="art-caption">FILOSOFIA / TECNOLOGIA / SOCIEDADE</span></Link></section>:<section className="empty-page"><h1>A próxima edição está a caminho.</h1></section>}
 <section className="articles-section" id="artigos"><div className="section-title"><div><span className="eyebrow">O QUE ESTÁ EM PAUTA</span><h2>Últimas leituras<span>.</span></h2></div><span className="count">{String(articles.length).padStart(2,'0')} ARTIGOS</span></div><div className="articles-grid">{articles.map(a=><ArticleCard key={a.id} article={a}/>)}</div></section><SeriesBanner/></main><Footer/></>
}
