# Biblioteca interativa — Tecnologia e Futuro e atlas dos universos

Este documento descreve as camadas modulares acrescentadas ao site para transformar a página estática em uma biblioteca de conhecimento navegável. A coleção **Tecnologia e Futuro** traz a leitura publicada; o **atlas dos universos** acrescenta a capa, o seletor e as páginas de assuntos. Tudo convive com a jornada original **A Evolução da Memória** sem alterar `js/app.js`, `js/data.js`, `css/style.css` nem os conteúdos de `js/biblioteca-data.js`.

## Visão geral

A biblioteca usa apenas HTML, CSS e JavaScript nativos. Não há build, dependências, bibliotecas, servidor ou envio de dados.

| Arquivo | Função |
|---|---|
| `js/biblioteca-data.js` | Fonte única de conteúdo: coleções, temas e capítulos |
| `js/biblioteca.js` | Roteador por hash, renderização, perguntas e progresso de leitura; também renderiza o atlas |
| `css/biblioteca.css` | Identidade visual isolada sob `body.biblioteca-ativa` |
| `assets/images/tecnologia/*.svg` | Ilustrações autorais da coleção |
| `js/atlas-data.js` | Metadados dos cinco universos e seus assuntos |
| `css/atlas.css` | Capa, seletor, páginas de universo/assunto, isolados sob `body.atlas-ativa` |
| `assets/images/atlas/*.svg` | Ilustrações autorais da capa e dos quatro universos novos |
| `index.html` | Capa `#capa`, includes de CSS/JS, links “Biblioteca” e “Universos”, `<section id="biblioteca">` |

O renderizador lê `window.BIBLIOTECA_COLECOES`. Por compatibilidade, `window.BIBLIOTECA_DATA` aponta para a primeira coleção. Hoje existe uma coleção (`tecnologia`), mas o formato já aceita outras. O atlas usa um registro separado, `window.ATLAS_UNIVERSOS`: ele descreve apenas navegação, títulos, descrições e ilustrações, sem capítulos nem conteúdo educativo inventado.

## Rotas

O roteador usa hashes prefixados para não conflitar com as âncoras originais (`#prologo`, `#jornada`, `#inicio` etc.).

| Nível | Rota | Resultado |
|---|---|---|
| Biblioteca principal | `#/tecnologia` | Página da coleção com introdução e três temas |
| Tema | `#/tecnologia/ia` | Índice de capítulos de Inteligência Artificial |
| Tema | `#/tecnologia/evolucao` | Linha do tempo de Evolução da Tecnologia |
| Tema | `#/tecnologia/robotica` | Índice de capítulos de Robótica |
| Capítulo | `#/tecnologia/<tema>/<capitulo>` | Leitura, ilustração, perguntas e navegação |

O atlas usa rotas curtas, sem o prefixo `/tecnologia`:

| Nível | Rota | Resultado |
|---|---|---|
| Seletor | `#/bibliotecas` | Cinco cartões com ilustração, título, descrição e status |
| Universo | `#/vida`, `#/universo`, `#/humanidade`, `#/mente` | Página do universo com seus assuntos |
| Universo publicado | `#/tecnologia` | Reutiliza a página da coleção já existente |
| Assunto | `#/<universo>/<assunto>` | Assunto escolhido; quatro universos mostram “Em preparação” |

Rotas inválidas são corrigidas com `history.replaceState`: um tema inexistente volta para a coleção, um capítulo inexistente volta para o tema e um assunto inexistente volta ao seu universo. Ao sair para `#inicio` ou `#capa`, as seções originais são restauradas, o `<title>` original volta a ser usado e o alvo da âncora recebe o scroll depois que a biblioteca é ocultada.

## Formato dos dados da coleção

Todos os textos da leitura ficam em `js/biblioteca-data.js`. A estrutura é `coleção → tema → capítulo`.

### Coleção

```js
{
  id: 'tecnologia',              // usado na rota e no progresso
  titulo: 'Tecnologia e Futuro',
  kicker: 'Coleção 01 · ...',
  imagem: 'assets/images/tecnologia/tech-hero.svg',
  intro: 'Frase curta de abertura.',
  descricao: 'Apresentação mais completa.',
  temas: [ /* temas */ ]
}
```

### Tema

