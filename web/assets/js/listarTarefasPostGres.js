function listarTarefasPostGres() {

    fetch("listarTarefasPostgres.jsp")
        .then(r => r.json())
        .then(lista => {

            let corpo = document.getElementById("listaArquivos");
            corpo.innerHTML = "";

            lista.forEach(bean => {

                corpo.innerHTML += `
                    <tr style="border-bottom: 1px solid black;">
                        <td>${bean.id_tarefa}</td>
                        <td>${bean.titulo}</td>
                        <td>${bean.prioridade}</td>
                        <td>${bean.responsavel}</td>
                        <td>${bean.status}</td>

                        <td style="text-align:center;">
                            <a href="#" class="link-editar" onclick="editarTarefa(${bean.id_tarefa})">
                                <i class="fa-solid fa-pen"></i>
                            </a>
                        </td>

                        <td style="text-align:center;">
                            <a href="excluirTarefa.jsp?id_tarefa=${bean.id_tarefa}" class="link-deletar">
                                <i class="fa-solid fa-trash"></i>
                            </a>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(e => {
            console.error("Erro ao listar tarefas:", e);
            alert("Não foi possível carregar as tarefas.");
        });
        
        document.getElementById("titulo-pagina").innerHTML = "FUNDAMENTOS JAVA - POSTGRES"
}
