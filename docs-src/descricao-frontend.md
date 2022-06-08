# Projeto de frontend

O frontend do projeto é uma página da Web que possua as opções para que o jogador possa fazer suas operações básica.

## Funcionamento básico

Assim que se entra no site deve aparecer uma página de login de modo similar a qualquer outra página de login. 

![Página de login](assets/pagina-de-login.svg)

Uma vez que o usuário faz seu login ou cadastro (outra página com as mesmas informações que login, só que adiciona novo usuário), o usuário entra na página de personagens, que mostra a informação do primeiro personagem vivo que o usuário tiver (de qualquer ordem que vier na lista). 

![Página de personagem](assets/pagina-inicial-personagens.svg)

Durante o acesso de um usuário, um menu deve constantemente estar visível para que o usuário possa se mover nas diferentes páginas do sistema. 
Na página de personagens, as informações do personagem (ver estrutura de dados do personagem) aparecem para visualização. 
Se o usuário quiser criar um novo personagem, pode-se aparecer um formulário simples para que o usuário coloque **apenas o nome, a descrição e a imagem**. A imagem, se possível, deve ser convertida em base64 para ser salva no banco de dados. O formato da imagem pode ser qualquer, contanto que seja possível receber a versão base64 dessa imagem, converter para binário e exibir a imagem na página da web. 
Isso também acontece para missões.

![Página de missões](assets/pagina-de-missoes.svg)

Para missões, o principal é aparaecer uma lista de missões com três colunas: Nome da missão, atributo modificador e descrição (ver estrutura de dados). 
O usuário deve selecionar uma missão e isso mudar as informações sobre missão selecionada que aparecem embaixo da lista. 
A opção de "fazer missão" deve ter uma confirmação. O resultado da missão bem sucedida ou não é retornado da API e deve ser exibida ao cliente.
