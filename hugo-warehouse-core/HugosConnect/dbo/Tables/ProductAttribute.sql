CREATE TABLE [dbo].[ProductAttribute] (
    [ProductId]   INT         NOT NULL IDENTITY(1, 1),
    [AttributeId] INT         NOT NULL,
    [Value]       NVARCHAR(210) NOT NULL,
    CONSTRAINT [FK_ProductAttribute_Attribute] FOREIGN KEY ([AttributeId]) REFERENCES [dbo].[Attribute] ([Id]),
    CONSTRAINT [FK_ProductAttribute_Product] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product] ([Id])
);

