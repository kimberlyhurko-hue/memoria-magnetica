# A Evolução da Memória

Um site educativo e interativo em forma de livro de fantasia: uma capa que abre para cinco universos de conhecimento, uma jornada ilustrada pela forma como a vida, as sociedades e as máquinas aprenderam a lembrar e uma biblioteca modular sobre tecnologia, inteligência artificial e robótica.

**Link publicado (GitHub Pages):** https://kimberlyhurko-hue.github.io/memoria-magnetica/

## O que o projeto faz

- **Capa principal** com o nome do projeto, ilustração autoral do universo do conhecimento, frase curta e botão **“Entrar na biblioteca”**, com animação suave de abertura de livro.
- **Seletor de cinco universos** — Vida e Natureza, Universo e Descobertas, Humanidade e História, Mente e Conhecimento e Tecnologia e Futuro — cada um com ilustração, título, descrição e área clicável própria.
- **Assuntos com apresentação visual e descrição breve** em cada universo. Em Tecnologia e Futuro, Inteligência Artificial, Evolução da Tecnologia e Robótica levam aos capítulos de leitura; os assuntos dos outros quatro universos estão sinalizados como **“Em preparação”**, sem conteúdo inventado.
- **Abertura cinematográfica** com cenário vetorial original, partículas discretas e chamada para a exploração.
- **Prólogo** que define memória como registrar, guardar e recuperar informação.
- **Mapa da jornada em atlas ilustrado**: sete ilhas sobre um mar de pergaminho, ligadas por um caminho luminoso. Há versão horizontal para telas largas e vertical para celulares, além de um mapa ampliado em modal.
- **Navegação livre**: qualquer fase pode ser visitada a qualquer momento; acertar não é pré-requisito para avançar.
- **Jornada em 7 fases**, cada uma com três blocos de conteúdo, detalhes (pessoas, termos e curiosidades), fontes específicas, ilustração de cena e uma nota **“O fio da história”**:
  1. Memória celular
  2. Memória nos animais
  3. Memória humana
  4. Memória coletiva
  5. Memória artificial (registros)
  6. Memória eletrônica
  7. Memória dos computadores
- **Quiz com três dificuldades**, selecionáveis a qualquer momento:
  - **Explorador:** 1 pergunta por fase e dica para eliminar uma alternativa.
  - **Aprendiz:** 2 perguntas por fase, sem dica.
  - **Mestre:** 3 perguntas por fase, com multiplicador de pontuação.
  - Resposta errada mostra explicação curta, desativa a alternativa errada e permite tentar de novo. O gabarito da pergunta principal é `ACBBABC`.
- **Gamificação:** pontuação por fase e dificuldade, sequência de acertos, precisão, 10 medalhas, histórico de descobertas e estatísticas.
- **Linha do tempo interativa** com 9 marcos que levam à fase correspondente.
- **Glossário** com 19 termos, busca por texto e filtros por categoria.
- **Comparação** entre memória biológica e artificial (semelhanças e diferenças).
- **Conclusão** com selo de jornada completa, certificado personalizado (imprimível/salvável em PDF), compartilhamento de resultado e reinício com confirmação.
- **Revisão de respostas** em modal, com a alternativa correta e a explicação de cada pergunta respondida.
- **Fontes** ao final de cada fase e referências gerais; datas aproximadas são identificadas como aproximações.
- **Biblioteca “Tecnologia e Futuro”** com 3 temas e 19 capítulos de leitura: Inteligência Artificial (6), Evolução da Tecnologia (7) e Robótica (6). Cada capítulo tem tópicos, ilustração, destaques, curiosidade, vocabulário e uma pergunta de revisão com explicação — sem vidas, tempo, pontos ou recompensas.
- **Acessibilidade:** skip link, navegação por teclado, foco visível, `aria-live`, modais com foco preso, fundo inerte e `Esc` para fechar, respeito a `prefers-reduced-motion` e sons desligados por padrão (ativáveis pelo usuário).

## Estrutura de arquivos

```
.
├── index.html                  Estrutura das seções, controles e 5 modais
├── css/style.css               Identidade visual, temas por era, responsividade e impressão
├── css/biblioteca.css          Identidade da biblioteca, temas e responsividade
├── css/atlas.css               Capa, seletor e páginas de universo/assunto
├── js/data.js                  Fases, perguntas, glossário, linha do tempo, medalhas e fontes
├── js/app.js                   Estado, mapa, quiz, gamificação, modais e compartilhamento
├── js/biblioteca-data.js       Coleção Tecnologia e Futuro: temas e 19 capítulos
├── js/biblioteca.js            Roteador, renderizador, perguntas e progresso de leitura
├── js/atlas-data.js            Metadados dos cinco universos e de seus assuntos
├── assets/images/*.svg         Ilustrações autorais da jornada (13 arquivos)
├── assets/images/tecnologia/   Ilustrações autorais da biblioteca (7 arquivos)
├── assets/images/atlas/        Cinco SVGs autorais da capa e dos universos
├── docs/DIRECAO_ARTISTICA.md   Referência visual da reformulação
├── docs/BIBLIOTECA.md          Formato dos dados, rotas e como expandir
└── .nojekyll                   Garante o GitHub Pages sem processamento Jekyll
```

