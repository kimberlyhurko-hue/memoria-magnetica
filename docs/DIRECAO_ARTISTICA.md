# Direção artística — A Evolução da Memória

Referência visual da reformulação (v2). Este arquivo orienta novas ilustrações, cenários e interfaces sem alterar a identidade construída.

## Conceito

**“Um livro que atravessa o tempo, acompanhando a evolução da memória desde as primeiras formas de registro da vida até os sistemas digitais — e que se abre em cinco universos de conhecimento.”**

A experiência parece um livro de fantasia ilustrado e cinematográfico — nunca uma apresentação de slides, um site corporativo ou um jogo genérico. A atmosfera é luminosa, mágica e acolhedora, com textura pictórica suave e detalhes em dourado.

Frase-guia: *“Um universo onde a natureza se transforma em conhecimento, o conhecimento se transforma em invenção e a invenção abre caminho para o futuro.”*

## Paleta progressiva

| Fase | Sensação | Cores principais |
|---|---|---|
| Biológica | natureza, vida | `#183D2B` `#315C3B` `#78936A` `#C6A76B` |
| Registros | conhecimento, história | `#493323` `#765033` `#C19B68` `#D8C49D` |
| Mecânica | invenções, metais | `#60452E` `#A66C43` `#D8A45D` `#332B27` |
| Eletrônica | tecnologia | `#101C36` `#172F55` `#235B85` `#399BC0` |
| Computacional | futuro | azuis profundos, ciano, linhas de dados luminosas |

A reformulação uniformizou essa progressão com oliva profundo (`#2b3218`), âmbar (`#c98a36`, `#e0b45f`), teal (`#2f8ea8`) e pergaminho quente (`#ead8ad`). No CSS, os temas da jornada são `era-organic`, `era-study`, `era-archive`, `era-digital` e `era-future`; cada um muda cor de destaque, painel, texto e véu sem trocar a estrutura da interface.

## Voz da jornada

**Não há personagem ilustrado fixo.** O antigo leão narrador foi removido permanentemente: sem avatar, retrato ou falas atribuídas a um personagem. A condução é feita por pequenas notas em itálico identificadas como **“O fio da história”**, no prólogo e no topo de cada fase. O tom continua sábio, sereno e acolhedor.

As imagens enviadas como referência inspiram apenas paleta, textura, iluminação e atmosfera. Elas **não** são usadas como fundo nem como ilustração literal do site.

## Cenários implementados

- `hero.svg` e `conclusao.svg`: abertura e encerramento com natureza e tecnologia se encontrando.
- `paper-texture.svg`: textura de pergaminho usada nos painéis.
- `mapa-mundo.svg` e `mapa-mundo-mobile.svg`: atlas ilustrado nas versões horizontal e vertical.
- `celular.svg`, `animais.svg`, `humana.svg`, `coletiva.svg`, `registros.svg`, `eletronica.svg`, `computadores.svg`: cenário de cada uma das sete fases.

Todos são SVGs autorais e leves, nítidos em qualquer resolução, sem textos embutidos. Texto e interface ficam sempre no HTML/CSS, o que facilita acessibilidade, tradução e manutenção.

## Interface e interação

- Cabeçalho fixo com marca, navegação, progresso `0/7`, som opcional e menu em telas pequenas.
- Mapa/linha do tempo em formato de **atlas ilustrado**: sete ilhas clicáveis sobre o mar de pergaminho, caminho pontilhado e estados visualmente distintos para ilha atual, visitada e concluída.
- Painel da jornada com cenário de fundo que muda por fase, três blocos de conteúdo, detalhes, fontes e nota “O fio da história”.
- Quiz com dificuldade Explorador/Aprendiz/Mestre: alternativas com estados de erro, acerto e dica; feedback imediato e explicação curta.
- Seções de linha do tempo (9 marcos), glossário (19 termos com busca e filtros), comparação biológico/artificial, estatísticas, medalhas, histórico e conclusão.
- Modais para mapa ampliado, revisão de respostas, compartilhamento, certificado e confirmação de reinício. Foco preso, fundo inerte e `Esc` para fechar.
- Animações discretas e contínuas; `prefers-reduced-motion` respeitado. Sem bibliotecas externas.

## Biblioteca Tecnologia e Futuro

A coleção acrescentada mantém a mesma premissa de “universo do conhecimento”, mas troca o pergaminho por um atlas tecnológico: fundo azul-marinho profundo, azul elétrico, ciano luminoso e violeta, com pequenos detalhes brancos e dourados. A atmosfera é de descoberta e imaginação — nunca de painel corporativo, dashboard ou jogo competitivo.

