CREATE FUNCTION [dbo].[GetPaternalFamily](
	@MemberID INT,
	@Gender BIT,
	@MaritalStatusID INT
) RETURNS @Result TABLE
	(
		PaternalFamilyID INT,
		PaternalFamilyName NVARCHAR(100),
		PaternalFamilyAddress NVARCHAR(100)
	)
BEGIN
	DECLARE @ParentId INT

	SELECT @ParentId = fma.RelatedId FROM FamilyMemberAssociation fma WHERE fma.MemberId = @MemberID AND fma.RelationTypeId IN (1,2) AND fma.RelatedId IS NOT NULL

	IF (@ParentId > 0)
	BEGIN
		INSERT INTO @Result
			SELECT 
				f.FamilyID, m.FirstName + ' ' + m.LastName FamilyName, f.City + ', ' + f.State FamilyAddress
			FROM 
				FamilyMemberAssociation fma 
				JOIN Families f on f.FamilyID = fma.FamilyId
				JOIN Members m on m.MemberID = fma.MemberId
			WHERE
				m.MemberID = @ParentId
				and fma.DefaultFamily = 1 	
	END		

	RETURN	
END