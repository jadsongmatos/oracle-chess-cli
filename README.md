# Oracle Chess Cli

1. Tabela user:
    - Colunas: id, nome de usuário, email, senha, create_time, update_time
    - Chave primária: id

2. Tabela location:
    - Colunas: id, latitude, longitude, cidade, estado, nação, user_id
    - Chave primária: id
    - Chave estrangeira: user_id referencia user(id)

3. tabela amigo`:
    - Colunas: user_id, friend_id
    - Chave primária: (user_id, friend_id)
    - Chaves estrangeiras: user_id referencia user(id), friend_id referencia user(id)

4. Tabela conquistas:
    - Colunas: id, nome, descrição
    - Chave primária: id
    - Índices exclusivos: nome, descrição

5. Tabela achievement_user:
    - Colunas: realização_id, user_id
    - Chave primária: (achievement_id, user_id)
    - Chaves estrangeiras: realização_id faz referência a realização(id), user_id faz referência a usuário(id)

6. tabela árvore:
    - Colunas: id, valor, profundidade, gameover, xeque-mate, update_time, user_id, parent_id
    - Chave primária: id
    - Chaves estrangeiras: user_id referencia user(id), parent_id referencia tree(id)

7. tabela link:
    - Colunas: id, url, create_time, user_id
    - Chave primária: id
    - Chave estrangeira: user_id referencia user(id)

8. tabela clique:
    - Colunas: idclick, create_time, outros, link_id
    - Chave primária: idclick
    - Chave estrangeira: link_id referencia link(id)

9. Tabela moedas:
    - Colunas: id, currency_origin, estado, user_id
    - Chave primária: id
    - Chave estrangeira: user_id referencia user(id)

10. tabela item:
     - Colunas: id, nome, descrição, custo
     - Chave primária: id
     - Índices exclusivos: nome, descrição

11. tabela comprar:
     - Colunas: id, price_at_time, create_time, item_id, user_id
     - Chave primária: id
     - Chaves estrangeiras: item_id referencia item(id), user_id referencia user(id)

12. Tabela buy_coin:
     - Colunas: buy_id, coin_id
     - Chave primária: (buy_id, coin_id)
     - Chaves estrangeiras: referências buy_id buy(id), referências coin_id coin(id)

13. tabela sessão:
     - Colunas: id, create_time, end_time_new_session_time, total_active_time, user_id
     - Chave primária: id
     - Chaves estrangeiras: end_time_new_session_time faz referência a sessão(id), user_id faz referência a user(id)

14. tabela atividade:
     - Colunas: id, nome
     - Chave primária: id

15. tabela interação:
     - Colunas: id, create_time, activity_id
     - Chave primária: id
     - Chave estrangeira: activity_id faz referência a activity(id)

16. Tabela interaction_session:
     - Colunas: interact_id, session_id
     - Chave primária: (interaction_id, session_id)
     - Chaves estrangeiras: a interação_id faz referência à interação(id), a sessão_id faz referência à sessão(id)

Esse esquema é projetado para um jogo ou uma plataforma gamificada, onde os usuários podem obter conquistas, fazer compras e ter amigos.