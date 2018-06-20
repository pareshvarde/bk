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
				tf.FamilyID, thof.FirstName + ' ' + thof.LastName FamilyName, tf.City + ', ' + tf.State FamilyAddress
			FROM 
				FamilyMemberAssociation tfma 
				JOIN Families tf ON tf.FamilyID = tfma.FamilyId
				JOIN Members tm on tm.MemberID = tfma.MemberID				
				JOIN Members thof ON thof.MemberID = tf.HeadOfFamilyID
				JOIN FamilyMemberAssociation tfma1 ON tfma1.MemberId = tfma.RelatedId
			WHERE
				tfma.RelationTypeID = 2				
				AND tm.Gender = 0
				AND tm.Married = 1
				AND tm.MemberID = @MemberID
				AND tfma1.DefaultFamily = 1
	END

	RETURN	
END