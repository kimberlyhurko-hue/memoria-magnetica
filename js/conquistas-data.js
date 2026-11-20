/* Catálogo das lembranças visuais — camada separada das medalhas da jornada original.
   Cada entrada é autossuficiente: nome, texto, ilustração, estilo e condição.
   Para acrescentar uma medalha no futuro, basta incluir uma nova entrada aqui
   e seu arquivo SVG em assets/images/medalhas/. */
(function (global) {
  'use strict';

  const IMG = 'assets/images/medalhas/';

  global.CONQUISTAS_VISUAIS = [
    {
      id: 'primeira-descoberta',
      nome: 'Primeira descoberta',
      descricao: 'O primeiro capítulo aberto — o começo de uma jornada guiada pela curiosidade.',
      mensagem: 'Todo grande conhecimento começa com uma descoberta. Parabéns por dar o primeiro passo!',
      imagem: IMG + 'primeira-descoberta.svg',
      estilo: 'natureza',
      condicao: { tipo: 'capitulosVisitados', minimo: 1 }
    },
    {
      id: 'mente-curiosa',
      nome: 'Mente curiosa',
      descricao: 'Uma atividade de leitura concluída: a pergunta que se torna compreensão.',
      mensagem: 'A curiosidade abre portas para descobertas extraordinárias. Continue explorando!',
      imagem: IMG + 'mente-curiosa.svg',
      estilo: 'conhecimento',
      condicao: { tipo: 'atividadesConcluidas', minimo: 1 }
    },
    {
      id: 'explorador-do-conhecimento',
      nome: 'Explorador do conhecimento',
      descricao: 'Três bibliotecas visitadas, cada uma com a sua própria atmosfera.',
      mensagem: 'Cada biblioteca guarda uma voz diferente. Você atravessou seus caminhos e voltou com um olhar mais amplo.',
      imagem: IMG + 'explorador-do-conhecimento.svg',
      estilo: 'conhecimento',
      condicao: { tipo: 'universosVisitados', minimo: 3 }
    },
    {
      id: 'jornada-concluida',
      nome: 'Jornada concluída',
      descricao: 'Um tema inteiro percorrido, do primeiro ao último capítulo.',
      mensagem: 'Você chegou ao final desta jornada. Mas o conhecimento não termina aqui: sempre existe algo novo para descobrir!',
      imagem: IMG + 'jornada-concluida.svg',
      estilo: 'conhecimento',
      condicao: { tipo: 'temaConcluido', minimo: 1 }
    },
    {
      id: 'conhecimento-em-expansao',
      nome: 'Conhecimento em expansão',
      descricao: 'Dois temas concluídos: o que foi aprendido segue crescendo a cada leitura.',
      mensagem: 'Novos caminhos se somaram aos seus. O conhecimento ganha espaço quando volta a ser explorado.',
      imagem: IMG + 'conhecimento-em-expansao.svg',
      estilo: 'tecnologia',
      condicao: { tipo: 'temasConcluidos', minimo: 2 }
    }
  ];
})(window);