```js
{
  id: 'ia',                      // usado na rota e no progresso
  numero: '01',
  titulo: 'Inteligência Artificial',
  subtitulo: 'Aprender com dados',
  resumo: 'Descrição curta exibida no cartão.',
  imagem: 'assets/images/tecnologia/tech-ia.svg',
  cor: 'ia',                     // ia | evolucao | robotica
  duracao: '6 capítulos',
  intro: 'Texto de apresentação do tema.',
  capitulos: [ /* capítulos */ ]
}
```

### Capítulo

```js
{
  id: 'conceito',                // usado na rota e no progresso
  numero: 1,
  titulo: 'O que é inteligência artificial?',
  intro: 'Chamada inicial da leitura.',
  imagem: 'assets/images/tecnologia/tech-ia.svg',
  era: 'pedra',                  // opcional; usado apenas na linha do tempo
  diagrama: 'assets/images/tecnologia/tech-rede-neural.svg', // opcional
  blocos: [
    { titulo: 'Um conceito amplo', texto: '...' }
  ],
  componentes: [                 // opcional; legenda numerada da ilustração
    { numero: 1, nome: 'Sensor', funcao: 'Percebe o ambiente.' }
  ],
  destaque: { titulo: 'Ideia-chave', texto: '...' },
  curiosidade: { titulo: 'Curiosidade', texto: '...' },
  vocabulario: [
    { termo: 'Algoritmo', definicao: 'Sequência de passos.' }
  ],
  pergunta: {
    enunciado: 'O que distingue um sistema de IA de um programa tradicional?',
    opcoes: [
      {
        texto: 'Ele aprende padrões a partir de dados.',
        correta: true,
        porque: 'Explicação exibida após a resposta.'
      }
      // use quatro alternativas, com exatamente uma correta
    ]
  }
}
```

Campos observados pelo renderizador:

- `blocos` geram os tópicos numerados; o painel lateral fixo repete os títulos como resumo.
- `diagrama`, `componentes`, `destaque`, `curiosidade` e `vocabulario` são opcionais.
- `era` muda a cor do capítulo e o rótulo na linha do tempo. As chaves atuais são `pedra`, `papel`, `mecanica`, `eletronica`, `digital` e `futuro`.
- A pergunta usa quatro alternativas (`A`–`D`) e exatamente uma com `correta: true`. O campo `porque` é obrigatório na alternativa correta e recomendado nas demais.

## Formato dos dados do atlas

Os metadados dos universos ficam em `js/atlas-data.js`, em `window.ATLAS_UNIVERSOS`. Cada universo segue este formato:

```js
{
  id: 'vida',                       // usado na rota #/vida
  titulo: 'Vida e Natureza',
  kicker: 'Universo 01 · O mundo vivo',
  descricao: 'Descrição curta do cartão.',
  intro: 'Apresentação na página do universo.',
  imagem: 'assets/images/atlas/vida.svg',
  cor: 'vida',                      // vida | universo | humanidade | mente | tecnologia
  simbolo: '❦',                     // glifo decorativo, com aria-hidden no HTML
  status: 'preparacao',             // preparacao | disponivel
  assuntos: [
    { id: 'biologia', titulo: 'Biologia', descricao: '...', simbolo: '❧' }
  ]
}
```

Campos observados pelo renderizador:

- `status: 'disponivel'` com `rota` opcional abre diretamente a coleção publicada. Em Tecnologia e Futuro, `rota` é `#/tecnologia` e os assuntos do atlas apontam para os temas já existentes.
- `status: 'preparacao'` mantém as páginas navegáveis, mas exibe **“Em preparação”**: não há capítulos, perguntas, notas nem pontuação.
- `cor` define `--uni-cor`, `--uni-fundo` e `--uni-brilho` pelas classes `.atlas-card--<cor>` e `.atlas-universo--<cor>` em `css/atlas.css`.
- `simbolo` é apenas decorativo e fica no HTML com `aria-hidden="true"`; todo rótulo útil vem dos campos de texto.
- Novos assuntos entram apenas no array `assuntos`. Para publicar conteúdo de verdade, acrescente a coleção em `js/biblioteca-data.js`, mude o `status` do universo e remova a `rota` atalho; as rotas `#/<universo>` e `#/<universo>/<assunto>` já são reconhecidas pelo roteador.

