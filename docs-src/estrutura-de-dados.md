# Estrutura dos dados do sistema

5 microserviços são responsáveis pela manutenção dos dados do sistema: "Users", "Characters", "Items", "Inventories", "Missions". Cada um desses microserviços tem um objeto de mesmo nome associado que é a estrutura de dados central a ser feita as operações. Nesse documento é ilustrado um exemplo de cada estrutura.

Atenção: **Todos os objetos contém um campo `_id` implícito adicionado e gerenciado pelo MongoDB. Não é preciso adicionar na criação do objeto mas é preciso utilizar esse valor na hora de fazer referência à um personagem. 

## Users

A users contém apenas o login, email e senha de cada usuário. 

Esses dados servirão para controle de acesso dos jogadores no sistema e associação de multiplos personagens a cada usuário.

```json
{
    "_id":2,
    "login":"nome-de-usuario",
    "email":"usu@ario.com",
    "password":"s3nh4-s3cr3t4"
}
```

## Characters

Contém as informações de cada personagem. 

Cada personagem tem um id de usuário associado que deve ter sua existência validada. 

Nas descrições do personagem temos a seção do nome, descrição e imagem, strings básicas definidas pelo usuário. Imagem, se for implementada, deve ser em base64 do arquivo de imagem a ser utilizado. 

O personagem tem um objeto de `status` que informa o nível e a condição de vida dele. O campo `level` informa o nível do personagem e deve ser um número inteiro maior que 1. **O nível vai de 0 a 20**. Quanto maior esse nível mais bônus o personagem tem. O campo `lives` é um contador de vida onde cada personagem começa com 3 e a cada missão fracassada ele perde uma vida. **Com 0 vidas o personagem está morto**.

O personagem tem um objeto de `attributes` que define os atributos para cada jogador. Esse valor vai de 0 a 5 e é utilizado diretamente no cálculo de sucesso de um personagem. 


```json
{

    "id":8,
    "player_id":2,

    "name":"João III",
    "description":"Um cara legal",
    "image":"Opcional. Uma imagem do personagem a ser exibida.",
    "status":{
            "level":3,
            "lives":3
    },

    "attributes":{ 
            "strength":2,
            "dexterity":4,
            "inteligence":1
        }
}

```

## Missões 

O MS de missões tem as informações de cada missão, o nível de dificuldade de cada etapa e o modificador que será utilizado no cálculo do sucesso da missão. 

O sucesso da missão é definido segundo a regra:

$$nível\; do\; personagem + RandInt(1,20) + modificador\; do\; atributo\; selecionado >= valor\; de\; dificuldade$$


```json
{
    "id":21,
    "name":"Nome da missão",
    "description":"História, objetivo e outras informações",
    "difficulty_value":20,
    "modifier":"strength"
}
```

