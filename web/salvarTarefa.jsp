<%@page import="app.tarefas.TarefasDAO"%>
<%@page import="app.tarefas.TarefasBean"%>
<%
    TarefasBean bean = new TarefasBean();
    TarefasDAO dao = new TarefasDAO();
    
    //bean.setId_tarefa(Integer.parseInt(request.getParameter("id_tarefa")));
    bean.setTitulo(request.getParameter("titulo"));
    bean.setResponsavel(request.getParameter("responsavel"));
    bean.setDescricao(request.getParameter("descricao"));
    bean.setStatus(Integer.parseInt(request.getParameter("status")));
    bean.setPrioridade(request.getParameter("prioridade"));
    
    dao.adicionarTarefa(bean);
    
    response.sendRedirect("index.jsp");
%>