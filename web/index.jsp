
<%@page import="java.util.List"%>
<%@page import="app.tarefas.TarefasBean"%>
<%@page import="app.tarefas.TarefasDAO"%>
<%@page import="app.config.PoolConexoes"%>
<%@ page import="java.sql.*" %> 
 
<!DOCTYPE html> 
<html> 
    <head> 
        <meta charset="UTF-8"> 
        <title>Lista de Tarefas</title>         
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
        <link rel="stylesheet" href="./assets/css/style.css">
        <link rel="stylesheet" href="./assets/css/modalTarefa.css">
 
    </head> 
    <body> 
 
        <header>
            <div class="topo-sistema">
            <button type="button" class="btn-abrir-Tarefas" onclick="novaTarefa()">
                Nova Tarefa
            </button>
            <button type="button" class="btn-exportar-json" onclick="window.location.href='exportar-json'">
                Exportar JSON
            </button>
                
            <h2>FUNDAMENTOS JAVA</h2>
            </div>
        </header>
        
        <div class="tabs">
            <div class="tab active">Ativas</div>
            <div class="tab">Inativas</div>
            <div class="tab">Pendentes</div>
            <div class="tab">Excluidas</div>
        </div>



        <div class="item titulos-desktop">
            <div class="item-titulo">Titulo</div>
            <div class="item-value-pos"> Prioridade </div>
            <div class="item-title"> Responsável</div>
            <span class="arrow"><i class="fa-solid fa-angle-right"></i></span>
            <div class="item-sub">Status e data</div>
        </div>

             
        <% 
            TarefasDAO dao = new TarefasDAO();
            List<TarefasBean> tarefas = dao.listarTarefas();

            for (TarefasBean bean : tarefas) { %>
            <div class="tarefa-individual">
                <a href="#" class="link-editar" 
                   onclick="editarTarefa(<%= bean.getId_tarefa() %>)">
                    <div class="item">

                        <div class="item-titulo"><%= bean.getTitulo() %></div>
                        <div class="item-value-pos"> <samp class="prioridade"> Prioridade: </samp><samp class="<%= bean.getPrioridade() %>" > <%= bean.getPrioridadeFormatada() %> </samp></div>
                        <div class="item-title"> <samp class="responsavel"> Responsável:</samp> <%= bean.getResponsavel() %> </div>
                        <span class="arrow"><i class="fa-solid fa-angle-right"></i></span>
                        <div class="item-sub">
                            <samp class="status"><i class="fa-solid fa-circle"></i>Status:</samp> <%= bean.getStatusValor() %> | 
                            <i class="fa-solid fa-calendar-days"></i>18 nov. 2025
                        </div>

                    </div>  

                </a>
                    <div>
                        <a href="excluirTarefa.jsp?id_tarefa=<%= bean.getId_tarefa() %>"
                           class="link-deletar">
                            <i class="fa-solid fa-trash"></i> 
                        </a>              
                    </div>
                
            </div>
            <% } 
        %>

        
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
        </div>
        
        <script src="./assets/js/modalTarefas.js"></script>
    </body> 
</html>