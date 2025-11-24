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
 
            <tr style="border-bottom: 1px solid black;"> 
               <td>1</td> 
               <td>TITULO DA TAREFA</td> 
               <td>media</td> 
               <td>Nome do Responável</td> 
               <td>Status da Tarefa</td> 
                
                <td style="text-align: center;"> 
                    <a href="#" style="text-decoration: none; color: inherit;"> 
                        <i class="fa-solid fa-pen"></i> 
                    </a> 
                </td> 
                <td style="text-align: center;"> 
                    <a href="#" style="text-decoration: none; color: inherit;"> 
                        <i class="fa-solid fa-trash"></i> 
                    </a> 
                </td> 
                 
            </tr> 
        </table> 
    </body> 
</html>