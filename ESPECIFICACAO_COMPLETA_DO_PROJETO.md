# Especificação completa e contexto operacional do projeto

> Documento de transferência de contexto para pessoas e agentes de IA. Ele descreve o produto, a implementação atual, as decisões registradas no Git, os fluxos de trabalho, as regras que não podem ser quebradas, as lacunas conhecidas e os procedimentos seguros de manutenção.

## 1. Identificação e estado desta especificação

- **Projeto:** site institucional do Dr. Evaldo César Macau.
- **Repositório Git:** `https://github.com/drevaldosite/dr-evaldo-cesar-site.git`.
- **Branch de integração vigente:** `develop`.
- **Branch remota acompanhada:** `origin/develop`.
- **Commit-base examinado:** `34ddbb5` — `feat: cria política de privacidade completa`.
- **Data do levantamento:** 28 de setembro de 2026.
- **Idioma do produto e do conteúdo:** português do Brasil (`pt-BR`).
- **Diretório de trabalho usado no levantamento:** `C:\Users\manuf\Documents\ChatGPT\Dr. Evaldo`.

Este arquivo documenta o estado efetivamente encontrado no código e no histórico Git. Quando houver conflito entre este documento e a implementação, deve-se primeiro conferir o código atual e o histórico posterior ao commit-base acima; o código executável é a fonte de verdade para comportamento, `AGENTS.md` é a fonte de verdade para regras obrigatórias de cards de vídeo, e `src/config.ts` é a fonte central dos dados reutilizados de contato e identidade.

## 2. Visão executiva do produto

O projeto é uma landing page médica mobile-first para apresentar a atuação do Dr. Evaldo César Macau em Otorrinolaringologia e Otoneurologia em São Luís, Maranhão. O site tem quatro objetivos principais:

1. explicar áreas de atendimento, exames, procedimentos e cirurgias em linguagem acessível;
2. transmitir confiança por meio de formação, credenciais, locais de atendimento e opiniões públicas de pacientes;
3. publicar conteúdo educativo relacionado a tontura, equilíbrio, audição, ouvido, nariz e garganta;
4. converter visitas em contatos de agendamento, principalmente via WhatsApp.

Não existe área autenticada, painel administrativo, banco de dados, API própria, formulário interno, pagamento ou prontuário. O site é essencialmente estático e direciona o visitante para serviços externos como WhatsApp, Instagram, Doctoralia e Google Maps.

O conteúdo médico é educativo. A interface e o rodapé deixam claro que ele não substitui consulta médica. Nenhuma alteração futura deve inventar credenciais, estatísticas, depoimentos, indicações clínicas ou dados comerciais não confirmados.

## 3. Público, posicionamento e dados profissionais

### 3.1 Público principal

- adultos e responsáveis por crianças que buscam atendimento otorrinolaringológico;
- pessoas com tontura, vertigem, desequilíbrio, zumbido, perda auditiva ou sensação de ouvido tampado;
- pessoas com problemas de nariz, garganta, voz, sono, amígdalas e adenoide;
- pacientes que procuram avaliação, exames otoneurológicos ou cirurgia otorrinolaringológica em São Luís.

### 3.2 Identidade profissional exibida

- **Nome:** Dr. Evaldo César Macau.
- **Especialidade:** Otorrinolaringologia.
- **Ênfase de atuação:** Otoneurologia e cirurgia otorrinolaringológica.
- **CRM:** CRM-MA 10415.
- **RQE:** RQE 3698.
- **Graduação:** Medicina pela Universidade Federal do Maranhão (UFMA).
- **Residência:** Otorrinolaringologia pela Universidade Estadual de Campinas (UNICAMP).
- **Título:** especialista pela ABORL-CCF.
- **Aperfeiçoamento:** Otoneurologia na Universidade de Lisboa, Portugal.
- **Atuação informada:** médico assistente do HU-UFMA e responsável pelo Ambulatório de Otoneurologia.

### 3.3 Contato e presença externa no estado atual

- **WhatsApp em `src/config.ts`:** `+55 98 99143-3929`.
- **Telefone de exibição:** `(98) 99143-3929`.
- **Instagram:** `https://www.instagram.com/drevaldomacau` (`@drevaldomacau`).
- **Doctoralia:** `https://www.doctoralia.com.br/evaldo-cesar-macau/otorrino/santa-ines`.
- **URL oficial:** ainda está como `https://SEU-DOMINIO.com.br` e precisa ser substituída quando o domínio definitivo for conhecido.
- **Horário de atendimento:** não preenchido; a interface usa o fallback “Horários a confirmar com a equipe” quando necessário.

### 3.4 Locais de atendimento

1. **Executive Lake Center — Clínica Rhinus**

   Rua das Andirobas, 10, sala 405, Jardim Renascença, São Luís–MA, CEP 65075-040. Referência: próximo à Lagoa da Jansen.
2. **Unidade Medical Center Jaracaty — UDI Hospital**

   Avenida Professor Carlos Cunha, 1, Medical Center Jaracaty, 2º andar, Jaracaty, São Luís–MA, CEP 65076-820.

