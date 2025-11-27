<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="app.util.Utilidades" %>
<%@ page import="com.google.gson.Gson" %>
<%@ page import="app.tarefas.TarefasDAO" %>
<%@ page import="app.tarefas.TarefasBean" %>

<%
    int id = Integer.parseInt(request.getParameter("id_tarefa"));

    TarefasDAO dao = new TarefasDAO();
    TarefasBean bean = dao.buscarPorId(id);

    bean.setTitulo(Utilidades.nullTrim(bean.getTitulo()));
    bean.setResponsavel(Utilidades.nullTrim(bean.getResponsavel()));
    bean.setDescricao(Utilidades.nullTrim(bean.getDescricao()));
    bean.setPrioridade(Utilidades.nullTrim(bean.getPrioridade()));
    bean.setStatus(bean.getStatus());

    Gson gson = new Gson();
    out.print(gson.toJson(bean));
%>
