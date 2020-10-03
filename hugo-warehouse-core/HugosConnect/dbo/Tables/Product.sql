CREATE TABLE [dbo].[Product] (
    [Id]          INT         NOT NULL IDENTITY(1, 1),
    [CategoryId]  INT         NOT NULL,
    [ProviderId] INT FOREIGN KEY REFERENCES Provider(Id),
    [Name]        NVARCHAR(255) NOT NULL,
    [Description] TEXT        NOT NULL,
    [Price] FLOAT NOT NULL DEFAULT 0.0,
    [Sku] NVARCHAR(25) NOT NULL DEFAULT 'Unkown',
    [Color] NVARCHAR(30) NOT NULL DEFAULT 'Unkown',
    [Size] float NOT NULL DEFAULT 0.0,
    [Weight] FLOAT NOT NULL DEFAULT 0.0,
    [Precision] float NOT NULL DEFAULT 0.0,
    [Brand] NVARCHAR(45) NOT NULL DEFAULT 'Unkown',
    [CurrentTotal] INT NOT NULL DEFAULT 0,
    [Active] BIT NOT NULL DEFAULT 1, 
    [CreatedOn]   DATETIME    CONSTRAINT [DF_Product_CreatedOn] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Product_Has_Category] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Category] ([Id])
);

