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
            // ===== gerar nome baseado na data, hora, minutos, segundos e milissegundos =====
            String nomeArquivo = "TAREFAS-" +
                    java.time.LocalDateTime.now()
                    .format(java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss-SSS"))
                    + ".json";

            // Caminho real dentro do WEB-INF
            String caminho = getServletContext().getRealPath("/WEB-INF/" + nomeArquivo);
            System.out.println("CAMINHO REAL PARA EXPORTAR: " + caminho);

            // 1 — Gera o JSON dentro do WEB-INF com o novo nome
            ExportarTarefasParaJson exportar = new ExportarTarefasParaJson();
            exportar.gerarArquivoJson(caminho);

            // 2 — Confirma se o arquivo foi gerado
            File file = new File(caminho);

            if (!file.exists()) {
                resp.getWriter().write("Arquivo não encontrado.");
                return;
            }

            // 3 — Configura headers para download
            resp.setContentType("application/json; charset=UTF-8");
            resp.setHeader("Content-Disposition",
                    "attachment; filename=\"" + nomeArquivo + "\"");

            FileInputStream fis = new FileInputStream(file);
            OutputStream out = resp.getOutputStream();

            byte[] buffer = new byte[4096];
            int bytesRead;

            while ((bytesRead = fis.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }

            fis.close();
            file.delete();
            out.close();

        } catch (Exception e) {
            resp.getWriter().write("Erro ao exportar JSON: " + e.getMessage());
        }
    }
}
