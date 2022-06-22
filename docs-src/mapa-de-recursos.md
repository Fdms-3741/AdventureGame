# Recursos dos microsserviços

Aqui descrevemos qual recurso é disponibilizado por cada microsserviço e o que cada um recebe, faz e devolve.

**Nota importante**: Ao conversar com o professor, ele disse que cada microsserviço deve ter reter toda a lógica de negócio que envolve os dados que trabalha. Como se fossem mini-MVCs para cada parte. Isso significa que teremos que adicionar lógicas internas como por exemplo "subir nível" nos contêineres de personagem, e assim eles ficam mais complexos. Em contra-partida, de 6 microsserviços agora são 3.

Usuários
* Acesso ao banco de dados de usuários
	* GET /users: Retorna lista de usuários ou usuário com base nos termos de busca enviados
		* Pode conter o seguinte corpo em JSON: {name?: "Nome da pessoa", id?: "id do mongoose"}
	* POST /users: Adiciona novo usuário
	* DELETE /users/{user-id} 
* Autenticação de usuários
	* GET /users/auth: Passa o hash da senha e valida com o que tem no banco de dados. Retorna o token de autenticação
	* GET /users/auth/{session-info}: Passa o token e verifica se ainda é valido


Personagens:
* Acesso aos dados de personagens
	* GET /characters: Lista com todos os personagens
	* GET /characters/{user-id}: Lista com todos os personagens de um usuário
	* GET /characters/{user-id}/{character-id}: Retorna dados do personagem pertencente ao usuário
* Criação de personagens
	* POST /characters/{user-id}: Cria um novo personagem para o usuário com user-id
		* Recebe apenas nome, imagem e descrição do personagem. Os outros são definidos pelo programa
		* O nível do personagem sempre começa com 1, a vida sempre começa com 5 e o atributo que começa com 1 é aleatório.
* Modificações nos status dos personagens
	* PUT /characters/levelup/{charcters-id}?attribute={attribute-name}: Aumenta o nível do personagem
		* Recebe apenas o nome do atributo a incrementar junto ao nível do personagem.
		* Retorna erro se o nível do personagem for 15 (nivel máximo). 
	* PUT /characters/takelife/{characters-id}
		* Remove uma vida do personagem
		* Retorna erro se o personagem está morto (vida = 0).
* Modificações na lista de missões concluídas pelo personagem.
	* PUT /characters/achievements/{mission-id}
		* Adiciona uma missão completa na lista de missões completas do personagem.
	* DELETE /characters/achievements/{mission-id}
		* Remove uma missão da lista de missões feitas

Missões
* CRUD de missões
	* GET /missions: Lista de missões disponíveis
	* GET /missions/{mission-id}: Retorna uma única missão
	* POST /missions: Cria uma nova missão
		* Recebe todos os dados contidos na estrutura de missões
	* PUT /missions: Modifica algum parâmetro da missão
	* DELETE /missions: Apaga uma missão
* Teste de missões
	* GET /missions/do/{player-id}: Faz o personagem realizar uma missão e retorna o status de feitio da tarefa
		* Deve adquirir informações do personagem e alterar as informações do personagem a depender do resultado da missão
		* O cálculo para saber se a missão foi bem sucedida é `(ClasseDeDificuldade < NivelPersonagem + NivelAtributoDaMissao + InteiroAleatorioEntre(1,20))`

