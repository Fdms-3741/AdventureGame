# Recursos dos microsserviços

Aqui descrevemos qual recurso é disponibilizado por cada microsserviço e o que cada um recebe, faz e devolve.

Usuários
* Acesso ao banco de dados de usuários
	* POST /login: Retorna lista de usuários ou usuário com base nos termos de busca enviados
		* Pode conter o seguinte corpo em JSON: {user: "Nome da pessoa", password:"password "}
	* POST /register: Adiciona novo usuário
	* DELETE /users/{user-id} 
* Autenticação de usuários
	* GET /users/auth: Passa o hash da senha e valida com o que tem no banco de dados. Retorna o token de autenticação
	* GET /users/auth/{session-info}: Passa o token e verifica se ainda é valido


Personagens:
* Acesso aos dados de personagens
	* [X] GET /characters: Lista com todos os personagens
	* [X] GET /characters/byuser/{user-id}: Lista com todos os personagens de um usuário
	* [X] GET /characters/bycharacter/{character-id}: Retorna dados do personagem pertencente ao usuário
* Criação de personagens
	* [X] POST /characters/{user-id}: Cria um novo personagem para o usuário com user-id
		* Recebe apenas nome, imagem e descrição do personagem. Os outros são definidos pelo programa
		* O nível do personagem sempre começa com 1, a vida sempre começa com 5 e o atributo que começa com 1 é aleatório.
* Modificações nos status dos personagens
	* [X] PUT /characters/levelup/{charcters-id}?attribute={attribute-name}: Aumenta o nível do personagem
		* Recebe apenas o nome do atributo a incrementar junto ao nível do personagem.
		* Retorna erro se o nível do personagem for 15 (nivel máximo). 
	* [X] PUT /characters/takelife/{characters-id}
		* Remove uma vida do personagem
		* Retorna erro se o personagem está morto (vida = 0).
	* [X] PUT /characters/description/{characters-id}
		* Muda a descricao do personagem
* Modificações na lista de missões concluídas pelo personagem.
	* [X] PUT /characters/achievements/{char-id}
		* Requer {mission_id:"{id de missao}"} que seja um ObjectId válido do mongoose
		* Adiciona uma missão completa na lista de missões completas do personagem.
* Remoção de personagem
	* [X] DELETE /characters/{char-id}
		* Remove um personagem

Missões
* CRUD de missões
	* [ ] GET /missions: Lista de missões disponíveis
	* [ ] GET /missions/{mission-id}: Retorna uma única missão
	* [ ] POST /missions: Cria uma nova missão
		* Recebe todos os dados contidos na estrutura de missões
	* [ ] PUT /missions: Modifica algum parâmetro da missão
	* [ ] DELETE /missions: Apaga uma missão
* Teste de missões
	* [ ] GET /missions/do/{player-id}: Faz o personagem realizar uma missão e retorna o status de feitio da tarefa
		* Deve adquirir informações do personagem e alterar as informações do personagem a depender do resultado da missão
		* O cálculo para saber se a missão foi bem sucedida é `(ClasseDeDificuldade < NivelPersonagem + NivelAtributoDaMissao + InteiroAleatorioEntre(1,20))`

