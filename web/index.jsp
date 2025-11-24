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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
     
        <style> 
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap'); 
 
            body { 
                font-family: 'Inter', sans-serif; 
                margin: 0; 
                padding: 20px; 
                background: #fafafa; 
                color: #222; 
            } 
 
            h2 { 
                text-align: center;  
            } 
            table { 
                border-collapse: collapse; 
                width: 1200px; 
                margin: 0 auto;  
            } 
 
            th, td { 
                border-bottom: 1px solid #ccc; 
                padding: 15px; 
            } 
 
            th { 
                border-bottom: 2px solid #000; 
                background: #f5f5f5; 
                text-align: left; 
            } 
        </style> 
 
    </head> 
    <body> 
 
        <h2>FUNDAMENTOS-JAVA</h2> 
         
        <table> 
            <tr> 
                <th>ID</th> 
                <th>Título</th> 
                <th>Prioridade</th> 
                <th>Responsável</th> 
                <th>Status</th> 
                <th>Editar</th> 
                <th>Excluir</th> 
            </tr> 
             
        <% 
            TarefasDAO dao = new TarefasDAO();
            List<TarefasBean> tarefas = dao.listarTarefas();

            for (TarefasBean bean : tarefas) { %>
                <tr style="border-bottom: 1px solid black;"> 
                    <td><%= bean.getId_tarefa() %></td>
                    <td><%= bean.getTitulo() %></td>
                    <td><%= bean.getPrioridadeFormatada() %></td>
                    <td><%= bean.getResponsavel() %></td>
                    <td><%= bean.getStatusValor() %></td> 

                    <td style="text-align: center;"> 
                        <a href="editarTarefa.jsp?id_tarefa=<%= bean.getId_tarefa() %>" 
                            style="text-decoration: none; color: inherit;">
                            <i class="fa-solid fa-pen"></i> 
                        </a> 
                    </td>

                    <td style="text-align: center;"> 
                        <a href="excluirTarefa.jsp?id_tarefa=<%= bean.getId_tarefa() %>"
                            style="text-decoration: none; color: inherit;">
                            <i class="fa-solid fa-trash"></i> 
                        </a> 
                    </td>

                </tr>                 
            <% } %>
        </table> 
    </body> 
</html>