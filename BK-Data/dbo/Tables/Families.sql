CREATE TABLE [dbo].[Families] (
    [FamilyID]       INT           IDENTITY (1, 1) NOT NULL,
    [NukhID]         INT           NOT NULL,
    [CategoryID]     INT           NOT NULL,
    [HeadOfFamilyID] INT           NOT NULL,
    [Address1]       NVARCHAR (50) NULL,
    [Address2]       NVARCHAR (50) NULL,
    [District]       NVARCHAR (50) NULL,
    [City]           NVARCHAR (50) NOT NULL,
    [State]          NVARCHAR (50) NOT NULL,
    [PostalCode]     NVARCHAR (10) NOT NULL,
    [Country]        NVARCHAR (50) NULL,
    [CreatedOn]      DATETIME2 (7) CONSTRAINT [DF_Families_AddedOn] DEFAULT (getdate()) NULL,
    [CreatedBy]      INT           NULL,
    [ModifiedOn]     DATETIME2 (7) NULL,
    [ModifiedBy]     INT           NULL,
    CONSTRAINT [PK_Families] PRIMARY KEY CLUSTERED ([FamilyID] ASC),
    CONSTRAINT [FK_Families_HeadOfFamily] FOREIGN KEY ([HeadOfFamilyID]) REFERENCES [dbo].[Members] ([MemberID])
);