Cada unidade possui link de rota e mensagem de WhatsApp própria no array `locations` de `src/App.tsx`.

## 4. Escopo funcional atual

### 4.1 Estrutura da página principal

A aplicação React monta, nesta ordem lógica, os seguintes blocos:

1. cabeçalho e navegação;
2. hero (`#inicio`);
3. áreas de atendimento (`#especialidades`);
4. Coblation® (`#procedimentos`);
5. exames e procedimentos (`#exames`);
6. cirurgias (`#cirurgias`);
7. apresentação do especialista (`#sobre`);
8. formação e atuação profissional;
9. conteúdos e orientações (`#conteudos`);
10. locais de atendimento (`#locais`);
11. relatos públicos e carrossel de opiniões;
12. perguntas frequentes (`#duvidas`);
13. contato (`#contato`);
14. rodapé;
15. botão flutuante contextual de WhatsApp.

Em telas menores, `main` usa Flexbox e algumas seções recebem `order` no CSS. Em desktop, a partir de 900 px, `main` volta a `display: block`. Ao alterar a ordem visual, é necessário conferir tanto a ordem do JSX quanto os valores `order` de `src/styles.css`.

### 4.2 Áreas de atendimento

Há seis cards em `specialties`:

- Otoneurologia: tontura, vertigem e equilíbrio;
- zumbido e alterações auditivas;
- exames otoneurológicos;
- cirurgia de amígdalas e adenoide com Coblation®;
- cirurgia otorrinolaringológica;
- otorrinolaringologia geral.

Alguns ícones são componentes Lucide e outros são SVGs próprios em `public/images/`. O card de Coblation® direciona para `#procedimentos`; os demais direcionam para contato. No mobile, os links internos dos cards ficam ocultos pelo CSS e existe um CTA geral após o grid.

### 4.3 Narrativas de procedimentos

O componente reutilizável `ProcedureNarrative` renderiza três conjuntos:

- **Coblation®:** um capítulo extenso, imagem/poster e vídeo responsivo;
- **Exames:** videonistagmoscopia infravermelha, vHIT, videoendoscopia nasossinusal, videolaringoscopia, posturografia, manobras de reposicionamento para VPPB e aplicação intratimpânica de medicamentos;
- **Cirurgias:** septoplastia, cirurgia dos cornetos nasais, cirurgia endoscópica nasossinusal e microcirurgia da laringe.

Em desktop, imagens e textos formam uma narrativa visual ativada pelo avanço do scroll. Em telas intermediárias, a implementação mede a altura do maior capítulo e decide entre layout sticky e fluxo normal. Abaixo de 600 px, aplica fluxo compacto com figuras inline e revelação progressiva dos itens. Se `prefers-reduced-motion: reduce` estiver ativo, o aprimoramento animado não é aplicado.

### 4.4 Conteúdos e páginas educativas

O array `instagramPosts` contém sete cards. Quatro usam vídeo e três usam imagem estática. Todos têm um link de página educativa interna e um CTA “Ler mais” que abre a publicação original no Instagram.

Páginas estáticas existentes:

- `/conteudos/enxaqueca-vestibular.html`;
- `/conteudos/labirintite-e-tontura.html`;
- `/conteudos/ouvido-interno-e-equilibrio.html`;
- `/conteudos/rinite-vasomotora.html`;
- `/conteudos/tontura-e-diagnostico.html`.

Essas páginas são HTML independente, compartilham `public/conteudos/styles.css`, trazem conteúdo educativo curto, perguntas expansíveis nativas com `<details>` e aviso de que o conteúdo não substitui consulta. Elas não são componentes React e não passam pelo pré-render da aplicação principal.

### 4.5 Carrossel de conteúdos

`InstagramCarousel` implementa um carrossel circular por meio de três clones antes e três clones depois da lista real. Os clones têm `aria-hidden` e não são focáveis. O carrossel:

- centraliza o card ativo;
- corrige silenciosamente a posição quando chega aos clones;
- aceita swipe/scroll nativo, arraste com mouse, setas do teclado e botões anterior/próximo;
- recalcula o centro com `ResizeObserver`;
- exibe uma única dica visual de deslocamento ao entrar na viewport, salvo quando movimento reduzido está ativo;
- suprime cliques acidentais após arraste;
- atribui prioridade de rede ao vídeo ativo e, em rede rápida, ao próximo vídeo.

### 4.6 Carrossel de opiniões

Existem seis opiniões codificadas em `patientReviews`, com nome, data, local e texto. O layout mostra:

- um card por página abaixo de 600 px;
- dois cards por página entre 600 e 899 px;
- três cards por página a partir de 900 px.

Os cards apontam para a Doctoralia. O bloco de destaque informa “16 opiniões publicadas na Doctoralia”; esse número é conteúdo manual, não é buscado em tempo real.

### 4.7 FAQ

Há seis perguntas sobre procura de atendimento, causas de tontura, exames, zumbido, cirurgia/Coblation® e funcionamento do atendimento. O primeiro item começa aberto. Apenas um item pode ficar aberto por vez. A abertura envia evento para `window.dataLayer`.

### 4.8 Conversão e WhatsApp

