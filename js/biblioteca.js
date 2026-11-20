/* Biblioteca interativa — roteador e renderizador
   Camada independente da jornada “A Evolução da Memória”.
   Estrutura: categoria > tema > capítulo. O progresso salvo é apenas de leitura. */
(function () {
  'use strict';

  const RAIZ = '#/';
  const CHAVE_PROGRESSO = 'biblioteca-progresso-leitura-v1';
  const TITULO_ORIGINAL = document.title;
  const COLECOES = (Array.isArray(window.BIBLIOTECA_COLECOES) && window.BIBLIOTECA_COLECOES.length)
    ? window.BIBLIOTECA_COLECOES
    : (window.BIBLIOTECA_DATA ? [window.BIBLIOTECA_DATA] : []);
  const ATLAS = Array.isArray(window.ATLAS_UNIVERSOS) ? window.ATLAS_UNIVERSOS : [];
  const LETRAS = ['A', 'B', 'C', 'D'];
  const ERAS = {
    pedra: 'Pedra e fogo',
    papel: 'Registro e cálculo',
    mecanica: 'Máquinas mecânicas',
    eletronica: 'Eletrônica',
    digital: 'Era digital',
    futuro: 'Futuro'
  };

  const $ = function (id) { return document.getElementById(id); };
  const esc = function (valor) {
    return String(valor == null ? '' : valor).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  const dois = function (n) { return String(n).padStart(2, '0'); };
  const decoded = function (valor) {
    try { return decodeURIComponent(valor); } catch (e) { return valor; }
  };

  let main = null;
  let biblioteca = null;
  let secoesOrigem = [];
  let estadosOcultacao = [];
  let progresso = carregarProgresso();
  let rotaAtual = '';
  let primeiraRenderizacao = true;
  let perguntaAtual = null;
  let leituraAtiva = false;
  let quadroLeitura = 0;

  /* ---------------- Progresso neutro de leitura ---------------- */

  function carregarProgresso() {
    try {
      const bruto = localStorage.getItem(CHAVE_PROGRESSO);
      const dados = bruto ? JSON.parse(bruto) : null;
      return dados && typeof dados === 'object' && !Array.isArray(dados) ? dados : {};
    } catch (e) {
      return {};
    }
  }

  function salvarProgresso() {
    try { localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(progresso)); } catch (e) { /* segue em memória */ }
  }

  function visitados(categoriaId, temaId) {
    if (!progresso[categoriaId] || !Array.isArray(progresso[categoriaId][temaId])) return [];
    return progresso[categoriaId][temaId];
  }

  function jaVisitado(categoriaId, temaId, capituloId) {
    return visitados(categoriaId, temaId).indexOf(String(capituloId)) !== -1;
  }

  function registrarVisita(categoriaId, temaId, capituloId) {
    if (!progresso[categoriaId]) progresso[categoriaId] = {};
    if (!Array.isArray(progresso[categoriaId][temaId])) progresso[categoriaId][temaId] = [];
    const lista = progresso[categoriaId][temaId];
    const id = String(capituloId);
    if (lista.indexOf(id) === -1) {
      lista.push(id);
      salvarProgresso();
      if (window.dispatchEvent && typeof CustomEvent === 'function') {
        window.dispatchEvent(new CustomEvent('memoria:progresso', {
          detail: { origem: 'biblioteca', tipo: 'visita', colecao: categoriaId, tema: temaId, capitulo: capituloId }
        }));
      }
    }
  }

  /* ---------------- Roteamento ---------------- */

  function partiesDaRota() {
    const bruto = (location.hash || '').replace(/^#\/?/, '');
    return bruto.split('/').filter(Boolean).map(decoded);
  }

  function colecaoPorId(id) {
    return COLECOES.find(function (c) { return c.id === id; }) || null;
  }

  function universoPorId(id) {
    return ATLAS.find(function (u) { return u.id === id; }) || null;
  }

  function assuntoPorId(universo, id) {
    return (universo.assuntos || []).find(function (a) { return a.id === id; }) || null;
  }

  function temaPorId(colecao, id) {
    return (colecao.temas || []).find(function (t) { return t.id === id; }) || null;
  }

  function capituloPorId(tema, id) {
    return (tema.capitulos || []).find(function (c) { return String(c.id) === String(id); }) || null;
  }

  function redirecionar(hash) {
    if (window.history && history.replaceState) history.replaceState(null, '', hash);
    else location.hash = hash;
    processarRota();
  }

  function aplicarModoBiblioteca(ativo, atlas) {
    document.body.classList.toggle('biblioteca-ativa', ativo);
    document.body.classList.toggle('atlas-ativa', Boolean(ativo && atlas));
    biblioteca.hidden = !ativo;
    secoesOrigem.forEach(function (secao, i) {
      secao.hidden = ativo ? true : estadosOcultacao[i];
    });

    document.querySelectorAll('.site-nav a').forEach(function (link) {
      if (link.classList.contains('nav-biblioteca')) link.classList.toggle('ativo', ativo);
      else if (ativo) link.classList.remove('ativo');
    });

    if (ativo) {
      const cabecalho = $('siteHeader');
      const menu = $('menuToggle');
      if (cabecalho) cabecalho.classList.remove('menu-aberto');
      if (menu) {
        menu.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-label', 'Abrir menu');
      }
    }
  }

  function finalizarRenderizacao() {
    rotaAtual = location.hash || '';
    const titulo = biblioteca.querySelector('.bib-view h1');
    document.title = titulo
      ? titulo.textContent + ' — Biblioteca'
      : TITULO_ORIGINAL;
    if (!primeiraRenderizacao) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      if (titulo) {
        titulo.setAttribute('tabindex', '-1');
        titulo.focus({ preventScroll: true });
      }
    }
    primeiraRenderizacao = false;

    /* A rota resolvida também chega à camada de medalhas quando há redirecionamento. */
    if (window.dispatchEvent && typeof CustomEvent === 'function') {
      const partes = partiesDaRota();
      const colecao = partes.length ? colecaoPorId(partes[0]) : null;
      let universoId = null;
      if (colecao) {
        const correspondente = ATLAS.find(function (u) {
          return u.id === colecao.id || u.rota === RAIZ + colecao.id;
        });
        universoId = correspondente ? correspondente.id : null;
      } else if (partes[0] && universoPorId(partes[0])) {
        universoId = partes[0];
      }
      window.dispatchEvent(new CustomEvent('memoria:rota', {
        detail: { universo: universoId, rota: location.hash || '' }
      }));
    }

    atualizarBarraLeitura();
  }

  function processarRota() {
    const partes = partiesDaRota();
    const colecao = partes.length ? colecaoPorId(partes[0]) : null;

    if (!colecao) {
      /* Seletor dos cinco universos. */
      if (partes[0] === 'bibliotecas') {
        if (partes.length > 1) {
          redirecionar(RAIZ + 'bibliotecas');
          return;
        }
        aplicarModoBiblioteca(true, true);
        perguntaAtual = null;
        leituraAtiva = false;
        renderizarSeletor();
        finalizarRenderizacao();
        return;
      }

      /* Universos novos: páginas de assuntos, sem conteúdo inventado. */
      const universo = partes.length ? universoPorId(partes[0]) : null;
      if (universo) {
        aplicarModoBiblioteca(true, true);
        perguntaAtual = null;
        leituraAtiva = false;
        if (partes.length === 1) {
          renderizarUniverso(universo);
        } else {
          const assunto = assuntoPorId(universo, partes[1]);
          if (!assunto) {
            redirecionar(RAIZ + universo.id);
            return;
          }
          if (partes.length === 2) renderizarAssunto(universo, assunto);
          else redirecionar(RAIZ + universo.id + '/' + assunto.id);
        }
        finalizarRenderizacao();
        return;
      }

      if (rotaAtual) {
        aplicarModoBiblioteca(false);
        rotaAtual = '';
        document.title = TITULO_ORIGINAL;
        /* As seções originais eram display:none durante a navegação; só agora
           o alvo da âncora existe para receber o scroll. */
        const alvo = (location.hash || '').replace(/^#/, '');
        if (alvo) {
          window.requestAnimationFrame(function () {
            const secaoAlvo = document.getElementById(alvo);
            if (secaoAlvo) secaoAlvo.scrollIntoView({ block: 'start' });
          });
        }
      }
      perguntaAtual = null;
      leituraAtiva = false;
      return;
    }

    aplicarModoBiblioteca(true);
    perguntaAtual = null;
    leituraAtiva = false;

    if (partes.length === 1) {
      renderizarCategoria(colecao);
    } else {
      const tema = temaPorId(colecao, partes[1]);
      if (!tema) {
        redirecionar(RAIZ + colecao.id);
        return;
      }
      if (partes.length === 2) {
        renderizarTema(colecao, tema);
      } else {
        const capitulo = capituloPorId(tema, partes[2]);
        if (!capitulo) {
          redirecionar(RAIZ + colecao.id + '/' + tema.id);
          return;
        }
        renderizarCapitulo(colecao, tema, capitulo);
      }
    }
    finalizarRenderizacao();
  }

  /* ---------------- Peças de interface ---------------- */

  function trilha(colecao, tema, capitulo) {
    const itens = [
      { href: RAIZ + 'bibliotecas', texto: 'Todas as bibliotecas' },
      { href: '#inicio', texto: 'Biblioteca principal' },
      { href: RAIZ + colecao.id, texto: colecao.titulo, atual: !tema }
    ];
    if (tema) {
      itens.push({
        href: RAIZ + colecao.id + '/' + tema.id,
        texto: tema.titulo,
        atual: !capitulo
      });
    }
    if (capitulo) {
      itens.push({ texto: 'Capítulo ' + capitulo.numero, atual: true });
    }
    return '<nav class="bib-trilha" aria-label="Onde você está">' +
      '<ol>' + itens.map(function (item) {
        const conteudo = item.atual
          ? '<span aria-current="page">' + esc(item.texto) + '</span>'
          : '<a href="' + esc(item.href) + '">' + esc(item.texto) + '</a>';
        return '<li>' + conteudo + '</li>';
      }).join('') + '</ol></nav>';
  }

  function Progresso(colecao, tema) {
    const total = (tema.capitulos || []).length;
    const feitos = visitados(colecao.id, tema.id).length;
    const pct = total ? Math.round((feitos / total) * 100) : 0;
    return { total: total, feitos: feitos, pct: pct };
  }

  /* ---------------- Camada do atlas: capa, universos e assuntos ---------------- */

  function trilhaAtlas(universo, assunto) {
    const itens = [
      { href: RAIZ + 'bibliotecas', texto: 'Todas as bibliotecas' },
      { href: RAIZ + universo.id, texto: universo.titulo, atual: !assunto }
    ];
    if (assunto) itens.push({ texto: assunto.titulo, atual: true });
    return '<nav class="bib-trilha" aria-label="Onde você está">' +
      '<ol>' + itens.map(function (item) {
        const conteudo = item.atual
          ? '<span aria-current="page">' + esc(item.texto) + '</span>'
          : '<a href="' + esc(item.href) + '">' + esc(item.texto) + '</a>';
        return '<li>' + conteudo + '</li>';
      }).join('') + '</ol></nav>';
  }

  function statusDoUniverso(universo) {
    return universo.status === 'disponivel' ? 'Aberto para leitura' : 'Em preparação';
  }

  function renderizarSeletor() {
    const cartoes = ATLAS.map(function (universo) {
      return '' +
        '<a class="atlas-card atlas-card--' + esc(universo.cor) + '" ' +
        'href="' + esc(universo.rota || RAIZ + universo.id) + '">' +
        '<span class="atlas-card-imagem"><img src="' + esc(universo.imagem) +
        '" alt="" loading="lazy"></span>' +
        '<span class="atlas-card-corpo">' +
        '<span class="atlas-card-simbolo" aria-hidden="true">' + esc(universo.simbolo) + '</span>' +
        '<span class="atlas-card-kicker">' + esc(universo.kicker) + '</span>' +
        '<span class="atlas-card-titulo">' + esc(universo.titulo) + '</span>' +
        '<span class="atlas-card-descricao">' + esc(universo.descricao) + '</span>' +
        '<span class="atlas-card-rodape">' +
        '<span class="atlas-card-status">' + esc(statusDoUniverso(universo)) + '</span>' +
        '<span class="atlas-card-cta">Entrar <span aria-hidden="true">↗</span></span>' +
        '</span></span></a>';
    }).join('');

    biblioteca.innerHTML =
      '<nav class="bib-trilha" aria-label="Onde você está"><ol><li>' +
      '<span aria-current="page">Todas as bibliotecas</span></li></ol></nav>' +
      '<div class="bib-view atlas-view atlas-seletor">' +
      '<header class="atlas-intro">' +
      '<p class="bib-kicker">O atlas dos conhecimentos</p>' +
      '<h1>Escolha seu universo</h1>' +
      '<p class="bib-lead">Cinco bibliotecas, cada uma com sua própria atmosfera. Entre em qualquer uma, volte quando quiser e mude de caminho sem seguir uma ordem.</p>' +
      '</header>' +
      '<section class="atlas-grade" aria-label="Bibliotecas do atlas">' + cartoes + '</section>' +
      '<div class="bib-retorno-geral">' +
      '<a class="bib-btn bib-btn-quiet" href="#capa">← Voltar à capa</a>' +
      '</div></div>';
  }

  function renderizarUniverso(universo) {
    const emPreparacao = universo.status !== 'disponivel';
    const cartoes = (universo.assuntos || []).map(function (assunto, i) {
      return '' +
        '<a class="atlas-assunto-card atlas-assunto--' + esc(assunto.id) + '" ' +
        'href="' + esc(RAIZ + universo.id + '/' + assunto.id) + '">' +
        '<span class="atlas-assunto-simbolo" aria-hidden="true">' + esc(assunto.simbolo) + '</span>' +
        '<span class="atlas-assunto-numero">' + dois(i + 1) + '</span>' +
        '<span class="atlas-assunto-titulo">' + esc(assunto.titulo) + '</span>' +
        '<span class="atlas-assunto-descricao">' + esc(assunto.descricao) + '</span>' +
        '<span class="atlas-assunto-cta">Explorar assunto <span aria-hidden="true">↗</span></span>' +
        '</a>';
    }).join('');

    biblioteca.innerHTML = trilhaAtlas(universo) +
      '<div class="bib-view atlas-view atlas-universo atlas-universo--' + esc(universo.cor) + '">' +
      '<header class="atlas-universo-hero">' +
      '<div class="atlas-universo-copy">' +
      '<p class="bib-kicker">' + esc(universo.kicker) + '</p>' +
      '<h1>' + esc(universo.titulo) + '</h1>' +
      '<p class="bib-lead">' + esc(universo.intro) + '</p>' +
      '<p class="atlas-universo-descricao">' + esc(universo.descricao) + '</p>' +
      '<span class="atlas-selo">' + esc(statusDoUniverso(universo)) + '</span>' +
      '</div>' +
      '<figure class="atlas-universo-arte">' +
      '<img src="' + esc(universo.imagem) + '" alt="Ambientação ilustrada de ' + esc(universo.titulo) + '">' +
      '</figure></header>' +
      '<section class="atlas-assuntos" aria-labelledby="atlasAssuntosTitulo">' +
      '<div class="bib-secao-titulo">' +
      '<p class="bib-kicker">Escolha um caminho</p>' +
      '<h2 id="atlasAssuntosTitulo">Assuntos deste universo</h2>' +
      '<p>' + (emPreparacao
        ? 'Os assuntos já estão organizados. Os textos, ilustrações e atividades de leitura estão sendo preparados — você pode voltar e explorar outro universo a qualquer momento.'
        : 'Cada assunto abre um roteiro de capítulos com ilustrações e verificação de leitura.') + '</p>' +
      '</div>' +
      '<div class="atlas-assuntos-grid">' + cartoes + '</div></section>' +
      '<div class="bib-retorno-geral">' +
      '<a class="bib-btn bib-btn-quiet" href="' + esc(RAIZ + 'bibliotecas') + '">← Todas as bibliotecas</a>' +
      '<a class="bib-btn bib-btn-quiet" href="#capa">Voltar à capa</a>' +
      '</div></div>';
  }

  function renderizarAssunto(universo, assunto) {
    biblioteca.innerHTML = trilhaAtlas(universo, assunto) +
      '<div class="bib-view atlas-view atlas-assunto atlas-universo--' + esc(universo.cor) + '">' +
      '<header class="atlas-assunto-hero">' +
      '<span class="atlas-assunto-simbolo-grande" aria-hidden="true">' + esc(assunto.simbolo) + '</span>' +
      '<p class="bib-kicker">' + esc(universo.titulo) + ' · assunto ' + esc(assunto.titulo) + '</p>' +
      '<h1>' + esc(assunto.titulo) + '</h1>' +
      '<p class="bib-lead">' + esc(assunto.descricao) + '</p>' +
      '</header>' +
      '<section class="atlas-preparacao" aria-labelledby="atlasPreparacaoTitulo">' +
      '<div class="atlas-preparacao-arte" aria-hidden="true"><img src="' + esc(universo.imagem) + '" alt=""></div>' +
      '<div class="atlas-preparacao-copy">' +
      '<p class="bib-kicker">Caminho em preparação</p>' +
      '<h2 id="atlasPreparacaoTitulo">Este assunto ainda vai ganhar sua leitura</h2>' +
      '<p>A estrutura de navegação já está pronta. Os capítulos, as ilustrações e os recursos interativos deste assunto serão acrescentados em seguida — sem pressa e sem conteúdo improvisado.</p>' +
      '</div></section>' +
      '<div class="bib-retorno-geral">' +
      '<a class="bib-btn bib-btn-quiet" href="' + esc(RAIZ + universo.id) + '">← Voltar a ' + esc(universo.titulo) + '</a>' +
      '<a class="bib-btn bib-btn-quiet" href="' + esc(RAIZ + 'bibliotecas') + '">Todas as bibliotecas</a>' +
      '<a class="bib-btn bib-btn-quiet" href="#capa">Voltar à capa</a>' +
      '</div></div>';
  }

  function renderizarCategoria(colecao) {
    const temas = colecao.temas || [];
    const totalCapitulos = temas.reduce(function (soma, tema) {
      return soma + (tema.capitulos || []).length;
    }, 0);

    const cartoes = temas.map(function (tema) {
      const p = Progresso(colecao, tema);
      return '' +
        '<a class="bib-tema-card bib-tema--' + esc(tema.cor || tema.id) + '" ' +
        'href="' + esc(RAIZ + colecao.id + '/' + tema.id) + '">' +
        '<span class="bib-tema-numero">' + esc(tema.numero) + '</span>' +
        '<span class="bib-tema-imagem"><img src="' + esc(tema.imagem) + '" alt="Ilustração do tema ' + esc(tema.titulo) + '" loading="lazy"></span>' +
        '<span class="bib-tema-corpo">' +
        '<span class="bib-tema-sub">' + esc(tema.subtitulo) + '</span>' +
        '<span class="bib-tema-titulo">' + esc(tema.titulo) + '</span>' +
        '<span class="bib-tema-resumo">' + esc(tema.resumo) + '</span>' +
        '<span class="bib-tema-rodape">' +
        '<span class="bib-tema-duracao">' + esc(tema.duracao) + ' · ' + p.feitos + '/' + p.total + ' visitados</span>' +
        '<span class="bib-explorar">Explorar tema <span aria-hidden="true">↗</span></span>' +
        '</span>' +
        '</span>' +
        '</a>';
    }).join('');

    biblioteca.innerHTML = trilha(colecao) +
      '<div class="bib-view bib-categoria" data-colecao="' + esc(colecao.id) + '">' +
      '<header class="bib-category-hero">' +
      '<div class="bib-hero-copy">' +
      '<p class="bib-kicker">' + esc(colecao.kicker) + '</p>' +
      '<h1>' + esc(colecao.titulo) + '</h1>' +
      '<p class="bib-lead">' + esc(colecao.intro) + '</p>' +
      '<p class="bib-hero-descricao">' + esc(colecao.descricao) + '</p>' +
      '<div class="bib-hero-fatos">' +
      '<span>' + temas.length + ' temas</span><span>' + totalCapitulos + ' capítulos</span><span>ilustrações autorais</span>' +
      '</div>' +
      '</div>' +
      '<figure class="bib-hero-arte">' +
      '<img src="' + esc(colecao.imagem) + '" alt="Universo tecnológico com portais de redes, linha do tempo e engenharia robótica">' +
      '</figure>' +
      '</header>' +
      '<section class="bib-secao-temas" aria-labelledby="bibTemasTitulo">' +
      '<div class="bib-secao-titulo">' +
      '<p class="bib-kicker">Escolha um caminho</p>' +
      '<h2 id="bibTemasTitulo">Três formas de explorar o futuro</h2>' +
      '<p>Cada tema tem ambientação, capítulos e uma pergunta de revisão ao final da leitura.</p>' +
      '</div>' +
      '<div class="bib-tema-grid">' + cartoes + '</div>' +
      '</section>' +
      '<div class="bib-retorno-geral">' +
      '<a class="bib-btn bib-btn-quiet" href="#inicio">← Voltar à biblioteca principal</a>' +
      '</div>' +
      '</div>';
  }

  function eraDe(capitulo) {
    return capitulo.era ? (ERAS[capitulo.era] || capitulo.era) : null;
  }

  function renderizarTema(colecao, tema) {
    const caps = tema.capitulos || [];
    const p = Progresso(colecao, tema);

    const cartoes = caps.map(function (cap) {
      const vista = jaVisitado(colecao.id, tema.id, cap.id);
      const era = eraDe(cap);
      return '' +
        '<a class="bib-cap-card' + (vista ? ' is-visitado' : '') + '" ' +
        'href="' + esc(RAIZ + colecao.id + '/' + tema.id + '/' + cap.id) + '"' +
        (cap.era ? ' data-era="' + esc(cap.era) + '"' : '') + '>' +
        '<span class="bib-cap-numero">' + dois(cap.numero) + '</span>' +
        '<span class="bib-cap-conteudo">' +
        '<span class="bib-cap-kicker">' + esc(era ? era : 'Capítulo ' + cap.numero) + '</span>' +
        '<span class="bib-cap-titulo">' + esc(cap.titulo) + '</span>' +
        '<span class="bib-cap-intro">' + esc(cap.intro) + '</span>' +
        '<span class="bib-cap-cta">' + (vista ? 'Revisar capítulo' : 'Ler capítulo') + ' <span aria-hidden="true">→</span></span>' +
        '</span>' +
        '</a>';
    }).join('');

    biblioteca.innerHTML = trilha(colecao, tema) +
      '<div class="bib-view bib-tema bib-tema--' + esc(tema.cor || tema.id) + '" ' +
      'data-colecao="' + esc(colecao.id) + '" data-tema="' + esc(tema.id) + '">' +
      '<header class="bib-tema-hero">' +
      '<div class="bib-tema-hero-copy">' +
      '<p class="bib-kicker">Tema ' + esc(tema.numero) + ' · ' + esc(tema.duracao) + '</p>' +
      '<h1>' + esc(tema.titulo) + '</h1>' +
      '<p class="bib-tema-subtitulo-grande">' + esc(tema.subtitulo) + '</p>' +
      '<p class="bib-lead">' + esc(tema.intro) + '</p>' +
      '<div class="bib-progresso-leve">' +
      '<span>' + p.feitos + ' de ' + p.total + ' capítulos visitados</span>' +
      '<span class="bib-track"><span style="width:' + p.pct + '%"></span></span>' +
      '</div>' +
      '</div>' +
      '<figure class="bib-tema-hero-arte">' +
      '<img src="' + esc(tema.imagem) + '" alt="Ambientação ilustrada de ' + esc(tema.titulo) + '">' +
      '</figure>' +
      '</header>' +
      '<section class="bib-capitulos ' + (tema.id === 'evolucao' ? 'bib-capitulos-linha' : '') + '" ' +
      'aria-labelledby="bibCapitulosTitulo">' +
      '<div class="bib-secao-titulo">' +
      '<p class="bib-kicker">Roteiro de leitura</p>' +
      '<h2 id="bibCapitulosTitulo">Capítulos disponíveis</h2>' +
      '<p>Você pode começar pelo primeiro capítulo ou escolher outro ponto do tema.</p>' +
      '</div>' +
      '<div class="bib-cap-grid">' + cartoes + '</div>' +
      '</section>' +
      '<div class="bib-retorno-geral">' +
      '<a class="bib-btn bib-btn-quiet" href="' + esc(RAIZ + colecao.id) + '">← Todas as coleções</a>' +
      '<a class="bib-btn bib-btn-quiet" href="#inicio">Biblioteca principal</a>' +
      '</div>' +
      '</div>';
  }

  function linhaDeCapitulos(colecao, tema, atual) {
    const caps = tema.capitulos || [];
    return '<ol class="bib-linha-capitulos" aria-label="Capítulos do tema">' +
      caps.map(function (cap) {
        const estado = cap === atual ? ' is-atual' : (jaVisitado(colecao.id, tema.id, cap.id) ? ' is-visitado' : '');
        const era = eraDe(cap);
        return '<li class="' + estado.trim() + '"' +
          (cap.era ? ' data-era="' + esc(cap.era) + '" data-era-label="' + esc(era) + '"' : '') + '>' +
          '<a href="' + esc(RAIZ + colecao.id + '/' + tema.id + '/' + cap.id) + '"' +
          (cap === atual ? ' aria-current="step"' : '') +
          ' aria-label="Capítulo ' + cap.numero + ': ' + esc(cap.titulo) + '">' + dois(cap.numero) + '</a>' +
          '</li>';
      }).join('') + '</ol>';
  }

  function blocoDeTexto(bloco, indice) {
    return '<article class="bib-bloco">' +
      '<span class="bib-bloco-marcador" aria-hidden="true">' + dois(indice + 1) + '</span>' +
      '<div><h3>' + esc(bloco.titulo) + '</h3><p>' + esc(bloco.texto) + '</p></div>' +
      '</article>';
  }

  function blocoComponentes(capitulo) {
    if (!Array.isArray(capitulo.componentes) || !capitulo.componentes.length) return '';
    return '<section class="bib-painel bib-componentes" aria-labelledby="bibComponentesTitulo">' +
      '<p class="bib-kicker">Mapa da ilustração</p>' +
      '<h2 id="bibComponentesTitulo">Peças e funções</h2>' +
      '<ol>' + capitulo.componentes.map(function (item) {
        return '<li><span class="bib-componente-numero">' + item.numero + '</span>' +
          '<span><b>' + esc(item.nome) + '</b> — ' + esc(item.funcao) + '</span></li>';
      }).join('') + '</ol>' +
      '</section>';
  }

  function blocoDiagrama(capitulo) {
    if (!capitulo.diagrama) return '';
    return '<figure class="bib-diagrama">' +
      '<img src="' + esc(capitulo.diagrama) + '" alt="Diagrama de apoio: ' + esc(capitulo.titulo) + '" loading="lazy">' +
      '<figcaption>Diagrama de apoio — observe as partes e as ligações antes de continuar.</figcaption>' +
      '</figure>';
  }

  function blocoVocabulario(capitulo) {
    if (!Array.isArray(capitulo.vocabulario) || !capitulo.vocabulario.length) return '';
    return '<section class="bib-painel bib-vocabulario" aria-labelledby="bibVocabularioTitulo">' +
      '<p class="bib-kicker">Palavras do capítulo</p>' +
      '<h2 id="bibVocabularioTitulo">Vocabulário</h2>' +
      '<dl>' + capitulo.vocabulario.map(function (item) {
        return '<dt>' + esc(item.termo) + '</dt><dd>' + esc(item.definicao) + '</dd>';
      }).join('') + '</dl>' +
      '</section>';
  }

  function blocoPergunta(pergunta) {
    if (!pergunta || !Array.isArray(pergunta.opcoes)) return '';
    const opcoes = pergunta.opcoes.map(function (opcao, i) {
      return '<button class="bib-opcao" type="button" data-bib-acao="responder" data-indice="' + i + '" aria-pressed="false">' +
        '<span class="bib-opcao-letra">' + LETRAS[i] + '</span>' +
        '<span>' + esc(opcao.texto) + '</span>' +
        '</button>';
    }).join('');
    return '<section class="bib-pergunta" aria-labelledby="bibPerguntaTitulo">' +
      '<p class="bib-kicker">Verificação de leitura</p>' +
      '<h2 id="bibPerguntaTitulo">' + esc(pergunta.enunciado) + '</h2>' +
      '<p class="bib-pergunta-ajuda">Escolha uma alternativa. A explicação aparece em seguida — sem pressa e sem pontuação.</p>' +
      '<div class="bib-opcoes" role="group" aria-label="Alternativas da pergunta">' + opcoes + '</div>' +
      '<div class="bib-feedback" hidden></div>' +
      '<p class="bib-feedback-sr sr-only" role="status" aria-live="polite"></p>' +
      '</section>';
  }

  function navegacaoCapitulo(colecao, tema, capitulo, indice) {
    const caps = tema.capitulos || [];
    const anterior = caps[indice - 1];
    const proximo = caps[indice + 1];
    const base = RAIZ + colecao.id + '/' + tema.id;
    const anteriorHtml = anterior
      ? '<a class="bib-btn bib-btn-quiet" href="' + esc(base + '/' + anterior.id) + '">← Capítulo anterior</a>'
      : '<span class="bib-btn is-bloqueado" aria-disabled="true">← Capítulo anterior</span>';
    const proximoHtml = proximo
      ? '<a class="bib-btn bib-btn-principal" href="' + esc(base + '/' + proximo.id) + '">Próximo capítulo →</a>'
      : '<span class="bib-btn is-bloqueado" aria-disabled="true">Você chegou ao último capítulo</span>';
    const retornoFinal = proximo
      ? ''
      : '<a class="bib-btn bib-btn-principal" href="' + esc(base) + '">Voltar ao tema →</a>';
    return '<nav class="bib-nav-capitulo" aria-label="Navegação entre capítulos">' +
      anteriorHtml +
      '<a class="bib-btn bib-btn-quiet" href="' + esc(base) + '">Índice do tema</a>' +
      proximoHtml + retornoFinal +
      '</nav>';
  }

  function renderizarCapitulo(colecao, tema, capitulo) {
    registrarVisita(colecao.id, tema.id, capitulo.id);
    const caps = tema.capitulos || [];
    const indice = caps.indexOf(capitulo);
    const p = Progresso(colecao, tema);
    perguntaAtual = capitulo.pergunta || null;
    leituraAtiva = true;

    const blocos = (capitulo.blocos || []).map(blocoDeTexto).join('');
    const era = eraDe(capitulo);

    biblioteca.innerHTML = trilha(colecao, tema, capitulo) +
      '<div class="bib-view bib-capitulo bib-tema--' + esc(tema.cor || tema.id) + '" ' +
      'data-colecao="' + esc(colecao.id) + '" data-tema="' + esc(tema.id) + '" ' +
      'data-capitulo="' + esc(capitulo.id) + '"' +
      (capitulo.era ? ' data-era="' + esc(capitulo.era) + '"' : '') + '>' +
      '<div class="bib-leitura-rail" aria-hidden="true"><span id="bibBarraLeitura"></span></div>' +
      '<header class="bib-cap-header">' +
      '<p class="bib-kicker">' + esc(tema.titulo) + ' · Capítulo ' + capitulo.numero + ' de ' + caps.length + '</p>' +
      '<h1>' + esc(capitulo.titulo) + '</h1>' +
      '<p class="bib-lead">' + esc(capitulo.intro) + '</p>' +
      linhaDeCapitulos(colecao, tema, capitulo) +
      '<p class="bib-cap-progresso">Leitura: ' + p.feitos + ' de ' + p.total + ' capítulos visitados neste tema' +
      (era ? ' · ' + esc(era) : '') + '</p>' +
      '</header>' +
      '<figure class="bib-cap-imagem">' +
      '<img src="' + esc(capitulo.imagem) + '" alt="Ilustração do capítulo: ' + esc(capitulo.titulo) + '">' +
      '<figcaption>' + esc(tema.titulo) + ' · representação visual do capítulo</figcaption>' +
      '</figure>' +
      '<div class="bib-cap-layout">' +
      '<div class="bib-conteudo-principal">' +
      '<section class="bib-blocos" aria-label="Tópicos do capítulo">' + blocos + '</section>' +
      blocoComponentes(capitulo) +
      blocoDiagrama(capitulo) +
      (capitulo.destaque ? '<aside class="bib-destaque"><p class="bib-kicker">' + esc(capitulo.destaque.titulo) + '</p><p>' + esc(capitulo.destaque.texto) + '</p></aside>' : '') +
      (capitulo.curiosidade ? '<aside class="bib-curiosidade"><p class="bib-kicker">' + esc(capitulo.curiosidade.titulo) + '</p><p>' + esc(capitulo.curiosidade.texto) + '</p></aside>' : '') +
      blocoVocabulario(capitulo) +
      blocoPergunta(capitulo.pergunta) +
      navegacaoCapitulo(colecao, tema, capitulo, indice) +
      '</div>' +
      '<aside class="bib-lateral" aria-label="Resumo do capítulo">' +
      '<div class="bib-lateral-cartao">' +
      '<p class="bib-kicker">Neste capítulo</p>' +
      '<ol>' + (capitulo.blocos || []).map(function (b) { return '<li>' + esc(b.titulo) + '</li>'; }).join('') + '</ol>' +
      '<a href="' + esc(RAIZ + colecao.id + '/' + tema.id) + '">Ver índice do tema <span aria-hidden="true">↗</span></a>' +
      '</div>' +
      '</aside>' +
      '</div>' +
      '</div>';
  }

  /* ---------------- Interação da pergunta ---------------- */

  function responder(botao) {
    const grupo = botao.closest('.bib-pergunta');
    if (!grupo || grupo.dataset.respondido === 'true' || !perguntaAtual) return;

    const indice = Number(botao.dataset.indice);
    const escolhida = perguntaAtual.opcoes[indice];
    if (!escolhida) return;
    const correta = perguntaAtual.opcoes.find(function (o) { return o.correta; }) || escolhida;

    grupo.dataset.respondido = 'true';
    grupo.querySelectorAll('.bib-opcao').forEach(function (item, i) {
      item.disabled = true;
      item.setAttribute('aria-pressed', 'false');
      if (i === indice) item.classList.add(escolhida.correta ? 'is-correta' : 'is-incorreta');
      if (perguntaAtual.opcoes[i].correta) item.classList.add('is-resposta');
    });

    const titulo = escolhida.correta
      ? 'Correto.'
      : 'Ainda não — e tudo bem.';
    const explicacao = escolhida.correta ? escolhida.porque : correta.porque;
    const observacao = escolhida.correta ? '' :
      '<p><em>Sua escolha:</em> ' + esc(escolhida.texto) + '. ' + esc(escolhida.porque) + '</p>';

    const feedback = grupo.querySelector('.bib-feedback');
    feedback.className = 'bib-feedback ' + (escolhida.correta ? 'is-correta' : 'is-revisao');
    feedback.innerHTML = '<p class="bib-feedback-titulo">' + titulo + '</p>' +
      '<p><b>Resposta correta:</b> ' + esc(correta.texto) + '</p>' +
      '<p>' + esc(explicacao) + '</p>' + observacao;
    feedback.hidden = false;
    feedback.setAttribute('tabindex', '-1');

    const sr = grupo.querySelector('.bib-feedback-sr');
    if (sr) sr.textContent = titulo + ' Resposta correta: ' + correta.texto + ' ' + explicacao;

    const vista = biblioteca.querySelector('.bib-view');
    if (window.dispatchEvent && typeof CustomEvent === 'function') {
      window.dispatchEvent(new CustomEvent('memoria:progresso', {
        detail: {
          origem: 'biblioteca',
          tipo: 'avaliacao',
          colecao: vista ? vista.dataset.colecao : null,
          tema: vista ? vista.dataset.tema : null,
          capitulo: vista ? vista.dataset.capitulo : null,
          correta: escolhida.correta
        }
      }));
    }

    try { feedback.focus({ preventScroll: true }); } catch (e) { feedback.focus(); }
  }

  /* ---------------- Indicador de leitura da página ---------------- */

  function atualizarBarraLeitura() {
    quadroLeitura = 0;
    const barra = $('bibBarraLeitura');
    if (!barra || !leituraAtiva || biblioteca.hidden) return;
    const artigo = biblioteca.querySelector('.bib-capitulo');
    if (!artigo) return;
    const rect = artigo.getBoundingClientRect();
    const distancia = rect.height - window.innerHeight;
    const pct = distancia <= 0 ? 100 : Math.max(0, Math.min(100, (-rect.top / distancia) * 100));
    barra.style.width = pct.toFixed(1) + '%';
  }

  function agendarLeitura() {
    if (!leituraAtiva || biblioteca.hidden || quadroLeitura) return;
    quadroLeitura = window.requestAnimationFrame(atualizarBarraLeitura);
  }

  /* ---------------- Inicialização ---------------- */

  function init() {
    if (!COLECOES.length) return;
    main = $('conteudo');
    biblioteca = $('biblioteca');
    if (!main || !biblioteca) return;

    secoesOrigem = Array.from(main.children).filter(function (no) { return no !== biblioteca; });
    estadosOcultacao = secoesOrigem.map(function (no) { return no.hidden; });

    biblioteca.addEventListener('click', function (evento) {
      const link = evento.target.closest('a[href^="#/"]');
      if (link) {
        const cabecalho = $('siteHeader');
        const menu = $('menuToggle');
        if (cabecalho) cabecalho.classList.remove('menu-aberto');
        if (menu) {
          menu.setAttribute('aria-expanded', 'false');
          menu.setAttribute('aria-label', 'Abrir menu');
        }
      }
      const alvo = evento.target.closest('[data-bib-acao]');
      if (alvo && alvo.dataset.bibAcao === 'responder') responder(alvo);
    });

    window.addEventListener('hashchange', processarRota);
    window.addEventListener('scroll', agendarLeitura, { passive: true });
    window.addEventListener('resize', agendarLeitura);
    processarRota();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
