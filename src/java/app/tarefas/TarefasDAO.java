package app.tarefas;

import app.config.JsonDB;
import app.config.PoolConexoes;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

            sql.append("SELECT * FROM tarefas ORDER BY id_tarefa");  

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

        public TarefasBean buscarPorId(int id) {

            String sql = "SELECT * FROM tarefas WHERE id_tarefa = ?";

            try (PreparedStatement ps = con.getConexao().prepareStatement(sql)) {

                ps.setInt(1, id);

                try (ResultSet rs = ps.executeQuery()) {

                    if (rs.next()) {
                        TarefasBean b = new TarefasBean();

                        b.setId_tarefa(rs.getInt("id_tarefa"));
                        b.setTitulo(rs.getString("titulo"));
                        b.setPrioridade(rs.getString("prioridade"));
                        b.setResponsavel(rs.getString("responsavel"));
                        b.setData_criacao(rs.getDate("data_criacao"));
                        b.setData_conclusao(rs.getDate("data_conclusao"));
                        b.setStatus(rs.getInt("status"));
                        b.setDescricao(rs.getString("descricao"));

                        return b;
                    }
                }

            } catch (Exception e) {
                e.printStackTrace();
            }

            return null;
        }

        public void editarTarefa(TarefasBean bean) {

            StringBuilder sql = new StringBuilder();
            sql.append("UPDATE tarefas SET ")
               .append("titulo = ?, ")
               .append("descricao = ?, ")
               .append("status = ?, ")
               .append("prioridade = ?, ")
               .append("responsavel = ?, ")
               .append("data_conclusao = ? ")
               .append("WHERE id_tarefa = ?");


            try (PreparedStatement ps = con.getConexao().prepareStatement(sql.toString())) {
                ps.setString(1, bean.getTitulo());
                ps.setString(2, bean.getDescricao());
                ps.setInt(3, bean.getStatus());
                ps.setString(4, bean.getPrioridade());
                ps.setString(5, bean.getResponsavel());
                ps.setDate(6, bean.getData_conclusao());
                ps.setInt(7, bean.getId_tarefa());

                ps.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            }
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
