async function carregarTarefas() {

    const section = document.getElementById("section-tarefas");

    section.innerHTML = `
        <div class="item titulos-desktop">
            <div class="item-titulo">Titulo</div>
            <div class="item-value-pos"> Prioridade </div>
            <div class="item-title"> Responsável</div>
            <span class="arrow"><i class="fa-solid fa-angle-right"></i></span>
            <div class="item-sub">Status e data</div>
        </div>

        <div id="lista-tarefas">Carregando...</div>
    `;

    const container = document.getElementById("lista-tarefas");

    try {
       
        const response = await fetch("tarefas-json");
        const lista = await response.json();

        container.innerHTML = "";

        
        lista.forEach(bean => {
            container.innerHTML += `
            <div class="tarefa-individual">
                <a href="#" class="link-editar" 
                   onclick="editarTarefa(${bean.id_tarefa})">
                    <div class="item">

                        <div class="item-titulo">${bean.titulo}</div>

                        <div class="item-value-pos">
                            <samp class="prioridade">Prioridade:</samp>
                            <samp class="${bean.prioridade}">
                                ${bean.prioridadeFormatada}
                            </samp>
                        </div>

                        <div class="item-title">
                            <samp class="responsavel">Responsável:</samp>
                            ${bean.responsavel}
                        </div>

                        <span class="arrow"><i class="fa-solid fa-angle-right"></i></span>

                        <div class="item-sub">
                            <samp class="status">
                                <i class="fa-solid fa-circle"></i>Status:
                            </samp>
                            ${bean.statusValor} |
                            <i class="fa-solid fa-calendar-days"></i>18 nov. 2025
                        </div>

                    </div>
                </a>

                <div>
                    <a href="excluir-tarefa?id_tarefa=${bean.id_tarefa}"
                       class="link-deletar">
                        <i class="fa-solid fa-trash"></i> 
                    </a>
                </div>

            </div>
            `;
        });

    } catch (erro) {
        container.innerHTML = "Erro ao carregar tarefas.";
        console.error(erro);
    }
}
