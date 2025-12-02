(function () {
  const tarefas = document.querySelectorAll('.cartao-tarefa');

  let inicioX = 0;
  let atualX = 0;
  let arrastando = false;
  let tarefaAtiva = null;
  let usandoMouse = false;
  let movimentoDetectado = false;


  const limiteAbertura = 60;
  const limiteSwipe = 8;

  // ============================================================
  // FUNÇÕES COMPARTILHADAS (tanto para mouse quanto touch)
  // ============================================================
  function impedirClick(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
  }
  function iniciarArrasto(x, elementoLink) {
    inicioX = x;
    atualX = x;
    arrastando = true;
    tarefaAtiva = elementoLink.closest('.cartao-tarefa');

    document.querySelectorAll('.cartao-tarefa.mostrar-acoes').forEach(t => {
      if (t !== tarefaAtiva) t.classList.remove('mostrar-acoes');
    });
  }

  function moverArrasto(x, e) {
    if (!arrastando || !tarefaAtiva) return;

    movimentoDetectado = true; // <----- NOVO

    atualX = x;
    const deltaX = atualX - inicioX;

    if (deltaX < 0) {
      if (e) e.preventDefault();

      const link = tarefaAtiva.querySelector('.cartao-tarefa-link');
      const limiteMaximo = -120;
      const deslocamento = Math.max(deltaX, limiteMaximo);

      link.style.transform = `translateX(${deslocamento}px)`;
    }
  }

function finalizarArrasto(e) {
  if (!arrastando || !tarefaAtiva) return;

  const deltaX = atualX - inicioX;
  const link = tarefaAtiva.querySelector('.cartao-tarefa-link');
  const foiSwipe = Math.abs(deltaX) > limiteSwipe;

  // -------------------------
  // BLOQUEAR CLICK DEPOIS DE ARRASTAR
  // -------------------------
  if (movimentoDetectado) {
    // bloqueia o click APENAS uma vez
    link.addEventListener('click', impedirClick, { once: true });
  }

  if (foiSwipe && e) e.preventDefault();

  if (deltaX < -limiteAbertura) {
    tarefaAtiva.classList.add('mostrar-acoes');
    link.style.transform = '';
  } else {
    tarefaAtiva.classList.remove('mostrar-acoes');
    link.style.transform = 'translateX(0)';
  }

  arrastando = false;
  tarefaAtiva = null;
  movimentoDetectado = false;
}


  // ============================================================
  // TOUCH EVENTS (CELULAR / TABLET)
  // ============================================================

  tarefas.forEach(tarefa => {
    const link = tarefa.querySelector('.cartao-tarefa-link');
    if (!link) return;

    link.addEventListener('touchstart', (e) => {
      usandoMouse = false;

      const toque = e.touches[0];
      iniciarArrasto(toque.clientX, link);
    }, { passive: true });

    link.addEventListener('touchmove', (e) => {
      const toque = e.touches[0];
      moverArrasto(toque.clientX, e);
    }, { passive: false });

    link.addEventListener('touchend', finalizarArrasto);
  });

  // ============================================================
  // MOUSE EVENTS (DESKTOP / NOTEBOOK)
  // Funciona mesmo com a tela reduzida simulando celular
  // ============================================================
  tarefas.forEach(tarefa => {
    const link = tarefa.querySelector('.cartao-tarefa-link');
    if (!link) return;

    link.addEventListener('mousedown', (e) => {
      usandoMouse = true;

      // começa arrasto
      iniciarArrasto(e.clientX, link);

      // PREVINE SELEÇÃO DE TEXTO
      e.preventDefault();

      // GARANTE QUE VAMOS RECEBER O mouseup MESMO FORA DO ELEMENTO
      document.addEventListener('mouseup', mouseSoltou);
      document.addEventListener('mousemove', mouseMove);
    });

    function mouseMove(e) {
      if (!usandoMouse) return;
      moverArrasto(e.clientX, null);
    }

    function mouseSoltou(e) {
      if (!usandoMouse) return;

      finalizarArrasto(e);
      usandoMouse = false;

      // remove listeners temporários
      document.removeEventListener('mouseup', mouseSoltou);
      document.removeEventListener('mousemove', mouseMove);
    }
  });

  // =====================
  // CLICK FORA FECHA (touch)
  // =====================
  document.addEventListener(
    'touchstart',
    function (e) {
      const dentro = e.target.closest('.cartao-tarefa');
      if (!dentro) {
        document.querySelectorAll('.cartao-tarefa.mostrar-acoes')
          .forEach(t => t.classList.remove('mostrar-acoes'));
      }
    },
    { passive: true }
  );

  // ============================================================
  // BOTÃO .botao-acao-desktop (IGNORADO AQUI, SEM MUDANÇA)
  // ============================================================
  const botoesDesktop = document.querySelectorAll('.botao-acao-desktop');

  botoesDesktop.forEach(botao => {
    botao.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const card = this.closest('.cartao-tarefa');
      if (!card) return;

      const link = card.querySelector('.cartao-tarefa-link');
      if (!link) return;

      const jaAberto = card.classList.contains('mostrar-acoes');

      document.querySelectorAll('.cartao-tarefa.mostrar-acoes').forEach(t => {
        if (t !== card) {
          t.classList.remove('mostrar-acoes');
          const l = t.querySelector('.cartao-tarefa-link');
          if (l) l.style.transform = 'translateX(0)';
        }
      });

      if (jaAberto) {
        card.classList.remove('mostrar-acoes');
        link.style.transform = 'translateX(0)';
      } else {
        card.classList.add('mostrar-acoes');
        link.style.transform = 'translateX(-500px)';
      }
    });
  });

})();
