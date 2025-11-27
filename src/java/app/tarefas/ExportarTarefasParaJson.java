package app.tarefas;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.util.List;

public class ExportarTarefasParaJson {

    public void gerarArquivoJson() {
        try {

            TarefasDAO dao = new TarefasDAO();
            List<TarefasBean> lista = dao.listarTarefas();

            Gson gson = new GsonBuilder()
                    .setPrettyPrinting()
                    .create();

            String json = gson.toJson(lista);

            String caminho = "C:/src/DB_GENERICO.json";

            // AQUI é onde corrigimos os acentos:
            OutputStreamWriter writer =
                    new OutputStreamWriter(new FileOutputStream(caminho), "UTF-8");

            writer.write(json);
            writer.close();

            System.out.println("JSON gerado com sucesso em UTF-8!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