| Tema | Sensação | Cores principais |
|---|---|---|
| Inteligência Artificial | rede, dados, luz fria | `#061B3C` `#2EE6FF` `#7C6CFF` `#E8C46A` |
| Evolução da Tecnologia | do fogo ao digital | `#3C2E1E` `#D5A45C` `#172548` `#4DE8FF` |
| Robótica | laboratório de engenharia | `#050B23` `#4DE8FF` `#8B5CFF` `#DBE6F7` |

Essa identidade vive em `css/biblioteca.css`, sob `body.biblioteca-ativa`. Ela muda cabeçalho, rodapé, fundo e componentes da biblioteca sem sobrescrever a jornada original. Cada tema recebe `--tema-cor`, `--tema-fundo` e `--tema-brilho` próprios; os capítulos da evolução também recebem cor por era (`pedra`, `papel`, `mecanica`, `eletronica`, `digital`, `futuro`), tornando a passagem do tempo perceptível no índice e na leitura.

Ilustrações da coleção, todas em `assets/images/tecnologia/`:

- `tech-hero.svg`: três portais — rede de conhecimento, arco da evolução e engenharia robótica.
- `tech-ia.svg` e `tech-rede-neural.svg`: malhas luminosas e fluxo entre camadas.
- `tech-evolucao.svg`: pedra e fogo, ábaco e engrenagens, computador e dispositivo conectado sobre uma linha contínua.
- `tech-computadores.svg`: válvulas, transistor, circuito integrado e computador pessoal.
- `tech-robotica.svg` e `tech-robo-partes.svg`: braço mecânico, sensores e robô esquemático com peças numeradas.

Como na jornada, são SVGs autorais e sem texto embutido: rótulos e legendas ficam no HTML, garantindo acessibilidade e manutenção. A trilha de localização aparece no topo em todas as larguras; o indicador de leitura é neutro e não representa pontuação. Detalhes de implementação em `docs/BIBLIOTECA.md`.

## Capa e universos

A camada do atlas abre o site como um livro: capa ilustrada, frase curta e botão **“Entrar na biblioteca”**. A ilustração `capa-conhecimento.svg` mostra um livro aberto e luminoso entre estrelas, folhas, órbitas e trilhas de dados — o encontro entre natureza, conhecimento e invenção que resume a frase-guia do projeto. A abertura é uma rotação suave do livro, com `prefers-reduced-motion` respeitado; nenhum texto fica dentro do SVG.

O seletor apresenta cinco cartões como universos, não como itens de menu administrativo: cada um com atmosfera, ilustração e cor próprias. As páginas de assunto repetem a paleta do universo para manter a sensação de percorrer mundos diferentes.

| Universo | Sensação | Cores principais |
|---|---|---|
| Vida e Natureza | floresta, crescimento | `#0D2B20` `#164A35` `#9ED18F` `#E8C46A` |
| Universo e Descobertas | céu, órbitas, partículas | `#07122B` `#142A57` `#8BC4FF` `#E8C46A` |
| Humanidade e História | templos, pergaminho, memória | `#2B1D14` `#543923` `#E8C46A` `#D8C49D` |
| Mente e Conhecimento | ideias, rede neural, livros | `#101D34` `#1D2B4D` `#B6A0FF` `#8B5CFF` |
| Tecnologia e Futuro | atlas tecnológico | `#050C1D` `#0A1732` `#4DE8FF` `#8B5CFF` |

Ilustrações em `assets/images/atlas/`: `capa-conhecimento.svg`, `vida.svg`, `universo.svg`, `humanidade.svg` e `mente.svg`. Tecnologia e Futuro reutiliza `tech-hero.svg`. Todos os SVGs são autorais e sem texto embutido; rótulos e descrições ficam no HTML por acessibilidade. O estilo vive em `css/atlas.css`, sob `body.atlas-ativa`, e complementa — sem sobrescrever — a identidade de `body.biblioteca-ativa`.

Os quatro universos novos estão em preparação: as páginas mantêm a atmosfera e a navegação, mas exibem explicitamente esse estado em vez de apresentar conteúdo improvisado.

## Princípios

1. Unidade artística entre cenário, mapa, tipografia e interface.
2. Evolução visual perceptível de uma fase para a outra.
3. Continuidade narrativa sem personagem fixo.
4. Legibilidade do conteúdo científico em primeiro lugar.
5. Beleza sem excesso de efeitos.
6. Originalidade: arte vetorial autoral, referências apenas como inspiração.
7. Fidelidade científica: metáforas visuais identificadas como tal e datas aproximadas sinalizadas.
8. Responsividade de 390 px a desktop amplo.
9. Desempenho: arquivos estáticos, sem dependências.
10. Acessibilidade: teclado, leitores de tela, contraste e movimento reduzido.
11. Expansões isoladas: novas coleções podem entrar sem alterar a identidade nem a lógica da jornada original.
