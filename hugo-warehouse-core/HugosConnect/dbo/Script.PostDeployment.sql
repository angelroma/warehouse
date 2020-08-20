﻿/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

Insert Into dbo.Role ([Id],[Name])
Values 
(1, 'developer')
,(2, 'admin')
,(3,'almacen')

INSERT INTO dbo.[User]
(
    FirstName,
    MiddleName,
    LastName,
    Age,
    Email,
    Password,
    UserName,
    RoleId
)
VALUES
(
    'Miguel Angel', 
    'Rodriguez',
    'Martinez', 
    25, 
    'an.coderoma@gmail.com', 
    'Mente!0Unica',
    'angelroma',
    1
)