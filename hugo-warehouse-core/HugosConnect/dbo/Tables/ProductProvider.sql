CREATE TABLE [dbo].[ProductProvider]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [ProdiverId] INT NOT NULL FOREIGN KEY REFERENCES Provider(Id), 
    [ProductId] INT NOT NULL FOREIGN KEY REFERENCES Product(Id), 
)
