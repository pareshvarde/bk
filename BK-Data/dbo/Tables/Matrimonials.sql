CREATE TABLE [dbo].[Matrimonials] (
    [MatrimonialID]    INT            IDENTITY (1, 1) NOT NULL,
    [MemberID]         INT            NOT NULL,
    [MaternalNukhID]   INT            NOT NULL,
    [BirthTime]        TIME (7)       NULL,
    [MaritalStatusID]  INT            NOT NULL,
    [Height]           INT            NOT NULL,
    [Weight]           INT            NOT NULL,
    [BodyTypeID]       INT            NOT NULL,
    [ComplexionTypeID] INT            NOT NULL,
    [Smoke]            BIT            CONSTRAINT [DF_Matrimonials_Smoke] DEFAULT ((0)) NOT NULL,
    [Tobacco]          BIT            CONSTRAINT [DF_Matrimonials_Tobacco] DEFAULT ((0)) NOT NULL,
    [Alcohol]          BIT            CONSTRAINT [DF_Matrimonials_Drink] DEFAULT ((0)) NOT NULL,
    [Disability]       BIT            CONSTRAINT [DF_Matrimonials_Disability] DEFAULT ((0)) NOT NULL,
    [Vegetarian]       BIT            CONSTRAINT [DF_Matrimonials_Vegetarian] DEFAULT ((1)) NOT NULL,
    [OwnHome]          BIT            CONSTRAINT [DF_Matrimonials_OwnHome] DEFAULT ((0)) NOT NULL,
    [Mangal]          CHAR (1)       CONSTRAINT [DF_Matrimonials_Manglik] DEFAULT ('N') NOT NULL,
    [MonthlyIncome]    INT            NOT NULL,
    [Language]         NVARCHAR (50)  NULL,
    [ProfileText]      NVARCHAR (255) NULL,
    [CreatedOn]        DATETIME2 (7)  CONSTRAINT [DF_Matrimonials_AddedOn] DEFAULT (getdate()) NULL,
    [CreatedBy]        INT            NULL,
    [ModifiedOn]       DATETIME2 (7)  NULL,
    [ModifiedBy]       INT            NULL,
    [ExpiresOn]        DATETIME2 (7)  NULL,
    CONSTRAINT [PK_Matrimonials] PRIMARY KEY CLUSTERED ([MatrimonialID] ASC),
    CONSTRAINT [FK_Matrimonials_Members] FOREIGN KEY ([MemberID]) REFERENCES [dbo].[Members] ([MemberID])
);











