async function carregarTarefas() {

    const container = document.getElementById("lista-tarefas");

    try {
       
        const response = await fetch("tarefas-json");
        const lista = await response.json();

        container.innerHTML = "";

        
        lista.forEach(bean => {
            container.innerHTML += `
           <li class="todo" data-prio="${bean.prioridade}">
              <a href="#" onclick="editarTarefa(${bean.id_tarefa})" class="todo-link">
                <div class="content">
                  <div class="t-titulo">${bean.titulo}</div>

                  <div class="t-responsavel">
                    <span class="label-res">Resp.: </span> ${bean.responsavel}
                  </div>

                  <div class="t-data">
                    <span><i class="fa-solid fa-calendar-alt"></i></span> 12 jan. 2025
                  </div>

                  <div class="meta">
                    <div class="detalhes-tarefa">
                      <!-- <span class="badge prioridade">Baixa</span> -->
                      <span class="badge quant-subtarefas">3 subtarefas</span>
                    </div>
                  </div>
                </div>

                <p>${bean.descricao}</p>
              </a>

              <button class="trash-btn" onclick="excluirTarefa(101)">
                <a href="excluir-tarefa?id_tarefa=${bean.id_tarefa}" class="link-lixeira"><i class="fa-solid fa-trash"></i></a>
              </button>
            </li>
            `;
        });

    } catch (erro) {
        container.innerHTML = "Erro ao carregar tarefas.";
        console.error(erro);
    }
}
