package app.config;

import java.sql.Connection;
import java.sql.SQLException;
import javax.naming.InitialContext;
import javax.sql.DataSource;

public class PoolConexoes {

    private Connection dataBase;

    private Connection abrirConexaoJNDI() {
        try {
            
            InitialContext ic = new InitialContext();
            DataSource ds = (DataSource) ic.lookup("java:comp/env/jdbc/PoolConexoes");
            
            return ds.getConnection();
            
        } catch (Exception e) {
            System.out.println("Erro ao abrir conexão: " + e.getMessage());
            return null;
        }
    }

    public Connection getConexao() {
        try {
            if (dataBase == null || dataBase.isClosed()) {
                dataBase = abrirConexaoJNDI();
            }
        } catch (SQLException e) {
            System.out.println("Erro ao verificar conexão: " + e.getMessage());
        }
        return dataBase;
    }

    public void closeConexao() {
        try {
            if (dataBase != null && !dataBase.isClosed()) {
                dataBase.close();
            }
        } catch (SQLException e) {
            System.out.println("Erro ao fechar conexão: " + e.getMessage());
        }
    }
}
