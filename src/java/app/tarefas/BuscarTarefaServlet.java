package app.tarefas;

import app.util.Utilidades;
import com.google.gson.Gson;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/buscar-tarefa")
public class BuscarTarefaServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        try {
            // Pega o ID enviado pela URL
            int id = Integer.parseInt(req.getParameter("id_tarefa"));

            // Busca no banco
            TarefasDAO dao = new TarefasDAO();
            TarefasBean bean = dao.buscarPorId(id);

            // Limpa campos (igual no JSP)
            bean.setTitulo(Utilidades.nullTrim(bean.getTitulo()));
            bean.setResponsavel(Utilidades.nullTrim(bean.getResponsavel()));
            bean.setDescricao(Utilidades.nullTrim(bean.getDescricao()));
            bean.setPrioridade(Utilidades.nullTrim(bean.getPrioridade()));
            bean.setStatus(bean.getStatus());

            // Converte para JSON
            Gson gson = new Gson();
            String json = gson.toJson(bean);

            // Retorna JSON
            resp.setContentType("application/json; charset=UTF-8");
            resp.getWriter().write(json);

        } catch (Exception e) {
            e.printStackTrace();
            resp.setContentType("application/json; charset=UTF-8");
            resp.getWriter().write("{\"erro\":\"" + e.getMessage() + "\"}");
        }
    }
}
