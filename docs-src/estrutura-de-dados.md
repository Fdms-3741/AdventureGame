# Estrutura dos dados do sistema

5 microserviços são responsáveis pela manutenção dos dados do sistema: "Users", "Characters", "Items", "Inventories", "Missions". Cada um desses microserviços tem um objeto de mesmo nome associado que é a estrutura de dados central a ser feita as operações. Nesse documento é ilustrado um exemplo de cada estrutura.

Atenção: **Todos os objetos contém um campo `_id` implícito adicionado e gerenciado pelo MongoDB. Não é preciso adicionar na criação do objeto mas é preciso utilizar esse valor na hora de fazer referência à um personagem. 

## Users

A users contém apenas o login, email e senha de cada usuário. 

Esses dados servirão para controle de acesso dos jogadores no sistema e associação de multiplos personagens a cada usuário.

**(VER NOTA EM MAPA DE RECURSOS)** Como usuários serve para autenticação, adiciona-se o objeto de sessão para armazenar o valor do token, algumas informações do PC do cra e o tempo limite para manter a sessão aberta.

```json
{
    "_id":2,
    "login":"nome-de-usuario",
    "email":"usu@ario.com",
    "password":"s3nh4-s3cr3t4",
    "session":{
        "token":"string aleatoria",
        "user-agent":"O user-agent do usuário que fez o acesso",
        "address":"endereco IP do usuário que fez o login",
        "expires":"Sempre ser atualizado para ser 5 min depois da ultima requisição de validação da sessão"
    }
}
```

Recomendações do armazenamento da senha:
* A senha é enviada em claro para a API.
* Uma vez recebido a senha, deve ser feita um hash da senha com um salt. Um salt é uma sequência de bytes aleatória e única para cada cliente. 
* O padrão de armazenamento das senhas se dá da seguinte forma: "${algoritmo-utilizado}${salt}${resultado-do-hash}".
    * O algoritmo é uma string com o nome do algoritmo. Ex sha-256,md5,blowfish,...
    * O Salt é uma sequência aleatória que deve ser concatenada **ANTES** da senha do usuário. Seu valor é binário e é salvo nessa string como base 64.
    * O resultado do hash é o resultado de implementar o algoritmo na senha concatenada com o hash. Considerando o hash como uma função que recebe um array de bytes, temos que esse valor seria sha256({salt} + base64("{password}")). 
        * Note que aqui {password} é uma string que deve ser convertida em array de bytes.

Recomendações do token:
* Usamos o token como uma sequência aleatória e única para cada usuário de 64 bytes em base 64.

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
    },
	"missions_made":[332,443,565] // IDs das missões feitas
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
    "modifier":"strength",
}
```

