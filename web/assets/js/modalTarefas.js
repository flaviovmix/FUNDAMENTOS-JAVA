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

