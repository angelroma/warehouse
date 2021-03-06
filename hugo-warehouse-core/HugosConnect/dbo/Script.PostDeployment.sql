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

Insert Into dbo.Role ([Name])
Values 
('developer')
,('admin')
,('almacen')

INSERT INTO dbo.[User]
(
    Name,
    Age,
    Email,
    Password,
    UserName,
    RoleId
)
VALUES
(
    'Miguel Angel Rodriguez Martinez', 
    25, 
    'an.coderoma@gmail.com', 
    '$2a$11$Nt1uNz3Qj8FZjK4laV50XOFE60ZVCxRjiH3hQ7Lym5zvWw2tcoLAu',
    'angelroma',
    1
)


INSERT INTO dbo.Category
(
    --Id - column value is auto-generated
    Name,
    Description,
    CreatedOn
)
VALUES
(
    -- Id - int
    N'Manufactura', -- Name - nvarchar
    N'Productos utilizados para la creacion de nuevos terminados', -- Description - nvarchar
    '2020-08-30 14:32:21' -- CreatedOn - datetime
),
(
    -- Id - int
    N'Utensilios', -- Name - nvarchar
    N'Productos utilizados por los maquiladores', -- Description - nvarchar
    '2020-08-30 14:32:21' -- CreatedOn - datetime
)

INSERT dbo.Provider
(
    Name,
    CreatedOn
)
VALUES
(
    N'Grupo Garcia', -- Name - nvarchar
    '2020-08-30 15:20:17' -- CreatedOn - datetime
)

INSERT dbo.Provider
(
    Name,
    CreatedOn
)
VALUES
(
    N'Telas Textiles De Puebla SA de CV', -- Name - nvarchar
    '2020-08-30 15:20:17' -- CreatedOn - datetime
)


INSERT INTO dbo.Product
(
    --Id - column value is auto-generated
    CategoryId,
    ProviderId,
    Name,
    Description,
    Price,
    Sku,
    Color,
    Size,
    Weight,
    Precision,
    Brand,
    CreatedOn
)
VALUES
(
    -- Id - int
    1, -- CategoryId - int
    1, -- ProviderId - int
    N'Hilo CA1', -- Name - nvarchar
    'Hilo Terminado De 4X4 y Punto 33', -- Description - text
    32.0, -- Price - float
    N'FDSSJJ453', -- Sku - nvarchar
    N'Blanco', -- Color - nvarchar
    32.4, -- Size - float
    12.0, -- Weight - float
    1.1, -- Precision - float
    N'Hilos De Garcia', -- Brand - nvarchar
    '2020-08-30 14:31:58' -- CreatedOn - datetime
)
,
(
    -- Id - int
    2, -- CategoryId - int
    2, -- ProviderId - int
    N'Tijeras Filo Doblew', -- Name - nvarchar
    'Tijeras Marca Acme De Filo Doble', -- Description - text
    32.0, -- Price - float
    N'FDSSJJ453', -- Sku - nvarchar
    N'Blanco', -- Color - nvarchar
    32.4, -- Size - float
    12.0, -- Weight - float
    1.1, -- Precision - float
    N'Acme', -- Brand - nvarchar
    '2020-08-30 14:31:58' -- CreatedOn - datetime
)

Insert Into [HugosConnect].[dbo].[OperationType] ([Name])
Values (N'agregar')
,(N'eliminar')