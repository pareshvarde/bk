CREATE TABLE [dbo].[lkRelationTypes] (
    [RelationTypeId] INT           NOT NULL,
    [RelationType]   NVARCHAR (20) NOT NULL,
    CONSTRAINT [PK_lkRelationTypes] PRIMARY KEY CLUSTERED ([RelationTypeId] ASC)
);

