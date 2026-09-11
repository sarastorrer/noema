import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:{default:'NOEMA — Inteligência artificial. Pensamento independente.',template:'%s | NOEMA'},description:'Uma revista independente sobre inteligência artificial, filosofia, cultura e poder.',icons:{icon:'/favicon.svg',shortcut:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
