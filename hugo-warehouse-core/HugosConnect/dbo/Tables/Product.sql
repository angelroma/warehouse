CREATE TABLE [dbo].[Product] (
    [Id]          INT         NOT NULL IDENTITY(1, 1),
    [Name]        NVARCHAR(255) NOT NULL,
    [CreatedOn]   DATETIME    CONSTRAINT [DF_Product_CreatedOn] DEFAULT (getdate()) NOT NULL,
    [Description] TEXT        NOT NULL,
    [CategoryId]  INT         NOT NULL,
    [Price]       FLOAT (53)  NOT NULL,
    CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Product_Has_Category] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Category] ([Id])
);

