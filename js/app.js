/* Jornada interativa — A Evolução da Memória */
(function () {
  'use strict';

  const DATA = window.MEMORIA_DATA;
  const caps = DATA.CAPITULOS;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  const stageContent = $('stageContent');
  const jornada = $('jornada');
  const modal = $('mapModal');

  let atual = 0;
  let bgAtivo = 'A';
  let progresso = carregarProgresso();

  function carregarProgresso() {
    try {
      const salvo = JSON.parse(localStorage.getItem(DATA.STORAGE_KEY));
      if (!Array.isArray(salvo)) return [];
      return salvo.filter(function (id) { return caps.some(function (c) { return c.id === id; }); });
    } catch (e) {
      return [];
    }
  }

  function salvarProgresso() {
    try { localStorage.setItem(DATA.STORAGE_KEY, JSON.stringify(progresso)); } catch (e) { /* modo privado */ }
  }

  function concluida(id) { return progresso.indexOf(id) !== -1; }

  function marcarConcluido(id) {
    if (concluida(id)) return;
    progresso.push(id);
    salvarProgresso();
    atualizarProgresso();
    renderizarMapas();
  }

  function atualizarProgresso() {
    const total = caps.length;
    const n = progresso.length;
    const pct = (n / total) * 100;
    $('headerProgressLabel').textContent = n + '/' + total;
    $('headerProgressFill').style.width = pct + '%';
    $('stageProgressLabel').textContent = n + ' de ' + total + ' fases concluídas';
    $('stageProgressFill').style.width = pct + '%';

    const completo = n === total;
    $('completionBadge').hidden = !completo;
    document.body.classList.toggle('jornada-completa', completo);
    $('conclusaoStatus').textContent = completo
      ? 'Todas as sete ilhas foram concluídas. Obrigado por percorrer esta história.'
      : 'Você já pode visitar as sete fases. Responda às perguntas para marcar cada ilha como concluída.';
  }

  function renderizarMapas() {
    const html = caps.map(function (c, i) {
      const p = ILHAS[i];
      const estado = concluida(c.id) ? 'is-done' : (i === atual ? 'is-current' : '');
      const selo = concluida(c.id) ? DATA.ICONS.check : c.numero;
      return '<button class="map-node era-' + c.era + ' ' + estado + '" data-index="' + i + '" data-era="' + c.era + '" type="button" ' +
        'style="--x:' + p.x + '%;--y:' + p.y + '%;--mx:' + p.mx + '%;--my:' + p.my + '%" ' +
        'aria-label="Fase ' + c.numero + ': ' + c.titulo + (concluida(c.id) ? ', concluída' : '') + '">' +
        '<span class="node-island">' +
          '<span class="node-selo">' + selo + '</span>' +
          '<span class="node-icone">' + DATA.ICONS[c.icone] + '</span>' +
        '</span>' +
        '<span class="node-nome">' + c.titulo + '</span>' +
        '<span class="node-fase">' + c.fase + '</span>' +
        '</button>';
    }).join('');
    $('mapPath').innerHTML = html;
    $('modalMap').innerHTML = html;
  }

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

  function opcoesHTML(c) {
    const letras = ['A', 'B', 'C', 'D'];
    return c.pergunta.opcoes.map(function (o, i) {
      return '<button class="option" type="button" data-i="' + i + '">' +
        '<span class="option-letra">' + letras[i] + '</span>' +
        '<span class="option-texto">' + o.texto + '</span></button>';
    }).join('');
  }

  function blocosHTML(c) {
    return c.blocos.map(function (b) {
      return '<article class="bloco"><span class="bloco-icone">' + DATA.ICONS[b.icone] + '</span>' +
        '<div><h4>' + b.titulo + '</h4><p>' + b.texto + '</p></div></article>';
    }).join('');
  }

  function montarCapitulo(i) {
    const c = caps[i];
    jornada.className = 'jornada era-' + c.era;
    jornada.dataset.era = c.era;
    $('stageChapter').textContent = 'FASE ' + c.numero + ' / ' + String(caps.length).padStart(2, '0');
    trocarFundo(c.img);

    stageContent.innerHTML =
      '<div class="stage-grid">' +
        '<div class="stage-principal">' +
          '<p class="stage-periodo">' + c.periodo + '</p>' +
          '<h2 class="stage-titulo">' + c.titulo + '</h2>' +
          '<p class="stage-fase">' + c.fase + '</p>' +
          '<p class="stage-intro">' + c.intro + '</p>' +
          '<div class="blocos">' + blocosHTML(c) + '</div>' +
        '</div>' +
        '<aside class="stage-lateral">' +
          '<div class="nota-fala"><span class="nota-etiqueta">O fio da história</span>' +
            '<p class="nota-texto">' + c.fala + '</p></div>' +
          '<div class="curiosidade-card"><span class="curiosidade-selo">✧ ' + c.curiosidade.titulo + '</span>' +
            '<p>' + c.curiosidade.texto + '</p></div>' +
          '<div class="quiz" id="quiz">' +
            '<span class="quiz-etiqueta">✦ Hora de guardar esta lembrança</span>' +
            '<h3 class="quiz-pergunta">' + c.pergunta.enunciado + '</h3>' +
            '<div class="opcoes" role="group" aria-label="Alternativas da pergunta">' + opcoesHTML(c) + '</div>' +
            '<div class="feedback" id="feedback" role="status" aria-live="polite" hidden></div>' +
            '<div class="quiz-acoes">' +
              '<button class="btn btn-primary continuar" id="continueBtn" type="button" hidden></button>' +
              '<button class="btn btn-pular" id="skipBtn" type="button">Explorar sem responder →</button>' +
            '</div>' +
          '</div>' +
        '</aside>' +
      '</div>';

    $('continueBtn').textContent = i === caps.length - 1 ? 'Ver a comparação →' : 'Continuar a jornada →';
    $('prevBtn').disabled = i === 0;
    $('nextBtn').textContent = i === caps.length - 1 ? 'Ver comparação →' : 'Próxima fase →';

    stageContent.querySelectorAll('.option').forEach(function (btn) {
      btn.addEventListener('click', function () { responder(btn, i); });
    });
    $('continueBtn').addEventListener('click', function () {
      if (i === caps.length - 1) irPara('#comparacao'); else irParaCapitulo(i + 1);
    });
    $('skipBtn').addEventListener('click', function () {
      if (i === caps.length - 1) irPara('#comparacao'); else irParaCapitulo(i + 1);
    });

    renderizarMapas();
  }

  function renderizarCapitulo(i, animar) {
    atual = i;
    if (animar && !reduced) {
      stageContent.classList.add('is-saindo');
      window.setTimeout(function () {
        montarCapitulo(i);
        stageContent.classList.remove('is-saindo');
        stageContent.classList.add('is-entrando');
        window.setTimeout(function () { stageContent.classList.remove('is-entrando'); }, 420);
      }, 180);
    } else {
      montarCapitulo(i);
    }
  }

  function celebrar(quiz) {
    if (reduced) return;
    const caixa = document.createElement('div');
    caixa.className = 'sparkles';
    for (let i = 0; i < 12; i++) {
      const s = document.createElement('span');
      s.style.left = (6 + Math.random() * 88) + '%';
      s.style.top = (10 + Math.random() * 70) + '%';
      s.style.animationDelay = (Math.random() * 0.25) + 's';
      s.style.setProperty('--dx', ((Math.random() - 0.5) * 90) + 'px');
      caixa.appendChild(s);
    }
    quiz.appendChild(caixa);
    window.setTimeout(function () { caixa.remove(); }, 1400);
  }

  function responder(btn, indice) {
    const c = caps[indice];
    const quiz = $('quiz');
    if (!quiz || quiz.dataset.locked === 'true') return;

    const opcao = c.pergunta.opcoes[Number(btn.dataset.i)];
    const botoes = Array.prototype.slice.call(quiz.querySelectorAll('.option'));
    const feedback = $('feedback');

    if (opcao.correta) {
      quiz.dataset.locked = 'true';
      btn.classList.add('is-correta');
      botoes.forEach(function (b) { b.disabled = true; });
      feedback.hidden = false;
      feedback.className = 'feedback is-sucesso';
      feedback.innerHTML = '<span class="feedback-icone">✦</span><div><strong>' + c.recompensa + '</strong>' +
        '<p>' + c.pergunta.explicacao + '</p></div>';
      $('continueBtn').hidden = false;
      $('skipBtn').hidden = true;
      const nota = stageContent.querySelector('.nota-texto');
      if (nota) nota.textContent = c.recompensa;
      celebrar(quiz);
      marcarConcluido(c.id);
    } else {
      btn.classList.add('is-errada');
      btn.disabled = true;
      botoes.forEach(function (b, j) {
        if (c.pergunta.opcoes[j].correta) b.classList.add('is-dica');
      });
      feedback.hidden = false;
      feedback.className = 'feedback is-erro';
      feedback.innerHTML = '<span class="feedback-icone">↺</span><div><strong>Ainda não — mas é assim que se aprende.</strong>' +
        '<p>' + c.pergunta.explicacao + '</p><small>Tente outra alternativa.</small></div>';
    }
  }

  function irParaCapitulo(i) {
    if (i < 0 || i >= caps.length) return;
    renderizarCapitulo(i, true);
    irPara('#jornada');
  }

  function irPara(seletor) {
    const alvo = document.querySelector(seletor);
    if (!alvo) return;
    alvo.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }

  function abrirMapa() {
    modal.hidden = false;
    document.body.classList.add('modal-aberto');
    $('closeModalBtn').focus();
  }

  function fecharMapa() {
    modal.hidden = true;
    document.body.classList.remove('modal-aberto');
  }

  function criarParticulas() {
    if (reduced) return;
    const holder = $('particles');
    let html = '';
    for (let i = 0; i < 18; i++) {
      html += '<span style="left:' + (Math.random() * 100).toFixed(1) + '%;top:' +
        (Math.random() * 100).toFixed(1) + '%;animation-duration:' +
        (12 + Math.random() * 16).toFixed(1) + 's;animation-delay:-' +
        (Math.random() * 20).toFixed(1) + 's"></span>';
    }
    holder.innerHTML = html;
  }

  function observarNavegacao() {
    const secoes = ['prologo', 'mapa', 'jornada', 'comparacao'].map($);
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        document.querySelectorAll('.site-nav a').forEach(function (a) {
          a.classList.toggle('ativo', a.dataset.nav === e.target.id);
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    secoes.forEach(function (s) { if (s) obs.observe(s); });
  }

  function init() {
    criarParticulas();
    atualizarProgresso();
    renderizarCapitulo(0, false);
    observarNavegacao();

    $('prevBtn').addEventListener('click', function () { irParaCapitulo(atual - 1); });
    $('nextBtn').addEventListener('click', function () {
      if (atual === caps.length - 1) irPara('#comparacao'); else irParaCapitulo(atual + 1);
    });
    $('heroMapBtn').addEventListener('click', abrirMapa);
    $('openMapBtn').addEventListener('click', abrirMapa);
    $('closeModalBtn').addEventListener('click', fecharMapa);
    modal.addEventListener('click', function (e) {
      if (e.target.hasAttribute('data-close-modal')) fecharMapa();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) fecharMapa();
    });

    document.addEventListener('click', function (e) {
      const no = e.target.closest('.map-node');
      if (!no) return;
      const i = Number(no.dataset.index);
      fecharMapa();
      irParaCapitulo(i);
    });

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

    $('restartBtn').addEventListener('click', function () {
      progresso = [];
      salvarProgresso();
      atualizarProgresso();
      renderizarCapitulo(0, true);
      irPara('#jornada');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
