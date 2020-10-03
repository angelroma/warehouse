﻿CREATE TABLE [dbo].[Provider]
(
	[Id] INT NOT NULL PRIMARY KEY  IDENTITY(1, 1),
    [Name] NVARCHAR(60) NOT NULL,
    [Active] BIT NOT NULL DEFAULT 1, 
	[CreatedOn] DateTime DEFAULT GETDATE(),
)
