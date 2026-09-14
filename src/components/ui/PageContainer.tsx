import type { ReactNode } from "react";
import { Logo } from "./Logo";

export function PageContainer({ children, wide = false, showNav = true }: { children: ReactNode; wide?: boolean; showNav?: boolean }) {
  return (
    <div className="site-shell">
      {showNav && <header className="site-header"><Logo /><nav><a href="/resultado">Apostas</a><a href="/ranking">Ranking</a></nav></header>}
      <main className={wide ? "container container--wide" : "container"}>{children}</main>
      <footer className="site-footer"><span>Feito com carinho para o Dino.</span><span aria-hidden="true">•••</span></footer>
    </div>
  );
}
