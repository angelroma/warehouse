﻿CREATE TABLE [dbo].[Provider]
(
	[Id] INT NOT NULL PRIMARY KEY  IDENTITY(1, 1),
    [Name] NVARCHAR(60) NOT NULL,
	[CreatedOn] DateTime DEFAULT GETDATE(),
)