`WhatsAppLink` centraliza CTAs de agendamento. `whatsappUrl()`:

- remove caracteres não numéricos do telefone;
- adiciona `Vim pelo site.` à mensagem se a frase ainda não estiver presente;
- codifica a mensagem na URL;
- usa Doctoralia como fallback se o WhatsApp não estiver configurado.

Há CTAs no cabeçalho, menu mobile, hero, após especialidades, narrativas, seção sobre, FAQ, contato, cards de locais e botão flutuante. O botão flutuante só aparece quando hero, contato e rodapé não estão visíveis. Ele também é ocultado quando o menu mobile está aberto.

## 5. Arquitetura técnica

### 5.1 Stack

- React 19;
- React DOM 19;
- TypeScript 5.9 em modo `strict`;
- Vite 8;
- `@vitejs/plugin-react`;
- `lucide-react` para parte dos ícones;
- HTML e CSS estáticos para páginas educativas e política de privacidade.

As versões declaradas usam intervalos com `^`; `package-lock.json` é a referência reprodutível da árvore resolvida. Não há framework de CSS, roteador, gerenciador de estado, biblioteca de analytics, suíte de testes ou linter configurado.

### 5.2 Entrada, renderização e hidratação

- `index.html` fornece metadados, JSON-LD, skip link, o elemento `#root` e a entrada `/src/main.tsx`.
- `src/main.tsx` usa `hydrateRoot` quando `#root` já contém HTML e `createRoot` quando está vazio.
- `src/entry-server.tsx` exporta `render()`, que usa `renderToString` com o mesmo `<App />`.
- `scripts/prerender.mjs` importa o bundle SSR temporário, renderiza a aplicação e substitui `<div id="root"></div>` no `dist/index.html` pelo HTML produzido.
- Ao final, o script valida o caminho e remove `.prerender/`.

O build, portanto, gera uma página principal pré-renderizada para SEO e primeira pintura, depois hidratada no navegador. Não é um servidor SSR em produção. As páginas em `public/` são copiadas diretamente para `dist/`.

### 5.3 Comando de build

`npm run build` executa, em sequência:

1. `tsc -b`;
2. `vite build` para o cliente;
3. `vite build --ssr src/entry-server.tsx --outDir .prerender`;
4. `node scripts/prerender.mjs`.

Se o placeholder exato `<div id="root"></div>` desaparecer de `index.html`, o pré-render falhará. Se o diretório temporário não for exatamente `.prerender` dentro da raiz do projeto, a proteção do script impede a remoção.

### 5.4 Estrutura de arquivos

```text
.
├── AGENTS.md                         # regra obrigatória para cards de vídeo
├── README.md                         # instruções resumidas de uso
├── index.html                        # shell, SEO e JSON-LD da home
├── package.json / package-lock.json  # scripts e dependências
├── scripts/
│   └── prerender.mjs                 # injeta SSR no HTML final
├── src/
│   ├── App.tsx                       # conteúdo, dados e componentes da home
│   ├── config.ts                     # identidade, contato, URLs, eventos
│   ├── entry-server.tsx              # entrada de pré-render
│   ├── main.tsx                      # hidratação/execução no cliente
│   ├── styles.css                    # sistema visual e responsividade
│   └── vite-env.d.ts
├── public/
│   ├── conteudos/                    # páginas educativas independentes
│   ├── images/                       # fotos e ícones do site
│   ├── instagram/                    # imagens, posters e vídeos dos cards
│   ├── logos/                        # identidade e logos dos locais
│   ├── videos/                       # vídeo da seção Coblation®
│   ├── og-dr-evaldo.jpg/.png         # cards sociais
│   ├── privacidade.html
│   ├── robots.txt
│   └── sitemap.xml
├── tsconfig*.json
└── vite.config.ts
```

### 5.5 Responsabilidades dos arquivos centrais

- **`src/App.tsx`:** concentra arrays de conteúdo e todos os componentes da home. É deliberadamente monolítico no estado atual.
- **`src/config.ts`:** dados centrais do médico, contato, local primário, URLs e assets do hero/sobre; também cria URLs de WhatsApp e envia eventos.
- **`src/styles.css`:** tokens, layout mobile-first, animações, estados dos componentes e breakpoints.
- **`index.html`:** metatags, canonical, social cards, schema.org e preload do hero.
- **`AGENTS.md`:** contrato específico para qualquer IA que adicione ou altere vídeos de conteúdo.

## 6. Sistema visual e responsividade

### 6.1 Direção visual

O design usa aparência clínica, clara e institucional, com azul-marinho, azul vivo, ciano, fundos pálidos e cartões brancos. A fonte principal é Manrope carregada do Google Fonts, com fallbacks de sistema.

Tokens principais de `:root`:

| Token | Valor | Uso predominante |
|---|---:|---|
| `--navy` | `#001b62` | títulos, identidade, controles |
| `--deep` | `#00197a` | gradientes escuros |
| `--blue` | `#2b4094` | azul de apoio |
| `--vivid` | `#003d91` | links e ações |
| `--cyan` | `#0092c7` | destaque e gradientes |
| `--pale` | `#f4f7ff` | fundos suaves |
| `--line` | `#dce6f6` | bordas |
| `--muted` | `#55637a` | texto secundário |
| `--radius` | `28px` | raio padrão de cards |
| `--container` | `1180px` | largura máxima |

