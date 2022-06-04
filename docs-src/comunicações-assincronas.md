# Operações assíncronas 

Nesse documento está listado cada comunicação assíncrona que deve ser feita utilizando o broker. 

Cada microsserviço tem uma lista de possíveis eventos que devem ser 

## Usuário
* Usuário deletado
    * Informa ao microsserviço (MS) de personagens que um usuário foi deletado para que este apague todos os seus jogadores

## Personagens
* Associar usuário
    * Pergunta ao MS de usuário se o usuário com ID existe
* Personagem deletado
    * Informa ao MS de inventário para apagar o inventário respectivo
