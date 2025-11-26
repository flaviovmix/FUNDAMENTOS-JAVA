package app.tarefas;

public class TarefaBeanJson {

    private Integer id_tarefa;
    private String titulo;
    private String prioridade;
    private String responsavel;
    private Integer status;

    public Integer getId_tarefa() {
        return id_tarefa;
    }

    public void setId_tarefa(Integer id_tarefa) {
        this.id_tarefa = id_tarefa;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(String prioridade) {
        this.prioridade = prioridade;
    }

    public String getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
