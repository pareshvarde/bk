CREATE FUNCTION [dbo].[GetPaternalFamily](
	@MemberID INT,
	@Gender BIT,
	@Married BIT
) RETURNS @Result TABLE
	(
		PaternalFamilyID INT,
		PaternalFamilyName NVARCHAR(100),
		PaternalFamilyAddress NVARCHAR(100)
	)
BEGIN
	IF (@Gender = 0 AND @Married = 1)
	BEGIN
		INSERT INTO @Result
			SELECT 
				tFamily.FamilyID, thof.FirstName + ' ' + thof.LastName FamilyName, tFamily.City + ', ' + tFamily.State FamilyAddress
			FROM 
				FamilyMemberAssociation tfma 
				JOIN Families tf ON tf.FamilyID = tfma.FamilyId
				JOIN Members tm on tm.MemberID = tfma.MemberID
				JOIN Families tFamily ON tFamily.FamilyID = tfma.FamilyId
				JOIN Members thof ON thof.MemberID = tFamily.HeadOfFamilyID
			WHERE
				tfma.RelationTypeID = 2
				AND tm.Gender = 0
				AND tm.Married = 1
				AND tm.MemberID = @MemberID
	END

	RETURN	
END