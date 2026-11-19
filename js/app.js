/* Jornada interativa — A Evolução da Memória
   Arquitetura sem dependências: estado versionado, eventos delegados,
   renderização incremental do mapa, quiz com dificuldade e gamificação. */
(function () {
  'use strict';

  const DATA = window.MEMORIA_DATA;
  const caps = DATA.CAPITULOS;
  const TOTAL = caps.length;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LETRAS = ['A', 'B', 'C', 'D'];

  // Coordenadas das ilhas nos dois mapas ilustrados (em % da arte de fundo).
  const ILHAS = [
    { x: 10.6, y: 73.7, mx: 24.3, my: 88.6 },
    { x: 24.4, y: 55.3, mx: 68.6, my: 77.1 },
    { x: 38.8, y: 67.1, mx: 27.1, my: 64.3 },
    { x: 51.3, y: 43.4, mx: 71.4, my: 52.9 },
    { x: 65.0, y: 59.2, mx: 25.7, my: 40.0 },
    { x: 78.8, y: 36.8, mx: 70.0, my: 27.9 },
    { x: 90.6, y: 21.1, mx: 37.1, my: 13.6 }
  ];

  const $ = function (id) { return document.getElementById(id); };
  const esc = function (valor) {
    return String(valor == null ? '' : valor).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  const el = function (tag, classe, texto) {
    const n = document.createElement(tag);
    if (classe) n.className = classe;
    if (texto != null) n.textContent = texto;
    return n;
  };

  const stageContent = $('stageContent');
  const jornada = $('jornada');

  let atual = 0;
  let bgAtivo = 'A';
  let transicao = false;
  let timerTransicao = null;
  let estado = carregarEstado();
  let refsMapa = { mapa: [], modal: [] };
  let errosNaFase = {};
  let audioCtx = null;
  let toastTimer = null;
  let modalAtual = null;
  let ultimoFoco = null;

  /* ---------------- Estado e persistência ---------------- */

  function estadoPadrao() {
    return {
      v: 2,
      nome: '',
      dificuldade: 'explorador',
      som: false,
      livre: false,
      concluidas: [],
      visitadas: [],
      respostas: {},
      tentativas: {},
      pontosPorFase: {},
      sequencia: 0,
      melhorSequencia: 0,
      fasesSemErro: 0,
      faseMestre: false,
      termosConsultados: [],
      revisou: false,
      conquistas: [],
      historico: [],
      iniciadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString()
    };
  }

  function idsValidos(lista) {
    if (!Array.isArray(lista)) return [];
    return lista.filter(function (id) {
      return caps.some(function (c) { return c.id === id; });
    });
  }

  function normalizar(dados) {
    const base = estadoPadrao();
    if (!dados || typeof dados !== 'object' || Array.isArray(dados)) return base;
    const copia = Object.assign({}, base, dados);
    copia.concluidas = idsValidos(dados.concluidas);
    copia.visitadas = idsValidos(dados.visitadas);
    copia.respostas = dados.respostas && typeof dados.respostas === 'object' ? dados.respostas : {};
    copia.tentativas = dados.tentativas && typeof dados.tentativas === 'object' ? dados.tentativas : {};
    copia.pontosPorFase = dados.pontosPorFase && typeof dados.pontosPorFase === 'object' ? dados.pontosPorFase : {};
    copia.termosConsultados = Array.isArray(dados.termosConsultados) ? dados.termosConsultados : [];
    copia.conquistas = Array.isArray(dados.conquistas) ? dados.conquistas : [];
    copia.historico = Array.isArray(dados.historico) ? dados.historico.slice(-40) : [];
    copia.nome = typeof dados.nome === 'string' ? dados.nome.slice(0, 48) : '';
    copia.dificuldade = DATA.DIFICULDADES.some(function (d) { return d.id === dados.dificuldade; }) ? dados.dificuldade : 'explorador';
    copia.som = Boolean(dados.som);
    copia.livre = Boolean(dados.livre);
    copia.faseMestre = Boolean(dados.faseMestre);
    copia.revisou = Boolean(dados.revisou);
    copia.v = 2;
    return copia;
  }

  function carregarEstado() {
    try {
      const atualRaw = localStorage.getItem(DATA.STORAGE_KEY);
      if (atualRaw) return normalizar(JSON.parse(atualRaw));
      const antigoRaw = localStorage.getItem(DATA.LEGACY_KEY);
      if (antigoRaw) {
        const antigo = JSON.parse(antigoRaw);
        if (Array.isArray(antigo)) {
          const migrado = normalizar({ concluidas: antigo, visitadas: antigo });
          persistir(migrado);
          return migrado;
        }
      }
    } catch (e) {
      /* armazenamento indisponível: segue em memória */
    }
    return estadoPadrao();
  }

  function persistir(dados) {
    try {
      localStorage.setItem(DATA.STORAGE_KEY, JSON.stringify(dados || estado));
      return true;
    } catch (e) {
      return false;
    }
  }

  function salvar() {
    estado.atualizadoEm = new Date().toISOString();
    persistir();
  }

  function concluida(id) { return estado.concluidas.indexOf(id) !== -1; }
  function visitada(id) { return estado.visitadas.indexOf(id) !== -1; }
  function pontos() {
    return Object.keys(estado.pontosPorFase).reduce(function (soma, id) {
      return soma + (Number(estado.pontosPorFase[id]) || 0);
    }, 0);
  }

  function registrarHistorico(texto, pts) {
    estado.historico.push({ ts: Date.now(), texto: texto, pontos: pts || 0 });
    if (estado.historico.length > 40) estado.historico.shift();
  }

  function visitar(id) {
    if (visitada(id)) return;
    estado.visitadas.push(id);
    registrarHistorico('Visitou ' + tituloDe(id), 0);
    salvar();
    sincronizarTudo();
  }

  function tituloDe(id) {
    const c = caps.find(function (x) { return x.id === id; });
    return c ? c.titulo : id;
  }

  function concluir(id) {
    if (concluida(id)) return;
    estado.concluidas.push(id);
    registrarHistorico('Concluiu ' + tituloDe(id), 0);
    salvar();
    avisar('✦ ' + tituloDe(id) + ' concluída!');
    toque('conquista');
    sincronizarTudo();
  }

  /* ---------------- Conquistas ---------------- */

  function verConquistas() {
    const vista = Object.assign({}, estado, { pontos: pontos() });
    return DATA.CONQUISTAS.filter(function (a) {
      return !estado.conquistas.includes(a.id) && a.teste(vista);
    });
  }

  function conferirConquistas() {
    const novas = verConquistas();
    if (!novas.length) return;
    novas.forEach(function (a) {
      estado.conquistas.push(a.id);
      registrarHistorico('Conquista: ' + a.nome, 0);
    });
    salvar();
    avisar('✧ Conquista desbloqueada: ' + novas.map(function (a) { return a.nome; }).join(', '));
    toque('conquista');
  }

  /* ---------------- Feedback sonoro e avisos ---------------- */

  function toque(tipo) {
    if (!estado.som) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      audioCtx = audioCtx || new Ctx();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const notas = tipo === 'certo' ? [523.25, 659.25, 783.99]
        : tipo === 'errado' ? [196, 164.81]
        : [659.25, 880];
      notas.forEach(function (f, i) {
        const osc = audioCtx.createOscillator();
        const ganho = audioCtx.createGain();
        const inicio = audioCtx.currentTime + i * 0.09;
        osc.type = tipo === 'errado' ? 'triangle' : 'sine';
        osc.frequency.value = f;
        ganho.gain.setValueAtTime(0.0001, inicio);
        ganho.gain.exponentialRampToValueAtTime(0.12, inicio + 0.015);
        ganho.gain.exponentialRampToValueAtTime(0.0001, inicio + 0.22);
        osc.connect(ganho).connect(audioCtx.destination);
        osc.start(inicio);
        osc.stop(inicio + 0.24);
      });
    } catch (e) {
      /* áudio é opcional */
    }
  }

  function avisar(mensagem) {
    const toast = $('toast');
    toast.textContent = mensagem;
    toast.hidden = false;
    toast.classList.add('visivel');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove('visivel');
      toastTimer = window.setTimeout(function () { toast.hidden = true; }, 300);
    }, 3200);
  }

  /* ---------------- Mapa: construído uma vez, sincronizado depois ---------------- */

  function noHTML(c, i) {
    const p = ILHAS[i];
    return '<button class="map-node era-' + esc(c.era) + '" type="button" data-acao="ir-fase" data-index="' + i + '" ' +
      'style="--x:' + p.x + '%;--y:' + p.y + '%;--mx:' + p.mx + '%;--my:' + p.my + '%" ' +
      'aria-label="Fase ' + esc(c.numero) + ': ' + esc(c.titulo) + '">' +
      '<span class="node-island">' +
        '<span class="node-selo"><span class="node-numero">' + esc(c.numero) + '</span>' + DATA.ICONS.check + '</span>' +
        '<span class="node-icone">' + DATA.ICONS[c.icone] + '</span>' +
      '</span>' +
      '<span class="node-nome">' + esc(c.titulo) + '</span>' +
      '<span class="node-fase">' + esc(c.fase) + '</span>' +
      '</button>';
  }

  function curva(x1, y1, x2, y2) {
    const meio = (x1 + x2) / 2;
    return 'M ' + x1.toFixed(1) + ' ' + y1.toFixed(1) +
      ' C ' + meio.toFixed(1) + ' ' + y1.toFixed(1) + ', ' + meio.toFixed(1) + ' ' + y2.toFixed(1) +
      ', ' + x2.toFixed(1) + ' ' + y2.toFixed(1);
  }

  function construirRotas() {
    [['mapRoutesDesktop', 16, 7.6, 'x', 'y'], ['mapRoutesMobile', 7, 14, 'mx', 'my']].forEach(function (cfg) {
      const svg = $(cfg[0]);
      if (!svg) return;
      let html = '';
      for (let i = 1; i < ILHAS.length; i++) {
        const a = ILHAS[i - 1];
        const b = ILHAS[i];
        html += '<path class="rota-base" d="' + curva(a[cfg[3]] * cfg[1], a[cfg[4]] * cfg[2], b[cfg[3]] * cfg[1], b[cfg[4]] * cfg[2]) + '"></path>';
        html += '<path class="rota-luz" data-segmento="' + i + '" d="' + curva(a[cfg[3]] * cfg[1], a[cfg[4]] * cfg[2], b[cfg[3]] * cfg[1], b[cfg[4]] * cfg[2]) + '"></path>';
      }
      svg.innerHTML = html;
    });
  }

  function construirMapas() {
    const html = caps.map(noHTML).join('');
    $('mapPath').innerHTML = html;
    $('modalMap').innerHTML = html;
    refsMapa = {
      mapa: Array.prototype.slice.call($('mapPath').querySelectorAll('.map-node')),
      modal: Array.prototype.slice.call($('modalMap').querySelectorAll('.map-node'))
    };
    construirRotas();
    sincronizarMapa();
  }

  function sincronizarMapa() {
    Object.keys(refsMapa).forEach(function (grupo) {
      refsMapa[grupo].forEach(function (no, i) {
        const c = caps[i];
        const feita = concluida(c.id);
        const vistaAgora = visitada(c.id);
        no.classList.toggle('is-done', feita);
        no.classList.toggle('is-current', !estado.livre && i === atual && !feita);
        no.classList.toggle('is-visited', !feita && vistaAgora);
        no.classList.toggle('is-unvisited', !feita && !vistaAgora);
        no.classList.toggle('is-livre', estado.livre);
        const estadoTexto = feita ? ', concluída' : (vistaAgora ? ', visitada' : ', não explorada');
        no.setAttribute('aria-label', 'Fase ' + c.numero + ': ' + c.titulo + estadoTexto);
      });
    });
    document.querySelectorAll('.rota-luz').forEach(function (p) {
      const anterior = caps[Number(p.dataset.segmento) - 1];
      p.classList.toggle('is-lida', anterior ? concluida(anterior.id) : false);
    });
    document.querySelectorAll('.timeline-item').forEach(function (item) {
      const c = caps.find(function (x) { return x.id === item.dataset.fase; });
      item.classList.toggle('is-done', c ? concluida(c.id) : false);
    });
  }

  /* ---------------- Progresso, estatísticas e conclusão ---------------- */

  function atualizarProgresso() {
    const n = estado.concluidas.length;
    const pct = (n / TOTAL) * 100;
    $('headerProgressLabel').textContent = n + '/' + TOTAL;
    $('headerProgressFill').style.width = pct + '%';
    $('stageProgressLabel').textContent = n + ' de ' + TOTAL + ' fases concluídas';
    $('stageProgressFill').style.width = pct + '%';
    const completo = n === TOTAL;
    $('completionBadge').hidden = !completo;
    document.body.classList.toggle('jornada-completa', completo);
    $('conclusaoStatus').textContent = completo
      ? 'Todas as sete ilhas foram concluídas. Seu certificado e seu resultado estão prontos.'
      : 'Você já pode visitar as sete fases. Responda às perguntas para marcar cada ilha como concluída.';
  }

  function renderizarEstatisticas() {
    const todas = Object.keys(estado.respostas);
    const acertos = todas.filter(function (k) { return estado.respostas[k].correta; }).length;
    const precisao = todas.length ? Math.round((acertos / todas.length) * 100) : 0;
    const dados = [
      { rotulo: 'Fases concluídas', valor: estado.concluidas.length + '/' + TOTAL, detalhe: estado.visitadas.length + ' ilhas visitadas' },
      { rotulo: 'Pontuação', valor: pontos().toLocaleString('pt-BR'), detalhe: 'soma da sua melhor pontuação por fase' },
      { rotulo: 'Precisão', valor: precisao + '%', detalhe: acertos + ' acertos em ' + todas.length + ' respostas' },
      { rotulo: 'Melhor sequência', valor: String(estado.melhorSequencia), detalhe: 'acertos consecutivos' },
      { rotulo: 'Medalhas', valor: estado.conquistas.length + '/' + DATA.CONQUISTAS.length, detalhe: 'conquistas desbloqueadas' },
      { rotulo: 'Dificuldade', valor: dificuldadeAtual().nome, detalhe: 'alterável no topo da jornada' }
    ];
    const grid = $('statsGrid');
    grid.replaceChildren();
    dados.forEach(function (d) {
      const cartao = el('article', 'stat-card');
      cartao.appendChild(el('span', 'stat-rotulo', d.rotulo));
      cartao.appendChild(el('strong', 'stat-valor', d.valor));
      cartao.appendChild(el('span', 'stat-detalhe', d.detalhe));
      grid.appendChild(cartao);
    });
  }

  function renderizarConquistas() {
    const lista = $('achievementsList');
    lista.replaceChildren();
    DATA.CONQUISTAS.forEach(function (a) {
      const tem = estado.conquistas.includes(a.id);
      const cartao = el('article', 'achievement' + (tem ? ' is-desbloqueada' : ' is-bloqueada'));
      cartao.setAttribute('aria-label', a.nome + (tem ? ', desbloqueada' : ', bloqueada') + '. ' + a.descricao);
      cartao.appendChild(el('span', 'achievement-icon', a.icon));
      const corpo = el('div', 'achievement-corpo');
      corpo.appendChild(el('h4', '', a.nome));
      corpo.appendChild(el('p', '', a.descricao));
      cartao.appendChild(corpo);
      cartao.appendChild(el('span', 'achievement-estado', tem ? '✓' : '○'));
      lista.appendChild(cartao);
    });
  }

  function renderizarHistorico() {
    const lista = $('historyList');
    lista.replaceChildren();
    const itens = estado.historico.slice(-8).reverse();
    if (!itens.length) {
      lista.appendChild(el('li', 'historico-vazio', 'Sua jornada começa com a primeira ilha.'));
      return;
    }
    itens.forEach(function (item) {
      const li = el('li');
      const data = new Date(item.ts);
      const quando = isNaN(data.getTime()) ? '' : data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
      li.appendChild(el('span', 'historico-texto', item.texto));
      li.appendChild(el('span', 'historico-meta', quando + (item.pontos ? ' · +' + item.pontos + ' pts' : '')));
      lista.appendChild(li);
    });
  }

  function sincronizarTudo() {
    atualizarProgresso();
    sincronizarMapa();
    renderizarEstatisticas();
    renderizarConquistas();
    renderizarHistorico();
    conferirConquistas();
  }

  /* ---------------- Linha do tempo e glossário ---------------- */

  function construirLinhaDoTempo() {
    const lista = $('timelineList');
    lista.replaceChildren();
    DATA.LINHA_DO_TEMPO.forEach(function (marco) {
      const li = el('li', 'timeline-item');
      li.dataset.fase = marco.fase;
      const botao = el('button', 'timeline-btn');
      botao.type = 'button';
      botao.dataset.acao = 'ir-fase';
      const c = caps.find(function (x) { return x.id === marco.fase; });
      botao.dataset.index = String(caps.indexOf(c));
      botao.appendChild(el('span', 'timeline-ano', marco.ano));
      botao.appendChild(el('span', 'timeline-titulo', marco.titulo));
      botao.appendChild(el('span', 'timeline-detalhe', marco.detalhe));
      li.appendChild(botao);
      lista.appendChild(li);
    });
  }

  let categoriaAtual = 'Todas';

  function construirFiltros() {
    const categorias = ['Todas'].concat(Array.from(new Set(DATA.GLOSSARIO.map(function (t) { return t.categoria; }))));
    const grupo = $('glossaryFilters');
    grupo.replaceChildren();
    categorias.forEach(function (cat) {
      const b = el('button', 'filtro-btn' + (cat === categoriaAtual ? ' is-ativo' : ''), cat);
      b.type = 'button';
      b.dataset.acao = 'filtrar-glossario';
      b.dataset.categoria = cat;
      b.setAttribute('aria-pressed', String(cat === categoriaAtual));
      grupo.appendChild(b);
    });
  }

  function renderizarGlossario() {
    const busca = $('glossarySearch').value.trim().toLocaleLowerCase('pt-BR');
    const itens = DATA.GLOSSARIO.filter(function (t) {
      const pelaCategoria = categoriaAtual === 'Todas' || t.categoria === categoriaAtual;
      const peloTexto = !busca || (t.termo + ' ' + t.definicao + ' ' + t.categoria).toLocaleLowerCase('pt-BR').includes(busca);
      return pelaCategoria && peloTexto;
    });
    const lista = $('glossaryList');
    lista.replaceChildren();
    itens.forEach(function (t) {
      const cartao = el('article', 'glossary-card');
      const cabecalho = el('h3');
      const botao = el('button', 'glossary-termo', t.termo);
      botao.type = 'button';
      botao.dataset.acao = 'termo';
      botao.dataset.termo = t.termo;
      botao.setAttribute('aria-expanded', 'false');
      cabecalho.appendChild(botao);
      cartao.appendChild(cabecalho);
      cartao.appendChild(el('span', 'glossary-categoria', t.categoria));
      const def = el('p', 'glossary-def', t.definicao);
      def.hidden = true;
      def.id = 'def-' + t.termo.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '-');
      botao.setAttribute('aria-controls', def.id);
      cartao.appendChild(def);
      lista.appendChild(cartao);
    });
    $('glossaryCount').textContent = itens.length + (itens.length === 1 ? ' termo encontrado' : ' termos encontrados');
  }

  function consultarTermo(botao) {
    const def = document.getElementById(botao.getAttribute('aria-controls'));
    if (!def) return;
    const abrindo = def.hidden;
    def.hidden = !abrindo;
    botao.setAttribute('aria-expanded', String(abrindo));
    if (abrindo) {
      const termo = botao.dataset.termo;
      if (!estado.termosConsultados.includes(termo)) {
        estado.termosConsultados.push(termo);
        salvar();
        conferirConquistas();
      }
    }
  }

  /* ---------------- Jornada e quiz ---------------- */

  function dificuldadeAtual() {
    return DATA.DIFICULDADES.find(function (d) { return d.id === estado.dificuldade; }) || DATA.DIFICULDADES[0];
  }

  function perguntasDe(c) {
    return [c.pergunta].concat(c.desafios || []).slice(0, dificuldadeAtual().perguntas);
  }

  function chaveResposta(id, qi) { return id + ':' + qi; }

  function trocarFundo(src) {
    const a = $('stageBgA');
    const b = $('stageBgB');
    const entra = bgAtivo === 'A' ? b : a;
    const sai = bgAtivo === 'A' ? a : b;
    entra.style.backgroundImage = 'url("' + src + '")';
    entra.style.opacity = '1';
    sai.style.opacity = '0';
    bgAtivo = bgAtivo === 'A' ? 'B' : 'A';
  }

  function listaHTML(titulo, itens, chave) {
    if (!itens || !itens.length) return '';
    return '<div class="detalhe-lista"><h4>' + esc(titulo) + '</h4><ul>' + itens.map(function (i) {
      return '<li><b>' + esc(i[chave]) + '</b> ' + esc(i.texto) + '</li>';
    }).join('') + '</ul></div>';
  }

  function fontesHTML(c) {
    return '<details class="fontes-fase"><summary>✧ Fontes desta fase</summary><ul>' + c.fontes.map(function (f) {
      return '<li>' + esc(f.titulo) + (f.url ? ' <a href="' + esc(f.url) + '" target="_blank" rel="noopener noreferrer">Acesso online ↗</a>' : '') + '</li>';
    }).join('') + '</ul></details>';
  }

  function perguntaHTML(c, pergunta, qi, totalPerguntas) {
    const resposta = estado.respostas[chaveResposta(c.id, qi)];
    const bloqueada = resposta && resposta.correta;
    const opcoes = pergunta.opcoes.map(function (o, i) {
      const errouAqui = resposta && resposta.indice === i && !resposta.correta;
      const classe = bloqueada && o.correta ? ' is-correta' : (errouAqui ? ' is-errada' : '');
      const desativada = bloqueada || errouAqui;
      return '<button class="option' + classe + '" type="button" data-acao="responder" data-qi="' + qi + '" data-i="' + i + '"' + (desativada ? ' disabled' : '') + '>' +
        '<span class="option-letra">' + LETRAS[i] + '</span>' +
        '<span class="option-texto">' + esc(o.texto) + '</span></button>';
    }).join('');
    const feedback = resposta
      ? '<div class="feedback ' + (resposta.correta ? 'is-sucesso' : 'is-erro') + '" data-feedback>' +
          '<span class="feedback-icone">' + (resposta.correta ? '✦' : '↺') + '</span><div>' +
          '<strong>' + (resposta.correta ? (qi === 0 ? esc(c.recompensa) : 'Correto!') : 'Ainda não — mas é assim que se aprende.') + '</strong>' +
          '<p>' + esc(pergunta.explicacao) + '</p></div></div>'
      : '<div class="feedback" data-feedback role="status" aria-live="polite" hidden></div>';
    return '<section class="pergunta-bloco' + (qi === 0 ? ' is-ativa' : '') + '" data-pergunta="' + qi + '"' + (qi === 0 ? '' : ' hidden') + '>' +
      '<p class="quiz-contador">Pergunta ' + (qi + 1) + ' de ' + totalPerguntas + ' · ' + esc(qi === 0 ? 'principal' : 'desafio') + '</p>' +
      '<h3 class="quiz-pergunta">' + esc(pergunta.enunciado) + '</h3>' +
      '<div class="opcoes" role="group" aria-label="Alternativas da pergunta ' + (qi + 1) + '">' + opcoes + '</div>' +
      feedback +
      '<button class="dica-btn" type="button" data-acao="dica" data-qi="' + qi + '"' + (estado.dificuldade === 'explorador' ? '' : ' hidden') + '>◈ Usar dica (eliminar uma alternativa)</button>' +
      '<div class="quiz-acoes">' +
        '<button class="btn btn-primary pergunta-proxima" type="button" data-acao="proxima-pergunta" data-qi="' + qi + '" hidden>Próxima pergunta →</button>' +
        (qi === 0 ? '<button class="btn btn-pular" type="button" data-acao="pular">Explorar sem responder →</button>' : '') +
      '</div></section>';
  }

  function montarCapitulo(i) {
    const c = caps[i];
    atual = i;
    jornada.className = 'jornada era-' + c.era;
    jornada.dataset.era = c.era;
    $('stageChapter').textContent = 'FASE ' + c.numero + ' / ' + String(TOTAL).padStart(2, '0');
    trocarFundo(c.img);

    const perguntas = perguntasDe(c);
    stageContent.innerHTML =
      '<div class="stage-grid">' +
        '<div class="stage-principal">' +
          '<p class="stage-periodo">' + esc(c.periodo) + ' · ' + esc(c.data) + '</p>' +
          '<h2 class="stage-titulo">' + esc(c.titulo) + '</h2>' +
          '<p class="stage-fase">' + esc(c.fase) + '</p>' +
          '<p class="stage-contexto">' + esc(c.contexto) + '</p>' +
          '<p class="stage-intro">' + esc(c.intro) + '</p>' +
          '<div class="blocos">' + c.blocos.map(function (b) {
            return '<article class="bloco"><span class="bloco-icone">' + DATA.ICONS[b.icone] + '</span>' +
              '<div><h4>' + esc(b.titulo) + '</h4><p>' + esc(b.texto) + '</p></div></article>';
          }).join('') + '</div>' +
          '<div class="detalhes-fase">' +
            listaHTML('Acontecimentos', c.acontecimentos, 'ano') +
            listaHTML('Personagens', c.personagens, 'nome') +
            listaHTML('Conceitos', c.conceitos, 'termo') +
          '</div>' +
          '<div class="exemplo-card"><span>✦ ' + esc(c.exemplo.titulo) + '</span><p>' + esc(c.exemplo.texto) + '</p></div>' +
          '<div class="comparacao-card"><span>◇ ' + esc(c.comparacao.titulo) + '</span><p>' + esc(c.comparacao.texto) + '</p></div>' +
          fontesHTML(c) +
        '</div>' +
        '<aside class="stage-lateral">' +
          '<div class="nota-fala"><span class="nota-etiqueta">O fio da história</span>' +
            '<p class="nota-texto">' + esc(c.fala) + '</p></div>' +
          '<div class="curiosidade-card"><span class="curiosidade-selo">✧ ' + esc(c.curiosidade.titulo) + '</span>' +
            '<p>' + esc(c.curiosidade.texto) + '</p></div>' +
          '<div class="quiz" id="quiz">' +
            '<span class="quiz-etiqueta">✦ Hora de guardar esta lembrança</span>' +
            perguntas.map(function (p, qi) { return perguntaHTML(c, p, qi, perguntas.length); }).join('') +
            '<div class="quiz-acoes-finais"><button class="btn btn-primary continuar" id="continueBtn" type="button" data-acao="continuar" hidden></button></div>' +
          '</div>' +
        '</aside>' +
      '</div>';

    $('continueBtn').textContent = i === TOTAL - 1 ? 'Ver a comparação →' : 'Continuar a jornada →';
    $('prevBtn').disabled = i === 0;
    $('nextBtn').textContent = i === TOTAL - 1 ? 'Ver comparação →' : 'Próxima fase →';
    restaurarQuiz(c, perguntas);
    visitar(c.id);
    sincronizarMapa();
  }

  function restaurarQuiz(c, perguntas) {
    const primeira = estado.respostas[chaveResposta(c.id, 0)];
    if (!primeira) return;
    let proximaNaoRespondida = -1;
    for (let qi = 0; qi < perguntas.length; qi++) {
      const r = estado.respostas[chaveResposta(c.id, qi)];
      if (r && r.correta) continue;
      proximaNaoRespondida = qi;
      break;
    }
    if (proximaNaoRespondida > 0) {
      mostrarPergunta(proximaNaoRespondida);
      const anterior = stageContent.querySelector('.pergunta-bloco[data-pergunta="' + (proximaNaoRespondida - 1) + '"] .pergunta-proxima');
      if (anterior) anterior.hidden = false;
    }
    if (todasRespondidas()) $('continueBtn').hidden = false;
  }

  function renderizarCapitulo(i, animar) {
    if (i < 0 || i >= TOTAL || transicao) return;
    clearTimeout(timerTransicao);
    if (animar && !reduced) {
      transicao = true;
      stageContent.classList.add('is-saindo');
      timerTransicao = window.setTimeout(function () {
        montarCapitulo(i);
        stageContent.classList.remove('is-saindo');
        stageContent.classList.add('is-entrando');
        transicao = false;
        window.setTimeout(function () { stageContent.classList.remove('is-entrando'); }, 420);
      }, 180);
    } else {
      montarCapitulo(i);
    }
  }

  function irParaCapitulo(i) {
    if (i < 0 || i >= TOTAL) return;
    renderizarCapitulo(i, true);
    irPara('#jornada');
  }

  function irPara(seletor) {
    const alvo = document.querySelector(seletor);
    if (!alvo) return;
    alvo.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }

  function blocoAtivo() { return stageContent.querySelector('.pergunta-bloco:not([hidden])'); }

  function mostrarPergunta(qi) {
    stageContent.querySelectorAll('.pergunta-bloco').forEach(function (b) {
      b.hidden = Number(b.dataset.pergunta) !== qi;
      b.classList.toggle('is-ativa', !b.hidden);
    });
    const bloco = stageContent.querySelector('.pergunta-bloco[data-pergunta="' + qi + '"]');
    if (bloco && !reduced) bloco.classList.add('is-entrando');
  }

  function celebrar(bloco) {
    if (reduced) return;
    const caixa = el('div', 'sparkles');
    for (let i = 0; i < 12; i++) {
      const s = el('span');
      s.style.left = (6 + Math.random() * 88) + '%';
      s.style.top = (10 + Math.random() * 70) + '%';
      s.style.animationDelay = (Math.random() * 0.25) + 's';
      s.style.setProperty('--dx', ((Math.random() - 0.5) * 90) + 'px');
      caixa.appendChild(s);
    }
    bloco.appendChild(caixa);
    window.setTimeout(function () { caixa.remove(); }, 1400);
  }

  function responder(botao) {
    const bloco = botao.closest('.pergunta-bloco');
    if (!bloco || bloco.dataset.locked === 'true') return;
    const qi = Number(bloco.dataset.pergunta);
    const c = caps[atual];
    const pergunta = perguntasDe(c)[qi];
    if (!pergunta) return;
    const i = Number(botao.dataset.i);
    const opcao = pergunta.opcoes[i];
    if (!opcao) return;
    const chave = chaveResposta(c.id, qi);
    const anterior = estado.respostas[chave];
    if (anterior && anterior.correta) return;

    estado.tentativas[chave] = (Number(estado.tentativas[chave]) || 0) + 1;
    const tentativas = estado.tentativas[chave];
    const botoes = Array.prototype.slice.call(bloco.querySelectorAll('.option'));
    const feedback = bloco.querySelector('[data-feedback]');

    if (opcao.correta) {
      bloco.dataset.locked = 'true';
      botoes.forEach(function (b) { b.disabled = true; });
      botoes[i].classList.add('is-correta');
      const mult = dificuldadeAtual().multiplicador;
      const base = qi === 0 ? 100 : 60;
      const pts = Math.round((base + (tentativas === 1 ? 40 : 0)) * mult);
      estado.respostas[chave] = { indice: i, correta: true, pontos: pts };
      estado.sequencia += 1;
      estado.melhorSequencia = Math.max(estado.melhorSequencia, estado.sequencia);

      const pontosFase = perguntasDe(c).reduce(function (soma, _p, k) {
        const r = estado.respostas[chaveResposta(c.id, k)];
        return soma + (r && r.correta ? Number(r.pontos) || 0 : 0);
      }, 0);
      estado.pontosPorFase[c.id] = pontosFase;

      if (!anterior || !anterior.correta) registrarHistorico('Acertou ' + c.titulo + (qi ? ' (desafio ' + qi + ')' : ''), pts);

      feedback.hidden = false;
      feedback.className = 'feedback is-sucesso';
      feedback.replaceChildren();
      const icone = el('span', 'feedback-icone', '✦');
      const texto = el('div');
      texto.appendChild(el('strong', '', qi === 0 ? c.recompensa : 'Correto! +' + pts + ' pontos'));
      texto.appendChild(el('p', '', pergunta.explicacao));
      feedback.appendChild(icone);
      feedback.appendChild(texto);

      const eraNova = !concluida(c.id);
      if (qi === 0) {
        const nota = stageContent.querySelector('.nota-texto');
        if (nota) nota.textContent = c.recompensa;
        concluir(c.id);
        if (eraNova && !(errosNaFase[c.id] > 0)) {
          estado.fasesSemErro += 1;
          registrarHistorico('Fase sem erros: ' + c.titulo, 0);
        }
      }
      avaliarMestre(c);

      toque('certo');
      celebrar(bloco);
      salvar();
      sincronizarTudo();

      const proximo = stageContent.querySelector('.pergunta-bloco[data-pergunta="' + (qi + 1) + '"]');
      if (proximo) {
        const botaoProximo = bloco.querySelector('.pergunta-proxima');
        if (botaoProximo) botaoProximo.hidden = false;
      } else if (todasRespondidas()) {
        $('continueBtn').hidden = false;
      }
      return;
    }

    btnErrado(botao);
    estado.sequencia = 0;
    errosNaFase[c.id] = (errosNaFase[c.id] || 0) + 1;
    estado.respostas[chave] = { indice: i, correta: false, pontos: 0 };
    feedback.hidden = false;
    feedback.className = 'feedback is-erro';
    feedback.replaceChildren();
    feedback.appendChild(el('span', 'feedback-icone', '↺'));
    const texto = el('div');
    texto.appendChild(el('strong', '', 'Ainda não — mas é assim que se aprende.'));
    texto.appendChild(el('p', '', pergunta.explicacao));
    texto.appendChild(el('small', '', 'Tente outra alternativa.'));
    feedback.appendChild(texto);
    toque('errado');
    salvar();
    renderizarEstatisticas();
    renderizarHistorico();
  }

  function avaliarMestre(c) {
    if (estado.dificuldade !== 'mestre' || estado.faseMestre) return;
    if (!perguntasDe(c).every(function (_p, k) {
      const r = estado.respostas[chaveResposta(c.id, k)];
      return r && r.correta;
    })) return;
    estado.faseMestre = true;
    registrarHistorico('Fase concluída no nível Mestre: ' + c.titulo, 0);
  }

  function btnErrado(botao) {
    botao.classList.add('is-errada');
    botao.disabled = true;
  }

  function todasRespondidas() {
    return perguntasDe(caps[atual]).every(function (_p, k) {
      const r = estado.respostas[chaveResposta(caps[atual].id, k)];
      return r && r.correta;
    });
  }

  function usarDica(botao) {
    const bloco = botao.closest('.pergunta-bloco');
    const qi = Number(bloco.dataset.pergunta);
    const pergunta = perguntasDe(caps[atual])[qi];
    if (!pergunta) return;
    const candidatos = Array.prototype.slice.call(bloco.querySelectorAll('.option:not(:disabled):not(.is-eliminada)'))
      .filter(function (b) { return !pergunta.opcoes[Number(b.dataset.i)].correta; });
    if (candidatos.length < 1) return;
    candidatos[0].classList.add('is-eliminada');
    candidatos[0].disabled = true;
    botao.hidden = true;
    avisar('◈ Uma alternativa foi eliminada.');
  }

  function proximaPergunta(botao) {
    const qi = Number(botao.dataset.qi);
    const proxima = stageContent.querySelector('.pergunta-bloco[data-pergunta="' + (qi + 1) + '"]');
    if (proxima) mostrarPergunta(qi + 1);
  }

  function finalizarQuiz() {
    if (atual === TOTAL - 1) irPara('#conclusao');
    else irParaCapitulo(atual + 1);
  }

  /* ---------------- Revisão ---------------- */

  function renderizarRevisao() {
    const lista = $('reviewList');
    lista.replaceChildren();
    const chaves = Object.keys(estado.respostas);
    if (!chaves.length) {
      $('reviewLead').textContent = 'Suas respostas aparecem aqui depois da primeira interação.';
      lista.appendChild(el('p', 'historico-vazio', 'Nenhuma resposta registrada ainda.'));
      return;
    }
    $('reviewLead').textContent = 'Confira o que você marcou, a resposta correta e a explicação.';
    const ordem = chaves.sort(function (a, b) {
      const ia = caps.findIndex(function (c) { return c.id === a.split(':')[0]; });
      const ib = caps.findIndex(function (c) { return c.id === b.split(':')[0]; });
      return ia - ib || Number(a.split(':')[1]) - Number(b.split(':')[1]);
    });
    ordem.forEach(function (chave) {
      const partes = chave.split(':');
      const c = caps.find(function (x) { return x.id === partes[0]; });
      if (!c) return;
      const qi = Number(partes[1]);
      const pergunta = perguntasDe(c)[qi] || ([c.pergunta].concat(c.desafios || []))[qi];
      if (!pergunta) return;
      const r = estado.respostas[chave];
      const artigo = el('article', 'review-item' + (r.correta ? ' is-correta' : ' is-erro'));
      artigo.appendChild(el('p', 'review-fase', 'Fase ' + c.numero + ' · ' + c.titulo));
      artigo.appendChild(el('h3', '', pergunta.enunciado));
      const marcada = pergunta.opcoes[r.indice] ? pergunta.opcoes[r.indice].texto : '—';
      const corretaIdx = pergunta.opcoes.findIndex(function (o) { return o.correta; });
      artigo.appendChild(el('p', '', 'Sua resposta: ' + marcada + (r.correta ? ' ✓' : ' ✗')));
      if (!r.correta) artigo.appendChild(el('p', '', 'Resposta correta: ' + pergunta.opcoes[corretaIdx].texto));
      artigo.appendChild(el('p', 'review-explicacao', pergunta.explicacao));
      lista.appendChild(artigo);
    });
  }

  /* ---------------- Certificado e compartilhamento ---------------- */

  function nomeLimpo() {
    return $('participanteNome').value.trim().replace(/\s+/g, ' ').slice(0, 48);
  }

  function abrirCertificado() {
    if (estado.concluidas.length < TOTAL) {
      avisar('Conclua as sete fases para gerar o certificado.');
      $('participanteNome').focus();
      return;
    }
    const nome = nomeLimpo();
    if (!nome) {
      avisar('Digite seu nome para personalizar o certificado.');
      $('participanteNome').focus();
      return;
    }
    estado.nome = nome;
    salvar();
    $('certificateName').textContent = nome;
    $('certificateDate').textContent = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    $('certificateScore').textContent = pontos().toLocaleString('pt-BR') + ' pontos';
    const base = nome + '|' + estado.atualizadoEm + '|' + pontos();
    let hash = 0;
    for (let i = 0; i < base.length; i++) hash = (hash * 31 + base.charCodeAt(i)) >>> 0;
    $('certificateCode').textContent = 'MM-' + hash.toString(36).toUpperCase().slice(0, 6).padStart(6, '0');
    abrirModal('certificateModal');
  }

  function textoResultado() {
    const nome = estado.nome || nomeLimpo() || 'Explorador(a)';
    const concluidas = estado.concluidas.length;
    return 'Minha jornada em A Evolução da Memória: ' + concluidas + '/7 fases concluídas, ' +
      pontos().toLocaleString('pt-BR') + ' pontos e ' + estado.conquistas.length + ' medalhas. ' +
      (concluidas === TOTAL ? 'Certificado concluído por ' + nome + '.' : 'Continue explorando!');
  }

  async function copiarTexto(texto) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(texto);
        return true;
      }
    } catch (e) {
      /* permissão negada: tenta o método legado */
    }
    try {
      const campo = el('textarea');
      campo.value = texto;
      campo.setAttribute('readonly', '');
      campo.style.cssText = 'position:fixed;top:-1000px;';
      document.body.appendChild(campo);
      campo.select();
      const ok = document.execCommand('copy');
      campo.remove();
      return Boolean(ok);
    } catch (e) {
      return false;
    }
  }

  async function compartilhar() {
    const texto = textoResultado();
    const url = location.href.split('#')[0];
    const completo = texto + ' ' + url;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'A Evolução da Memória', text: texto, url: url });
        return;
      } catch (e) {
        if (e && e.name === 'AbortError') return;
      }
    }
    $('shareText').value = completo;
    abrirModal('shareModal');
    const copiado = await copiarTexto(completo);
    avisar(copiado ? '✓ Resultado copiado para a área de transferência.' : 'Selecione o texto para copiar manualmente.');
    window.requestAnimationFrame(function () {
      const campo = $('shareText');
      campo.focus();
      campo.select();
    });
  }

  /* ---------------- Modais com foco preso ---------------- */

  function parceirosDeFoco(node) {
    return Array.prototype.slice.call(node.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(function (n) { return !n.hidden && n.offsetParent !== null; });
  }

  function fundoInerte(ativo) {
    ['siteHeader', 'conteudo'].concat([]).forEach(function (id) {
      const n = $(id);
      if (!n) return;
      if (ativo) {
        n.setAttribute('aria-hidden', 'true');
        if ('inert' in n) n.inert = true;
      } else {
        n.removeAttribute('aria-hidden');
        if ('inert' in n) n.inert = false;
      }
    });
  }

  function abrirModal(id) {
    if (modalAtual) fecharModal();
    const modal = $(id);
    if (!modal) return;
    ultimoFoco = document.activeElement;
    modalAtual = modal;
    modal.hidden = false;
    document.body.classList.add('modal-aberto');
    fundoInerte(true);
    const alvo = modal.querySelector('[role="dialog"], [role="alertdialog"]') || modal;
    window.requestAnimationFrame(function () { alvo.focus(); });
  }

  function fecharModal() {
    if (!modalAtual) return;
    modalAtual.hidden = true;
    modalAtual = null;
    document.body.classList.remove('modal-aberto');
    fundoInerte(false);
    if (ultimoFoco && document.contains(ultimoFoco)) ultimoFoco.focus();
    ultimoFoco = null;
  }

  /* ---------------- Eventos centralizados ---------------- */

  function tratarClique(e) {
    const alvo = e.target.closest('[data-acao]');
    if (alvo) {
      const acao = alvo.dataset.acao;
      if (acao === 'ir-fase') {
        fecharModal();
        irParaCapitulo(Number(alvo.dataset.index));
        return;
      }
      if (acao === 'responder') { responder(alvo); return; }
      if (acao === 'dica') { usarDica(alvo); return; }
      if (acao === 'proxima-pergunta') { proximaPergunta(alvo); return; }
      if (acao === 'pular' || acao === 'continuar') { finalizarQuiz(); return; }
      if (acao === 'termo') { consultarTermo(alvo); return; }
      if (acao === 'filtrar-glossario') {
        categoriaAtual = alvo.dataset.categoria;
        construirFiltros();
        renderizarGlossario();
        return;
      }
    }
    if (e.target.hasAttribute('data-close-modal')) fecharModal();
  }

  function tratarTeclado(e) {
    if (!modalAtual) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      fecharModal();
      return;
    }
    if (e.key !== 'Tab') return;
    const focalizaveis = parceirosDeFoco(modalAtual);
    if (!focalizaveis.length) return;
    const primeiro = focalizaveis[0];
    const ultimo = focalizaveis[focalizaveis.length - 1];
    const dialogo = modalAtual.querySelector('[role="dialog"], [role="alertdialog"]');
    if (e.shiftKey && (document.activeElement === primeiro || document.activeElement === dialogo)) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault();
      primeiro.focus();
    }
  }

  function observarNavegacao() {
    const secoes = ['prologo', 'mapa', 'jornada', 'linha-do-tempo', 'glossario', 'comparacao', 'conquistas'].map($);
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        document.querySelectorAll('.site-nav a').forEach(function (a) {
          a.classList.toggle('ativo', a.dataset.nav === entrada.target.id);
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    secoes.forEach(function (s) { if (s) obs.observe(s); });
  }

  function criarParticulas() {
    if (reduced) return;
    const quantidade = window.innerWidth < 700 ? 8 : 18;
    let html = '';
    for (let i = 0; i < quantidade; i++) {
      html += '<span style="left:' + (Math.random() * 100).toFixed(1) + '%;top:' +
        (Math.random() * 100).toFixed(1) + '%;animation-duration:' +
        (12 + Math.random() * 16).toFixed(1) + 's;animation-delay:-' +
        (Math.random() * 20).toFixed(1) + 's"></span>';
    }
    $('particles').innerHTML = html;
  }

  function sincronizarControles() {
    const diff = $('difficultySelect');
    diff.value = estado.dificuldade;
    $('difficultyHint').textContent = dificuldadeAtual().descricao;
    const som = $('soundToggle');
    som.setAttribute('aria-pressed', String(estado.som));
    som.setAttribute('aria-label', estado.som ? 'Desativar sons' : 'Ativar sons');
    som.classList.toggle('is-ativo', estado.som);
    const livre = $('freeExploreBtn');
    livre.setAttribute('aria-pressed', String(estado.livre));
    livre.classList.toggle('is-ativo', estado.livre);
    document.body.classList.toggle('modo-livre', estado.livre);
    $('participanteNome').value = estado.nome || '';
  }

  function redefinir() {
    estado = estadoPadrao();
    errosNaFase = {};
    atual = 0;
    salvar();
    sincronizarControles();
    renderizarCapitulo(0, false);
    sincronizarTudo();
    renderizarRevisao();
    fecharModal();
    avisar('Jornada reiniciada. Um novo fio começa aqui.');
    irPara('#inicio');
  }

  function init() {
    if (!DATA || !caps.length) return;
    sincronizarControles();
    construirMapas();
    construirLinhaDoTempo();
    construirFiltros();
    renderizarGlossario();
    criarParticulas();
    montarCapitulo(0);
    sincronizarTudo();
    observarNavegacao();

    document.addEventListener('click', tratarClique);
    document.addEventListener('keydown', tratarTeclado);

    $('prevBtn').addEventListener('click', function () { irParaCapitulo(atual - 1); });
    $('nextBtn').addEventListener('click', function () {
      if (atual === TOTAL - 1) irPara('#conclusao'); else irParaCapitulo(atual + 1);
    });
    $('heroMapBtn').addEventListener('click', function () { abrirModal('mapModal'); });
    $('openMapBtn').addEventListener('click', function () { abrirModal('mapModal'); });
    $('reviewBtn').addEventListener('click', function () {
      estado.revisou = true;
      salvar();
      renderizarRevisao();
      conferirConquistas();
      abrirModal('reviewModal');
    });
    $('closeModalBtn').addEventListener('click', fecharModal);
    $('closeReviewBtn').addEventListener('click', fecharModal);
    $('closeShareBtn').addEventListener('click', fecharModal);
    $('closeShareActionBtn').addEventListener('click', fecharModal);
    $('copyShareBtn').addEventListener('click', async function () {
      const copiado = await copiarTexto($('shareText').value);
      avisar(copiado ? '✓ Resultado copiado.' : 'Selecione o texto para copiar manualmente.');
      $('shareText').focus();
      $('shareText').select();
    });
    $('closeCertificateBtn').addEventListener('click', fecharModal);
    $('closeResetBtn').addEventListener('click', fecharModal);
    $('cancelResetBtn').addEventListener('click', fecharModal);

    $('difficultySelect').addEventListener('change', function (e) {
      estado.dificuldade = e.target.value;
      salvar();
      sincronizarControles();
      renderizarCapitulo(atual, false);
      avisar('Dificuldade: ' + dificuldadeAtual().nome + '.');
    });
    $('soundToggle').addEventListener('click', function () {
      estado.som = !estado.som;
      salvar();
      sincronizarControles();
      toque('conquista');
      avisar(estado.som ? '♪ Sons ativados.' : 'Sons desativados.');
    });
    $('freeExploreBtn').addEventListener('click', function () {
      estado.livre = !estado.livre;
      salvar();
      sincronizarControles();
      sincronizarMapa();
      $('freeExploreStatus').textContent = estado.livre
        ? 'Modo exploração livre ativado. Todas as ilhas estão em destaque.'
        : 'Modo exploração livre desativado.';
      avisar(estado.livre ? '⌖ Modo exploração livre ativado.' : 'Modo exploração livre desativado.');
    });
    $('glossarySearch').addEventListener('input', renderizarGlossario);
    $('certificateBtn').addEventListener('click', abrirCertificado);
    $('certificatePrintBtn').addEventListener('click', function () { window.print(); });
    $('shareBtn').addEventListener('click', compartilhar);
    $('restartBtn').addEventListener('click', function () { abrirModal('resetModal'); });
    $('confirmResetBtn').addEventListener('click', redefinir);

    $('menuToggle').addEventListener('click', function () {
      const aberto = $('siteHeader').classList.toggle('menu-aberto');
      this.setAttribute('aria-expanded', String(aberto));
      this.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });
    document.querySelectorAll('.site-nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        $('siteHeader').classList.remove('menu-aberto');
        $('menuToggle').setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
