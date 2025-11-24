<%@ page import="java.sql.*" %> 
 
<!DOCTYPE html> 
<html> 
    <head> 
        <meta charset="UTF-8"> 
        <title>Lista de Tarefas</title> 
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
     
        <style> 
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap'); 
 
            body { 
                font-family: 'Inter', sans-serif; 
                margin: 0; 
                padding: 20px; 
                background: #fafafa; 
                color: #222; 
            } 
 
            h2 { 
                text-align: center;  
            } 
            table { 
                border-collapse: collapse; 
                width: 900px; 
                margin: 0 auto;  
            } 
 
            th, td { 
                border-bottom: 1px solid #ccc; 
                padding: 15px; 
            } 
 
            th { 
                border-bottom: 2px solid #000; 
                background: #f5f5f5; 
                text-align: left; 
            } 
        </style> 
 
    </head> 
    <body> 
 
        <h2>FUNDAMENTOS-JAVA</h2> 
         
        <table> 
            <tr> 
                <th>ID</th> 
                <th>Título</th> 
                <th>Prioridade</th> 
                <th>Responsável</th> 
                <th>Status</th> 
                <th>Editar</th> 
                <th>Excçuir</th> 
            </tr> 
             
        <% 
            String url = "jdbc:postgresql://localhost:5432/DB_GENERICO"; 
            String user = "postgres"; 
            String pass = "masterkey"; 
 
            Connection con = null; 
            PreparedStatement ps = null; 
            ResultSet rs = null; 
 
            try { 
                Class.forName("org.postgresql.Driver"); 
                con = DriverManager.getConnection(url, user, pass); 
 
                String sql = "SELECT * FROM tarefas"; 
                ps = con.prepareStatement(sql); 
                rs = ps.executeQuery(); 
                 
            while (rs.next()) { %> 
            <tr style="border-bottom: 1px solid black;"> 
                <td><%= rs.getInt("id_tarefa") %></td> 
                <td><%= rs.getString("titulo") %></td> 
                <td><%= rs.getString("prioridade") %></td> 
                <td><%= rs.getString("responsavel") %></td> 
                <td><%= rs.getInt("status") %></td> 
                
                <td style="text-align: center;"> 
                    <a href="editarTarefa.jsp?id_tarefa=<%= rs.getInt("id_tarefa") %>" style="text-decoration: none; color: inherit;"> 
                        <i class="fa-solid fa-pen"></i> 
                    </a> 
                </td> 
                <td style="text-align: center;"> 
                    <a href="deletarTarefa.jsp?id_tarefa=<%= rs.getInt("id_tarefa") %>" style="text-decoration: none; color: inherit;"> 
                        <i class="fa-solid fa-trash"></i> 
                    </a> 
                </td> 
                 
            </tr> 
            <% }  
                } catch (Exception e) { 
                    out.println("Erro: " + e.getMessage()); 
                } finally { 
                    if (rs != null) rs.close(); 
                    if (ps != null) ps.close(); 
                    if (con != null) con.close(); 
                } 
            %> 
        </table> 
    </body> 
</html>