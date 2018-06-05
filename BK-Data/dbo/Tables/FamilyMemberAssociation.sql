﻿CREATE TABLE [dbo].[FamilyMemberAssociation] (
    [FamilyId]       INT           NOT NULL,
    [MemberId]       INT           NOT NULL,
    [DefaultFamily]  BIT           CONSTRAINT [DF_FamilyMemberAssociation_Default] DEFAULT ((0)) NOT NULL,
    [Approved]       BIT           CONSTRAINT [DF__tmp_ms_xx__Appro__40058253] DEFAULT ((0)) NOT NULL,
    [RelatedId]      INT           NULL,
    [RelationTypeId] INT           NULL,
    [ApprovedOn]     DATETIME2 (7) NULL,
    [ApprovedBy]     INT           NULL,
    [CreatedOn]      DATETIME2 (7) CONSTRAINT [DF_FamilyMemberAssociation_CreatedOn] DEFAULT (getdate()) NOT NULL,
    [CreatedBy]      INT           NOT NULL,
    CONSTRAINT [PK_FamilyMemberAssociation] PRIMARY KEY CLUSTERED ([FamilyId] ASC, [MemberId] ASC),
    CONSTRAINT [FK_FamilyMemberAssociation_Families] FOREIGN KEY ([FamilyId]) REFERENCES [dbo].[Families] ([FamilyID]),
    CONSTRAINT [FK_FamilyMemberAssociation_lkRelationTypes] FOREIGN KEY ([RelationTypeId]) REFERENCES [dbo].[lkRelationTypes] ([RelationTypeId]),
    CONSTRAINT [FK_FamilyMemberAssociation_Members] FOREIGN KEY ([MemberId]) REFERENCES [dbo].[Members] ([MemberID]),
    CONSTRAINT [FK_FamilyMemberAssociation_Related] FOREIGN KEY ([RelatedId]) REFERENCES [dbo].[Members] ([MemberID])
);