### 6.2 Breakpoints implementados

- até `340px`: ajustes para telas extremamente estreitas;
- de `360px` a `599px`: respiro lateral ampliado;
- abaixo de `600px`: narrativa compacta de procedimentos;
- a partir de `600px`: grids com duas colunas e carrossel de opiniões com dois cards;
- até `899px`: regras mobile e tablet, inclusive autoplay dos vídeos de conteúdo;
- a partir de `900px`: layout desktop, seções mais espaçadas, três opiniões por página e narrativa desktop;
- de `900px` a `1149px`: ainda usa menu hambúrguer;
- a partir de `1280px`: espaçamentos maiores no hero e cards;
- `prefers-reduced-motion: reduce`: remove rolagem suave e reduz animações/transições ao mínimo.

O menu desktop completo aparece somente quando as regras de desktop mais amplo permitem; entre 900 e 1149 px o menu mobile continua ativo.

### 6.3 Texto e legibilidade

Parágrafos e vários textos longos usam alinhamento justificado, hifenização automática e quebra de palavras. Textos de Coblation® têm exceções específicas para preservar leitura. Mudanças de tipografia precisam ser verificadas em português e em larguras pequenas, pois títulos e termos médicos são longos.

## 7. Contrato obrigatório de vídeos

Esta seção reproduz e amplia o comportamento obrigatório definido em `AGENTS.md`. Alterações futuras não devem contorná-lo.

### 7.1 Vídeos dos cards de conteúdo

Para adicionar um vídeo a `instagramPosts`:

1. colocar os arquivos otimizados em `public/instagram/` com nome descritivo;
2. manter uma versão principal, uma versão `-lite.mp4` e um poster WebP;
3. adicionar ao post `video`, `videoLite`, `videoPoster` e `videoAriaLabel`;
4. deixar a renderização a cargo de `InstagramVideo` — nunca inserir um `<video>` diretamente no card;
5. manter o botão de play independente do link externo; o Instagram continua acessível no CTA “Ler mais”.

Comportamento esperado de `InstagramVideo`:

- inicia pausado e com poster/botão de play;
- somente em telas de até 899 px pode iniciar automaticamente após 7 segundos visível e sem movimento;
- desktop exige reprodução e pausa manuais;
- scroll vertical não pausa enquanto o card continua pelo menos 60% visível;
- movimento horizontal do carrossel pausa, zera `currentTime` e restaura poster/primeiro frame;
- sair da visibilidade ou ocultar a aba também reseta;
- respeita `prefers-reduced-motion` e modo de economia/conexão restrita;
- mantém `muted`, `loop`, `playsInline` e preload adaptativo;
- em conexão restrita, só carrega após ação manual e usa o arquivo leve;
- estados de preparação/espera têm timeout de 15 segundos e opção de tentar novamente;
- a imagem poster só some quando a reprodução realmente começa.

### 7.2 Priorização de rede dos cards

`useVideoNetworkTier()` classifica a conexão:

- `constrained`: `saveData`, `slow-2g` ou `2g`;
- `medium`: `3g` ou valor inicial durante SSR/hidratação;
- `fast`: demais conexões após leitura no navegador.

O vídeo ativo recebe prioridade `active`; em rede rápida, o próximo recebe `next`; todos os outros recebem `none`. A margem de pré-carregamento é 1000 px em rede rápida, 650 px em rede média e zero em rede restrita.

### 7.3 Vídeo da seção Coblation®

`LazyProcedureVideo` é separado de `InstagramVideo` porque participa da narrativa de procedimentos. Ele:

- escolhe o arquivo leve no mobile ou quando a rede não é rápida;
- antecipa o carregamento por seletores diferentes no desktop e no mobile;
- só carrega automaticamente fora de conexão restrita;
- tenta tocar quando há dados suficientes, a mídia está visível e movimento reduzido não está ativo;
- pausa ao sair da área visível;
- mantém poster até o primeiro frame efetivamente renderizado (`requestVideoFrameCallback`, com fallback para `requestAnimationFrame`);
- oferece reprodução manual, estado de carregamento, timeout e retry.

Arquivos atuais:

- `/videos/coblation-dr-evaldo.mp4`;
- `/videos/coblation-dr-evaldo-mobile.mp4`;
- `/videos/coblation-dr-evaldo-poster.webp`.

## 8. Acessibilidade

Recursos já implementados:

- idioma `pt-BR`;
- link “Pular para o conteúdo”;
- um único H1 na home;
- hierarquia de títulos por seção;
- foco visível global;
- áreas de toque de aproximadamente 44–52 px;
- textos alternativos para imagens informativas e `alt=""`/`aria-hidden` para decoração;
- menu mobile com `aria-expanded`, `aria-controls`, foco inicial, retenção de foco com Tab, fechamento por Escape e retorno de foco ao botão;
- `inert` no menu fechado;
- carrosséis nomeados como regiões e operáveis por teclado;
- clones de carrossel escondidos da árvore acessível;
- contadores de carrossel com `aria-live="polite"`;
- FAQ com `aria-expanded`, `aria-controls` e região de resposta;
- rótulos explícitos nos vídeos e controles;
- respeito a `prefers-reduced-motion`.

