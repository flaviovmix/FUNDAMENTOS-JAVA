<%@page import="java.util.*"%>
<%@page import="com.google.gson.Gson"%>
<%@page import="app.tarefas.TarefasBean"%>
<%@page import="app.tarefas.TarefasDAO"%>

<%
    TarefasDAO dao = new TarefasDAO();
    List<TarefasBean> lista = dao.listarTarefas();

    Gson gson = new Gson();
    String json = gson.toJson(lista);

    response.setContentType("application/json; charset=UTF-8");
    out.print(json);
%>