CREATE PROCEDURE [dbo].[bk_DeleteMember]
(    
	@FamilyID INT,
	@MemberID INT
)    
AS
BEGIN
	
	DECLARE @ApprovedCount INT --indicates in how many families this member is approved member other than current family
	DECLARE @UnApprovedCount INT --indicates in how many families this member is unapproved member other than current family
	DECLARE @DefaultInFamily BIT --if this member is default member in current family
	
	SELECT @DefaultInFamily = DefaultFamily FROM FamilyMemberAssociation WHERE FamilyId = @FamilyID AND MemberId = @MemberID

	DELETE FROM FamilyMemberAssociation WHERE FamilyId = @FamilyID AND MemberId = @MemberID

	SELECT 
		@ApprovedCount = COUNT(CASE WHEN Approved = 1 THEN 1 ELSE NULL END),
		@UnApprovedCount = COUNT(CASE WHEN Approved = 0 THEN 1 ELSE NULL END)   
	FROM 
		FamilyMemberAssociation 
	WHERE 
		MemberId = @MemberID 
		AND FamilyId <> @FamilyID

	IF (@ApprovedCount = 0 AND @UnApprovedCount > 0)
	BEGIN
		DELETE FROM FamilyMemberAssociation WHERE MemberId = @MemberID		
	END

	IF (@ApprovedCount = 0)
	BEGIN
		DELETE FROM Matrimonials WHERE MemberID = @MemberID
		UPDATE FamilyMemberAssociation SET RelatedId = NULL, RelationTypeId = NULL WHERE RelatedId = @MemberID
		DELETE FROM Members WHERE MemberID = @MemberID
	END
	ELSE IF (@DefaultInFamily = 1) --if memeber is deleted from default family make him default in another family
	BEGIN
		DECLARE @fID INT
		SELECT TOP 1 @fID = FamilyId FROM FamilyMemberAssociation WHERE MemberId = @MemberID AND Approved = 1
		IF (@fID > 0)
			UPDATE FamilyMemberAssociation SET DefaultFamily = 1 WHERE FamilyId = @fID AND MemberId = @MemberID
	END
			
END