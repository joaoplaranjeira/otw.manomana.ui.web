# manomana.pt — Frontend Specification

## 1. Contexto do produto

O **manomana.pt** é uma pequena plataforma familiar para amigos e familiares adivinharem se o bebé que está prestes a nascer será **mano ou mana**.

O conceito nasce de uma expressão usada pela Maria Francisca, que diz que vai ter um **“mano mana”**, porque a família decidiu não saber nem revelar antecipadamente o sexo do bebé.

Existe ainda uma pequena tradição familiar: tanto a Maria Francisca como este bebé foram chamados de **“Dino”** durante a gravidez. A identidade visual pode, por isso, incluir referências subtis a dinossauros.

A plataforma deverá transmitir proximidade, carinho e expectativa, mas sem cair num visual infantil, demasiado colorido ou cliché.

---

## 2. Objetivo principal

Criar uma experiência simples e emocional onde cada convidado possa:

1. Entrar no site.
2. Perceber imediatamente o conceito.
3. Registar o seu palpite.
4. Escolher se acha que será **Mano** ou **Mana**.
5. Opcionalmente adivinhar:
   - data de nascimento;
   - hora de nascimento;
   - peso ao nascer;
   - nome do bebé.
6. Ver a distribuição agregada dos palpites.
7. Depois do nascimento, descobrir:
   - o sexo;
   - os dados reais do nascimento;
   - quem acertou;
   - quem ficou mais perto;
   - ranking final.

---

# 3. Princípios de design

## 3.1. Referências

O design deve inspirar-se na filosofia visual de:

- Apple
- Uber
- Linear
- Stripe

Características pretendidas:

- extremamente minimalista;
- muito espaço em branco;
- tipografia grande;
- poucos elementos por ecrã;
- hierarquia visual muito clara;
- animações suaves;
- excelente experiência mobile;
- ausência de ruído visual;
- sensação premium.

Não copiar diretamente nenhuma destas marcas.

---

## 3.2. Personalidade visual

Palavras-chave:

- familiar;
- elegante;
- caloroso;
- minimalista;
- divertido sem ser infantil;
- premium;
- memorável.

Evitar:

- excesso de rosa e azul;
- iconografia infantil genérica;
- balões;
- chupetas;
- cegonhas;
- confettis permanentes;
- demasiados emojis;
- cards e caixas em excesso.

---

# 4. Identidade

## Nome

**mano mana**

Preferencialmente representado visualmente em lowercase:

`mano mana`

Domínio:

`manomana.pt`

---

## 4.1. Taglines possíveis

Principal:

> Será mano ou será mana?

Alternativas:

> A Maria Francisca quer saber: mano ou mana?

> O Dino está quase a chegar.

> Façam as vossas apostas.

---

# 5. Conceito Dino

A referência a dinossauros deverá ser subtil.

Nunca transformar o site num site infantil de dinossauros.

Sugestões:

- pequeno contorno de um dinossauro minimalista;
- pegadas de dinossauro usadas pontualmente;
- ovo minimalista;
- pequena cauda de Dino integrada no logótipo;
- animação muito leve de um Dino ao concluir o voto;
- easter eggs discretos;
- texto ocasional:
  - “O Dino está quase a sair do ovo.”
  - “Palpite registado. O Dino agradece.”

Estilo do Dino:

- line art;
- monocromático;
- geometria simples;
- sem cartoon exagerado.

---

# 6. Paleta

Base neutra.

Sugestão:

- background: `#F7F6F2`
- primary text: `#111111`
- secondary text: `#6B6B6B`
- surfaces: `#FFFFFF`
- border: `#E8E6E1`

Cor de destaque discreta:

- sage / olive suave;
- ou terracotta muito suave.

IMPORTANTE:

Antes do nascimento, **não usar rosa/azul como códigos para sexo**.

As opções Mano e Mana deverão ter exatamente o mesmo peso visual.

Depois da revelação poderá ser introduzida uma cor comemorativa, mas mantendo a estética minimalista.

---

# 7. Tipografia

Preferência:

- `Inter`
- fallback system:
  - `-apple-system`
  - `BlinkMacSystemFont`
  - `Segoe UI`
  - sans-serif

Headlines:

- grandes;
- bold ou semi-bold;
- tracking ligeiramente negativo.

Body:

- muito legível;
- 16–18px em mobile.

---

# 8. Stack recomendada

Criar frontend com:

- Next.js
- React
- TypeScript
- Tailwind CSS

Preferência:

- Next.js App Router

Outras opções aceitáveis:

- React + Vite

Caso seja usado Next.js:

- usar Server Components quando fizer sentido;
- usar Client Components apenas para interatividade;
- estruturar acesso à API num módulo próprio.

---

# 9. Responsive

Prioridade:

**mobile-first**

A maior parte dos utilizadores irá aceder através de um link recebido por:

- WhatsApp;
- Instagram;
- Messenger;
- SMS.

Breakpoints principais:

- mobile;
- tablet;
- desktop.

No desktop o conteúdo deverá permanecer relativamente estreito.

Sugestão:

`max-width: 720px`

para fluxos principais.

---

