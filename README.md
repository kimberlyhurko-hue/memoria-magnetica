# A Evolução da Memória

Um site educativo e interativo em forma de livro de fantasia que conduz o visitante por uma jornada ilustrada: da memória celular aos sistemas computacionais modernos.

**Link publicado (GitHub Pages):** https://kimberlyhurko-hue.github.io/memoria-magnetica/

## O que o projeto faz

- **Abertura cinematográfica** com uma composição que mistura natureza e tecnologia.
- **Prólogo** explicando o que é memória (registrar, guardar, recuperar).
- **Mapa da jornada / linha do tempo interativa** com 7 ilhas clicáveis e livre navegação.
- **Jornada em 7 fases**, cada uma com cenário próprio, texto resumido, curiosidade e uma pergunta simples:
  1. O início da vida — memória celular
  2. O mundo animal
  3. A mente humana
  4. A memória da humanidade
  5. Os primeiros registros artificiais
  6. A era eletrônica
  7. O mundo dos computadores
- **Progresso real**: resposta correta marca a fase como concluída, salva no `localStorage` e atualiza barras de progresso e o mapa. Resposta errada mostra uma explicação curta e permite tentar de novo.
- **Comparação** entre memória biológica e artificial (semelhanças e diferenças).
- **Conclusão** com mensagem especial ao completar as 7 fases.
- **Acessibilidade**: navegação por teclado, `aria-live` nas respostas, foco visível e respeito a `prefers-reduced-motion`.

## Estrutura de arquivos

```
.
├── index.html                  Estrutura de todas as seções
├── css/style.css               Identidade visual, temas por era e responsividade
├── js/data.js                  Textos, curiosidades e perguntas das 7 fases
├── js/app.js                   Navegação, quiz, progresso e mapa interativo
├── assets/images/*.svg         Ilustrações autorais (leão + 10 cenários)
├── docs/DIRECAO_ARTISTICA.md   Resumo da bíblia visual do projeto
└── .nojekyll                   Garante o GitHub Pages sem processamento Jekyll
```

## Como executar localmente

Não há dependências nem etapa de build. Abra `index.html` no navegador ou sirva a pasta com qualquer servidor estático:

```bash
# opção com Python
python -m http.server 8000
# depois acesse http://localhost:8000
```

## Publicação

O site é publicado automaticamente pelo GitHub Pages a partir do branch `main` do repositório
`kimberlyhurko-hue/memoria-magnetica`. Para atualizar: editar os arquivos, fazer commit e `git push`.

## Direção artística

As cores acompanham a evolução do conteúdo: verdes orgânicos (vida), tons de pergaminho e âmbar
(registros), azuis profundos (eletrônica) e ciano (sistemas digitais). A condução é feita por
pequenas notas em itálico, sem personagem ilustrado fixo. Veja `docs/DIRECAO_ARTISTICA.md`.