Ao criar novos componentes, preservar navegação por teclado, estados de foco, semântica nativa e textos alternativos. Não depender apenas de cor ou animação para comunicar estado.

## 9. SEO e conteúdo indexável

### 9.1 Home

`index.html` contém:

- title e description voltados a otorrino/otoneurologia em São Luís;
- keywords;
- canonical;
- Open Graph e Twitter Card;
- preload da imagem principal;
- favicon;
- JSON-LD com `Physician`, credenciais, áreas de conhecimento, redes e dois locais, além de `MedicalClinic` para o Executive Lake Center.

A home é pré-renderizada no build, o que entrega conteúdo sem depender da execução inicial do JavaScript.

### 9.2 Sitemap e robots

`public/sitemap.xml` lista a home e as cinco páginas educativas. `public/robots.txt` libera rastreamento e aponta para o sitemap.

### 9.3 Pendências críticas de SEO

- substituir `https://SEU-DOMINIO.com.br` em `src/config.ts`, `index.html`, `public/robots.txt` e `public/sitemap.xml`;
- confirmar se a política de privacidade deve entrar no sitemap;
- avaliar canonical, Open Graph e JSON-LD próprios para as páginas educativas;
- manter coerência entre telefone, locais e URL em `src/config.ts`, `index.html`, páginas estáticas e política;
- atualizar o sitemap sempre que uma página de conteúdo for adicionada ou removida.

## 10. Analytics e eventos preparados

Não existe Google Tag Manager ou Google Analytics instalado no repositório. `trackEvent()` apenas garante `window.dataLayer` e adiciona objetos. Uma integração futura pode consumir estes eventos:

| Evento | Quando ocorre | Detalhes atuais |
|---|---|---|
| `click_whatsapp` | clique em CTA quando WhatsApp está configurado | `{ source }` |
| `click_doctoralia` | fallback de CTA sem WhatsApp | `{ source }` |
| `open_faq` | abertura de pergunta fechada | `{ question }` |
| `click_instagram` | clique no perfil pelo conteúdo ou contato | `{ source }` |
| `click_instagram_post` | clique em mídia/CTA de post | `{ post }` |
| `click_directions` | clique em rota | `{ location }` quando disponível |

Fontes de WhatsApp atualmente usadas incluem `header`, `mobile-menu`, `hero`, `after-specialties`, `exam-procedures`, `surgeries`, `about`, `faq`, `contact`, `mobile-sticky` e `location-<número>`.

Antes de instalar analytics, pixels ou cookies não essenciais, implementar gestão de consentimento compatível com a LGPD e revisar a política de privacidade.

## 11. Privacidade e serviços de terceiros

`public/privacidade.html` informa:

- responsável pelo tratamento;
- possíveis dados voluntariamente enviados;
- finalidades de contato e agendamento;
- tratamento especial de dados de saúde;
- bases legais possíveis;
- compartilhamento e redirecionamento para serviços externos;
- retenção, segurança e direitos do titular;
- regras para crianças e adolescentes;
- possibilidade de atualização da política.

O site não possui formulário próprio. O contato acontece em plataformas externas, principalmente WhatsApp. Também há links para Instagram, Google Maps e Doctoralia, cada qual com sua própria política. A política atual foi marcada como atualizada em 26 de setembro de 2026.

## 12. Desenvolvimento local e validação

### 12.1 Pré-requisitos

- Node.js compatível com Vite 8;
- npm;
- dependências instaladas por `npm install` ou, preferencialmente em ambiente limpo/CI, `npm ci`.

### 12.2 Comandos existentes

```bash
npm install
npm run dev
npm run build
npm run preview
```

- `npm run dev`: Vite em `0.0.0.0:5173`, com porta estrita;
- `npm run build`: typecheck, build cliente, build SSR temporário e pré-render;
- `npm run preview`: serve localmente o conteúdo de `dist/`.

### 12.3 Validação mínima antes de integrar

1. executar `npm run build`;
2. abrir `npm run preview` e conferir a home;
3. testar larguras abaixo de 600 px, entre 600 e 899 px, entre 900 e 1149 px e acima de 1280 px;
4. testar menu por teclado e Escape;
5. testar carrosséis com toque, mouse, teclado e botões;
6. conferir reprodução, pausa, reset e retry dos vídeos;
7. testar com `prefers-reduced-motion: reduce`;
8. testar links de WhatsApp, Instagram, Doctoralia e mapas;
9. abrir as cinco páginas educativas e a política de privacidade;
10. verificar console do navegador e ausência de overflow horizontal.

Não há comandos `test`, `lint`, `format` ou auditoria automatizada no estado atual. O build TypeScript/Vite é a única verificação automatizada versionada.

## 13. Workflow Git e publicação

### 13.1 Modelo observado de branches

