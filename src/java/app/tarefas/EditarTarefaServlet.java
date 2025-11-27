package app.tarefas;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/editar-tarefa")
public class EditarTarefaServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        // EVITA QUEBRAR ACENTOS
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html; charset=UTF-8");

        try {
            TarefasBean bean = new TarefasBean();

            bean.setId_tarefa(Integer.parseInt(req.getParameter("id_tarefa")));
            bean.setTitulo(req.getParameter("titulo"));
            bean.setResponsavel(req.getParameter("responsavel"));
            bean.setDescricao(req.getParameter("descricao"));
            bean.setStatus(Integer.parseInt(req.getParameter("status")));
            bean.setPrioridade(req.getParameter("prioridade"));

            TarefasDAO dao = new TarefasDAO();
            dao.editarTarefa(bean);

            resp.sendRedirect("index.html");

        } catch (Exception e) {
            e.printStackTrace();
            resp.getWriter().write("Erro ao editar tarefa: " + e.getMessage());
        }
    }
}