As ilustrações incluem `hero.svg`, `conclusao.svg`, `paper-texture.svg`, as duas versões do atlas (`mapa-mundo.svg` e `mapa-mundo-mobile.svg`) e os cenários das sete fases. A biblioteca acrescenta sete SVGs em `assets/images/tecnologia/`, com portais de conhecimento, rede neural, linha do tempo, computadores e engenharia robótica. A camada do atlas acrescenta mais cinco SVGs em `assets/images/atlas/`: o livro iluminado da capa e uma ambientação para cada universo. O antigo narrador (leão) foi removido: não há personagem fixo, apenas as notas “O fio da história”.

## Como executar localmente

Não há dependências, bibliotecas externas nem etapa de build. Abra `index.html` no navegador ou sirva a pasta com qualquer servidor estático:

```bash
python -m http.server 8000
# depois acesse http://localhost:8000
```

## Biblioteca Tecnologia e Futuro

O link **Biblioteca** no cabeçalho abre `#/tecnologia`. A navegação usa rotas próprias, que não interferem nas seções originais:

- `#/tecnologia` — página da coleção;
- `#/tecnologia/ia`, `#/tecnologia/evolucao`, `#/tecnologia/robotica` — páginas dos temas;
- `#/tecnologia/<tema>/<capitulo>` — página do capítulo.

Cada tema tem identidade visual própria: azul/ciano e redes para IA; paleta que vai do âmbar ao ciano para a evolução tecnológica; azul/violeta e metal para robótica. A trilha no topo mostra Todas as bibliotecas → Biblioteca principal → coleção → tema → capítulo em desktop e celular. O botão **Voltar à biblioteca principal** retorna ao `#inicio`.

O conteúdo é um texto de estudo, não um jogo: não há vidas, cronômetro, placar, competição nem recompensas exageradas. A verificação de leitura explica o acerto e o erro; o registro da biblioteca guarda apenas os capítulos já abertos. As medalhas visuais vivem em uma camada separada, fora da leitura — detalhes abaixo. O formato dos dados e o passo a passo para adicionar temas, capítulos ou coleções estão em `docs/BIBLIOTECA.md`.

## Capa e universos

A capa `#capa` é a primeira seção da página e leva ao seletor pelo botão **“Entrar na biblioteca”**. O link **Universos** no cabeçalho abre diretamente `#/bibliotecas`; o link **Biblioteca** continua abrindo `#/tecnologia`. A navegação é livre: entre e saia de qualquer universo quando quiser, sem ordem obrigatória.

| Rota | Resultado |
|---|---|
| `#/bibliotecas` | Seletor com os cinco universos |
| `#/<universo>` | Página do universo com seus assuntos |
| `#/<universo>/<assunto>` | Assunto escolhido, com retorno ao universo, ao seletor e à capa |

Os universos novos são **Vida e Natureza** (Biologia, Corpo Humano, Evolução), **Universo e Descobertas** (Astronomia, Física, Química), **Humanidade e História** (Civilizações, Mitologias, Acontecimentos Históricos, Cultura) e **Mente e Conhecimento** (Psicologia, Neurociência, Filosofia, Aprendizagem). Suas páginas de assunto mostram explicitamente **“Em preparação”**: a navegação existe, mas textos, ilustrações e atividades ainda serão escritos. **Tecnologia e Futuro** é o único universo com leitura publicada e reutiliza integralmente as rotas `#/tecnologia...` e os 19 capítulos já existentes.

Essa camada é apenas de navegação e identidade visual: `js/app.js`, `js/data.js`, `css/style.css`, `js/biblioteca-data.js` e as rotas originais permanecem intactos. Detalhes em `docs/BIBLIOTECA.md` e `docs/DIRECAO_ARTISTICA.md`.

## Medalhas visuais

A seção **Medalhas** (`#medalhas`) reúne cinco lembranças: **Primeira descoberta**, **Mente curiosa**, **Explorador do conhecimento**, **Jornada concluída** e **Conhecimento em expansão**. Elas celebram etapas reais de leitura — primeiro capítulo aberto, primeira atividade concluída, três bibliotecas visitadas, um tema inteiro percorrido e dois temas concluídos — sem pontuação, ranking, penalidade ou recompensa de jogo.

