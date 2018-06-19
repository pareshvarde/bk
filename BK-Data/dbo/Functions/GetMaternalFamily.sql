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
	DECLARE @parentGender CHAR(1)

	SELECT 
		@parentId = RelatedId,
		@parentGender = m.Gender
	FROM 
		FamilyMemberAssociation fma
		JOIN Members m ON m.MemberID = fma.RelatedId
	WHERE 
	    fma.MemberId= @MemberID AND RelationTypeId IN (1,2)

	--current member has set as daughter of/wife of father, find mother from father	
	IF (@parentGender = 'M')
	BEGIN
		SELECT
			@parentId = MemberId
		FROM	
			FamilyMemberAssociation fma
		WHERE
			fma.RelatedId = @parentId AND RelationTypeId = 3
	END

	INSERT INTO @Result
		SELECT *FROM GetPaternalFamily(@parentId, 'F',  1)
	
	RETURN	
END