# 10. Estrutura do site

Rotas sugeridas:

```text
/
 /apostar
 /resultado
 /ranking
 /admin
```

Poderá existir:

```text
/sobre
```

mas não é obrigatório.

---

# 11. Homepage

## Hero

Full viewport ou próximo disso.

Conteúdo:

```text
mano mana

Será mano ou será mana?

O Dino está quase a chegar.
A Maria Francisca ainda não sabe se vai ganhar um mano ou uma mana.

Faz o teu palpite.
```

CTA principal:

`Fazer o meu palpite`

CTA secundário:

`Ver as apostas`

---

## Elemento visual

Uma ilustração minimalista.

Sugestão:

um ovo de dinossauro representado apenas através de linhas.

Pode existir uma pequena animação respiratória muito suave.

Nada intrusivo.

---

# 12. Fluxo de aposta

O preenchimento deverá parecer uma experiência e não um formulário tradicional.

Idealmente usar **um passo por ecrã**.

---

## Passo 1 — Identificação

Headline:

> Primeiro: quem és?

Campo:

`Nome`

Placeholder:

`O teu nome`

CTA:

`Continuar`

---

## Passo 2 — Mano ou Mana

Headline:

> Então... qual é o teu palpite?

Dois grandes botões:

```text
MANO
MANA
```

Ambos monocromáticos.

Estado selecionado:

- background escuro;
- texto branco.

Não usar rosa/azul.

---

## Passo 3 — Data

Headline:

> Quando achas que o Dino vai chegar?

Date picker.

A data deverá ser opcional.

CTA:

`Continuar`

Link:

`Prefiro não adivinhar`

---

## Passo 4 — Hora

Headline:

> E a que horas?

Time picker.

Opcional.

---

## Passo 5 — Peso

Headline:

> Quanto vai pesar?

Input numérico.

Unidade:

`g`

Exemplo:

`3250 g`

Opcional.

---

## Passo 6 — Nome

Headline:

> Última aposta: qual será o nome?

Input texto.

Opcional.

---

## Passo 7 — Confirmação

Mostrar resumo:

```text
João

MANO

18 setembro
03:42
3270 g

Nome:
Tomás
```

CTA:

`Confirmar palpite`

Secundário:

`Alterar`

---

# 13. Sucesso

Após submissão:

Headline:

> Palpite registado.

Texto:

> Agora só falta o Dino decidir quando quer aparecer.

Pequena animação:

- ovo;
- pegadas;
- mini Dino.

CTA:

`Ver como estão as apostas`

---

# 14. Resultados antes do nascimento

Nunca revelar informação que permita inferir o resultado verdadeiro.

Exemplo:

```text
Até agora...

MANO
46%

MANA
54%

87 palpites
```

Visualização:

barra horizontal minimalista.

Mostrar também:

```text
Data média prevista
18 setembro

Peso médio previsto
3,240 kg
```

Opcional:

lista dos últimos participantes.

---

# 15. Privacidade dos palpites

Antes da revelação:

Pode mostrar:

- nomes de participantes;
- sexo escolhido.

Mas idealmente **não mostrar todos os restantes palpites individuais**, para manter surpresa.

Configuração controlável no backend.

---

# 16. Estado fechado

Quando as apostas forem encerradas:

Headline:

> As apostas fecharam.

Texto:

> Agora já não vale mudar de ideias.

Mostrar:

```text
102 participantes

MANO 48%
MANA 52%
```

CTA:

`Aguardar pelo Dino`

---

# 17. Reveal

Após o nascimento, a homepage muda automaticamente.

Estrutura:

```text
O Dino chegou.

É...

MANO
```

ou

```text
MANA
```

Depois:

```text
18 setembro 2026

03:42

3,270 kg
```

Pode existir fotografia opcional do bebé.

---

# 18. Ranking

Depois do nascimento:

Headline:

> Quem conhece melhor o Dino?

Tabela simples:

```text
1. Ana
2. Pedro
3. Sofia
```

Mostrar pontos.

Ao abrir participante:

```text
Sexo .......... certo
Data .......... +1 dia
Hora .......... +22 min
Peso .......... -30 g
```

---

# 19. Sistema de pontuação

Sugestão:

### Sexo

Correto:

`100 pontos`

Errado:

`0 pontos`

### Data

Máximo:

`40 pontos`

Reduz progressivamente conforme diferença em dias.

Exemplo:

```text
0 dias = 40
1 dia = 35
2 dias = 30
3 dias = 25
4 dias = 20
5 dias = 15
6 dias = 10
7 dias = 5
>7 = 0
```

### Hora

Máximo:

`30 pontos`

Baseada na diferença absoluta em minutos.

### Peso

Máximo:

`30 pontos`

Exemplo:

```text
<= 25 g = 30
<= 50 g = 25
<= 100 g = 20
<= 150 g = 15
<= 250 g = 10
<= 400 g = 5
> 400 g = 0
```

### Nome

Por defeito sem pontuação.

Pode existir badge:

`Acertou no nome`

---

# 20. Admin

Rota:

`/admin`

Não deverá estar ligada na navegação pública.

Autenticação simples.

