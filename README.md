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

# Especificações da parte 1

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

# Especificações da parte 2

Documentação do Projeto Final: Refatoração e Otimização do Sistema Bancário

1. Visão Geral do Projeto

O desafio final deste módulo consiste em pegar a base do Sistema Bancário desenvolvida até agora e transformá-la em uma aplicação de nível empresarial. O sistema deve deixar de ser apenas uma interface estática e passar a ser uma Single Page Application (SPA) segura, internacionalizada, reativa e com performance extrema.
Este projeto exige um compromisso inabalável, tendo a excelência como padrão para cada linha de código entregue, refletindo as melhores práticas do mercado de desenvolvimento front-end com Angular 17+.

2. Objetivos de Aprendizagem

● Arquitetura: Estruturar a aplicação utilizando rotas avançadas, injeção de dependências e interceptadores.
● Reatividade Moderna: Dominar o uso de Signals e Control Flow para atualizações de interface eficientes e sem gargalos.
● Integração REST: Realizar o ciclo completo de CRUD (Create, Read, Update, Delete) com uma API, tratando erros e fornecendo feedback ao usuário.
● Segurança: Implementar o fluxo de autenticação com JWT e proteger rotas.
● Performance Absoluta (Foco da Aula 08): Aplicar técnicas avançadas como Server-Side Rendering (SSR), Lazy Loading de componentes e estratégias manuais de detecção de mudanças.

3. Requisitos Funcionais

O sistema deve garantir o funcionamento perfeito das seguintes áreas:
● Login: Tela de autenticação que valide credenciais e gere uma sessão segura.
● Dashboard: Exibição do saldo atual (com opção de ocultar/mostrar) e carregamento sob demanda da fatura do cartão.
● Transferência: Formulário que realiza uma nova transferência (POST) e atualiza o saldo da conta (PATCH).
● Extrato (Transações): Lista de transações vindas da API (GET) com a opção de visualizar comprovantes e excluir registros (DELETE).
● Empréstimo: Simulador de crédito que só é carregado e exibido após interação do usuário.
● Perfil (Rotas Aninhadas): Painel de configurações com sub-rotas para "Dados Pessoais" e "Segurança".
● Internacionalização: Um seletor global para alternar o idioma do sistema entre Português do Brasil (PT-BR) e de Portugal (PT-PT).

4. Requisitos Técnicos e Arquiteturais (Critérios de Aceite)

A avaliação será baseada na implementação correta dos seguintes recursos técnicos exigidos ao longo do módulo:

4.1. Roteamento e SPA (Aula 01)

● Substituição total de qualquer navegação baseada em variáveis (@if, ngSwitch) pelo uso de <router-outlet>.
● Implementação de rotas parametrizadas (ex: /transacoes/:id).
● Implementação de rotas aninhadas na seção de Perfil do usuário.
● Criação de uma rota "Coringa" (Wildcard **) para capturar páginas não encontradas (Erro 404).

4.2. Reatividade e Views (Aula 02)

● Substituição de variáveis de estado primitivas por Signals (signal(), computed()).
● Utilização exclusiva da nova sintaxe de Control Flow (@if, @for, @switch) nos templates HTML.
● Aplicação de Deferrable Views (@defer) no componente de Simulador de Empréstimo (com gatilho on interaction) e na Fatura do Cartão (com gatilho on viewport).

4.3. Integração de API e RxJS (Aulas 03 e 04)

● Uso do HttpClient para conectar-se ao json-server local.
● Conversão inteligente de requisições de leitura (GET) em Signals utilizando a função toSignal.
● Implementação de Tratamento de Erros (catchError) em todas as requisições, exibindo alertas amigáveis na interface.
● Criação de indicadores de Loading (Spinners visuais ou desabilitação de botões) enquanto as requisições estiverem em andamento.

4.4. Segurança, Interceptors e Guards (Aula 05)

● Criação de um Functional Guard (CanActivate) para bloquear o acesso às rotas /dashboard, /transferencia, etc., caso não haja token no localStorage.
● Criação de um HttpInterceptor Funcional para capturar requisições de saída e anexar automaticamente o cabeçalho Authorization: Bearer <token>.

4.5. Internacionalização - i18n (Aula 06)

● Configuração do ngx-translate.
● Criação e uso de Variáveis de Ambiente (environment.ts e environment.development.ts) para definir o idioma base da aplicação.
● Todos os textos da Sidebar e do Header devem ser traduzidos através de chaves do JSON e do pipe | translate.

4.6. Performance Extrema (Requisitos da Aula 07)

Para garantir que a aplicação não apenas funcione, mas escale com desempenho máximo, as seguintes arquiteturas devem ser implementadas:
● Lazy Loading com Componentes Standalone: Em vez de importar todos os componentes diretamente no app.routes.ts, as rotas principais (Dashboard, Transações, Perfil) devem ser carregadas de forma preguiçosa utilizando o loadComponent.
● Pré-carregamento de Módulos (Preloading): A configuração de rotas no app.config.ts deve incluir a estratégia de pré-carregamento (withPreloading(PreloadAllModules)), garantindo que, enquanto o usuário lê o Login, o restante da aplicação é baixado em segundo plano.
● ChangeDetectionStrategy.OnPush: Componentes de apresentação (Dumb Components), como as tabelas de listagem de transações ou cards de detalhes, devem ser configurados com changeDetection: ChangeDetectionStrategy.OnPush. Isso instruirá o Angular a pular verificações de mudanças desnecessárias, reagindo apenas quando as entradas (@Input) mudarem de referência ou quando um Signal for atualizado.
● Server-Side Rendering (SSR) Ativo: A aplicação deve ser compilada e executada suportando SSR. O conceito de "Hidratação" (Hydration) deve estar devidamente provido no app.config.ts através da função provideClientHydration(), garantindo que o HTML inicial seja entregue pronto pelo servidor, acelerando o tempo de primeira pintura da tela (FCP - First Contentful Paint).

5. Passos Sugeridos para a Implementação

Para evitar a quebra da aplicação durante a refatoração, sugere-se a seguinte ordem de execução:
1. A Base (Configuração): Habilitar o SSR no projeto (caso não tenha sido criado com ele) executando ng add @angular/ssr.

2. Roteamento Preguiçoso: Refatorar o app.routes.ts aplicando Lazy Loading em todas as telas principais e configurar o preloading.

3. A Limpeza do DOM: Aplicar as Deferrable Views nos componentes pesados e revisar todo o Control Flow.

4. Segurança em Primeiro Lugar: Desenvolver o fluxo de autenticação (Service, Guard e Interceptor).

5. Conexão Real: Substituir todos os "dados falsos" nos Services pelas chamadas HTTP reais com tratamento de erros.

6. Tuning Final (Performance): Alterar a detecção de mudanças dos componentes isolados para OnPush e verificar as traduções globais.