- `develop` é a branch de integração mais avançada e acompanha `origin/develop`;
- `main` existe, mas no momento examinado está parada em `a365f3f`, anterior a grande parte das funcionalidades presentes em `develop`;
- o histórico usa branches `feat/*`, `fix/*` e `codex/*`;
- várias funcionalidades entraram por merge explícito em `develop`, enquanto correções menores também foram commitadas diretamente;
- não há tags no repositório;
- não há diretório `.github/` nem workflow de CI/CD versionado.

Para novas mudanças, partir do estado mais recente de `develop`, isolar o trabalho quando apropriado, validar e integrar sem apagar mudanças locais de terceiros. Este documento foi solicitado para ser commitado diretamente em `develop`; isso não estabelece, por si só, uma nova política geral de commits diretos.

### 13.2 Evolução do workflow técnico

1. O projeto nasceu em Next.js, com estrutura `app/`, banco/Drizzle, exemplo D1, worker e teste de HTML renderizado.
2. Em `fa62f2a`, as branches iniciais foram consolidadas e o projeto foi simplificado para React + Vite estático. A estrutura Next.js, banco, worker anterior, ESLint e teste foram removidos.
3. Em `4e308ca`, os assets foram reorganizados e renomeados por função, removendo arquivos não usados e screenshots de artefato.
4. Entre `fac0462` e `f33ae17`, surgiu o fluxo de narrativa responsiva dos procedimentos.
5. No merge `5c62f12`, o build ganhou entrada SSR e script de pré-render, além de mídia da seção Coblation®.
6. Em `cc616f2`, foi criado `AGENTS.md` com o contrato dos cards de vídeo.
7. Em `0b850a4`, o site ganhou páginas educativas, conteúdo do Instagram, mídia, sitemap ampliado e política inicial.
8. Os commits `5b62122` e `baa6349` registram mudanças/publicação de staging, mas são commits vazios: não alteram arquivos. Portanto, o detalhe operacional desse deploy não está recuperável a partir do conteúdo versionado.
9. Entre `73ba992` e `e3ad210`, o fluxo de vídeo foi otimizado para rede, mobile, controles, poster, formato MP4 e carregamento/reprodução mais estáveis.
10. Em `34ddbb5`, a política de privacidade recebeu sua versão completa atual.

### 13.3 Hospedagem e deploy

O site é publicado na **Vercel** (projeto `dr-evaldo-cesar-site`, vinculado em `.vercel/project.json`; as respostas HTTP de produção trazem `Server: Vercel`). O deploy é disparado por push no GitHub; não há workflow CI/CD nem script de deploy versionados.

O `wrangler.jsonc` (Cloudflare Workers) que existia desde o commit inicial nunca foi usado — apontava para um `src/index.ts` inexistente e o `wrangler` não era dependência —, e foi removido junto com o `worker-configuration.d.ts` gerado por ele.

## 14. Histórico completo das ações registradas em `develop`

A tabela abaixo lista todos os commits alcançáveis por `develop` até o commit-base. Commits de branches paralelas aparecem pela data do commit, mesmo quando só foram integrados depois por merge.

