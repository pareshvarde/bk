CREATE PROCEDURE [dbo].[bk_DeleteFamily]
(    
	@FamilyID INT
)    
AS
BEGIN
	
	DECLARE @Members TABLE(
		MemberID INT,	
		CanDelete BIT,
		WasDefault BIT, --use this to make member default in another family since this family is being deleted
		NewDefaultFamily INT
	)

	INSERT INTO @Members (MemberID, CanDelete, WasDefault)
		SELECT MemberId, 1, DefaultFamily From FamilyMemberAssociation WHERE FamilyId = @FamilyID
	
	--mark cannot delete is member is part of another family as approved member
	UPDATE m
		SET m.CanDelete = 0
	FROM @Members m
	JOIN 
		(
			SELECT fma.MemberId
			FROM 
				FamilyMemberAssociation fma
				JOIN @Members m ON m.MemberID = fma.MemberId
			WHERE 
				fma.FamilyId <> @FamilyID AND fma.Approved = 1

		) t ON t.MemberId = m.MemberID

	DELETE FROM FamilyMemberAssociation WHERE FamilyId = @FamilyID
			
	DELETE FROM Families WHERE FamilyID = @FamilyID

	--delete matrimonial entry for member if he is being deleted 
	DELETE m 
	FROM 
		Matrimonials m
		JOIN @Members tm ON tm.MemberID = m.MemberID
	WHERE
		tm.CanDelete = 1	

	--if member being deleted is shown as related to someone clear that
	--this could be when member being deleted is unapproved member in other family
	UPDATE fma
		SET fma.RelatedId = NULL, RelationTypeId = NULL
	FROM
		FamilyMemberAssociation fma
		JOIN @Members m ON fma.RelatedId = m.MemberID	
	WHERE
		m.CanDelete = 1

	--delete member if they are not part of any other family as approved member
	DELETE m 
	FROM 
		Members m
		JOIN @Members tm ON tm.MemberID = m.MemberID
	WHERE
		tm.CanDelete = 1		

	--find another family to make member default there
	UPDATE 
		m
	SET 
		m.NewDefaultFamily = fam.FamilyId
	FROM 
		@Members m
		CROSS APPLY (SELECT TOP 1 FamilyID FROM FamilyMemberAssociation tfma WHERE tfma.FamilyId <> @FamilyID AND tfma.MemberId = m.MemberID AND tfma.Approved = 1) fam

	--mark member default to another family if they were default in family deleted
	UPDATE
		fma
	SET
		fma.DefaultFamily = 1
	FROM
		FamilyMemberAssociation fma
		JOIN @Members m ON m.MemberID = fma.MemberId AND m.NewDefaultFamily = fma.FamilyId
	WHERE
		m.WasDefault = 1
END