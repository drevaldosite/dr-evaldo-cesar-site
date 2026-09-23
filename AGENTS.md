# Orientação para cards de vídeo

Todos os vídeos adicionados à seção de conteúdos devem seguir o mesmo fluxo já implementado em `src/App.tsx`:

- Adicionar o arquivo otimizado em `public/instagram/` com um nome descritivo.
- Incluir `video` e `videoAriaLabel` no objeto do post em `instagramPosts`.
- Nunca renderizar um `<video>` diretamente no card; usar o componente reutilizável `InstagramVideo`.
- O vídeo deve iniciar pausado e exibir o botão de play. Somente em telas mobile (até 899px) ele pode começar automaticamente depois de 7 segundos com o card visível e sem movimento. No desktop, a reprodução e a pausa são manuais.
- Scroll vertical da página não deve pausar o vídeo enquanto o card continuar visível.
- Scroll horizontal/troca de card deve pausar o vídeo, zerar `currentTime` e retornar ao primeiro frame/miniatura.
- Manter `muted`, `loop`, `playsInline`, `preload="metadata"` e o respeito a `prefers-reduced-motion`.
- O botão de play deve permanecer independente do link da postagem; o link continua no CTA “Ler mais”.

Ao adicionar um novo vídeo, basta repetir a estrutura dos posts existentes. O componente `InstagramVideo` aplica automaticamente todo o comportamento comum.
