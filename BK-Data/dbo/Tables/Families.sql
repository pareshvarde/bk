CREATE TABLE [dbo].[Families] (
    [FamilyID]       INT            IDENTITY (1, 1) NOT NULL,
    [ParentFamilyID] INT            NULL,
    [FamilySID]      NVARCHAR (18)  NOT NULL,
    [Nukh]           NVARCHAR (50)  NOT NULL,
    [Category]       NVARCHAR (50)  NOT NULL,
    [Phone1]         NVARCHAR (15)  NULL,
    [Phone2]         NVARCHAR (15)  NULL,
    [Address1]       NVARCHAR (50)  NOT NULL,
    [Address2]       NVARCHAR (50)  NULL,
    [City]           NVARCHAR (50)  NOT NULL,
    [State]          NVARCHAR (50)  NOT NULL,
    [PostalCode]     NVARCHAR (10)  NOT NULL,
    [Country]        NVARCHAR (50)  NULL,
    [Website]        NVARCHAR (100) NULL,
    [CreatedOn]      DATETIME2 (7)  CONSTRAINT [DF_Families_AddedOn] DEFAULT (getdate()) NOT NULL,
    [CreatedBy]      DATETIME2 (7)  NOT NULL,
    [ModifiedOn]     DATETIME2 (7)  NULL,
    [ModifiedBy]     INT            NULL,
    CONSTRAINT [PK_Families] PRIMARY KEY CLUSTERED ([FamilyID] ASC)
);

