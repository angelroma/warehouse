CREATE TABLE [dbo].[Operation] (
    [Id]              INT      NOT NULL IDENTITY(1, 1),
    [OperationTypeId] INT      NOT NULL,
    [UserId]          INT      NOT NULL,
    [ProductId]       INT      NOT NULL,
    [Description]     NVARCHAR(15)     NOT NULL,
    [Quantity]        INT      NOT NULL,
    [CreatedOn]       DATETIME CONSTRAINT [DF_Operation_CreatedOn] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_Operation] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Operation_Has_OperationType] FOREIGN KEY ([Id]) REFERENCES [dbo].[OperationType] ([Id]),
    CONSTRAINT [FK_Operation_Has_Product] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product] ([Id]),
    CONSTRAINT [FK_Operation_Has_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([Id])
);

