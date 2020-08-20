CREATE TABLE [dbo].[Role] (
    [Id]        INT           IDENTITY (1, 1) NOT NULL,
    [Name]      NVARCHAR (15) NOT NULL,
    [CreatedOn] DATETIME      CONSTRAINT [DF_Role_CreatedOn] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [Unique_RoleName] UNIQUE NONCLUSTERED ([Name] ASC)
);



