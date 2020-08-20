CREATE TABLE [dbo].[OperationType] (
    [Id]   INT        NOT NULL IDENTITY(1, 1),
    [Name] NVARCHAR(15) NOT NULL,
    CONSTRAINT [PK_OperationType] PRIMARY KEY CLUSTERED ([Id] ASC)
);

