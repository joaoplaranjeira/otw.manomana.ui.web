# mano mana

Frontend estático do **manomana.pt**, uma experiência familiar para registar palpites sobre a chegada do “Dino”. Construído com Next.js, React, TypeScript e Tailwind CSS.

## Arranque rápido com Docker Desktop

O modo predefinido liga, a partir do browser, à Web API disponível em `http://localhost:8080`.

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

O browser comunica diretamente com o endereço definido em `NEXT_PUBLIC_API_BASE_URL`. Por ser uma variável pública do Next.js, o endereço é incorporado no bundle durante o build. A Web API tem de permitir CORS para a origem do frontend.

Por omissão, não é necessário criar um ficheiro `.env`: o Docker Compose já aponta o browser para a Web API em `http://localhost:8080`. Para substituir o endereço, copiar o ficheiro de ambiente adequado:

```bash
cp .env.development.example .env
```

Preencher o endereço e ativar o modo remoto:

```env
NEXT_PUBLIC_API_MODE=remote
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

Em produção, usar `.env.production.example` como base e substituir `NEXT_PUBLIC_API_BASE_URL` pelo URL público da Web API. Alterar qualquer variável `NEXT_PUBLIC_*` exige um novo build.

## Publicação no Render

Criar um **Static Site** com:

```text
Build Command: npm ci && npm run build
Publish Directory: out
```

Configurar no Static Site:

```env
NEXT_PUBLIC_API_MODE=remote
NEXT_PUBLIC_API_BASE_URL=https://nome-da-api.onrender.com
```

O domínio público, por exemplo `manomana.pt`, deve apontar para o Static Site. A API permanece num Web Service separado e deve permitir CORS para esse domínio.

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
