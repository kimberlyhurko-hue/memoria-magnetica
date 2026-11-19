/* Conteúdo da jornada — A Evolução da Memória */
(function (global) {
  'use strict';

  var IMG = {
    heroi: 'assets/images/hero.svg',
    conclusao: 'assets/images/conclusao.svg'
  };

  var ICONS = {
    cell: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="7"/><circle cx="13" cy="15" r="2.4" fill="currentColor" stroke="none"/><circle cx="36" cy="30" r="2" fill="currentColor" stroke="none"/><path d="M24 7v6M41 24h-6M24 41v-6M7 24h6"/></svg>',
    paw: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="18" r="4"/><circle cx="22" cy="12" r="4"/><circle cx="33" cy="14" r="4"/><circle cx="40" cy="24" r="3"/><path d="M24 24c-7 0-12 5-12 10 0 4 4 6 12 6s12-2 12-6c0-5-5-10-12-10Z"/></svg>',
    brain: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M23 9c-3-4-10-3-12 2-5 0-8 5-6 9-3 3-2 9 2 11 0 5 5 8 9 6 2 3 6 3 7-1V9Z"/><path d="M25 9c3-4 10-3 12 2 5 0 8 5 6 9 3 3 2 9-2 11 0 5-5 8-9 6-2 3-6 3-7-1V9Z"/><path d="M24 9v30M16 19h4M28 19h4"/></svg>',
    book: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M24 13c-5-4-12-5-18-3v27c6-2 13-1 18 3 5-4 12-5 18-3V10c-6-2-13-1-18 3Z"/><path d="M24 13v27"/></svg>',
    tablet: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="10" y="6" width="28" height="36" rx="3"/><path d="M16 15h10M16 22h16M16 29h8M16 36h13"/></svg>',
    chip: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="12" y="12" width="24" height="24" rx="3"/><rect x="19" y="19" width="10" height="10" rx="1"/><path d="M18 12V6M24 12V6M30 12V6M18 36v6M24 36v6M30 36v6M12 18H6M12 24H6M12 30H6M36 18h6M36 24h6M36 30h6"/></svg>',
    cpu: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="8" y="8" width="32" height="32" rx="4"/><rect x="16" y="16" width="16" height="16" rx="2"/><circle cx="24" cy="24" r="3" fill="currentColor" stroke="none"/><path d="M24 3v5M24 40v5M3 24h5M40 24h5M15 3v5M33 3v5M15 40v5M33 40v5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7"/></svg>'
  };

  var CAPITULOS = [
    {
      id: 'celular',
      numero: '01',
      fase: 'O início da vida',
      titulo: 'Memória celular',
      era: 'organic',
      img: 'assets/images/celular.svg',
      icone: 'cell',
      periodo: 'O mundo microscópico',
      intro: 'Mesmo sem cérebro, as células “lembram”: reconhecem sinais, respondem a estímulos e ajustam seu comportamento ao ambiente.',
      fala: 'Antes de existir memória na cabeça, já existia memória na vida. Vamos entrar no menor dos mundos.',
      blocos: [
        { icone: 'cell', titulo: 'Reconhecer sinais', texto: 'Receptores na membrana identificam mudanças: luz, nutrientes, temperatura ou substâncias químicas.' },
        { icone: 'paw', titulo: 'Responder e adaptar', texto: 'O sinal dispara reações internas. A célula muda sua atividade e pode manter esse padrão por algum tempo.' },
        { icone: 'cell', titulo: 'Passar adiante', texto: 'Ao se dividir, a célula transmite parte desses padrões às células-filhas: é a memória celular.' }
      ],
      curiosidade: { titulo: 'Você sabia?', texto: 'Bactérias ajustam seu comportamento a ambientes que já encontraram. Memória não precisa de cérebro: precisa de um jeito de guardar informação.' },
      pergunta: {
        enunciado: 'Como uma célula “lembra” de um estímulo?',
        opcoes: [
          { texto: 'Ela reconhece sinais e mantém padrões de resposta.', correta: true },
          { texto: 'Ela escreve anotações no DNA como se fosse um texto.', correta: false },
          { texto: 'Ela guarda cópias exatas em uma memória RAM.', correta: false }
        ],
        explicacao: 'A célula não escreve nem tem RAM: receptores e vias químicas guardam padrões de reconhecimento e resposta por determinado tempo.'
      },
      recompensa: 'Isso mesmo! A memória começa muito antes do cérebro.'
    },
    {
      id: 'animais',
      numero: '02',
      fase: 'O mundo animal',
      titulo: 'Memória nos animais',
      era: 'organic',
      img: 'assets/images/animais.svg',
      icone: 'paw',
      periodo: 'Florestas e trilhas',
      intro: 'Com o sistema nervoso, os animais passaram a associar sinais, aprender com consequências e encontrar o caminho de volta.',
      fala: 'Aqui a memória ganhou pernas: ela passou a guiar escolhas, rotas e sobrevivência.',
      blocos: [
        { icone: 'paw', titulo: 'Associar', texto: 'Um som pode anunciar comida. Ao repetir a experiência, o animal cria uma ligação entre os dois eventos.' },
        { icone: 'book', titulo: 'Orientar-se', texto: 'Aves, formigas e mamíferos memorizam rotas, cheiros, estrelas e pontos de referência para navegar.' },
        { icone: 'brain', titulo: 'Mudar o comportamento', texto: 'Uma experiência ruim ou boa altera a escolha seguinte: medo, busca de alimento e cuidado com os filhotes.' }
      ],
      curiosidade: { titulo: 'Você sabia?', texto: 'Esquilos conseguem lembrar onde esconderam milhares de sementes — e recuperam a maioria delas meses depois.' },
      pergunta: {
        enunciado: 'O que ajuda um animal a voltar para casa?',
        opcoes: [
          { texto: 'Esquecer completamente o caminho.', correta: false },
          { texto: 'Criar um mapa novo a cada passo.', correta: false },
          { texto: 'Lembrar rotas e pontos de referência.', correta: true }
        ],
        explicacao: 'A memória espacial guarda marcos do caminho. Por isso um animal reconhece o lugar onde já esteve.'
      },
      recompensa: 'Boa! A memória animal transforma experiência em orientação.'
    },
    {
      id: 'humana',
      numero: '03',
      fase: 'A mente humana',
      titulo: 'Memória humana',
      era: 'study',
      img: 'assets/images/humana.svg',
      icone: 'brain',
      periodo: 'A sala das lembranças',
      intro: 'Nós transformamos sensações em lembranças. Algumas duram frações de segundo; outras, uma vida inteira.',
      fala: 'A memória humana tem camadas. Umas são rápidas e frágeis; outras ficam para sempre — ou quase.',
      blocos: [
        { icone: 'cell', titulo: 'Sensorial', texto: 'É o vestígio imediato do que vimos ou ouvimos. Dura frações de segundo e some se não receber atenção.' },
        { icone: 'brain', titulo: 'Curto prazo', texto: 'Guarda poucos itens por segundos ou minutos: é a memória de trabalho, usada para discar um número ou seguir uma instrução.' },
        { icone: 'book', titulo: 'Longo prazo', texto: 'Pode durar anos. Repetição, sono e emoção ajudam a fixar o que aprendemos.' }
      ],
      curiosidade: { titulo: 'Você sabia?', texto: 'Emoções fortes ajudam a gravar memórias mais vívidas. Por isso lembramos com tanta clareza momentos marcantes.' },
      pergunta: {
        enunciado: 'Onde você guarda um número por segundos, até conseguir discar?',
        opcoes: [
          { texto: 'Na memória sensorial.', correta: false },
          { texto: 'Na memória de curto prazo.', correta: true },
          { texto: 'Na memória de longo prazo.', correta: false }
        ],
        explicacao: 'A memória de trabalho mantém pouca informação por pouco tempo. Sem repetição, o número se perde.'
      },
      recompensa: 'Perfeito! Você entendeu as camadas da memória humana.'
    },
    {
      id: 'coletiva',
      numero: '04',
      fase: 'A memória da humanidade',
      titulo: 'Memória coletiva',
      era: 'study',
      img: 'assets/images/coletiva.svg',
      icone: 'book',
      periodo: 'A biblioteca das gerações',
      intro: 'Quando compartilhamos lembranças, elas deixam de ser só individuais: viram história, costume e conhecimento de um povo.',
      fala: 'Uma lembrança contada duas vezes já pertence a duas pessoas. Mil vezes, pertence a uma civilização.',
      blocos: [
        { icone: 'paw', titulo: 'Desenhos e símbolos', texto: 'Marcas e pinturas guardam significados para o grupo e ajudam a transmitir ideias sem palavras.' },
        { icone: 'brain', titulo: 'Linguagem e oralidade', texto: 'Histórias, cantos e lendas passam de geração em geração pela voz e pela escuta.' },
        { icone: 'book', titulo: 'Escrita', texto: 'Registros escritos permitem guardar com precisão e alcançar pessoas que nunca conheceram quem escreveu.' }
      ],
      curiosidade: { titulo: 'Você sabia?', texto: 'As pinturas rupestres são antigas formas de memória coletiva: nelas, grupos registravam animais, caçadas e rituais.' },
      pergunta: {
        enunciado: 'O que transforma uma lembrança individual em memória coletiva?',
        opcoes: [
          { texto: 'Compartilhar e registrar para outras pessoas.', correta: true },
          { texto: 'Guardar tudo apenas na própria cabeça.', correta: false },
          { texto: 'Esquecer o passado rapidamente.', correta: false }
        ],
        explicacao: 'Memória coletiva nasce quando a informação é compartilhada e preservada para além de uma única pessoa.'
      },
      recompensa: 'Excelente! A memória também é um bem compartilhado.'
    },
    {
      id: 'registros',
      numero: '05',
      fase: 'Os primeiros registros artificiais',
      titulo: 'Memória artificial',
      era: 'archive',
      img: 'assets/images/registros.svg',
      icone: 'tablet',
      periodo: 'Pedra, argila e papel',
      intro: 'A memória saiu do corpo e ganhou um suporte material. O registro passou a existir mesmo sem quem o criou.',
      fala: 'Quando a lembrança ganha suporte, ela viaja no tempo sem precisar de alguém para carregá-la.',
      blocos: [
        { icone: 'tablet', titulo: 'Suportes', texto: 'Parede de pedra, argila, papiro, pergaminho, papel: cada material guarda informação de um jeito diferente.' },
        { icone: 'book', titulo: 'De marcas a texto', texto: 'Símbolos viraram escrita. Depois, a impressão permitiu copiar a mesma obra muitas vezes.' },
        { icone: 'cell', titulo: 'Arquivos', texto: 'Bibliotecas, museus e documentos organizam aquilo que uma sociedade decide lembrar.' }
      ],
      curiosidade: { titulo: 'Você sabia?', texto: 'Antes da imprensa, cada livro era copiado à mão. Uma única obra poderia levar meses para ser reproduzida.' },
      pergunta: {
        enunciado: 'Qual é um exemplo de memória artificial física?',
        opcoes: [
          { texto: 'Um pensamento guardado apenas na cabeça.', correta: false },
          { texto: 'Um som que desaparece no ar.', correta: false },
          { texto: 'Uma inscrição feita em uma tábua de argila.', correta: true }
        ],
        explicacao: 'Memória artificial física é aquela registrada em um material externo ao corpo, como pedra, argila ou papel.'
      },
      recompensa: 'Muito bem! O registro material venceu o tempo.'
    },
    {
      id: 'eletronica',
      numero: '06',
      fase: 'A era eletrônica',
      titulo: 'Memória eletrônica',
      era: 'digital',
      img: 'assets/images/eletronica.svg',
      icone: 'chip',
      periodo: 'Sinais, fitas e chips',
      intro: 'No século XX, a informação virou sinal elétrico. Ela passou a ser gravada em fitas, discos e chips — e a mudar muito mais rápido.',
      fala: 'Aqui o mundo esfria e fica azul: a lembrança vira corrente elétrica, sequência de bits.',
      blocos: [
        { icone: 'chip', titulo: 'Bits', texto: 'A informação é codificada em 0 e 1. Sequências de bits representam texto, imagem, som e vídeo.' },
        { icone: 'tablet', titulo: 'Meios magnéticos e ópticos', texto: 'Fita, disquete, disco rígido e CD guardam dados por meio de marcas físicas que podem ser lidas depois.' },
        { icone: 'cpu', titulo: 'Chips', texto: 'Transistores formam células de memória sem peças móveis: são rápidos, silenciosos e muito pequenos.' }
      ],
      curiosidade: { titulo: 'Você sabia?', texto: 'Um único DVD comporta cerca de 4,7 bilhões de bytes: milhares de livros ou um filme inteiro em um disco fino.' },
      pergunta: {
        enunciado: 'O que é um bit?',
        opcoes: [
          { texto: 'Um tipo de engrenagem de bronze.', correta: false },
          { texto: 'Uma unidade de informação que vale 0 ou 1.', correta: true },
          { texto: 'Um programa de computador completo.', correta: false }
        ],
        explicacao: 'Bit é a menor unidade de informação digital. Grupos de oito bits formam um byte.'
      },
      recompensa: 'Certo! Tudo que é digital começa com bits.'
    },
    {
      id: 'computadores',
      numero: '07',
      fase: 'O mundo dos computadores',
      titulo: 'Memória dos computadores',
      era: 'future',
      img: 'assets/images/computadores.svg',
      icone: 'cpu',
      periodo: 'Sistemas modernos',
      intro: 'Computadores combinam memórias diferentes: umas muito rápidas e temporárias, outras mais lentas e permanentes.',
      fala: 'Chegamos ao universo dos sistemas. Cada memória tem um papel — e nenhuma faz tudo sozinha.',
      blocos: [
        { icone: 'chip', titulo: 'RAM', texto: 'É a memória de trabalho: muito rápida, mas volátil. Ao desligar o aparelho, o que estava nela desaparece.' },
        { icone: 'book', titulo: 'ROM', texto: 'Guarda instruções básicas de inicialização. Seu conteúdo não se apaga quando o computador desliga.' },
        { icone: 'cpu', titulo: 'HD e SSD', texto: 'HD usa discos magnéticos giratórios; SSD usa memória flash, sem partes móveis. Os dois guardam arquivos mesmo desligados.' }
      ],
      curiosidade: { titulo: 'RAM × ROM', texto: 'RAM é como a mesa onde você trabalha: ao sair, ela é limpa. ROM é como o manual fixo do aparelho: continua lá.' },
      pergunta: {
        enunciado: 'Qual memória some quando o computador desliga?',
        opcoes: [
          { texto: 'ROM.', correta: false },
          { texto: 'HD.', correta: false },
          { texto: 'RAM.', correta: true }
        ],
        explicacao: 'A RAM é volátil: precisa de energia para manter os dados. ROM, HD e SSD preservam informações sem energia.'
      },
      recompensa: 'Você chegou ao fim! Agora a memória biológica e a artificial fazem sentido juntas.'
    }
  ];

  global.MEMORIA_DATA = {
    IMG: IMG,
    ICONS: ICONS,
    CAPITULOS: CAPITULOS,
    STORAGE_KEY: 'evolucao-memoria-progresso-v1'
  };
})(window);