Quando uma medalha é conquistada pela primeira vez, abre-se uma janela discreta com luz suave, revelação da ilustração, nome, mensagem própria e um botão para continuar. A animação não se repete: a medalha permanece na coleção e pode ser revista ali sem nova celebração. As ilustrações acompanham a identidade do projeto: folhas e detalhes orgânicos, pergaminhos e estrelas, e circuitos com luzes azuis.

A estrutura foi feita para crescer: o catálogo fica em `js/conquistas-data.js`, a lógica em `js/conquistas.js`, o visual em `css/conquistas.css` e as ilustrações em `assets/images/medalhas/`. Para adicionar uma medalha futura, basta uma nova entrada no catálogo com sua condição e seu SVG.

## Dados e progresso

O progresso fica apenas no navegador, na chave `evolucao-memoria-progresso-v2` do `localStorage`. A versão anterior (`...-v1`) é migrada automaticamente, preservando fases concluídas e visitadas. O botão “Refazer a jornada” apaga esse progresso após confirmação.

A biblioteca usa outra chave, `biblioteca-progresso-leitura-v1`, e guarda somente os IDs dos capítulos visitados, agrupados por coleção e tema. Respostas, notas e tempo de leitura não são armazenados. A capa, o seletor e os assuntos em preparação não criam nenhum registro; não há vidas, cronômetro, pontuação competitiva nem recompensas. Não há servidor, contas ou envio de dados.

As medalhas visuais têm uma terceira chave, `conquistas-visuais-progresso-v1`, com as datas em que cada lembrança foi encontrada, as atividades de leitura já concluídas e os universos visitados. Ela **lê** as outras duas chaves para avaliar as condições, mas nunca as altera. Assim, o que já estava salvo continua funcionando exatamente como antes.

## Publicação

O site é publicado automaticamente pelo GitHub Pages a partir do branch `main` do repositório `kimberlyhurko-hue/memoria-magnetica`. Para atualizar: editar os arquivos, fazer commit e `git push origin main`. O arquivo `.nojekyll` evita o processamento Jekyll.

## Verificação

Validação feita no navegador: zero erros de console e zero requisições falhas; 7 ilhas, 9 marcos, 19 termos, 10 medalhas e gabarito `ACBBABC`; quiz nas três dificuldades, dica, revisão, certificado, compartilhamento, reinício e migração v1 → v2; modais com foco, fundo inerte e fechamento por `Esc`.

A expansão foi verificada separadamente: 3 temas e 19 rotas de capítulos abertas individualmente; quatro alternativas e explicação em todas as perguntas; feedback correto/incorreto conferido; trilha, botões anterior/próximo, índice e retorno ao `#inicio` funcionando; 19 IDs salvos apenas em `biblioteca-progresso-leitura-v1`; imagens carregadas com `200` e `image/svg+xml`; sem rolagem horizontal em 390 px, 912 px e 1280 px; retorno à jornada preservando 7 ilhas, 9 marcos e 19 termos. Layout sem overflow ou sobreposição também na jornada original.

A camada do atlas foi verificada da mesma forma: 5 cartões no seletor, 4 páginas de universo e 14 rotas de assuntos exibindo “Em preparação”; retorno claro à capa, ao seletor e ao universo de origem; 19 rotas de capítulos de Tecnologia e Futuro preservadas, com 4 opções e feedback correto/incorreto; zero erros de console e zero requisições falhas; nenhuma rolagem horizontal em 390 px, 912 px e 1280 px. Lighthouse no seletor: acessibilidade, boas práticas e SEO com `1`, sem avisos pendentes.

As medalhas visuais foram verificadas parte a parte: cinco ilustrações carregando, condições avaliadas uma a uma, celebração única por medalha, reabertura sem animação de primeira vez, persistência após atualizar a página e nenhuma alteração nas chaves antigas de progresso.

## Limitações

- O progresso é local: trocar de navegador ou apagar os dados do site reinicia a jornada.
- O certificado é uma lembrança visual, não um documento oficial com validação externa.
- `navigator.share` e a área de transferência nem sempre estão disponíveis; nesses casos, o modal de compartilhamento mantém o texto selecionado para cópia manual.
- Os sons são gerados pelo próprio navegador e permanecem desligados até o visitante ativá-los.
- Vida e Natureza, Universo e Descobertas, Humanidade e História e Mente e Conhecimento têm apenas a estrutura de navegação publicada; o conteúdo de leitura ainda será acrescentado.

## Direção artística

A paleta acompanha a evolução do conteúdo: verdes orgânicos (vida), pergaminho e âmbar (registros), metais quentes (mecânica), azuis profundos (eletrônica) e ciano (sistemas digitais). A capa e os cinco universos acrescentam atmosferas próprias — livro iluminado, natureza, estrelas, pergaminho histórico, mente e tecnologia — mantendo a mesma identidade de livro de fantasia. Veja `docs/DIRECAO_ARTISTICA.md`.
