package app.tarefas;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/excluir-tarefa")
public class ExcluirTarefaServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        try {
            // Pega o ID vindo pela URL
            Integer id = Integer.parseInt(req.getParameter("id_tarefa"));

            // Executa exclusão
            TarefasDAO dao = new TarefasDAO();
            dao.excluirTarefa(id);

            // Redireciona de volta
            resp.sendRedirect("index.html");

        } catch (Exception e) {
            e.printStackTrace();
            resp.getWriter().write("Erro ao excluir tarefa: " + e.getMessage());
        }
    }
}
