# Dashboard Bancário

## Objetivo

Desenvolver uma aplicação web do tipo SPA utilizando Angular que simule um dashboard de banco digital, permitindo ao usuário visualizar informações financeiras, realizar operações e interagir com dados consumidos de uma API.

O projeto deve aplicar, de forma integrada, os conceitos trabalhados no módulo:

- componentização
- serviços e injeção de dependência
- comunicação entre componentes
- data binding
- consumo de API (HttpClient)
- estado compartilhado
- formulários reativos
- responsividade

O foco é organização arquitetural, separação de responsabilidades e boas práticas, não apenas funcionamento visual.

## Tema do sistema

Mini Banco Digital – Dashboard Financeiro

A aplicação deve simular um sistema interno de banco digital, onde o usuário pode:

- visualizar saldo
- consultar extrato
- realizar transferências
- simular crédito/empréstimo
- interagir com formulários
- visualizar dados dinâmicos de uma API

## Restrições técnicas

Para este projeto:

- Deve ser SPA (uma única página)
- Não utilizar Angular Router

A navegação entre telas deve ocorrer via renderização condicional (@if, @switch, etc.)

## Requisitos funcionais (obrigatórios)

1. Layout geral

A aplicação deve possuir:

- Header
- Menu lateral
- Área principal de conteúdo

2. Dashboard

Deve exibir:

- saldo atual
- resumo financeiro
- indicadores ou cards informativos
- Dados devem vir de serviço/API.

3. Extrato de transações

Deve:

- listar transações dinamicamente
- exibir data, descrição e valor
- formatar valores com pipes
- indicar entrada/saída (cores diferentes)
- Dados devem vir de API ou mock HTTP.

4. Transferência

Formulário reativo contendo:

- conta destino
- valor
- descrição

Validações:

- campos obrigatórios
- valor maior que zero
- saldo suficiente

Ao enviar:

- atualizar saldo global
- registrar nova transação

5. Simulador de crédito/empréstimo

Formulário com:

- valor solicitado
- número de parcelas
- taxa de juros

Deve calcular:

- valor da parcela
- valor total

Lógica deve ficar em service (não no componente).

6. Consumo de API

Deve utilizar:

- HttpClient
- Observables
- async pipe (quando possível)

Pode ser:

- json-server
- backend simples

7. Estado compartilhado

Saldo e transações devem ser:

- compartilhados entre múltiplos componentes
- atualizados reativamente

Pode usar:

- service com BehaviorSubject
- Ngrx

8. Responsividade

Interface deve funcionar adequadamente em:

- desktop
- tablet
- mobile

Utilizar:

- Flexbox, Bootstrap ou CSS responsivo

## Requisitos arquiteturais (muito importantes)

O projeto será avaliado também pela organização do código.

## Deve apresentar:

- separação entre UI e lógica
- uso de services
- baixo acoplamento
- componentes coesos
- ausência de lógica de negócio no template
- organização de pastas (core/shared/features ou similar)

Evitar:

- código duplicado
- variáveis globais
- chamadas HTTP diretamente no template
- componentes “gigantes” fazendo tudo

## Funcionalidades extras (bônus)

Opcionalmente, podem ser implementados:

- tema dark/light
- gráficos
- filtros no extrato
- exportação CSV
- cache localStorage
- animações
- melhorias visuais
- testes unitários

## Modalidade

Pode ser desenvolvido:

- individualmente
- em grupos de até 4 alunos

Todos devem compreender o código entregue.

## Entrega

Deve conter:

- repositório Git enviado no LMS
- instruções para rodar (README)
- testes implementados
- aplicação funcionando

## Critérios de avaliação

Critério Peso
Arquitetura e organização do código 25%
Uso correto de Angular (components/services/DI) 25%
Funcionalidades implementadas 20%
Formulários e validações 10%
Consumo de API e estado 10%
Responsividade/UI 5%
Testes 5%

## Competências avaliadas

Ao final, espera-se que o estudante seja capaz de:

- estruturar uma SPA Angular
- componentizar corretamente
- consumir APIs
- gerenciar estado
- criar formulários complexos
- aplicar boas práticas de arquitetura

## Observação final

Este projeto não deve ser apenas copiado de tutoriais. O objetivo é aplicar os conceitos aprendidos e tomar decisões arquiteturais conscientes.

Mais importante que "funcionar" é "estar bem organizado".
