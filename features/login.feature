Feature: Login

    Scenario: Login com sucesso
        Given que esteja na pagina de login
        When realizo login com as seguintes credenciais
            |usuario | julio.lima|
            | senha  | 123456    |
        Then sou redirecionado para pagina inicial