# Projeto CIC

Essa api foi desenvolvida para atender os seguintes criterios:

1) Cadastro de Vendedor
2) Casastro de Catalagos
3) Adcionar Catalago

## O Projeto está divido da seguintes maneira:

  ## Controller ->
  Controller recebe da rota os procedimentos a serem executados (GET, POST, DELETE, PACTCH)

  ## Models ->
  Aqui é gerado a estrutura das tabelas

  ## Config ->
  Arquivo de configuração do banco de dados e gerado de arquivos (CSV / PDF)

  ## Database ->
  Configuração do Banco MYSQL

  ## Routes->
  Esse arquivo recebe as requisicoes e distribui para cada controller conforme sua solicitação

Para geração das tabelas utilei um pacote chamado SEQUELIZE que funciona muito bem
para geração de tabelas podendo automatizar  e criar um historico de cada tabela.

Link produção:

https://cic.vercel.app


### Problemas apresentados:
Como estou utilizando meu backend num servidor proprio pela kinkhost ai no brasil, passei alguma dificuldades de infra e não estava
conseguindo liberar uma pasta publica para fazer o download do arquivo que deveria
ser implemntador que seria a venda fiz toda a logica mais nao consegui implementar.
