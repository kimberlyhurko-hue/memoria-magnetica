# Biblioteca interativa — Tecnologia e Futuro

Este documento descreve a camada modular acrescentada ao site para transformar a página estática em uma biblioteca de conhecimento navegável. Ela convive com a jornada original **A Evolução da Memória** sem alterar `js/app.js`, `js/data.js` nem `css/style.css`.

## Visão geral

A biblioteca usa apenas HTML, CSS e JavaScript nativos. Não há build, dependências, bibliotecas, servidor ou envio de dados.

| Arquivo | Função |
|---|---|
| `js/biblioteca-data.js` | Fonte única de conteúdo: coleções, temas e capítulos |
| `js/biblioteca.js` | Roteador por hash, renderização, perguntas e progresso de leitura |
| `css/biblioteca.css` | Identidade visual isolada sob `body.biblioteca-ativa` |
| `assets/images/tecnologia/*.svg` | Ilustrações autorais da coleção |
| `index.html` | Include de CSS/JS, link “Biblioteca” no cabeçalho e `<section id="biblioteca">` |

O renderizador lê `window.BIBLIOTECA_COLECOES`. Por compatibilidade, `window.BIBLIOTECA_DATA` aponta para a primeira coleção. Hoje existe uma coleção (`tecnologia`), mas o formato já aceita outras.

## Rotas

O roteador usa hashes prefixados para não conflitar com as âncoras originais (`#prologo`, `#jornada`, `#inicio` etc.).

| Nível | Rota | Resultado |
|---|---|---|
| Biblioteca principal | `#/tecnologia` | Página da coleção com introdução e três temas |
| Tema | `#/tecnologia/ia` | Índice de capítulos de Inteligência Artificial |
| Tema | `#/tecnologia/evolucao` | Linha do tempo de Evolução da Tecnologia |
| Tema | `#/tecnologia/robotica` | Índice de capítulos de Robótica |
| Capítulo | `#/tecnologia/<tema>/<capitulo>` | Leitura, ilustração, perguntas e navegação |

Rotas inválidas são corrigidas com `history.replaceState`: um tema inexistente volta para a coleção e um capítulo inexistente volta para o tema. Ao sair para `#inicio`, as seções originais são restauradas e o `<title>` original volta a ser usado.

## Formato dos dados

Todos os textos ficam em `js/biblioteca-data.js`. A estrutura é `coleção → tema → capítulo`.

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

São salvos **apenas os IDs dos capítulos visitados**. Não há respostas, acertos, notas, recordes, vidas, temporizadores, medalhas ou recompensas. A barra no topo indica a posição de rolagem da leitura; os números “x de y” indicam quantos capítulos já foram abertos. A pergunta de revisão dá explicação imediata tanto para a resposta correta quanto para a incorreta, sem bloquear a navegação.

Para reiniciar esse histórico, remova a chave acima nas ferramentas do navegador. Isso não afeta o progresso da jornada original, que usa outra chave.

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

Nenhuma alteração no roteador é necessária para coleções, temas ou capítulos adicionais.

## Verificação recomendada

Ao alterar dados ou estilos, conferir:

- todas as rotas `#/tecnologia/<tema>/<capitulo>` abrem com título, ilustração, tópicos, pergunta e explicação;
- as quatro alternativas respondem e o feedback correto/incorreto aparece;
- anterior/próximo, índice do tema, trilha e retorno à biblioteca principal funcionam;
- `#inicio` restaura a jornada original sem erros no console;
- nenhuma requisição termina em 404;
- 390 px, 912 px e 1280 px não apresentam rolagem horizontal;
- o `localStorage` contém somente IDs de capítulos visitados.
