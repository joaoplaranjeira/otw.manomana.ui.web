# mano mana

Frontend do **manomana.pt**, uma experiência familiar para registar palpites sobre a chegada do “Dino”. Construído com Next.js, React, TypeScript e Tailwind CSS.

## Arranque rápido com Docker Desktop

O modo predefinido liga à Web API disponível no computador anfitrião em `http://localhost:8080`. Dentro do contentor, o endereço é traduzido para `http://host.docker.internal:8080`.

```bash
docker compose up --build
```

Abrir [http://localhost:3000](http://localhost:3000).

Para desenvolvimento com hot reload:

```bash
docker compose --profile dev up web-dev
```

Abrir [http://localhost:3001](http://localhost:3001).

## Web API por ambiente

O browser comunica sempre com `/backend`. Uma route handler do Next.js reencaminha os pedidos para `API_BASE_URL`, mantendo o endereço da API fora do bundle público e permitindo alterá-lo em runtime.

Por omissão, não é necessário criar um ficheiro `.env`: o Docker Compose já usa a Web API em `http://host.docker.internal:8080`. Para substituir o endereço, copiar o ficheiro de ambiente adequado:

```bash
cp .env.development.example .env
```

2. Preencher o endereço e ativar o modo remoto:

```env
API_BASE_URL=http://host.docker.internal:8080
NEXT_PUBLIC_API_MODE=remote
```

Quando existir um URL de produção público, usar `.env.production.example` como base e substituir `API_BASE_URL`. Como `NEXT_PUBLIC_API_MODE` é usado no bundle, uma mudança entre `mock` e `remote` exige novo build da imagem; `API_BASE_URL` pode ser alterado em runtime.

## Desenvolvimento local

```bash
npm install
npm run dev
```

Validações:

```bash
npm run typecheck
npm run build
```

## Rotas

- `/` — homepage, fecho das apostas ou reveal consoante o estado;
- `/apostar` — fluxo de palpite em sete passos;
- `/resultado` — distribuição agregada e médias;
- `/ranking` — classificação disponível após o reveal;
- `/admin` — gestão do evento (não ligada na navegação pública).

Para usar o modo de demonstração sem Web API, executar `NEXT_PUBLIC_API_MODE=mock docker compose up --build`. Nesse modo, o acesso ao admin é `admin` / `dino`; estas credenciais existem apenas no mock local.

## Integração

As chamadas estão centralizadas em `src/lib/api`. Para ligar o backend, deverão respeitar os contratos descritos em `Instructions/FRONTEND.md`. O estado `Born` nunca apresenta os dados reais no frontend público; só `Published` ativa o reveal e o ranking.
