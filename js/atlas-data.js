/* Atlas dos universos — metadados da capa e da escolha de bibliotecas.
   Camada apenas de navegação: não altera as coleções nem os capítulos já existentes.
   Os quatro universos novos estão em preparação; seus assuntos vêm das áreas
   descritas pelo projeto e ainda não possuem conteúdo educativo publicado. */
(function (global) {
  'use strict';

  const IMG = 'assets/images/atlas/';

  global.ATLAS_UNIVERSOS = [
    {
      id: 'vida',
      titulo: 'Vida e Natureza',
      kicker: 'Universo 01 · O mundo vivo',
      descricao: 'Biologia, corpo humano, evolução e outros assuntos relacionados à vida.',
      intro: 'Das primeiras células à diversidade dos seres vivos, este universo reúne caminhos para entender a vida em suas muitas formas.',
      imagem: IMG + 'vida.svg',
      cor: 'vida',
      simbolo: '❦',
      status: 'preparacao',
      assuntos: [
        { id: 'biologia', titulo: 'Biologia', descricao: 'O estudo dos seres vivos e de como eles funcionam.', simbolo: '❧' },
        { id: 'corpo-humano', titulo: 'Corpo Humano', descricao: 'Uma viagem pelos sistemas que sustentam a vida.', simbolo: '◍' },
        { id: 'evolucao', titulo: 'Evolução', descricao: 'Como as formas de vida mudaram ao longo do tempo.', simbolo: '⌁' }
      ]
    },
    {
      id: 'universo',
      titulo: 'Universo e Descobertas',
      kicker: 'Universo 02 · Estrelas, matéria e mistérios',
      descricao: 'Astronomia, física, química e os mistérios do universo.',
      intro: 'Do movimento dos astros às partículas que formam a matéria, este universo convida a olhar para perto e para muito longe.',
      imagem: IMG + 'universo.svg',
      cor: 'universo',
      simbolo: '✧',
      status: 'preparacao',
      assuntos: [
        { id: 'astronomia', titulo: 'Astronomia', descricao: 'Os céus, os astros e o lugar da Terra no universo.', simbolo: '☼' },
        { id: 'fisica', titulo: 'Física', descricao: 'As leis que descrevem movimento, energia e matéria.', simbolo: '∿' },
        { id: 'quimica', titulo: 'Química', descricao: 'Os elementos, suas ligações e transformações.', simbolo: '⬡' }
      ]
    },
    {
      id: 'humanidade',
      titulo: 'Humanidade e História',
      kicker: 'Universo 03 · Memórias das sociedades',
      descricao: 'Civilizações, mitologias, acontecimentos históricos e cultura.',
      intro: 'Cidades, histórias, símbolos e tradições: este universo guarda os caminhos que as pessoas percorreram para contar quem são.',
      imagem: IMG + 'humanidade.svg',
      cor: 'humanidade',
      simbolo: '⌛',
      status: 'preparacao',
      assuntos: [
        { id: 'civilizacoes', titulo: 'Civilizações', descricao: 'Como sociedades se organizaram e deixaram marcas.', simbolo: '▥' },
        { id: 'mitologias', titulo: 'Mitologias', descricao: 'Histórias e símbolos que ajudaram a explicar o mundo.', simbolo: '✵' },
        { id: 'acontecimentos', titulo: 'Acontecimentos Históricos', descricao: 'Momentos que mudaram o curso das sociedades.', simbolo: '⌖' },
        { id: 'cultura', titulo: 'Cultura', descricao: 'Línguas, artes, crenças e formas de vida compartilhadas.', simbolo: '❋' }
      ]
    },
    {
      id: 'mente',
      titulo: 'Mente e Conhecimento',
      kicker: 'Universo 04 · Ideias, cérebro e aprendizado',
      descricao: 'Psicologia, neurociência, filosofia e aprendizagem.',
      intro: 'Como pensamos, sentimos e aprendemos: este universo atravessa o cérebro, as ideias e as perguntas sobre conhecer.',
      imagem: IMG + 'mente.svg',
      cor: 'mente',
      simbolo: '◉',
      status: 'preparacao',
      assuntos: [
        { id: 'psicologia', titulo: 'Psicologia', descricao: 'Como as pessoas pensam, sentem e se comportam.', simbolo: '◈' },
        { id: 'neurociencia', titulo: 'Neurociência', descricao: 'O cérebro e os processos que apoiam a mente.', simbolo: '⌘' },
        { id: 'filosofia', titulo: 'Filosofia', descricao: 'Perguntas sobre conhecimento, ética e existência.', simbolo: '◇' },
        { id: 'aprendizagem', titulo: 'Aprendizagem', descricao: 'Como adquirimos, guardamos e usamos conhecimento.', simbolo: '✎' }
      ]
    },
    {
      id: 'tecnologia',
      titulo: 'Tecnologia e Futuro',
      kicker: 'Universo 05 · Ciência, invenção e imaginação',
      descricao: 'Inteligência artificial, evolução da tecnologia e robótica.',
      intro: 'Da primeira ferramenta aos sistemas que aprendem com dados, este universo já está aberto para leitura.',
      imagem: 'assets/images/tecnologia/tech-hero.svg',
      cor: 'tecnologia',
      simbolo: '⌘',
      status: 'disponivel',
      rota: '#/tecnologia',
      assuntos: [
        { id: 'ia', titulo: 'Inteligência Artificial', descricao: 'Como sistemas reconhecem padrões, geram respostas e ajudam pessoas — e onde precisamos de cuidado.', simbolo: '◈' },
        { id: 'evolucao', titulo: 'Evolução da Tecnologia', descricao: 'Uma linha do tempo cinematográfica das invenções que mudaram a vida humana.', simbolo: '⌁' },
        { id: 'robotica', titulo: 'Robótica', descricao: 'Como sensores, motores e programação se juntam para criar máquinas que agem no mundo.', simbolo: '⬢' }
      ]
    }
  ];
})(window);
