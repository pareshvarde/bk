﻿CREATE TABLE [dbo].[Matrimonials] (
    [MatrimonialID]  INT            IDENTITY (1, 1) NOT NULL,
    [MatrimonialSID] NVARCHAR (18)  NOT NULL,
    [MemberID]       INT            NOT NULL,
    [MaternalNukh]   NVARCHAR (50)  NULL,
    [BirthTime]      TIME (7)       NULL,
    [MaritalStatus]  NVARCHAR (50)  NULL,
    [Height]         INT            NULL,
    [BodyType]       NVARCHAR (50)  NOT NULL,
    [Complexion]     NVARCHAR (50)  NOT NULL,
    [Smoke]          NVARCHAR (50)  NOT NULL,
    [Drink]          NVARCHAR (50)  NOT NULL,
    [Disability]     BIT            CONSTRAINT [DF_Matrimonials_Disability] DEFAULT ((0)) NOT NULL,
    [Diet]           NVARCHAR (50)  NOT NULL,
    [AnnualIncome]   NVARCHAR (50)  NULL,
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