| Data | Commit | Ação registrada |
|---|---|---|
| 2026-08-13 | `ecfeb12` | constrói a landing page mobile-first inicial |
| 2026-08-15 | `9c765f8` | adiciona locais de atendimento |
| 2026-08-15 | `7d8b829` | aplica ícone de tontura na especialidade |
| 2026-08-15 | `07c11b2` | restaura temporariamente plugin Vite de Sites |
| 2026-08-15 | `debcc48` | reverte a restauração do plugin de Sites |
| 2026-08-15 | `ab43603` | cria a linha inicial do site que seria consolidada |
| 2026-08-15 | `85ef187` | atualiza localização exibida no selo |
| 2026-08-15 | `e0a1640` | atualiza ícones das áreas de atendimento |
| 2026-08-15 | `b176fd6` | atualiza título de apresentação do médico |
| 2026-08-15 | `da6c75a` | adiciona selos de autoridade ao hero |
| 2026-08-16 | `54a165f` | adiciona carrossel de opiniões e contatos |
| 2026-08-16 | `0942fa6` | corrige comportamento da navbar |
| 2026-08-16 | `fa62f2a` | consolida linhas iniciais e migra o projeto para Vite estático |
| 2026-08-16 | `c697156` | atualiza contato do WhatsApp |
| 2026-08-16 | `fc7ee84` | integra a atualização do contato do WhatsApp |
| 2026-08-17 | `4e6329b` | aprimora a experiência mobile da landing page |
| 2026-08-17 | `2d955b7` | registra dependências de skills em `skills-lock.json` |
| 2026-08-17 | `a365f3f` | corrige navegação do carrossel no mobile |
| 2026-09-16 | `3e1c155` | atualiza a seção sobre o especialista |
| 2026-09-16 | `4e308ca` | organiza e renomeia assets, removendo sobras |
| 2026-09-16 | `c77cbd5` | ajusta hero e credenciais |
| 2026-09-16 | `c340552` | atualiza áreas e formação profissional |
| 2026-09-17 | `4eb5bab` | restaura áreas de atendimento |
| 2026-09-17 | `0792cd7` | atualiza cards e ícones de especialidades |
| 2026-09-19 | `fac0462` | cria/ajusta narrativa responsiva de procedimentos |
| 2026-09-19 | `64cb05a` | adapta animação para telas compactas |
| 2026-09-19 | `c2d1741` | ajusta narrativa mobile de exames e cirurgias |
| 2026-09-20 | `349a2c6` | corrige animação mobile em celulares |
| 2026-09-20 | `f33ae17` | refina a animação mobile dos procedimentos |
| 2026-09-21 | `0839a2b` | inclui posturografia nos exames otoneurológicos |
| 2026-09-21 | `8a9eb6c` | integra formação e atuação em `develop` |
| 2026-09-21 | `0eaa160` | integra ajustes do hero em `develop` |
| 2026-09-21 | `3664ba9` | integra seção do especialista em `develop` |
| 2026-09-21 | `b10bbf3` | inclui posturografia no atendimento consolidado |
| 2026-09-21 | `1f64b6b` | adiciona seção Coblation® com vídeo responsivo |
| 2026-09-21 | `d147720` | aprimora SEO e texto/seção de Coblation® |
| 2026-09-22 | `638b7d9` | melhora legibilidade do texto de Coblation® |
| 2026-09-22 | `5c62f12` | integra exames/procedimentos, mídias e pré-render em `develop` |
| 2026-09-22 | `cc616f2` | padroniza carrossel e cards de vídeo; cria `AGENTS.md` |
| 2026-09-23 | `0b850a4` | adiciona conteúdos, vídeos, páginas internas, sitemap e privacidade |
| 2026-09-24 | `5b62122` | registra atualização de deploy de staging em commit vazio |
| 2026-09-24 | `baa6349` | registra publicação de staging dedicado em commit vazio |
| 2026-09-24 | `2b76fd1` | atualiza perguntas frequentes |
| 2026-09-24 | `73ba992` | otimiza carregamento e reprodução de vídeos |
| 2026-09-24 | `5831eb0` | ajusta controles dos vídeos |
| 2026-09-24 | `e1aa0a9` | integra controles e versões leves MP4 em `develop` |
| 2026-09-24 | `738d245` | estabiliza vídeo da seção Coblation® e adiciona poster/versão mobile |
| 2026-09-24 | `2941028` | atualiza botão flutuante de WhatsApp e mensagens de origem |
| 2026-09-24 | `169170f` | melhora qualidade do vídeo Coblation® mobile |
| 2026-09-24 | `e3ad210` | permite início mobile antes do buffer completo |
| 2026-09-25 | `0cf6feb` | ajusta alinhamento e títulos dos procedimentos |
| 2026-09-25 | `8279707` | integra os ajustes de alinhamento e títulos |
| 2026-09-25 | `092fcbd` | corrige título de videoendoscopia nasossinusal |
| 2026-09-25 | `d7b874e` | integra a correção do título de videoendoscopia |
| 2026-09-25 | `eda2cfa` | ajusta título de Otoneurologia |
| 2026-09-26 | `6216f84` | ajusta espaçamento dos cards |
| 2026-09-26 | `34ddbb5` | cria a política de privacidade completa atual |

## 15. Procedimentos de manutenção

### 15.1 Alterar contato, identidade ou links principais

1. editar `src/config.ts`;
2. procurar cópias manuais em `index.html`, `public/privacidade.html`, `public/robots.txt`, `public/sitemap.xml` e `src/App.tsx`;
3. atualizar JSON-LD e metadados quando o dado também for de SEO;
4. executar o build e testar os links finais.

O projeto ainda tem duplicação intencional entre dados React e HTML estático; editar apenas `siteConfig` não atualiza automaticamente todas as páginas.

### 15.2 Adicionar uma área, exame ou cirurgia

- áreas de atendimento: editar `specialties`;
- exames: editar `examChapters`;
- Coblation®: editar `coblationChapters`;
- cirurgias: editar `surgeryChapters`;
- colocar imagens em `public/images/` com nome descritivo e WebP quando possível;
- fornecer `imageAlt`, posição de recorte e texto leigo clinicamente responsável;
- verificar narrativa desktop, tablet e mobile.

### 15.3 Adicionar conteúdo do Instagram

1. criar ou escolher uma página educativa em `public/conteudos/`;
2. adicionar mídia otimizada em `public/instagram/`;
3. adicionar objeto a `instagramPosts` com título, descrição, URL externa e `page`;
4. para imagem, usar `image` e `imageAlt`;
5. para vídeo, seguir integralmente o contrato da seção 7 e `AGENTS.md`;
6. adicionar nova página ao sitemap;
7. validar clones, contador, teclado, arraste e prioridade de vídeo.

### 15.4 Alterar opiniões

Editar `patientReviews` e, se necessário, atualizar manualmente o número “16 opiniões publicadas” no bloco de destaque. Confirmar a origem pública e não inventar relatos.

### 15.5 Alterar FAQ

