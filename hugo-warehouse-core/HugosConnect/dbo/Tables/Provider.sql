CREATE TABLE [dbo].[Provider] (
    [Id]        INT           IDENTITY (1, 1) NOT NULL,
    [Name]      NVARCHAR (60) NOT NULL,
    [Active]    BIT           CONSTRAINT [DF__Provider__Active__3D5E1FD2] DEFAULT ((1)) NULL,
    [CreatedOn] DATETIME      CONSTRAINT [DF__Provider__Create__3E52440B] DEFAULT (getdate()) NULL,
    CONSTRAINT [PK__Provider__3214EC072AAFBF37] PRIMARY KEY CLUSTERED ([Id] ASC)
);


