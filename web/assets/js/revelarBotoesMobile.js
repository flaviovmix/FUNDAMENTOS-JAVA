function inicializarSwipeMobile() {
  const todos = document.querySelectorAll('.todo');

  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let activeTodo = null;
  const threshold = 60; // quanto precisa arrastar para abrir

  // Adiciona eventos de swipe para cada item
  todos.forEach(todo => {
    const link = todo.querySelector('.todo-link');

    if (!link) return;

    link.addEventListener('touchstart', handleStart, { passive: true });
    link.addEventListener('touchmove', handleMove, { passive: false });
    link.addEventListener('touchend', handleEnd);
  });

  // ============================
  // INÍCIO DO TOQUE
  // ============================
  function handleStart(e) {
    const touch = e.touches[0];
    startX = touch.clientX;
    currentX = startX;
    isDragging = true;

    activeTodo = this.closest('.todo');

    // Fecha outros abertos
    document.querySelectorAll('.todo.show-actions').forEach(t => {
      if (t !== activeTodo) t.classList.remove('show-actions');
    });
  }

  // ============================
  // MOVIMENTO DO DEDO
  // ============================
  function handleMove(e) {
    if (!isDragging || !activeTodo) return;

    const touch = e.touches[0];
    currentX = touch.clientX;
    const deltaX = currentX - startX;

    if (deltaX < 0) {
      e.preventDefault(); // evita scroll vertical travado
      const link = activeTodo.querySelector('.todo-link');

      // limite máximo para arrastar
      const maxSlide = -120;
      const translateX = Math.max(deltaX, maxSlide);

      link.style.transform = `translateX(${translateX}px)`;
    }
  }

  // ============================
  // QUANDO O TOQUE TERMINA
  // ============================
  function handleEnd() {
    if (!isDragging || !activeTodo) return;

    const deltaX = currentX - startX;
    const link = activeTodo.querySelector('.todo-link');

    // Arrastou mais que o limite?
    if (deltaX < -threshold) {
      activeTodo.classList.add('show-actions');
      link.style.transform = '';
    } else {
      activeTodo.classList.remove('show-actions');
      link.style.transform = 'translateX(0)';
    }

    isDragging = false;
    activeTodo = null;
  }

  // ============================
  // TOQUE FORA DO ITEM → FECHA
  // ============================
  document.addEventListener(
    'touchstart',
    function (e) {
      const insideTodo = e.target.closest('.todo');
      if (!insideTodo) {
        document.querySelectorAll('.todo.show-actions')
          .forEach(t => t.classList.remove('show-actions'));
      }
    },
    { passive: true }
  );
}
