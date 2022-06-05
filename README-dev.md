# Informações de desenvolvimento

Nesse arquivo temos todas as referências externas às bibliotecas e programas utilizados.

## Estrutura do diretorio

Todo o código do sistema está embaixo de `/src/`. Cada subdiretório de `/src/` é um microsserviço. Para cada microsserviço faz-se o `npm init` como se fosse uma aplicação node completamente independente. 

Todos os microsserviços serão compilados com o mesmo Dockerfile chamado de `MicroService.Dockerfile`. Para isso, todos os microsserviços devem ser aplicações node e funcionar com os comandos node `npm start`, `npm build --if-present`, `npm test` e `npm start-dev`. A última opção é para contêineres de desenvolvimento. 

**Informações globais tais como senha de BD, endereço dos microsserviços e afins DEVEM ser acessadas com o uso de variáveis de ambiente.** Vamos definir variáveis de ambiente globais em outro arquivo.

Todos os arquivos relevantes ao docker estarão no diretório `/docker/`

## Ambiente de trabalho em docker

A aplicação toda é controlada com o uso do docker-compose. Assumindo que o executável `docker-compose` é acessível no PATH, scripts de inicialização vão fazer automaticamente todo o processo de levantamento do sistema. 

Idealmente teremos três ambientes: O ambiente de desenvolvimento, o ambiente de testes e o ambiente de produção. Cada ambiente tem um script relacionado: `/scripts/dev.sh`, `/scripts/test.sh` e `./srcipts/prod.sh`. Cada script recebe como argumento e implementa os passos de `start`, `stop` e  `logs`. 

O ambiente de desenvolvimento fará a construção dos contêiners em modo de desenvolvimento. Nesse modo os contêiners tem seus volumes montados para cada microsserviço e cada contêiner executa o `nodemon` para modificação e interação. Todas as portas de todos os microsserviços e contêineres auxiliares ficam abertas para interação. 

O ambiente de testes executa todos os microsserviços usando o comando `node test`. Assim, cada contêiner faz seus testes unitários e o resultado do teste é retornado assim que o contêiner termina a execução. Validamos todos os microsserviços verificando se esses contêineres terminaram com sucesso, caso contrário será possível analisar os logs.

O ambiente de produção faz a construção dos contêineres utilizando cópias e prepara o sistema para ser executado de forma correta. Assim, apenas o gateway tem acesso via portas. Esse ambiente será utilizado para os testes de integração.

## Bibliotecas utilizadas
* [JSDoc: Documentação](https://jsdoc.app/)
* [MongoDB: Integração com MongoDB](https://www.mongodb.com/docs/drivers/node/current/)
* [ajv: Validador de JSONSchema](https://github.com/ajv-validator/ajv)
* [RabbitMQ: Biblioteca do Broker usado]()

## Links externos

Tutoriais:
* [Troca de mensagens pelo broker](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html)
* [TDD: Testes para o express](https://www.luiztools.com.br/post/tdd-como-criar-integration-tests-em-node-js-com-jest/)
* [Conexão com o MongoDB](https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database)
* [Operações CRUD com o MongoDB](https://www.mongodb.com/developer/languages/javascript/node-crud-tutorial/) 
* [Documentação de projetos de microsserviços](https://rst.software/blog/2019/03/my-approach-to-documenting-javascript-projects/)


Dúvidas:
* [Como ler variáveis de ambiente no JS](https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs)

Links interessantes:
* [Diagramas em markdown com mermaid](https://mermaid-js.github.io/mermaid/#/)