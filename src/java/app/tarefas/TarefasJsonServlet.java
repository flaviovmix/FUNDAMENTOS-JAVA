package app.tarefas;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/tarefas-json")
public class TarefasJsonServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        try {
            // 1 — Buscar lista no banco
            TarefasDAO dao = new TarefasDAO();
            List<TarefasBean> lista = dao.listarTarefas();

            // 2 — Converter para JSON COM UTF-8 CORRETO
            Gson gson = new GsonBuilder()
                    .disableHtmlEscaping()
                    .setPrettyPrinting()
                    .create();

            String json = gson.toJson(lista);

            // 3 — Enviar resposta JSON CORRETAMENTE ENCODADA
            resp.setCharacterEncoding("UTF-8");
            resp.setContentType("application/json; charset=UTF-8");
            resp.getWriter().write(json);

        } catch (Exception e) {
            e.printStackTrace();

            resp.setCharacterEncoding("UTF-8");
            resp.setContentType("application/json; charset=UTF-8");
            resp.getWriter().write("{\"erro\": \"" + e.getMessage() + "\"}");
        }
    }
}
