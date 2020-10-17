CREATE TABLE [dbo].[Operation] (
    [Id]              INT           IDENTITY (1, 1) NOT NULL,
    [OperationTypeId] INT           NOT NULL,
    [UserId]          INT           NULL,
    [ProductId]       INT           NULL,
    [Description]     VARCHAR (250) NOT NULL,
    [Quantity]        INT           NOT NULL,
    [CreatedOn]       DATETIME      CONSTRAINT [DF_Operation_CreatedOn] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_Operation] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Operation_Has_Product] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product] ([Id]),
    CONSTRAINT [FK_Operation_Has_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([Id]) ON DELETE SET NULL
);





