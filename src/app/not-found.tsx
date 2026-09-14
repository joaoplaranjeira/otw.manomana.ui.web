import { Button } from "@/components/ui/Button";
import { PageContainer } from "@/components/ui/PageContainer";

export default function NotFound() {
  return <PageContainer><section className="empty"><p className="eyebrow">Erro 404</p><h1>Este ovo está vazio.</h1><p>A página que procuras não existe.</p><Button href="/">Voltar ao início</Button></section></PageContainer>;
}
