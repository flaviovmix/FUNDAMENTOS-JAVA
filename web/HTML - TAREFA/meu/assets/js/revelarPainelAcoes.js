(function () {
  // Agora pego o <li class="tarefa">, que é o "cartão raiz"
  const tarefas = document.querySelectorAll('.tarefa');

  let inicioX = 0;
  let atualX = 0;
  let arrastando = false;
  let tarefaAtiva = null; // continua sendo o .cartao-tarefa
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

    // aqui continua pegando o .cartao-tarefa (div) em volta do link
    tarefaAtiva = elementoLink.closest('.cartao-tarefa');

    // fecha outros cartões abertos
    document.querySelectorAll('.cartao-tarefa.mostrar-acoes').forEach(t => {
      if (t !== tarefaAtiva) t.classList.remove('mostrar-acoes');
      const l = t.querySelector('.cartao-tarefa-link');
      if (l) l.style.transform = ''; // garante reset
    });
  }

  function moverArrasto(x, e) {
    if (!arrastando || !tarefaAtiva) return;

    movimentoDetectado = true;

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

    // Bloquear click depois de arrastar
    if (movimentoDetectado) {
      link.addEventListener('click', impedirClick, { once: true });
    }

    if (foiSwipe && e) e.preventDefault();

    if (deltaX < -limiteAbertura) {
      // ABRIR
      tarefaAtiva.classList.add('mostrar-acoes');
      link.style.transform = ''; // deixa o CSS comandar
    } else {
      // FECHAR
      tarefaAtiva.classList.remove('mostrar-acoes');
      link.style.transform = '';
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
  // ============================================================
  tarefas.forEach(tarefa => {
    const link = tarefa.querySelector('.cartao-tarefa-link');
    if (!link) return;

    link.addEventListener('mousedown', (e) => {
      usandoMouse = true;

      iniciarArrasto(e.clientX, link);

      // previne seleção de texto
      e.preventDefault();

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
      // considera dentro se tocar no cartão OU no botão de ação
      const dentro = e.target.closest('.tarefa');
      if (!dentro) {
        document.querySelectorAll('.cartao-tarefa.mostrar-acoes')
          .forEach(t => {
            t.classList.remove('mostrar-acoes');
            const l = t.querySelector('.cartao-tarefa-link');
            if (l) l.style.transform = ''; // reseta
          });
      }
    },
    { passive: true }
  );

  // ============================================================
  // BOTÃO .botao-acao-tarefa (desktop)
  // ============================================================
  const botoesDesktop = document.querySelectorAll('.botao-acao-tarefa');

  botoesDesktop.forEach(botao => {
    botao.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      // agora o botão sobe até o <li class="tarefa">
      const item = this.closest('.tarefa');
      if (!item) return;

      // e de lá pega o .cartao-tarefa interno
      const card = item.querySelector('.cartao-tarefa');
      if (!card) return;

      const link = card.querySelector('.cartao-tarefa-link');
      if (!link) return;

      const jaAberto = card.classList.contains('mostrar-acoes');

      // Fecha todos os outros
      document.querySelectorAll('.cartao-tarefa.mostrar-acoes').forEach(t => {
        if (t !== card) {
          t.classList.remove('mostrar-acoes');
          const l = t.querySelector('.cartao-tarefa-link');
          if (l) l.style.transform = ''; // usa só o CSS
        }
      });

      if (jaAberto) {
        // FECHAR ESTE
        card.classList.remove('mostrar-acoes');
        link.style.transform = ''; // volta pro padrão fechado
      } else {
        // ABRIR ESTE
        card.classList.add('mostrar-acoes');
        link.style.transform = '';
      }
    });
  });

})();
