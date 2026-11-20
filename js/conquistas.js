/* Medalhas visuais — camada de celebração e coleção.
   Usa o modal e o bloqueio de fundo já existentes em js/app.js e nunca escreve
   nas chaves de progresso da jornada ou da biblioteca. */
(function () {
  'use strict';

  const CATALOGO = Array.isArray(window.CONQUISTAS_VISUAIS) ? window.CONQUISTAS_VISUAIS : [];
  const CHAVE = 'conquistas-visuais-progresso-v1';
  const CHAVE_JORNADA = 'evolucao-memoria-progresso-v2';
  const CHAVE_BIBLIOTECA = 'biblioteca-progresso-leitura-v1';
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PONTOS_LUZ = [
    [16, 34, 0], [28, 18, .12], [42, 28, .24], [58, 15, .08], [72, 26, .2],
    [84, 40, .3], [22, 58, .18], [38, 74, .26], [60, 78, .1], [78, 62, .22]
  ];

  const $ = function (id) { return document.getElementById(id); };

  let estado = carregarEstado();
  let fila = [];
  let exibindo = false;
  let timerFila = null;
  let timerAvaliacao = null;
  let modal = null;
  let cenaParticulas = null;
  let imagem = null;
  let titulo = null;
  let mensagem = null;
  let kicker = null;
  let botaoFechar = null;

  /* ---------------- Persistência própria ---------------- */

  function estadoPadrao() {
    return { v: 1, concedidas: {}, atividades: [], universos: [], atualizadoEm: '' };
  }

  function carregarEstado() {
    const base = estadoPadrao();
    try {
      const bruto = localStorage.getItem(CHAVE);
      const dados = bruto ? JSON.parse(bruto) : null;
      if (!dados || typeof dados !== 'object' || Array.isArray(dados)) return base;
      return {
        v: 1,
        concedidas: dados.concedidas && typeof dados.concedidas === 'object' && !Array.isArray(dados.concedidas) ? dados.concedidas : {},
        atividades: Array.isArray(dados.atividades) ? dados.atividades : [],
        universos: Array.isArray(dados.universos) ? dados.universos : [],
        atualizadoEm: typeof dados.atualizadoEm === 'string' ? dados.atualizadoEm : ''
      };
    } catch (e) {
      return base;
    }
  }

  function salvarEstado() {
    estado.atualizadoEm = new Date().toISOString();
    try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) { /* segue em memória */ }
  }

  function lerProgresso(chave) {
    try {
      const dados = JSON.parse(localStorage.getItem(chave));
      return dados && typeof dados === 'object' && !Array.isArray(dados) ? dados : {};
    } catch (e) {
      return {};
    }
  }

  /* ---------------- Sinais educativos ---------------- */

  function contexto() {
    const jornada = lerProgresso(CHAVE_JORNADA);
    const biblioteca = lerProgresso(CHAVE_BIBLIOTECA);
    const colecoes = Array.isArray(window.BIBLIOTECA_COLECOES) ? window.BIBLIOTECA_COLECOES : [];

    let visitadosBiblioteca = 0;
    let temasConcluidos = 0;

    colecoes.forEach(function (colecao) {
      (colecao.temas || []).forEach(function (tema) {
        const pasta = biblioteca[colecao.id] && biblioteca[colecao.id][tema.id];
        const visitados = Array.isArray(pasta) ? pasta.map(String) : [];
        visitadosBiblioteca += visitados.length;
        const capitulos = (tema.capitulos || []).map(function (cap) { return String(cap.id); });
        if (capitulos.length && capitulos.every(function (id) { return visitados.indexOf(id) !== -1; })) {
          temasConcluidos += 1;
        }
      });
    });

    const fasesConcluidas = Array.isArray(jornada.concluidas) ? jornada.concluidas.length : 0;
    const respostas = jornada.respostas && typeof jornada.respostas === 'object' ? jornada.respostas : {};
    /* A jornada visita a fase 1 automaticamente ao abrir a página. Só os
       desafios (pergunta com índice maior que zero) contam como atividade. */
    const desafiosConcluidos = Object.keys(respostas).filter(function (chave) {
      const pedacos = chave.split(':');
      return pedacos.length === 2 && Number(pedacos[1]) > 0 && respostas[chave] && respostas[chave].correta;
    }).length;
    const verificacoesBiblioteca = estado.atividades.filter(function (chave) {
      return chave.indexOf('bib:') === 0;
    }).length;

    return {
      /* capítulos da biblioteca abertos por escolha do visitante + fases da
         jornada concluídas com uma resposta correta. */
      capitulosVisitados: visitadosBiblioteca + fasesConcluidas,
      atividadesConcluidas: desafiosConcluidos + verificacoesBiblioteca,
      universosVisitados: estado.universos.length,
      temasConcluidos: temasConcluidos,
      jornadaOriginalConcluida: fasesConcluidas > 0 && fasesConcluidas === (window.MEMORIA_DATA ? window.MEMORIA_DATA.CAPITULOS.length : fasesConcluidas)
    };
  }

  function condicaoAtendida(condicao, ctx) {
    if (!condicao) return false;
    switch (condicao.tipo) {
      case 'capitulosVisitados': return ctx.capitulosVisitados >= condicao.minimo;
      case 'atividadesConcluidas': return ctx.atividadesConcluidas >= condicao.minimo;
      case 'universosVisitados': return ctx.universosVisitados >= condicao.minimo;
      case 'temaConcluido': return ctx.temasConcluidos + (ctx.jornadaOriginalConcluida ? 1 : 0) >= (condicao.minimo || 1);
      case 'temasConcluidos': return ctx.temasConcluidos >= condicao.minimo;
      default: return false;
    }
  }

  function avaliar() {
    const ctx = contexto();
    const novas = CATALOGO.filter(function (medalha) {
      return !estado.concedidas[medalha.id] && condicaoAtendida(medalha.condicao, ctx);
    });

    if (novas.length) {
      novas.forEach(function (medalha) {
        estado.concedidas[medalha.id] = new Date().toISOString();
      });
      salvarEstado();
    }

    renderizarColecao(ctx);
    if (novas.length) {
      novas.forEach(function (medalha) { fila.push({ id: medalha.id, primeiro: true }); });
      agendarFila();
    }
  }

  function agendarAvaliacao() {
    clearTimeout(timerAvaliacao);
    timerAvaliacao = window.setTimeout(avaliar, 60);
  }

  function universoDaRota() {
    const partes = (location.hash || '').replace(/^#\/?/, '').split('/').filter(Boolean);
    if (!partes.length || partes[0] === 'bibliotecas') return null;
    const colecoes = Array.isArray(window.BIBLIOTECA_COLECOES) ? window.BIBLIOTECA_COLECOES : [];
    const atlas = Array.isArray(window.ATLAS_UNIVERSOS) ? window.ATLAS_UNIVERSOS : [];

    if (colecoes.some(function (c) { return c.id === partes[0]; })) {
      const correspondente = atlas.find(function (u) {
        return u.id === partes[0] || u.rota === '#/' + partes[0];
      });
      return correspondente ? correspondente.id : null;
    }
    return atlas.some(function (u) { return u.id === partes[0]; }) ? partes[0] : null;
  }

  function registrarUniverso(id) {
    if (!id || estado.universos.indexOf(id) !== -1) return;
    estado.universos.push(id);
    salvarEstado();
  }

  /* ---------------- Coleção ---------------- */

  function renderizarColecao() {
    const grade = $('medalhasGrid');
    if (!grade) return;
    const total = CATALOGO.length;
    const conquistadas = CATALOGO.filter(function (m) { return Boolean(estado.concedidas[m.id]); }).length;
    const resumo = $('medalhasResumo');
    if (resumo) {
      resumo.textContent = conquistadas === 0
        ? 'As medalhas surgem aqui quando você percorre uma etapa da leitura.'
        : 'Você já guardou ' + conquistadas + ' de ' + total + ' lembranças desta coleção.';
    }

    grade.replaceChildren();
    CATALOGO.forEach(function (medalha) {
      const tem = Boolean(estado.concedidas[medalha.id]);
      const cartao = document.createElement(tem ? 'button' : 'article');
      cartao.className = 'medalha-cartao medalha-cartao--' + medalha.estilo + (tem ? ' is-conquistada' : ' is-discreta');
      if (tem) {
        cartao.type = 'button';
        cartao.dataset.medalhaId = medalha.id;
      }
      /* Sem aria-label: o próprio conteúdo visível dá o nome acessível,
         evitando divergência entre o que se lê e o que a tecnologia anuncia. */

      const moldura = document.createElement('span');
      moldura.className = 'medalha-cartao-moldura';
      const img = document.createElement('img');
      img.src = medalha.imagem;
      img.alt = '';
      img.loading = 'lazy';
      moldura.appendChild(img);

      const corpo = document.createElement('span');
      corpo.className = 'medalha-cartao-corpo';
      const nome = document.createElement('span');
      nome.className = 'medalha-cartao-nome';
      nome.textContent = medalha.nome;
      const descricao = document.createElement('span');
      descricao.className = 'medalha-cartao-descricao';
      descricao.textContent = medalha.descricao;
      const estadoTexto = document.createElement('span');
      estadoTexto.className = 'medalha-cartao-estado';
      estadoTexto.textContent = tem ? 'Rever medalha' : 'A caminho';
      corpo.appendChild(nome);
      corpo.appendChild(descricao);
      corpo.appendChild(estadoTexto);

      cartao.appendChild(moldura);
      cartao.appendChild(corpo);
      grade.appendChild(cartao);
    });
  }

  /* ---------------- Celebração ---------------- */

  function abrirModal() {
    if (window.MEMORIA_MODAL && typeof window.MEMORIA_MODAL.abrir === 'function') {
      window.MEMORIA_MODAL.abrir('medalhaModal');
      return;
    }
    modal.hidden = false;
    document.body.classList.add('modal-aberto');
    const dialogo = modal.querySelector('[role="dialog"]');
    if (dialogo) dialogo.focus();
  }

  function fecharModal() {
    if (window.MEMORIA_MODAL && typeof window.MEMORIA_MODAL.fechar === 'function') {
      window.MEMORIA_MODAL.fechar();
      return;
    }
    modal.hidden = true;
    document.body.classList.remove('modal-aberto');
  }

  function outroModalAberto() {
    return Array.prototype.slice.call(document.querySelectorAll('.modal')).some(function (no) {
      return no !== modal && !no.hidden;
    });
  }

  function prepararParticulas(celebracao) {
    if (!cenaParticulas) return;
    cenaParticulas.replaceChildren();
    if (!celebracao || REDUCED) return;
    PONTOS_LUZ.forEach(function (ponto) {
      const brilho = document.createElement('span');
      brilho.className = 'medalha-ponto';
      brilho.style.setProperty('--x', ponto[0] + '%');
      brilho.style.setProperty('--y', ponto[1] + '%');
      brilho.style.setProperty('--delay', ponto[2] + 's');
      cenaParticulas.appendChild(brilho);
    });
  }

  function exibir(item) {
    const medalha = CATALOGO.find(function (m) { return m.id === item.id; });
    if (!medalha || !modal || !modal.hidden) return false;

    imagem.src = medalha.imagem;
    titulo.textContent = medalha.nome;
    mensagem.textContent = medalha.mensagem;
    kicker.textContent = item.primeiro ? 'Uma lembrança da jornada' : 'Da sua coleção';
    botaoFechar.textContent = item.primeiro ? 'Continuar explorando' : 'Fechar';

    modal.classList.remove('is-celebrando', 'is-visualizando');
    void modal.offsetWidth;
    const celebracao = Boolean(item.primeiro) && !REDUCED;
    modal.classList.add(celebracao ? 'is-celebrando' : 'is-visualizando');
    prepararParticulas(celebracao);

    exibindo = true;
    abrirModal();
    return true;
  }

  function finalizarExibicao() {
    exibindo = false;
    modal.classList.remove('is-celebrando', 'is-visualizando');
    if (cenaParticulas) cenaParticulas.replaceChildren();
    clearTimeout(timerFila);
    timerFila = window.setTimeout(agendarFila, 420);
  }

  function agendarFila() {
    if (exibindo || !fila.length || !modal || !modal.hidden) return;
    if (outroModalAberto()) {
      clearTimeout(timerFila);
      timerFila = window.setTimeout(agendarFila, 350);
      return;
    }
    const proximo = fila.shift();
    exibir(proximo);
  }

  /* ---------------- Ligação com os sistemas existentes ---------------- */

  function init() {
    modal = $('medalhaModal');
    if (!modal || !CATALOGO.length) return;
    imagem = $('medalhaImagem');
    titulo = $('medalhaTitulo');
    mensagem = $('medalhaMensagem');
    kicker = $('medalhaKicker');
    botaoFechar = $('medalhaFecharBtn');
    cenaParticulas = $('medalhaParticulas');
    if (!imagem || !titulo || !mensagem || !kicker || !botaoFechar) return;

    if ('MutationObserver' in window) {
      new MutationObserver(function () {
        if (modal.hidden && exibindo) finalizarExibicao();
      }).observe(modal, { attributes: true, attributeFilter: ['hidden'] });
    }

    $('fecharMedalhaBtn').addEventListener('click', fecharModal);
    botaoFechar.addEventListener('click', fecharModal);
    modal.addEventListener('click', function (evento) {
      if (evento.target.hasAttribute('data-close-modal')) fecharModal();
    });
    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && !modal.hidden) fecharModal();
    });

    const grade = $('medalhasGrid');
    if (grade) {
      grade.addEventListener('click', function (evento) {
        const botao = evento.target.closest('[data-medalha-id]');
        if (!botao || !estado.concedidas[botao.dataset.medalhaId]) return;
        if (outroModalAberto()) return;
        fila.unshift({ id: botao.dataset.medalhaId, primeiro: false });
        agendarFila();
      });
    }

    window.addEventListener('memoria:progresso', function (evento) {
      const detalhe = evento.detail || {};
      if (detalhe.origem === 'biblioteca' && detalhe.tipo === 'avaliacao' && detalhe.colecao && detalhe.tema && detalhe.capitulo) {
        const chave = 'bib:' + [detalhe.colecao, detalhe.tema, detalhe.capitulo].join('/');
        if (estado.atividades.indexOf(chave) === -1) {
          estado.atividades.push(chave);
          salvarEstado();
        }
      }
      agendarAvaliacao();
    });

    window.addEventListener('memoria:rota', function (evento) {
      registrarUniverso((evento.detail || {}).universo);
      agendarAvaliacao();
    });

    window.addEventListener('hashchange', function () {
      registrarUniverso(universoDaRota());
      agendarAvaliacao();
    });

    registrarUniverso(universoDaRota());
    avaliar();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
