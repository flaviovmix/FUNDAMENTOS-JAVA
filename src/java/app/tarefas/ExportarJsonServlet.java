package app.tarefas;

import java.io.File;
import java.io.FileInputStream;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;

@WebServlet("/exportar-json")
public class ExportarJsonServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        try {
            // 1 — Gera o JSON
            ExportarTarefasParaJson exportar = new ExportarTarefasParaJson();
            exportar.gerarArquivoJson();

            // 2 — Caminho do arquivo gerado
            String caminho = "C:/src/DB_GENERICO.json";
            File file = new File(caminho);

            if (!file.exists()) {
                resp.getWriter().write("Arquivo não encontrado.");
                return;
            }

            // 3 — Configurar headers para download
            resp.setContentType("application/json; charset=UTF-8");
            resp.setHeader("Content-Disposition",
                    "attachment; filename=\"DB_GENERICO.json\"");

            FileInputStream fis = new FileInputStream(file);
            OutputStream out = resp.getOutputStream();

            byte[] buffer = new byte[4096];
            int bytesRead;

            while ((bytesRead = fis.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }

            fis.close();
            out.close();

        } catch (Exception e) {
            resp.getWriter().write("Erro ao exportar JSON: " + e.getMessage());
        }
    }
}

