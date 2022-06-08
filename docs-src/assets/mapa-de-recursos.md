# Recursos dos microsserviços

Aqui descrevemos qual recurso é disponibilizado por cada microsserviço e o que cada um recebe, faz e devolve.

**Nota importante**: Ao conversar com o professor, ele disse que cada microsserviço deve ter reter toda a lógica de negócio que envolve os dados que trabalha. Como se fossem mini-MVCs para cada parte. Isso significa que teremos que adicionar lógicas internas como por exemplo "subir nível" nos contêineres de personagem, e assim eles ficam mais complexos. Em contra-partida, de 6 microsserviços agora são 3.

Usuários
* Acesso ao banco de dados de usuários
	* GET /users?id={valor-de-id}&name={valor-de-username}: Retorna lista de usuários ou usuário com base nos termos de busca enviados
	* POST /users: Adiciona novo usuário
	* DELETE /users/{user-id} 
* Autenticação de usuários
	* GET /users/auth: Passa o hash da senha e valida com o que tem no banco de dados. Retorna o token de autenticação
	* GET /users/auth/{session-info}: Passa o token e verifica se ainda é valido


Personagens:
* CRUD Personagem

Missões
* CRUD das missões

Autenticação
* Faz o login dos usuários
	* POST /auth
		* Envia junto o JSON {'login':<login>, senha':<senha> }
		* Entra com usuário e senha e sai com token de acesso
		* Expira um token anterior ao usuário se ele já estava logado
	* Validar token 
		* GET /auth/{token}
		* Recebe token e determina se token existe e não expirou
		* Retorna usuário na qual token
