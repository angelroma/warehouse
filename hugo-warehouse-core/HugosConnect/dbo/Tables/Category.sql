CREATE TABLE [dbo].[Category] (
    [Id]        INT        NOT NULL IDENTITY(1, 1) ,
    [Name]      NVARCHAR(25) NOT NULL,
    [Description] nvarchar(250) NOT NULL,
    [CreatedOn] DATETIME   CONSTRAINT [DF_Category_CreatedOn] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED ([Id] ASC)
);

