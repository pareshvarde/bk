CREATE TABLE [dbo].[Matrimonials] (
    [MatrimonialID]  INT            IDENTITY (1, 1) NOT NULL,
    [MemberID]       INT            NOT NULL,
    [MaternalNukhID] INT            NOT NULL,
    [BirthTime]      TIME (7)       NULL,
    [MaritalStatus]  NVARCHAR (50)  NULL,
    [Height]         INT            NOT NULL,
    [Weight]         INT            NOT NULL,
    [BodyType]       NVARCHAR (50)  NOT NULL,
    [Complexion]     NVARCHAR (50)  NOT NULL,
    [Smoke]          BIT            CONSTRAINT [DF_Matrimonials_Smoke] DEFAULT ((0)) NOT NULL,
    [Tobacco]        BIT            CONSTRAINT [DF_Matrimonials_Tobacco] DEFAULT ((0)) NOT NULL,
    [Drink]          BIT            CONSTRAINT [DF_Matrimonials_Drink] DEFAULT ((0)) NOT NULL,
    [Disability]     BIT            CONSTRAINT [DF_Matrimonials_Disability] DEFAULT ((0)) NOT NULL,
    [Diet]           NVARCHAR (50)  NOT NULL,
    [MonthlyIncome]  INT            NULL,
    [Language]       NVARCHAR (50)  NULL,
    [ProfileText]    NVARCHAR (255) NULL,
    [CreatedOn]      DATETIME2 (7)  CONSTRAINT [DF_Matrimonials_AddedOn] DEFAULT (getdate()) NULL,
    [CreatedBy]      INT            NULL,
    [ModifiedOn]     DATETIME2 (7)  NULL,
    [ModifiedBy]     INT            NULL,
    [ExpiresOn]      DATETIME2 (7)  NULL,
    CONSTRAINT [PK_Matrimonials] PRIMARY KEY CLUSTERED ([MatrimonialID] ASC),
    CONSTRAINT [FK_Matrimonials_Members] FOREIGN KEY ([MemberID]) REFERENCES [dbo].[Members] ([MemberID])
);







