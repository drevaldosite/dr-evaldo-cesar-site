# Site — Dr. Evaldo César Macau

Landing page mobile-first em React, TypeScript e Vite para a atuação do Dr. Evaldo César Macau em Otorrinolaringologia.

## Desenvolvimento

```bash
npm install
npm run dev
```

O Vite mostrará o endereço local do site no terminal.

## Build de produção

```bash
npm run build
npm run preview
```

Os arquivos finais serão gerados em `dist/`.

## Informações que precisam ser configuradas

Edite `src/config.ts` para substituir os campos ainda não informados:

- número do WhatsApp com DDI e DDD;
- telefone, endereço e horário de atendimento;
- URL oficial e Instagram;
- link do Google Maps.

CRM-MA 10415, RQE 3698, formação profissional e endereço da Clínica Rhinus já estão preenchidos conforme o conteúdo fornecido para o projeto.

Depois de definir o domínio, substitua `https://SEU-DOMINIO.com.br` também em `index.html`, `public/robots.txt` e `public/sitemap.xml`.

## Imagens e logos

As fotografias oficiais ficam em `public/images/` e os logos em `public/logos/`. Para trocar as imagens principais, altere os caminhos em `src/config.ts`, preservando arquivos WebP e textos alternativos descritivos.

O card social fica em `public/og-dr-evaldo.png` e está conectado às metatags Open Graph e Twitter Card.

## SEO e acessibilidade

- Um único H1, hierarquia semântica de títulos e dados estruturados `Physician`.
- Metatags, canonical, Open Graph, Twitter Card, robots e sitemap preparados.
- Navegação por teclado, foco visível, link para pular conteúdo e FAQ acessível.
- Áreas de toque com pelo menos 44 px e respeito a `prefers-reduced-motion`.
- Dados comerciais não confirmados aparecem claramente como pendentes; não há credenciais, estatísticas ou depoimentos fictícios.

## Eventos de conversão preparados

Os cliques de WhatsApp e a abertura do FAQ enviam eventos para `window.dataLayer`, caso Google Tag Manager ou Analytics sejam adicionados posteriormente com a gestão de consentimento adequada à LGPD.
