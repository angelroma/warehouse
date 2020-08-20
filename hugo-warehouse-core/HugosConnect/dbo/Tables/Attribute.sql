CREATE TABLE [dbo].[Attribute] (
    [Id]          INT        NOT NULL IDENTITY(1, 1),
    [Name]        NVARCHAR(76) NOT NULL,
    [Description] TEXT       NOT NULL,
    CONSTRAINT [PK_Attribute] PRIMARY KEY CLUSTERED ([Id] ASC)
);

