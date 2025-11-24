package app.tarefas;

import app.config.PoolConexoes;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class TarefasDAO {
    
    private PoolConexoes con;

    public TarefasDAO() {
        con = new PoolConexoes();
        con.getConexao();
    }
    
    public void adicionarTarefa(TarefasBean bean) throws SQLException {
        StringBuilder sql = new StringBuilder();

        sql.append("INSERT INTO tarefas (")
           .append("titulo, prioridade, responsavel, data_criacao, data_conclusao, status, descricao")
           .append(") VALUES (")
           .append("?, ?, ?, ?, ?, ?, ?")
           .append(")");

        try (PreparedStatement ps = con.getConexao().prepareStatement(sql.toString())) {

            ps.setString(1, bean.getTitulo());
            ps.setString(2, bean.getPrioridade());
            ps.setString(3, bean.getResponsavel());
            ps.setDate(4, bean.getData_criacao());
            ps.setDate(5, bean.getData_conclusao());
            ps.setInt(6, bean.getStatus());
            ps.setString(7, bean.getDescricao());

            ps.executeUpdate(); 
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    
    public List<TarefasBean> listarTarefas() {
        List<TarefasBean> lista = new ArrayList<>();

            StringBuilder sql = new StringBuilder();

            sql.append("SELECT * FROM tarefas");  

            try (PreparedStatement ps = con.getConexao().prepareStatement(sql.toString())) {

                try (ResultSet rs = ps.executeQuery()) {

                    while (rs.next()) {

                        TarefasBean tarefa = new TarefasBean();

                        tarefa.setId_tarefa(rs.getInt("id_tarefa"));
                        tarefa.setTitulo(rs.getString("titulo"));
                        tarefa.setPrioridade(rs.getString("prioridade"));
                        tarefa.setResponsavel(rs.getString("responsavel"));
                        tarefa.setData_criacao(rs.getDate("data_criacao"));
                        tarefa.setData_conclusao(rs.getDate("data_conclusao"));
                        tarefa.setStatus(rs.getInt("status"));
                        tarefa.setDescricao(rs.getString("descricao"));

                        lista.add(tarefa);

                    }
                }
            } catch (SQLException erro) {
                erro.printStackTrace();
            }

            return lista;

        }

        public void excluirTarefa(Integer id) {
            String sql = "DELETE FROM tarefas WHERE id_tarefa = ?";

            try (PreparedStatement ps = con.getConexao().prepareStatement(sql)) {
                ps.setInt(1, id);
                ps.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
}
