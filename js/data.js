/* Conteúdo da jornada — A Evolução da Memória
   Dados organizados para expansão: fases, perguntas, glossário, linha do tempo,
   conquistas e fontes. Textos conferidos com referências ao final de cada fase. */
(function (global) {
  'use strict';

  const IMG = {
    heroi: 'assets/images/hero.svg',
    conclusao: 'assets/images/conclusao.svg'
  };

  const ICONS = {
    cell: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="7"/><circle cx="13" cy="15" r="2.4" fill="currentColor" stroke="none"/><circle cx="36" cy="30" r="2" fill="currentColor" stroke="none"/><path d="M24 7v6M41 24h-6M24 41v-6M7 24h6"/></svg>',
    paw: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="18" r="4"/><circle cx="22" cy="12" r="4"/><circle cx="33" cy="14" r="4"/><circle cx="40" cy="24" r="3"/><path d="M24 24c-7 0-12 5-12 10 0 4 4 6 12 6s12-2 12-6c0-5-5-10-12-10Z"/></svg>',
    brain: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M23 9c-3-4-10-3-12 2-5 0-8 5-6 9-3 3-2 9 2 11 0 5 5 8 9 6 2 3 6 3 7-1V9Z"/><path d="M25 9c3-4 10-3 12 2 5 0 8 5 6 9 3 3 2 9-2 11 0 5 5 8 9 6-2 3-6 3-7-1V9Z"/><path d="M24 9v30M16 19h4M28 19h4"/></svg>',
    book: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M24 13c-5-4-12-5-18-3v27c6-2 13-1 18 3 5-4 12-5 18-3V10c-6-2-13-1-18 3Z"/><path d="M24 13v27"/></svg>',
    tablet: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="10" y="6" width="28" height="36" rx="3"/><path d="M16 15h10M16 22h16M16 29h8M16 36h13"/></svg>',
    chip: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="12" y="12" width="24" height="24" rx="3"/><rect x="19" y="19" width="10" height="10" rx="1"/><path d="M18 12V6M24 12V6M30 12V6M18 36v6M24 36v6M30 36v6M12 18H6M12 24H6M12 30H6M36 18h6M36 24h6M36 30h6"/></svg>',
    cpu: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="8" y="8" width="32" height="32" rx="4"/><rect x="16" y="16" width="16" height="16" rx="2"/><circle cx="24" cy="24" r="3" fill="currentColor" stroke="none"/><path d="M24 3v5M24 40v5M3 24h5M40 24h5M15 3v5M33 3v5M15 40v5M33 40v5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7"/></svg>'
  };

  const CAPITULOS = [
    {
      id: 'celular',
      numero: '01',
      fase: 'O início da vida',
      titulo: 'Memória celular',
      era: 'organic',
      img: 'assets/images/celular.svg',
      icone: 'cell',
      periodo: 'O mundo microscópico',
      data: 'c. 3,5 bilhões de anos — presente (estimativa)',
      contexto: 'Antes de cérebros, nervos ou palavras, já existiam formas de guardar informação. As primeiras células detectavam mudanças no ambiente e ajustavam sua resposta: a memória começa como um jeito de reconhecer e reagir.',
      intro: 'Mesmo sem cérebro, as células “lembram”: reconhecem sinais, respondem a estímulos e ajustam seu comportamento ao ambiente.',
      fala: 'Antes de existir memória na cabeça, já existia memória na vida. Vamos entrar no menor dos mundos.',
      acontecimentos: [
        { ano: 'c. 3,5 bi de anos', texto: 'Primeiras formas de vida unicelulares; estimativas variam conforme o registro fóssil.' },
        { ano: 'Hoje', texto: 'Sinalização celular e memória imunológica são áreas ativas da biologia.' }
      ],
      personagens: [
        { nome: 'Sem nome próprio', texto: 'Não há um descobridor histórico: o “protagonista” desta fase é a própria célula.' }
      ],
      conceitos: [
        { termo: 'Receptor', texto: 'Proteína que reconhece um sinal específico, como um nutriente ou um hormônio.' },
        { termo: 'Transdução de sinal', texto: 'Conversão de um sinal externo em uma resposta dentro da célula.' },
        { termo: 'Memória imunológica', texto: 'Células T e B “recordam” um patógeno e respondem mais rápido a um segundo encontro.' }
      ],
      blocos: [
        { icone: 'cell', titulo: 'Reconhecer sinais', texto: 'Receptores na membrana identificam mudanças: luz, nutrientes, temperatura ou substâncias químicas.' },
        { icone: 'paw', titulo: 'Responder e adaptar', texto: 'O sinal dispara reações internas. A célula muda sua atividade e pode manter esse padrão por algum tempo.' },
        { icone: 'cell', titulo: 'Passar adiante', texto: 'Ao se dividir, a célula transmite parte desses padrões às células-filhas: é a memória celular.' }
      ],
      exemplo: { titulo: 'Exemplo prático', texto: 'Uma bactéria nada em direção a uma gota de açúcar. Ela não “sabe” onde está o alimento: seus receptores detectam a concentração crescente e ajustam o movimento. É quimiotaxe.' },
      comparacao: { titulo: 'Compare', texto: 'A memória celular é como um termostato que aprendeu o histórico da casa: ela não guarda uma foto do passado, mas mantém padrões que mudam a resposta futura.' },
      curiosidade: { titulo: 'Você sabia?', texto: 'A vacinação funciona porque o sistema imune guarda células de memória: décadas depois, elas ainda reconhecem o agente que foi apresentado.' },
      fontes: [
        { titulo: 'OpenStax — Biology 2e (sinalização celular e sistema imune)', url: 'https://openstax.org/details/books/biology-2e' },
        { titulo: 'Alberts et al. — Molecular Biology of the Cell, 6ª ed., Garland Science, 2014' }
      ],
      pergunta: {
        enunciado: 'Como uma célula “lembra” de um estímulo?',
        opcoes: [
          { texto: 'Ela reconhece sinais e mantém padrões de resposta.', correta: true },
          { texto: 'Ela escreve anotações no DNA como se fosse um texto.', correta: false },
          { texto: 'Ela guarda cópias exatas em uma memória RAM.', correta: false }
        ],
        explicacao: 'A célula não escreve nem tem RAM: receptores e vias químicas guardam padrões de reconhecimento e resposta por determinado tempo.'
      },
      desafios: [
        {
          enunciado: 'Como se chama o movimento de uma bactéria em direção a um gradiente de nutrientes?',
          opcoes: [
            { texto: 'Fotossíntese.', correta: false },
            { texto: 'Quimiotaxe.', correta: true },
            { texto: 'Osmose reversa.', correta: false }
          ],
          explicacao: 'Na quimiotaxe, receptores detectam a diferença de concentração de uma substância e orientam o movimento.'
        },
        {
          enunciado: 'Qual exemplo de memória celular existe no corpo humano?',
          opcoes: [
            { texto: 'Células de memória do sistema imune.', correta: true },
            { texto: 'Células que trocam de nome a cada dia.', correta: false },
            { texto: 'Células que não possuem membrana.', correta: false }
          ],
          explicacao: 'Linfócitos T e B de memória permanecem após uma infecção ou vacinação e aceleram uma resposta futura.'
        }
      ],
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
      data: 'c. 600 milhões de anos — presente (aprox.)',
      contexto: 'Com o sistema nervoso, associar sinais passou a ser uma vantagem de sobrevivência. Animais aprenderam a prever o que vinha depois de um som, de um cheiro ou de uma pista visual — e a encontrar o caminho de volta.',
      intro: 'Com o sistema nervoso, os animais passaram a associar sinais, aprender com consequências e encontrar o caminho de volta.',
      fala: 'Aqui a memória ganhou pernas: ela passou a guiar escolhas, rotas e sobrevivência.',
      acontecimentos: [
        { ano: 'c. 600–540 mi de anos', texto: 'Aparecimento e diversificação dos primeiros sistemas nervosos (estimativas).' },
        { ano: '1890–1900', texto: 'Ivan Pavlov descreve o condicionamento clássico em experimentos com cães.' },
        { ano: '1948', texto: 'Edward Tolman publica o estudo sobre mapas cognitivos em ratos.' }
      ],
      personagens: [
        { nome: 'Ivan Pavlov', texto: 'Fisiologista russo; mostrou que um estímulo neutro pode ser associado a outro que provoca uma resposta.' },
        { nome: 'Edward C. Tolman', texto: 'Psicólogo americano; propôs que animais formam representações espaciais, os “mapas cognitivos”.' },
        { nome: 'Nicola Clayton', texto: 'Pesquisadora cujos estudos com gaios-da-califórnia mostraram memória episódica similar em aves.' }
      ],
      conceitos: [
        { termo: 'Condicionamento clássico', texto: 'Associação entre um sinal e uma resposta, estudada por Pavlov.' },
        { termo: 'Reforço', texto: 'Consequência que aumenta a chance de um comportamento se repetir.' },
        { termo: 'Mapa cognitivo', texto: 'Representação interna de rotas e pontos de referência de um lugar.' }
      ],
      blocos: [
        { icone: 'paw', titulo: 'Associar', texto: 'Um som pode anunciar comida. Ao repetir a experiência, o animal cria uma ligação entre os dois eventos.' },
        { icone: 'book', titulo: 'Orientar-se', texto: 'Aves, formigas e mamíferos memorizam rotas, cheiros, estrelas e pontos de referência para navegar.' },
        { icone: 'brain', titulo: 'Mudar o comportamento', texto: 'Uma experiência ruim ou boa altera a escolha seguinte: medo, busca de alimento e cuidado com os filhotes.' }
      ],
      exemplo: { titulo: 'Exemplo prático', texto: 'Se um sino sempre anuncia alimento, o animal passa a salivar ao ouvir o sino. A memória não é o sino em si: é a associação aprendida entre ele e a comida.' },
      comparacao: { titulo: 'Compare', texto: 'A memória animal não depende de uma linguagem: ela aparece em rotas, medos e preferências que mudam o que o animal faz no próximo minuto.' },
      curiosidade: { titulo: 'Você sabia?', texto: 'Gaio-da-califórnia (Aphelocoma californica) lembra onde escondeu alimento e por quanto tempo: se um alimento perece rápido, ele recupera esse primeiro. Estudo de Clayton e Dickinson, Nature, 1998.' },
      fontes: [
        { titulo: 'R. A. Clayton & A. Dickinson — Nature 395, 272–274 (1998)', url: 'https://doi.org/10.1038/26033' },
        { titulo: 'E. C. Tolman — Cognitive maps in rats and men, Psychological Review (1948)', url: 'https://doi.org/10.1037/h0057532' },
        { titulo: 'OpenStax — Psychology 2e (aprendizagem)', url: 'https://openstax.org/details/books/psychology-2e' }
      ],
      pergunta: {
        enunciado: 'O que ajuda um animal a voltar para casa?',
        opcoes: [
          { texto: 'Esquecer completamente o caminho.', correta: false },
          { texto: 'Criar um mapa novo a cada passo.', correta: false },
          { texto: 'Lembrar rotas e pontos de referência.', correta: true }
        ],
        explicacao: 'A memória espacial guarda marcos do caminho. Por isso um animal reconhece o lugar onde já esteve.'
      },
      desafios: [
        {
          enunciado: 'Como se chama a associação entre um sino e o alimento estudada por Pavlov?',
          opcoes: [
            { texto: 'Condicionamento clássico.', correta: true },
            { texto: 'Seleção natural.', correta: false },
            { texto: 'Fototropismo.', correta: false }
          ],
          explicacao: 'Pavlov mostrou que um estímulo antes neutro passa a provocar uma resposta quando é repetidamente associado a outro.'
        },
        {
          enunciado: 'O que Tolman concluiu com seus ratos no labirinto?',
          opcoes: [
            { texto: 'Que eles esquecem tudo ao virar a esquina.', correta: false },
            { texto: 'Que eles seguem apenas o cheiro da comida.', correta: false },
            { texto: 'Que eles formam mapas cognitivos do ambiente.', correta: true }
          ],
          explicacao: 'Mesmo sem recompensa imediata, os ratos aprendiam a disposição do labirinto e encontravam atalhos depois.'
        }
      ],
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
      data: 'Estudo experimental desde 1885',
      contexto: 'A memória humana deixou de ser só especulação quando Hermann Ebbinghaus começou a medir o esquecimento em si mesmo. Hoje sabemos que lembrar é um processo ativo: codificamos, guardamos e recuperamos — e cada etapa pode falhar.',
      intro: 'Nós transformamos sensações em lembranças. Algumas duram frações de segundo; outras, uma vida inteira.',
      fala: 'A memória humana tem camadas. Umas são rápidas e frágeis; outras ficam para sempre — ou quase.',
      acontecimentos: [
        { ano: '1885', texto: 'Ebbinghaus publica “Memory: A Contribution to Experimental Psychology” e descreve a curva do esquecimento.' },
        { ano: '1890', texto: 'William James distingue memória primária e secundária em “The Principles of Psychology”.' },
        { ano: '1968', texto: 'Atkinson e Shiffrin propõem o modelo modal: sensorial → curto prazo → longo prazo.' },
        { ano: '1974', texto: 'Baddeley e Hitch propõem o conceito de memória de trabalho.' }
      ],
      personagens: [
        { nome: 'Hermann Ebbinghaus', texto: 'Mediu o próprio esquecimento com listas de sílabas sem sentido.' },
        { nome: 'William James', texto: 'Psicólogo e filósofo que separou lembranças imediatas de duradouras.' },
        { nome: 'Alan Baddeley', texto: 'Com Graham Hitch, descreveu a memória de trabalho como um sistema ativo, não só um “armazém”.' }
      ],
      conceitos: [
        { termo: 'Codificação', texto: 'Transformar um estímulo em algo que o cérebro possa guardar.' },
        { termo: 'Consolidação', texto: 'Processo pelo qual uma lembrança se torna mais estável; sono e repetição ajudam.' },
        { termo: 'Recuperação', texto: 'Reativar uma lembrança, o que pode alterá-la levemente a cada vez.' }
      ],
      blocos: [
        { icone: 'cell', titulo: 'Sensorial', texto: 'É o vestígio imediato do que vimos ou ouvimos. Dura frações de segundo e some se não receber atenção.' },
        { icone: 'brain', titulo: 'Curto prazo', texto: 'Guarda poucos itens por segundos ou minutos: é a memória de trabalho, usada para discar um número ou seguir uma instrução.' },
        { icone: 'book', titulo: 'Longo prazo', texto: 'Pode durar anos. Repetição, sono e emoção ajudam a fixar o que aprendemos.' }
      ],
      exemplo: { titulo: 'Exemplo prático', texto: 'Você lê um número no celular e o repete enquanto procura o telefone. Se for interrompido, ele desaparece: ficou na memória de trabalho, sem repetição suficiente para virar longo prazo.' },
      comparacao: { titulo: 'Compare', texto: 'A memória sensorial é como um reflexo na água; a de trabalho, como um rascunho na mesa; a de longo prazo, como um livro encadernado na estante.' },
      curiosidade: { titulo: 'Você sabia?', texto: 'Ebbinghaus testou a si mesmo com mais de mil listas de sílabas. A “curva do esquecimento” mostrou que a perda é rápida no início e desacelera depois — por isso revisar no dia seguinte ajuda tanto.' },
      fontes: [
        { titulo: 'H. Ebbinghaus — Memory: A Contribution to Experimental Psychology (1885)', url: 'https://en.wikisource.org/wiki/Memory:_A_Contribution_to_Experimental_Psychology' },
        { titulo: 'R. C. Atkinson & R. M. Shiffrin — Psychological Review 75 (1968)' },
        { titulo: 'OpenStax — Psychology 2e (memória)', url: 'https://openstax.org/details/books/psychology-2e' }
      ],
      pergunta: {
        enunciado: 'Onde você guarda um número por segundos, até conseguir discar?',
        opcoes: [
          { texto: 'Na memória sensorial.', correta: false },
          { texto: 'Na memória de curto prazo.', correta: true },
          { texto: 'Na memória de longo prazo.', correta: false }
        ],
        explicacao: 'A memória de trabalho mantém pouca informação por pouco tempo. Sem repetição, o número se perde.'
      },
      desafios: [
        {
          enunciado: 'Quem publicou em 1885 um estudo clássico sobre o esquecimento?',
          opcoes: [
            { texto: 'William James.', correta: false },
            { texto: 'Hermann Ebbinghaus.', correta: true },
            { texto: 'Claude Shannon.', correta: false }
          ],
          explicacao: 'Ebbinghaus mediu o próprio esquecimento com sílabas sem sentido e estabeleceu a curva do esquecimento.'
        },
        {
          enunciado: 'O que descreve o modelo modal de Atkinson e Shiffrin (1968)?',
          opcoes: [
            { texto: 'Três estágios: sensorial, curto prazo e longo prazo.', correta: true },
            { texto: 'Um único depósito onde tudo fica para sempre.', correta: false },
            { texto: 'Apenas lembranças emocionais.', correta: false }
          ],
          explicacao: 'O modelo modal propôs uma sequência de estágios com capacidades e durações diferentes.'
        }
      ],
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
      data: 'Pré-história — presente',
      contexto: 'Uma lembrança contada duas vezes já pertence a duas pessoas. Repetida por gerações, vira tradição, mito, história e identidade. A memória coletiva não vive em um cérebro: vive entre pessoas.',
      intro: 'Quando compartilhamos lembranças, elas deixam de ser só individuais: viram história, costume e conhecimento de um povo.',
      fala: 'Uma lembrança contada duas vezes já pertence a duas pessoas. Mil vezes, pertence a uma civilização.',
      acontecimentos: [
        { ano: 'c. 36–17 mil anos', texto: 'Pinturas rupestres em sítios como Chauvet e Lascaux registram animais e cenas de caça.' },
        { ano: 'c. 2100 a.C.', texto: 'Versões antigas da Epopeia de Gilgamesh circulam em tabuletas cuneiformes.' },
        { ano: '1925', texto: 'Maurice Halbwachs publica “Les cadres sociaux de la mémoire” e define memória coletiva.' }
      ],
      personagens: [
        { nome: 'Maurice Halbwachs', texto: 'Sociólogo que mostrou como grupos e instituições moldam o que uma sociedade lembra.' },
        { nome: 'Autoria coletiva', texto: 'A maior parte das tradições orais e pinturas antigas não tem um autor individual identificado.' }
      ],
      conceitos: [
        { termo: 'Tradição oral', texto: 'Conhecimento transmitido pela voz, com variações deliberadas ou involuntárias a cada geração.' },
        { termo: 'Memória coletiva', texto: 'Conjunto de lembranças compartilhadas e sustentadas por um grupo social.' },
        { termo: 'Patrimônio', texto: 'Bens e práticas que uma comunidade decide preservar e transmitir.' }
      ],
      blocos: [
        { icone: 'paw', titulo: 'Desenhos e símbolos', texto: 'Marcas e pinturas guardam significados para o grupo e ajudam a transmitir ideias sem palavras.' },
        { icone: 'brain', titulo: 'Linguagem e oralidade', texto: 'Histórias, cantos e lendas passam de geração em geração pela voz e pela escuta.' },
        { icone: 'book', titulo: 'Escrita', texto: 'Registros escritos permitem guardar com precisão e alcançar pessoas que nunca conheceram quem escreveu.' }
      ],
      exemplo: { titulo: 'Exemplo prático', texto: 'Uma receita passada da avó para a mãe e da mãe para o filho muda um pouco em cada casa. O que permanece não é uma cópia exata, mas um saber compartilhado.' },
      comparacao: { titulo: 'Compare', texto: 'A memória individual se apaga com a pessoa; a coletiva sobrevive a ela — mas também muda, porque cada geração a reescreve ao contá-la.' },
      curiosidade: { titulo: 'Você sabia?', texto: 'A versão mais completa da Epopeia de Gilgamesh foi encontrada em tabuletas da biblioteca do rei Assurbanipal, em Nínive (século VII a.C.).' },
      fontes: [
        { titulo: 'M. Halbwachs — Les cadres sociaux de la mémoire (1925)' },
        { titulo: 'Encyclopaedia Britannica — Gilgamesh', url: 'https://www.britannica.com/topic/Gilgamesh' },
        { titulo: 'UNESCO — Memory of the World', url: 'https://www.unesco.org/en/memory-world' }
      ],
      pergunta: {
        enunciado: 'O que transforma uma lembrança individual em memória coletiva?',
        opcoes: [
          { texto: 'Guardar tudo apenas na própria cabeça.', correta: false },
          { texto: 'Compartilhar e registrar para outras pessoas.', correta: true },
          { texto: 'Esquecer o passado rapidamente.', correta: false }
        ],
        explicacao: 'Memória coletiva nasce quando a informação é compartilhada e preservada para além de uma única pessoa.'
      },
      desafios: [
        {
          enunciado: 'O que significa “memória coletiva” para Maurice Halbwachs?',
          opcoes: [
            { texto: 'Um arquivo guardado dentro de um só cérebro.', correta: false },
            { texto: 'Uma lembrança que só existe em sonhos.', correta: false },
            { texto: 'Lembranças sustentadas por grupos e suas estruturas sociais.', correta: true }
          ],
          explicacao: 'Halbwachs mostrou que o que uma sociedade lembra depende dos grupos, das instituições e das referências que ela compartilha.'
        },
        {
          enunciado: 'Qual obra mesopotâmica sobreviveu em tabuletas cuneiformes?',
          opcoes: [
            { texto: 'Epopeia de Gilgamesh.', correta: true },
            { texto: 'A Ilíada, escrita originalmente em papel.', correta: false },
            { texto: 'O livro de Newton.', correta: false }
          ],
          explicacao: 'Gilgamesh é um dos textos literários mais antigos conhecidos, preservado em escrita cuneiforme.'
        }
      ],
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
      data: 'c. 3400 a.C. — século XV',
      contexto: 'Quando a lembrança ganhou um suporte material, ela passou a viajar no tempo sem precisar de alguém para carregá-la. Escrita, bibliotecas e imprensa transformaram a memória em algo que podia ser copiado, comparado e conservado.',
      intro: 'A memória saiu do corpo e ganhou um suporte material. O registro passou a existir mesmo sem quem o criou.',
      fala: 'Quando a lembrança ganha suporte, ela viaja no tempo sem precisar de alguém para carregá-la.',
      acontecimentos: [
        { ano: 'c. 3400–3200 a.C.', texto: 'Escrita cuneiforme na Mesopotâmia; registros administrativos em Uruk.' },
        { ano: 'c. 3200 a.C.', texto: 'Hieróglifos egípcios em desenvolvimento no mesmo período amplo.' },
        { ano: 'c. 105 d.C.', texto: 'Tradicionalmente, Cai Lun aperfeiçoa o papel na China; há registros anteriores.' },
        { ano: 'c. 1450', texto: 'Johannes Gutenberg desenvolve a imprensa de tipos móveis em Mogúncia.' }
      ],
      personagens: [
        { nome: 'Johannes Gutenberg', texto: 'Ourives e impressor alemão; seu sistema de tipos móveis acelerou a cópia de livros na Europa.' },
        { nome: 'Cai Lun', texto: 'Funcionário da corte chinesa a quem a tradição atribui o aperfeiçoamento do papel no século II d.C.' }
      ],
      conceitos: [
        { termo: 'Suporte', texto: 'Material que recebe e conserva a informação: pedra, argila, papiro, papel.' },
        { termo: 'Escrita', texto: 'Sistema de símbolos que representa linguagem e permite guardar mensagens.' },
        { termo: 'Arquivo', texto: 'Conjunto organizado de registros preservados para consulta futura.' }
      ],
      blocos: [
        { icone: 'tablet', titulo: 'Suportes', texto: 'Parede de pedra, argila, papiro, pergaminho, papel: cada material guarda informação de um jeito diferente.' },
        { icone: 'book', titulo: 'De marcas a texto', texto: 'Símbolos viraram escrita. Depois, a impressão permitiu copiar a mesma obra muitas vezes.' },
        { icone: 'cell', titulo: 'Arquivos', texto: 'Bibliotecas, museus e documentos organizam aquilo que uma sociedade decide lembrar.' }
      ],
      exemplo: { titulo: 'Exemplo prático', texto: 'Uma tábua de argila com uma lista de cereais não é só um “papel”: ela registra uma transação que pode ser conferida anos depois, por outra pessoa, em outro lugar.' },
      comparacao: { titulo: 'Compare', texto: 'Antes da imprensa, copiar um livro era um trabalho artesanal que podia levar meses. Depois, centenas de cópias podiam circular — e ideias viajaram muito mais rápido.' },
      curiosidade: { titulo: 'Você sabia?', texto: 'A Biblioteca de Alexandria não desapareceu em uma única noite: perdeu seus acervos ao longo de séculos, entre guerras, negligência e mudanças de poder.' },
      fontes: [
        { titulo: 'Encyclopaedia Britannica — Cuneiform', url: 'https://www.britannica.com/topic/cuneiform' },
        { titulo: 'Encyclopaedia Britannica — Gutenberg Bible', url: 'https://www.britannica.com/topic/Gutenberg-Bible' },
        { titulo: 'UNESCO — Memory of the World', url: 'https://www.unesco.org/en/memory-world' }
      ],
      pergunta: {
        enunciado: 'Qual é um exemplo de memória artificial física?',
        opcoes: [
          { texto: 'Uma inscrição feita em uma tábua de argila.', correta: true },
          { texto: 'Um pensamento guardado apenas na cabeça.', correta: false },
          { texto: 'Um som que desaparece no ar.', correta: false }
        ],
        explicacao: 'Memória artificial física é aquela registrada em um material externo ao corpo, como pedra, argila ou papel.'
      },
      desafios: [
        {
          enunciado: 'Qual invenção permitiu copiar livros em escala na Europa do século XV?',
          opcoes: [
            { texto: 'A imprensa de tipos móveis de Gutenberg.', correta: true },
            { texto: 'A máquina a vapor.', correta: false },
            { texto: 'O telégrafo elétrico.', correta: false }
          ],
          explicacao: 'Tipos móveis reutilizáveis e a prensa permitiram produzir muitas cópias com muito mais rapidez do que a cópia manual.'
        },
        {
          enunciado: 'Qual suporte era feito de peles de animais preparadas?',
          opcoes: [
            { texto: 'Papiro.', correta: false },
            { texto: 'Argila.', correta: false },
            { texto: 'Pergaminho.', correta: true }
          ],
          explicacao: 'Pergaminho é feito de pele curtida; papiro é feito da medula de uma planta aquática.'
        }
      ],
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
      data: '1830 — década de 1970',
      contexto: 'No século XIX, a informação começou a viajar por fios e a ser gravada em meios físicos. No século XX, ela virou sequência de bits — e a memória passou a mudar de tamanho, preço e velocidade em poucos anos.',
      intro: 'No século XX, a informação virou sinal elétrico. Ela passou a ser gravada em fitas, discos e chips — e a mudar muito mais rápido.',
      fala: 'Aqui o mundo esfria e fica azul: a lembrança vira corrente elétrica, sequência de bits.',
      acontecimentos: [
        { ano: '1830–1840', texto: 'Telégrafo elétrico: mensagens passam a cruzar continentes por fios.' },
        { ano: '1877', texto: 'Thomas Edison apresenta o fonógrafo e grava som em um meio físico.' },
        { ano: '1947', texto: 'Transistor inventado nos Bell Labs por Bardeen, Brattain e Shockley.' },
        { ano: '1948', texto: 'Claude Shannon publica “A Mathematical Theory of Communication”.' },
        { ano: '1970', texto: 'Intel lança o 1103, um chip de memória DRAM comercialmente influente.' }
      ],
      personagens: [
        { nome: 'Claude Shannon', texto: 'Matemático que fundou a teoria da informação e popularizou o termo “bit”.' },
        { nome: 'John Bardeen, Walter Brattain e William Shockley', texto: 'Equipe dos Bell Labs responsável pelo transistor, base da eletrônica moderna.' },
        { nome: 'Robert Dennard', texto: 'Pesquisador da IBM que propôs a célula de memória DRAM de um transistor na década de 1960.' }
      ],
      conceitos: [
        { termo: 'Bit', texto: 'Menor unidade de informação digital: vale 0 ou 1. O termo é de John Tukey (1946).' },
        { termo: 'Transistor', texto: 'Componente que amplifica ou comuta sinais elétricos e permite construir chips.' },
        { termo: 'Meio magnético', texto: 'Superfície que registra dados como orientações de magnetização, como fitas e discos.' }
      ],
      blocos: [
        { icone: 'chip', titulo: 'Bits', texto: 'A informação é codificada em 0 e 1. Sequências de bits representam texto, imagem, som e vídeo.' },
        { icone: 'tablet', titulo: 'Meios magnéticos e ópticos', texto: 'Fita, disquete, disco rígido e CD guardam dados por meio de marcas físicas que podem ser lidas depois.' },
        { icone: 'cpu', titulo: 'Chips', texto: 'Transistores formam células de memória sem peças móveis: são rápidos, silenciosos e muito pequenos.' }
      ],
      exemplo: { titulo: 'Exemplo prático', texto: 'A letra “A” em um arquivo de texto é representada por uma sequência de bits. O mesmo número binário pode virar letra, cor de um pixel ou nota musical — depende de como o programa interpreta esses bits.' },
      comparacao: { titulo: 'Compare', texto: 'Uma fita magnética guarda dados como uma fita de áudio guarda som: é preciso percorrê-la. Um chip de memória acessa qualquer posição quase instantaneamente.' },
      curiosidade: { titulo: 'Você sabia?', texto: 'O DVD de 4,7 GB não é “4,7 bilhões de caracteres”: um byte são oito bits, e o número reflete a capacidade em bytes do disco de uma camada.' },
      fontes: [
        { titulo: 'C. E. Shannon — A Mathematical Theory of Communication (1948)', url: 'https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf' },
        { titulo: 'Computer History Museum — Timeline of Computing', url: 'https://www.computerhistory.org/timeline/computers/' },
        { titulo: 'The Nobel Prize in Physics 1956 (transistor)', url: 'https://www.nobelprize.org/prizes/physics/1956/summary/' }
      ],
      pergunta: {
        enunciado: 'O que é um bit?',
        opcoes: [
          { texto: 'Um tipo de engrenagem de bronze.', correta: false },
          { texto: 'Uma unidade de informação que vale 0 ou 1.', correta: true },
          { texto: 'Um programa de computador completo.', correta: false }
        ],
        explicacao: 'Bit é a menor unidade de informação digital. Grupos de oito bits formam um byte.'
      },
      desafios: [
        {
          enunciado: 'Quem publicou a teoria matemática da comunicação em 1948?',
          opcoes: [
            { texto: 'Claude Shannon.', correta: true },
            { texto: 'Hermann Ebbinghaus.', correta: false },
            { texto: 'Ivan Pavlov.', correta: false }
          ],
          explicacao: 'Shannon definiu como mensagens podem ser codificadas, transmitidas e medidas em informação.'
        },
        {
          enunciado: 'Qual dispositivo de 1947 permitiu substituir válvulas e tornar os circuitos menores?',
          opcoes: [
            { texto: 'O transistor.', correta: true },
            { texto: 'O disco rígido.', correta: false },
            { texto: 'O telégrafo.', correta: false }
          ],
          explicacao: 'O transistor ocupava menos espaço, consumia menos energia e durou mais que as válvulas a vácuo.'
        }
      ],
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
      data: 'década de 1970 — presente',
      contexto: 'Um computador não tem uma memória só: ele combina camadas muito rápidas e temporárias com camadas lentas e persistentes. Hoje, modelos de inteligência artificial acrescentam outro tipo de memória: padrões aprendidos em parâmetros numéricos.',
      intro: 'Computadores combinam memórias diferentes: umas muito rápidas e temporárias, outras mais lentas e permanentes.',
      fala: 'Chegamos ao universo dos sistemas. Cada memória tem um papel — e nenhuma faz tudo sozinha.',
      acontecimentos: [
        { ano: '1970', texto: 'Memória DRAM de um transistor vira produto comercial e populariza a RAM em chips.' },
        { ano: '1980', texto: 'Fujio Masuoka apresenta a memória flash, base dos SSDs atuais.' },
        { ano: '1986', texto: 'Pesquisa em redes neurais artificiais se consolida; o campo cresce muito na década de 2010.' },
        { ano: 'Hoje', texto: 'Cache, RAM, SSD, nuvem e parâmetros de modelos convivem em um mesmo sistema.' }
      ],
      personagens: [
        { nome: 'Robert Dennard', texto: 'Propôs a célula DRAM de um transistor, base da memória principal dos computadores.' },
        { nome: 'Fujio Masuoka', texto: 'Engenheiro japonês que inventou a memória flash na década de 1980.' },
        { nome: 'Geoffrey Hinton, Yann LeCun e Yoshua Bengio', texto: 'Pesquisadores premiados com o Turing Award de 2018 pelo avanço do aprendizado profundo.' }
      ],
      conceitos: [
        { termo: 'Volatilidade', texto: 'Característica do que perde dados quando a energia acaba: é o caso da RAM.' },
        { termo: 'Cache', texto: 'Memória pequena e muito rápida que guarda cópias do que o processador mais usa.' },
        { termo: 'Parâmetro', texto: 'Valor numérico ajustado no treinamento de um modelo; guarda padrões aprendidos, não uma cópia literal de arquivos.' }
      ],
      blocos: [
        { icone: 'chip', titulo: 'RAM', texto: 'É a memória de trabalho: muito rápida, mas volátil. Ao desligar o aparelho, o que estava nela desaparece.' },
        { icone: 'book', titulo: 'ROM', texto: 'Guarda instruções básicas de inicialização. Seu conteúdo não se apaga quando o computador desliga.' },
        { icone: 'cpu', titulo: 'HD e SSD', texto: 'HD usa discos magnéticos giratórios; SSD usa memória flash, sem partes móveis. Os dois guardam arquivos mesmo desligados.' }
      ],
      exemplo: { titulo: 'Exemplo prático', texto: 'Ao abrir um jogo, o programa sai do SSD, passa pela RAM e chega à cache antes de virar uma instrução do processador. Cada camada guarda um pedaço diferente da mesma informação.' },
      comparacao: { titulo: 'Compare', texto: 'RAM é como a mesa de trabalho; SSD é o arquivo; cache é o que você está segurando na mão. Em um modelo de IA, os “pesos” são mais parecidos com o hábito de quem leu muitos livros do que com uma estante de cópias exatas.' },
      curiosidade: { titulo: 'Você sabia?', texto: 'Células de DRAM precisam ser recarregadas eletricamente milhares de vezes por segundo. Sem essa atualização, os bits se perdem — por isso a RAM é volátil.' },
      fontes: [
        { titulo: 'Computer History Museum — Memory and storage', url: 'https://www.computerhistory.org/timeline/computers/' },
        { titulo: 'ACM — Turing Award 2018 (deep learning)', url: 'https://amturing.acm.org/award_winners/hinton_6830142.cfm' },
        { titulo: 'Encyclopaedia Britannica — Random-access memory', url: 'https://www.britannica.com/technology/random-access-memory' }
      ],
      pergunta: {
        enunciado: 'Qual memória some quando o computador desliga?',
        opcoes: [
          { texto: 'ROM.', correta: false },
          { texto: 'HD.', correta: false },
          { texto: 'RAM.', correta: true }
        ],
        explicacao: 'A RAM é volátil: precisa de energia para manter os dados. ROM, HD e SSD preservam informações sem energia.'
      },
      desafios: [
        {
          enunciado: 'Por que a RAM perde dados quando o computador desliga?',
          opcoes: [
            { texto: 'Porque seus arquivos são apagados por um vírus.', correta: false },
            { texto: 'Porque o sistema troca o nome dos arquivos.', correta: false },
            { texto: 'Porque precisa de energia para manter cada célula de memória.', correta: true }
          ],
          explicacao: 'A DRAM armazena cada bit em uma carga elétrica que precisa ser renovada; sem energia, a carga desaparece.'
        },
        {
          enunciado: 'O que são “pesos” em uma rede neural artificial?',
          opcoes: [
            { texto: 'Valores ajustados no treinamento que guardam padrões aprendidos.', correta: true },
            { texto: 'Parafusos que fixam o processador na placa.', correta: false },
            { texto: 'Nomes dados aos arquivos do usuário.', correta: false }
          ],
          explicacao: 'Os pesos são números ajustados durante o treinamento. Eles codificam padrões estatísticos, não uma cópia exata de cada texto lido.'
        }
      ],
      recompensa: 'Você chegou ao fim! Agora a memória biológica e a artificial fazem sentido juntas.'
    }
  ];

  const DIFICULDADES = [
    { id: 'explorador', nome: 'Explorador', descricao: 'Uma pergunta por fase, com dica para eliminar uma alternativa.', perguntas: 1, multiplicador: 1 },
    { id: 'aprendiz', nome: 'Aprendiz', descricao: 'Duas perguntas por fase, sem dica.', perguntas: 2, multiplicador: 1.25 },
    { id: 'mestre', nome: 'Mestre', descricao: 'Três perguntas por fase e pontuação maior.', perguntas: 3, multiplicador: 1.5 }
  ];

  const LINHA_DO_TEMPO = [
    { ano: 'c. 3,5 bi', titulo: 'Primeiras células', fase: 'celular', detalhe: 'Sinais químicos e respostas internas.' },
    { ano: 'c. 600 mi', titulo: 'Sistemas nervosos', fase: 'animais', detalhe: 'Associação, rotas e aprendizado.' },
    { ano: 'c. 17 mil', titulo: 'Pinturas rupestres', fase: 'coletiva', detalhe: 'Lascaux e outras paredes que guardam histórias.' },
    { ano: 'c. 3200 a.C.', titulo: 'Escrita cuneiforme', fase: 'registros', detalhe: 'A memória ganha suporte material.' },
    { ano: 'c. 1450', titulo: 'Imprensa de Gutenberg', fase: 'registros', detalhe: 'Copiar deixa de ser exceção.' },
    { ano: '1885', titulo: 'Ebbinghaus mede o esquecimento', fase: 'humana', detalhe: 'A memória vira objeto de experimento.' },
    { ano: '1947', titulo: 'Transistor', fase: 'eletronica', detalhe: 'O caminho para os chips se abre.' },
    { ano: '1970', titulo: 'DRAM comercial', fase: 'computadores', detalhe: 'RAM em chip se populariza.' },
    { ano: '2010s', titulo: 'Aprendizado profundo', fase: 'computadores', detalhe: 'Padrões guardados em parâmetros.' }
  ];

  const GLOSSARIO = [
    { termo: 'Receptor', categoria: 'Biologia', definicao: 'Proteína que reconhece um sinal específico e inicia uma resposta na célula.' },
    { termo: 'Quimiotaxe', categoria: 'Biologia', definicao: 'Movimento orientado por um gradiente de substância química.' },
    { termo: 'Sinapse', categoria: 'Biologia', definicao: 'Ponto de comunicação entre neurônios, por onde passam sinais nervosos.' },
    { termo: 'Condicionamento', categoria: 'Mente', definicao: 'Aprendizado por associação entre estímulos ou entre ação e consequência.' },
    { termo: 'Memória de trabalho', categoria: 'Mente', definicao: 'Sistema que mantém e manipula pouca informação por pouco tempo.' },
    { termo: 'Consolidação', categoria: 'Mente', definicao: 'Processo que torna uma lembrança mais estável ao longo do tempo.' },
    { termo: 'Esquecimento espaçado', categoria: 'Mente', definicao: 'Estratégia de revisar conteúdo em intervalos crescentes para reforçar a retenção.' },
    { termo: 'Memória coletiva', categoria: 'Sociedade', definicao: 'Lembranças compartilhadas e sustentadas por um grupo ao longo de gerações.' },
    { termo: 'Cuneiforme', categoria: 'Registros', definicao: 'Sistema de escrita da Mesopotâmia feito com marcas em forma de cunha sobre argila.' },
    { termo: 'Pergaminho', categoria: 'Registros', definicao: 'Material de escrita feito de pele animal preparada.' },
    { termo: 'Código de Hammurabi', categoria: 'Registros', definicao: 'Conjunto de leis babilônico gravado em estela de pedra, século XVIII a.C.' },
    { termo: 'Bit', categoria: 'Digital', definicao: 'Menor unidade de informação digital; assume valor 0 ou 1.' },
    { termo: 'Byte', categoria: 'Digital', definicao: 'Conjunto de oito bits, usado como unidade básica de armazenamento.' },
    { termo: 'Transistor', categoria: 'Digital', definicao: 'Componente eletrônico que comuta ou amplifica sinais; base dos chips.' },
    { termo: 'RAM', categoria: 'Digital', definicao: 'Memória de acesso aleatório, rápida e volátil: perde dados sem energia.' },
    { termo: 'ROM', categoria: 'Digital', definicao: 'Memória de leitura apenas, usada para instruções básicas de inicialização.' },
    { termo: 'SSD', categoria: 'Digital', definicao: 'Dispositivo de armazenamento com memória flash e sem partes móveis.' },
    { termo: 'Cache', categoria: 'Digital', definicao: 'Memória pequena e rápida que guarda cópias de dados usados com frequência.' },
    { termo: 'Parâmetro', categoria: 'Digital', definicao: 'Valor numérico ajustado no treinamento de um modelo de aprendizado de máquina.' }
  ];

  const CONQUISTAS = [
    { id: 'primeira-ilha', nome: 'Primeira ilha', descricao: 'Conclua a primeira fase.', icon: '✦', teste: function (s) { return s.concluidas.length >= 1; } },
    { id: 'meio-atlas', nome: 'Meio do atlas', descricao: 'Conclua quatro fases.', icon: '◈', teste: function (s) { return s.concluidas.length >= 4; } },
    { id: 'cartografo', nome: 'Cartógrafo', descricao: 'Conclua as sete fases.', icon: '✧', teste: function (s) { return s.concluidas.length === 7; } },
    { id: 'sequencia', nome: 'Fio contínuo', descricao: 'Acerte três perguntas seguidas.', icon: '⟡', teste: function (s) { return s.melhorSequencia >= 3; } },
    { id: 'sem-erros', nome: 'Memória precisa', descricao: 'Conclua uma fase sem errar nenhuma pergunta.', icon: '◎', teste: function (s) { return s.fasesSemErro >= 1; } },
    { id: 'explorador', nome: 'Explorador livre', descricao: 'Visite todas as sete ilhas.', icon: '⌖', teste: function (s) { return s.visitadas.length === 7; } },
    { id: 'arquivista', nome: 'Arquivista', descricao: 'Consulte cinco termos do glossário.', icon: '▤', teste: function (s) { return s.termosConsultados.length >= 5; } },
    { id: 'revisor', nome: 'Revisor', descricao: 'Abra a revisão de perguntas.', icon: '↺', teste: function (s) { return s.revisou; } },
    { id: 'mestre', nome: 'Mestre da memória', descricao: 'Acerte uma fase inteira no nível Mestre.', icon: '♛', teste: function (s) { return s.faseMestre; } },
    { id: 'pontuacao', nome: 'Cem questões', descricao: 'Some pelo menos mil pontos.', icon: '✷', teste: function (s) { return s.pontos >= 1000; } }
  ];

  global.MEMORIA_DATA = {
    IMG: IMG,
    ICONS: ICONS,
    CAPITULOS: CAPITULOS,
    DIFICULDADES: DIFICULDADES,
    LINHA_DO_TEMPO: LINHA_DO_TEMPO,
    GLOSSARIO: GLOSSARIO,
    CONQUISTAS: CONQUISTAS,
    STORAGE_KEY: 'evolucao-memoria-progresso-v2',
    LEGACY_KEY: 'evolucao-memoria-progresso-v1'
  };
})(window);
