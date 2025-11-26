function listarArquivosJSON() {

    fetch("listarTarefasJSON.jsp")
        .then(r => r.json())
        .then(lista => {

            var tbody = document.getElementById("listaArquivos");
            tbody.innerHTML = "";

            lista.forEach(bean => {
                tbody.innerHTML +=
                    "<tr style='border-bottom:1px solid black;'>" +
                        "<td>" + bean.id_tarefa + "</td>" +
                        "<td>" + bean.titulo + "</td>" +
                        "<td>" + bean.prioridade + "</td>" +
                        "<td>" + bean.responsavel + "</td>" +
                        "<td>" + bean.status + "</td>" +

                        "<td style='text-align:center; padding:8px;'>" +
                            "<a href='#' class='link-editar' onclick='editarTarefa(" + bean.id_tarefa + ")'>" +
                                "<i class='fa-solid fa-pen'></i>" +
                            "</a>" +
                        "</td>" +

                        "<td style='text-align:center; padding:8px;'>" +
                            "<a href='excluirTarefa.jsp?id_tarefa=" + bean.id_tarefa + "' class='link-deletar'>" +
                                "<i class='fa-solid fa-trash'></i>" +
                            "</a>" +
                        "</td>" +
                    "</tr>";
            });

        })
        .catch(e => {
            console.error("Erro ao listar tarefas:", e);
            alert("Não foi possível carregar as tarefas.");
        });
        
        document.getElementById("titulo-pagina").innerHTML = "FUNDAMENTOS JAVA - JSON"
}
