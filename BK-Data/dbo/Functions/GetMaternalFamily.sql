CREATE FUNCTION [dbo].[GetMaternalFamily](
	@MemberID INT	
) RETURNS @Result TABLE
	(
		MaternalFamilyID INT,
		MaternalFamilyName NVARCHAR(100),
		MaternalFamilyAddress NVARCHAR(100)
	)
BEGIN
	--find parent
	DECLARE @parentId INT
	DECLARE @motherId INT
	DECLARE @parentGender BIT
	
	SELECT 
		@parentId = RelatedId,
		@parentGender = m.Gender
	FROM 
		FamilyMemberAssociation fma
		JOIN Members m ON m.MemberID = fma.RelatedId
	WHERE 
	    fma.MemberId= @MemberID 
		AND fma.RelationTypeId IN (1,2)		
		AND fma.RelatedId IS NOT NULL

	--current member has set as daughter of/wife of father, find mother from father	
	IF (@parentGender = 1)
	BEGIN
		SELECT
			@motherId = MemberId			
		FROM	
			FamilyMemberAssociation fma
		WHERE
			fma.RelatedId = @parentId 
			AND fma.RelationTypeId = 3						
	END
	ELSE
	BEGIN
		SET @motherId = @parentId
	END

	INSERT INTO @Result
		SELECT *FROM GetPaternalFamily(@motherId, 0,  2)
	
	RETURN	
END