Pode usar:

- username/password;
- JWT;
- ou token administrativo.

---

## Dashboard

Mostrar:

```text
Total de palpites
Mano
Mana
Últimos palpites
```

Ações:

- abrir apostas;
- fechar apostas;
- introduzir nascimento;
- publicar reveal;
- editar dados reais;
- remover aposta;
- exportar CSV.

---

# 21. Formulário nascimento

Campos:

```text
Sexo
Data
Hora
Peso
Nome
Fotografia opcional
```

Botão:

`Guardar`

Separado:

`PUBLICAR REVEAL`

Deve existir confirmação antes da publicação.

---

# 22. Componentes

Criar componentes reutilizáveis:

```text
Button
TextInput
NumberInput
DateInput
TimeInput
ProgressBar
GenderChoice
PredictionSummary
PredictionStats
RankingRow
Modal
Toast
DinoIcon
Logo
PageContainer
```

---

# 23. Estrutura frontend sugerida

```text
src/
  app/
    page.tsx
    apostar/
      page.tsx
    resultado/
      page.tsx
    ranking/
      page.tsx
    admin/
      page.tsx

  components/
    ui/
    prediction/
    result/
    admin/

  lib/
    api/
    types/
    utils/

  hooks/

  styles/
```

---

# 24. Comunicação com API

Criar módulo:

```text
src/lib/api
```

Nunca espalhar chamadas `fetch()` pelos componentes.

Exemplo:

```text
predictionApi.ts
eventApi.ts
adminApi.ts
```

---

# 25. Endpoints esperados

```text
GET  /api/event

POST /api/predictions

GET  /api/predictions/stats

GET  /api/predictions/{id}

GET  /api/ranking

POST /api/admin/login

GET  /api/admin/predictions

POST /api/admin/event/close

POST /api/admin/event/open

POST /api/admin/birth

POST /api/admin/birth/publish
```

---

# 26. Modelo frontend

```ts
type GenderPrediction = "Boy" | "Girl";

interface PredictionRequest {
  name: string;
  gender: GenderPrediction;
  predictedBirthDate?: string;
  predictedBirthTime?: string;
  predictedWeightGrams?: number;
  predictedName?: string;
}

interface PredictionStats {
  total: number;
  boy: number;
  girl: number;
  boyPercentage: number;
  girlPercentage: number;
  averageBirthDate?: string;
  averageWeightGrams?: number;
}

interface BirthResult {
  gender: GenderPrediction;
  birthDate: string;
  birthTime: string;
  weightGrams: number;
  name: string;
  photoUrl?: string;
}
```

---

# 27. Estados globais do evento

Frontend deverá interpretar:

```ts
type EventStatus =
  | "Open"
  | "Closed"
  | "Born"
  | "Published";
```

### Open

Aceita apostas.

### Closed

Não aceita apostas.

### Born

Nascimento registado no backend, mas ainda secreto.

IMPORTANTE:

O frontend público **não pode receber os dados reais** neste estado.

### Published

Reveal disponível.

---

# 28. Animações

Utilizar animações apenas para reforçar interações.

Exemplos:

- fade;
- slide vertical muito leve;
- hover de 150–200ms;
- transição entre etapas;
- pequeno movimento do Dino.

Evitar:

- animações constantes;
- parallax agressivo;
- confetti permanente.

Opcional:

`framer-motion`

---

# 29. Acessibilidade

Garantir:

- WCAG AA quando possível;
- navegação por teclado;
- labels;
- focus states;
- contraste suficiente;
- botões grandes em mobile.

---

# 30. SEO

Metadata:

```text
title:
mano mana

description:
Será mano ou será mana? Faz o teu palpite antes do Dino chegar.
```

OpenGraph:

imagem personalizada para partilha no WhatsApp.

Nunca incluir resultado real no metadata antes do reveal.

---

# 31. PWA

Não é obrigatório.

Pode ser preparado para instalação futura, mas não deve atrasar o MVP.

---

# 32. Analytics

Opcional.

Se usado:

- privacy-first;
- evitar tracking desnecessário.

Possíveis eventos:

```text
page_view
prediction_started
prediction_completed
results_viewed
ranking_viewed
```

---

# 33. Critérios de qualidade

O frontend final deve:

- parecer premium;
- carregar rapidamente;
- ser excelente em iPhone;
- exigir poucos cliques;
- ter zero ruído visual;
- funcionar perfeitamente sem instruções;
- transmitir emoção através de copy e micro-interações;
- não parecer uma aplicação empresarial;
- não parecer um formulário tradicional.

---

# 34. Prioridade MVP

Implementar primeiro:

1. homepage;
2. fluxo de aposta;
3. submissão;
4. estatísticas;
5. estado fechado;
6. reveal;
7. ranking;
8. admin.

---

# 35. Mensagem principal para o Codex

Construir o frontend do **manomana.pt** como um produto pequeno mas altamente polido.

O objetivo não é maximizar funcionalidades.

O objetivo é criar uma experiência familiar, emocional e memorável com qualidade visual semelhante a produtos digitais premium.

Princípio:

> Menos interface. Mais emoção.
