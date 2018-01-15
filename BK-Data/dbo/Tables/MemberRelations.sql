CREATE TABLE [dbo].[MemberRelations] (
    [MemberId]        INT           NOT NULL,
    [RelatedMemberId] INT           NOT NULL,
    [RelationTypeId]  INT           NOT NULL,
    [CreatedOn]       DATETIME2 (7) CONSTRAINT [DF_MemberRelations_CreatedOn] DEFAULT (getdate()) NOT NULL,
    [CreatedBy]       INT           NOT NULL,
    CONSTRAINT [PK_MemberRelations] PRIMARY KEY CLUSTERED ([MemberId] ASC, [RelatedMemberId] ASC),
    CONSTRAINT [FK_MemberRelations_lkRelationTypes] FOREIGN KEY ([RelationTypeId]) REFERENCES [dbo].[lkRelationTypes] ([RelationTypeId]),
    CONSTRAINT [FK_MemberRelations_Members] FOREIGN KEY ([MemberId]) REFERENCES [dbo].[Members] ([MemberID])
);

