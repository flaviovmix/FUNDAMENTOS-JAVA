package app.config;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;
import java.util.Map;
import javax.naming.InitialContext;

public class JsonDB {

    // Busca o caminho configurado no context.xml
    private String getCaminhoArquivo() throws Exception {
        InitialContext ic = new InitialContext();
        return (String) ic.lookup("java:comp/env/json/caminhoDB");
    }

    // Lê o JSON e devolve uma lista de mapas (cada registro é um Map)
    public List<Map<String, Object>> listarTarefas() throws Exception {

        String caminho = getCaminhoArquivo();

        try (
            FileInputStream file = new FileInputStream(caminho);
            Reader reader = new InputStreamReader(file, "UTF-8")
        ) {

            Gson gson = new Gson();

            return gson.fromJson(
                reader,
                new TypeToken<List<Map<String, Object>>>() {}.getType()
            );
        }
    }
}
