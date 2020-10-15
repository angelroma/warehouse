CREATE TABLE [dbo].[Category] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (25)  NOT NULL,
    [Description] NVARCHAR (250) NOT NULL,
    [Active]      BIT            CONSTRAINT [DF__Category__Active__30F848ED] DEFAULT ((1)) NULL,
    [CreatedOn]   DATETIME       CONSTRAINT [DF_Category_CreatedOn] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED ([Id] ASC)
);



