CREATE TABLE [dbo].[Product] (
    [Id]           INT            IDENTITY (1, 1) NOT NULL,
    [CategoryId]   INT            NOT NULL,
    [ProviderId]   INT            NULL,
    [Name]         NVARCHAR (255) NOT NULL,
    [Description]  TEXT           NOT NULL,
    [Price]        FLOAT (53)     CONSTRAINT [DF__Product__Price__33D4B598] DEFAULT ((0.0)) NOT NULL,
    [Sku]          NVARCHAR (25)  CONSTRAINT [DF__Product__Sku__34C8D9D1] DEFAULT ('Unkown') NOT NULL,
    [Color]        NVARCHAR (30)  CONSTRAINT [DF__Product__Color__35BCFE0A] DEFAULT ('Unkown') NOT NULL,
    [Size]         FLOAT (53)     CONSTRAINT [DF__Product__Size__36B12243] DEFAULT ((0.0)) NOT NULL,
    [Weight]       FLOAT (53)     CONSTRAINT [DF__Product__Weight__37A5467C] DEFAULT ((0.0)) NOT NULL,
    [Precision]    NVARCHAR (12)  CONSTRAINT [DF__Product__Precisi__38996AB5] DEFAULT ((0.0)) NOT NULL,
    [Brand]        NVARCHAR (45)  CONSTRAINT [DF__Product__Brand__398D8EEE] DEFAULT ('Unkown') NOT NULL,
    [CurrentTotal] INT            CONSTRAINT [DF__Product__Current__3A81B327] DEFAULT ((0)) NOT NULL,
    [Active]       BIT            CONSTRAINT [DF__Product__Active__3B75D760] DEFAULT ((1)) NULL,
    [CreatedOn]    DATETIME       CONSTRAINT [DF_Product_CreatedOn] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK__Product__Provide__440B1D61] FOREIGN KEY ([ProviderId]) REFERENCES [dbo].[Provider] ([Id]),
    CONSTRAINT [FK_Product_Has_Category] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Category] ([Id])
);



