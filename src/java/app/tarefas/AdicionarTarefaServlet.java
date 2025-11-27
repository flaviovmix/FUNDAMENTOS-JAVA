package app.tarefas;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/adicionar-tarefa")
public class AdicionarTarefaServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        try {
            // Criar o bean e preencher
            TarefasBean bean = new TarefasBean();

            bean.setTitulo(req.getParameter("titulo"));
            bean.setResponsavel(req.getParameter("responsavel"));
            bean.setDescricao(req.getParameter("descricao"));
            bean.setStatus(Integer.parseInt(req.getParameter("status")));
            bean.setPrioridade(req.getParameter("prioridade"));

            // Salvar no banco
            TarefasDAO dao = new TarefasDAO();
            dao.adicionarTarefa(bean);

            // Redirecionar de volta para a lista
            resp.sendRedirect("index.html");

        } catch (Exception e) {
            e.printStackTrace();
            resp.getWriter().write("Erro ao adicionar tarefa: " + e.getMessage());
        }
    }
}
