function openModalTarefas() {
    document.getElementById('modalTarefas').style.display = 'flex';
}

function closeModalTarefas() {
    document.getElementById('modalTarefas').style.display = 'none';
}

function editarTarefa(id_tarefa) {

    fetch("buscar-tarefa?id_tarefa=" + id_tarefa)
        .then(function(resposta) {
            return resposta.json();
        })
        .then(function(bean) {

            document.getElementById("tituloModal").innerText = "Editar Tarefa - " + bean.titulo;
            document.getElementById("botaoConfirmacao").innerText = "Editar Tarefa";
            document.getElementById("botaoConfirmacao").classList.add("btn-editarTarefa");
            document.getElementById("botaoConfirmacao").classList.remove("btn-novaTarefa");

            document.getElementById("titulo").value       = bean.titulo;
            document.getElementById("responsavel").value  = bean.responsavel;
            document.getElementById("descricao").value    = bean.descricao;
            document.getElementById("data_criacao").value = bean.data_criacao;

            if (bean.prioridade !== "") {
                document.querySelector(
                    "input[name='prioridade'][value='" + bean.prioridade + "']"
                ).checked = true;
            }

            document.getElementById("status").value = bean.status;

            document.querySelector(".form-tarefa-custom").action =
                "editar-tarefa?id_tarefa=" + bean.id_tarefa;

            openModalTarefas();
        })
        .catch(function(e) {
            console.error("Erro no editarTarefa:", e);
            alert("Não foi possível carregar a tarefa.");
            closeModalTarefas();
        });

}


function novaTarefa() {
    
    document.getElementById("tituloModal").innerText = "Nova Tarefa";
    document.getElementById("botaoConfirmacao").innerText = "Salvar Tarefa";
    document.getElementById("botaoConfirmacao").classList.add("btn-novaTarefa");
    document.getElementById("botaoConfirmacao").classList.remove("btn-editarTarefa");

    document.querySelector(".form-tarefa-custom").reset();

    document.getElementById("titulo").value = "";
    document.getElementById("responsavel").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("data_criacao").value = "";
    document.getElementById("status").value = "";

    document.querySelector(".form-tarefa-custom").action = "adicionar-tarefa";

    openModalTarefas();
}

function desenharModal() {
    const container = document.getElementById("modal");
    container.innerHTML += `
        <div class='overlay-custom' id='modalTarefas' style='display:none;'>
            <div class='box-modal-custom'>

                <button type="button" class="btn-close-custom" onclick="closeModalTarefas()">×</button>
                <h2 id="tituloModal">Nova Tarefa</h2>

                <form action="salvarTarefa.jsp" method="post" class="form-tarefa-custom">

                    <div class="group-custom">
                        <label class="label-custom" for="titulo">Título</label>
                        <input type="text" id="titulo" name="titulo" required>
                    </div>

                    <div class="columns-2-custom">

                        <div class="group-custom">
                            <label class="label-custom">Prioridade</label>

                            <div class="radio-custom">

                                <label class="label-custom">
                                    <input type="radio" name="prioridade" value="alta" required>
                                    Alta
                                </label>

                                <label class="label-custom">
                                    <input type="radio" name="prioridade" value="media">
                                    Média
                                </label>

                                <label class="label-custom">
                                    <input type="radio" name="prioridade" value="baixa">
                                    Baixa
                                </label>

                            </div>
                        </div>

                        <div class="group-custom">
                            <label class="label-custom" for="responsavel">Responsável</label>
                            <input type="text" id="responsavel" name="responsavel" required>
                        </div>

                    </div>

                    <div class="columns-2-custom">

                        <div class="group-custom">
                            <label class="label-custom" for="data_criacao">Data de Criação</label>
                            <input type="date" id="data_criacao" name="data_criacao" value="2025-01-01" required>
                        </div>

                        <div class="group-custom">
                            <label class="label-custom" for="status">Status</label>
                            <select id="status" name="status" required>
                                <option value="">Selecione</option>
                                <option value="0">Rascunho</option>
                                <option value="1">Pendente</option>
                                <option value="2">Concluida</option>
                                <option value="3">Deletar</option>
                            </select>
                        </div>

                    </div>

                    <div class="group-custom">
                        <label class="label-custom" for="descricao">Descrição</label>
                        <textarea id="descricao" name="descricao" rows="4"></textarea>
                    </div>

                    <button type="submit" id="botaoConfirmacao" class="btn-save-custom">Salvar Tarefa</button>

                </form>

            </div>
        </div>`;
}

