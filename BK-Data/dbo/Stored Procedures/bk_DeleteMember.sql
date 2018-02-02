CREATE PROCEDURE [dbo].[bk_DeleteMember]
(    
	@FamilyID INT,
	@MemberID INT
)    
AS
BEGIN
	
	DECLARE @ApprovedCount INT
	DECLARE @UnApprovedCount INT	
	
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
		DELETE FROM Members WHERE MemberID = @MemberID
	END
			
END