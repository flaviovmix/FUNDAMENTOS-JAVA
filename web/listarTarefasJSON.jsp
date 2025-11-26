<%@page import="app.tarefas.TarefaDAOJson"%>
<%@page import="app.tarefas.TarefaBeanJson"%>
<%@page import="com.google.gson.Gson"%>
<%@page import="java.util.List"%>
<%@ page contentType="application/json; charset=UTF-8" %>

<%
    TarefaDAOJson dao = new TarefaDAOJson();
    List<TarefaBeanJson> lista = dao.listar();

    Gson gson = new Gson();
    out.print(gson.toJson(lista));
%>