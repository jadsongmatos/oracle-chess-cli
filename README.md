# Oracle Chess Cli

como seria banco de dados com sistema de estoque pros itens?

Tabela Localização:
-UserID (chave estrangeira, representa o usuário associado a essa localização)
-Latitude
-Longitude
-Cidade
-Estado
-País

Tabela Amigos:
-AmigoID (chave primária)
-UserID1 (chave estrangeira, representa o primeiro usuário na amizade)
-UserID2 (chave estrangeira, representa o segundo usuário na amizade)
-DataDeAmizade

Tabela Conquistas:
-ConquistaID (chave primária)
-Nome
-Descrição

Tabela ConquistasUsuarios:
-UserID (chave estrangeira, representa o usuário que conquistou a conquista)
-ConquistaID (chave estrangeira, representa a conquista obtida pelo usuário)

Tabela Usuários:
-UserID (chave primária)
-Nome
-Email
-Senha

Tabela Jogadas:
-JogadaID (chave primária)
-UserID (chave estrangeira, representa o usuário que fez a jogada)
-DataDaJogada

Tabela Links:
-Id: identificador único para cada link gerado (chave primária)
-Url: URL do link gerado
-data_criacao: data de criação do link

Tabela Cliques:
-clique_id: identificador único para cada clique registrado (chave primária)
-link_id: identificador do link associado ao clique (chave estrangeira para Links)
-data_clique: data e hora em que o clique ocorreu
-informacoes_adicionais: outras informações relevantes sobre o clique (opcional)

Tabela Moedas:
-ID (chave primária)
-UserID (chave estrangeira, representa o atual dono da moeda)
-OrigemDaMoeda (por jogada ou por cliques)
-Status (disponível, transferida, usada)

Tabela Itens:
-ItemID (chave primária)
-Nome
-Descrição
-Preço

Tabela Compra:
-CompraID (chave primária)
-UserID (chave estrangeira)
-ItemID (chave estrangeira)
-PreçoNoMomentoDaCompra
-DataDaCompra

Tabela MoedasDaCompra:
-CompraID (chave estrangeira)
-MoedaID (chave estrangeira)

Tabela Sessões:
-ID da Sessão (chave primária)
-ID do Usuário (chave estrangeira que referencia ID do Usuário)
-Tempo de início da sessão
-Tempo de fim da sessão (pode ser nulo se a sessão ainda estiver ativa)
-Total tempo ativo (isto é, o total tempo que o usuário não estava AFK durante a sessão)
-Status (ativo, AFK, terminado)

Tabela Atividades (podem ser apagados quando uma nova sessão é iniciada pelo mesmo usuário):
-ID da Atividade (chave primária)
-ID da Sessão (chave estrangeira que referencia ID da Sessão)
-Tipo de atividade (movimento do mouse, pressionamento de tecla, etc.)
-Timestamp da atividade

Tabela Estoque: