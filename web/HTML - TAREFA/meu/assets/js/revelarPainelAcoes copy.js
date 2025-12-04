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
      // ABRIR: só liga a classe e deixa o CSS decidir o quanto desliza
      tarefaAtiva.classList.add('mostrar-acoes');
      link.style.transform = ''; // remove inline pra não brigar com o CSS
    } else {
      // FECHAR: tira a classe e reseta o transform
      tarefaAtiva.classList.remove('mostrar-acoes');
      link.style.transform = ''; // deixa o estado "fechado" padrão do CSS
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
      const dentro = e.target.closest('.cartao-tarefa');
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
  // BOTÃO .botao-acao-tarefa
  // ============================================================
  const botoesDesktop = document.querySelectorAll('.botao-acao-tarefa');

  botoesDesktop.forEach(botao => {
    botao.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      const card = this.closest('.cartao-tarefa');
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
        // aqui NÃO tem -500px: quem manda é o CSS da classe .mostrar-acoes
      }
    });
  });

})();