## Progresso e feedback

A chave do `localStorage` é:

```text
biblioteca-progresso-leitura-v1
```

Formato:

```json
{
  "tecnologia": {
    "ia": ["conceito", "aprendizado"],
    "evolucao": ["primeiras-invencoes"]
  }
}
```

São salvos **apenas os IDs dos capítulos visitados**. Não há respostas, acertos, notas, recordes, vidas, temporizadores nem recompensas nesta chave. A barra no topo indica a posição de rolagem da leitura; os números “x de y” indicam quantos capítulos já foram abertos. A pergunta de revisão dá explicação imediata tanto para a resposta correta quanto para a incorreta, sem bloquear a navegação.

As medalhas visuais pertencem a outra camada e usam `conquistas-visuais-progresso-v1`. O módulo `js/conquistas.js` lê esta chave de leitura para reconhecer temas concluídos, mas não escreve nela; ou seja, o contrato acima permanece válido. As únicas informações extras ficam na chave própria das medalhas.

Para reiniciar esse histórico, remova a chave acima nas ferramentas do navegador. Isso não afeta o progresso da jornada original nem a coleção de medalhas, que usam outras chaves.

## Como expandir

### Novo capítulo

1. Acrescente o objeto ao array `capitulos` do tema desejado.
2. Use `id` único dentro do tema e `numero` sequencial.
3. Crie a ilustração em `assets/images/tecnologia/` se necessário.
4. Mantenha ao menos quatro blocos, uma pergunta com quatro alternativas e uma explicação.

O índice do tema, os botões anterior/próximo, a linha de capítulos e o total de visitados são gerados automaticamente.

### Novo tema

1. Acrescente o objeto ao array `temas` da coleção.
2. Defina `id`, `cor`, `imagem`, textos e capítulos.
3. Se usar uma cor nova, adicione um bloco `.bib-tema--<cor>` em `css/biblioteca.css` com `--tema-cor`, `--tema-fundo` e `--tema-brilho`.

### Nova coleção

1. Crie outro objeto no formato de coleção e inclua-o no array `COLECOES` no fim de `js/biblioteca-data.js`.
2. Use um `id` curto e único: a rota será automaticamente `#/<id>`.
3. Adicione as ilustrações correspondentes.
4. Se introduzir novas eras, inclua o rótulo no mapa `ERAS` de `js/biblioteca.js` e as cores em `css/biblioteca.css`.

### Novo universo ou assunto do atlas

1. Acrescente o objeto ao array `window.ATLAS_UNIVERSOS` em `js/atlas-data.js`.
2. Use `id` curto e único; as rotas `#/<id>` e `#/<id>/<assunto>` são geradas automaticamente.
3. Crie a ilustração em `assets/images/atlas/` e defina `cor`, `simbolo`, `descricao` e `intro`.
4. Enquanto não houver conteúdo, mantenha `status: 'preparacao'` — a página exibirá o aviso em vez de inventar capítulos.

Nenhuma alteração no roteador é necessária para coleções, temas, capítulos, universos ou assuntos adicionais.

## Verificação recomendada

Ao alterar dados ou estilos, conferir:

- todas as rotas `#/tecnologia/<tema>/<capitulo>` abrem com título, ilustração, tópicos, pergunta e explicação;
- as quatro alternativas respondem e o feedback correto/incorreto aparece;
- anterior/próximo, índice do tema, trilha e retorno à biblioteca principal funcionam;
- `#/bibliotecas` mostra os cinco cartões, cada um com ilustração carregada e área clicável;
- `#/vida`, `#/universo`, `#/humanidade` e `#/mente` mostram seus assuntos com o aviso “Em preparação”;
- `#/tecnologia` continua abrindo os 19 capítulos, sem alterar as rotas nem o progresso;
- o retorno pela trilha leva ao universo, ao seletor e à capa, com a rolagem ajustada após a biblioteca ser ocultada;
- `#inicio` e `#capa` restauram a jornada original sem erros no console;
- nenhuma requisição termina em 404;
- 390 px, 912 px e 1280 px não apresentam rolagem horizontal;
- o `localStorage` contém somente IDs de capítulos visitados;
- Lighthouse no seletor permanece com acessibilidade, boas práticas e SEO em `1`, sem avisos.
