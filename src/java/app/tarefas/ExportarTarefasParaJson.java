package app.tarefas;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.util.List;

public class ExportarTarefasParaJson {

    public void gerarArquivoJson(String caminhoDestino) {
        try {
            TarefasDAO dao = new TarefasDAO();
            List<TarefasBean> lista = dao.listarTarefas();

            Gson gson = new GsonBuilder()
                    .setPrettyPrinting()
                    .create();

            String json = gson.toJson(lista);

            // grava o JSON no caminho recebido do servlet
            OutputStreamWriter writer =
                    new OutputStreamWriter(new FileOutputStream(caminhoDestino), "UTF-8");

            writer.write(json);
            writer.close();

            System.out.println("JSON gerado em: " + caminhoDestino);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
