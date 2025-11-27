<%@page import="app.tarefas.TarefasDAO"%>
<%
    Integer id = Integer.parseInt(request.getParameter("id_tarefa"));

    TarefasDAO dao = new TarefasDAO();
    dao.excluirTarefa(id);

    response.sendRedirect("index.jsp");
%>
