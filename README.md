# oracle-chess-cli

Tabela Usuários:
-UserID (chave primária)
-Nome

Tabela Moedas:
-MoedaID (chave primária)
-UserID (chave estrangeira, representa o atual dono da moeda)
-Status (disponível, transferida, usada)

Tabela Itens:
-ItemID (chave primária)
-Nome
-Descrição
-Preço

Tabela Transferências:
-TransferênciaID (chave primária)
-CompraID (chave estrangeira)
-MoedaID (chave estrangeira)

Tabela Compras:
-CompraID (chave primária)
-UserID (chave estrangeira)
-ItemID (chave estrangeira)
-PreçoNoMomentoDaCompra
-DataDaCompra

esse modelo está na 3 forma normal ?