Editar `faqs`. Manter perguntas claras, conteúdo médico prudente e comportamento de um item aberto por vez. O texto da pergunta é enviado para `dataLayer`, portanto não incluir dados pessoais.

### 15.6 Adicionar uma nova página estática

- criar em `public/` ou subpasta apropriada;
- manter `lang="pt-BR"`, viewport, title, description e navegação de retorno;
- considerar canonical, social metadata e conteúdo estruturado;
- incluir no sitemap quando indexável;
- confirmar que os links funcionam tanto no dev server quanto em hosting estático.

## 16. Lacunas, riscos e decisões pendentes

### 16.1 Configuração e publicação

- domínio oficial ainda é placeholder em quatro locais centrais;
- fluxo de deploy não é reproduzível pelo repositório;
- configuração Wrangler aponta para arquivo ausente;
- staging foi registrado por commits vazios, sem configuração correspondente;
- `main` está significativamente atrás de `develop`; a estratégia de promoção para produção precisa ser confirmada.

### 16.2 Qualidade e automação

- não há testes automatizados;
- não há lint/formatter versionado;
- não há CI;
- não há auditoria automática de acessibilidade, links ou SEO;
- conteúdos, eventos e dados estruturados são parcialmente duplicados em arquivos diferentes.

### 16.3 Conteúdo e conformidade

- horário de atendimento não informado;
- número total de avaliações é manual e pode ficar desatualizado;
- páginas educativas têm SEO básico, mas não canonical/Open Graph próprios;
- política não aparece no sitemap;
- qualquer inclusão de analytics/cookies requer consentimento e revisão da política;
- textos médicos devem ser revisados por responsável qualificado quando houver mudança substancial.

### 16.4 Performance

- o CSS principal importa Google Fonts externamente;
- vídeos são os maiores assets, embora existam versões leves, posters e carregamento adaptativo;
- `src/App.tsx` tem mais de 1.500 linhas e mistura dados, lógica e apresentação;
- `public/og-dr-evaldo.png` é relativamente grande e existe também uma versão JPG menor;
- selos de autoridade e alguns logos são maiores que outras imagens da interface.

Refatorações devem preservar comportamento antes de separar arquivos. Em especial, não simplificar carrossel ou vídeo sem testes manuais equivalentes, pois há várias correções históricas acumuladas nessas áreas.

## 17. Regras operacionais para agentes de IA

Antes de modificar o projeto:

1. ler este arquivo e `AGENTS.md` por completo;
2. confirmar branch e estado do worktree com `git status --short --branch`;
3. preservar alterações locais existentes que não pertençam à tarefa;
4. procurar a fonte de verdade correta antes de duplicar dados;
5. não assumir que staging, produção ou Wrangler estão funcionais;
6. não inventar dados profissionais, clínicos ou depoimentos;
7. não alterar o contrato de vídeo incidentalmente;
8. manter o site mobile-first, acessível e compatível com movimento reduzido;
9. executar `npm run build` após qualquer mudança de código, estilo, HTML ou configuração;
10. relatar claramente validações feitas e lacunas não resolvidas.

Ao fazer commits, incluir apenas arquivos da tarefa. Não apagar, resetar ou reformatar alterações de terceiros. Não publicar, fazer push, promover branch ou executar deploy sem solicitação explícita.

## 18. Critérios de aceite globais

Uma mudança pode ser considerada pronta quando, na medida aplicável:

- atende ao objetivo de negócio sem inserir afirmações não confirmadas;
- compila com TypeScript e conclui o build Vite/pré-render;
- mantém a home hidratável e sem erro no console;
- funciona em mobile, tablet e desktop;
- preserva semântica, teclado, foco, alt text e movimento reduzido;
- não cria overflow horizontal;
- não piora carregamento de mídia ou ignora economia de dados;
- mantém CTAs e eventos de conversão corretos;
- atualiza SEO, sitemap, privacidade e cópias duplicadas quando necessário;
- segue `AGENTS.md` para vídeos;
- deixa o histórico Git restrito ao escopo solicitado.

## 19. Glossário rápido

- **Otoneurologia:** área de atuação destacada no site para avaliação de tontura, vertigem, equilíbrio, zumbido e ouvido interno.
- **Coblation®:** tecnologia descrita na seção de cirurgia de amígdalas e adenoide; é marca registrada e o símbolo deve ser preservado.
- **VPPB:** vertigem posicional paroxística benigna, citada em conteúdos e procedimentos.
- **vHIT:** Video Head Impulse Test, um dos exames apresentados.
- **Pré-render:** geração do HTML da home durante o build; não significa SSR em tempo de requisição.
- **Poster:** imagem exibida antes do primeiro frame do vídeo ou durante falha/preparação.
- **`dataLayer`:** fila global preparada para futura integração de analytics.
- **Fonte de verdade:** arquivo que deve ser consultado prioritariamente para um tipo de informação.

---

Este documento deve ser atualizado junto com mudanças arquiteturais, novos fluxos de deploy, novas integrações, alteração de regras de mídia, inclusão de páginas relevantes ou decisões que uma pessoa/agente futuro não conseguiria deduzir com segurança apenas lendo o código atual.
