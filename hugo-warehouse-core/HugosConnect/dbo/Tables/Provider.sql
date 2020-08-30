CREATE TABLE [dbo].[Provider]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Name] NVARCHAR(60) NOT NULL,
	[CreatedOn] DateTime DEFAULT GETDATE(),
)
