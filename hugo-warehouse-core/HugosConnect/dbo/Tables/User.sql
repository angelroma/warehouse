CREATE TABLE [dbo].[User] (
    [Id]         INT            IDENTITY (1, 1) NOT NULL,
    [RoleId]     INT            NOT NULL,
    [Name]      NVARCHAR (205)  NOT NULL,
    [Age]        INT            NOT NULL,
    [Email]      NVARCHAR (255) NOT NULL,
    [Password]   NVARCHAR (350) NOT NULL,
    [UserName]   NVARCHAR (25)  NOT NULL,
    [Active] BIT NOT NULL DEFAULT 1, 
    [CreatedOn]  DATETIME       CONSTRAINT [DF_User_CreatedOn] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_User_Has_Role] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Role] ([Id])
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'A user needs to have at least one role', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'User', @level2type = N'CONSTRAINT', @level2name = N'FK_User_Has_Role';

