package app.tarefas;

import app.config.JsonDB;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class TarefaDAOJson {
    public List<TarefaBeanJson> listar() throws Exception {

        JsonDB db = new JsonDB();
        List<Map<String, Object>> listaJson = db.listarTarefas();

        List<TarefaBeanJson> lista = new ArrayList<>();

        for (Map<String, Object> aa : listaJson) {

            TarefaBeanJson bean = new TarefaBeanJson();

            bean.setId_tarefa( ((Double) aa.get("id_tarefa")).intValue() );
            bean.setTitulo( String.valueOf(aa.get("titulo")) );
            bean.setPrioridade( String.valueOf(aa.get("prioridade")) );
            bean.setResponsavel( String.valueOf(aa.get("responsavel")) );
            bean.setStatus( ((Double) aa.get("status")).intValue() );

            lista.add(bean);
        }

        return lista;
    }

}
