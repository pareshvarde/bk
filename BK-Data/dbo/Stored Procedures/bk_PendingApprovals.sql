CREATE PROCEDURE [dbo].[bk_PendingApprovals]
(    
	@FamilyID INT
)    
AS
BEGIN
	SELECT 
		m.MemberID AddedById,
		m.FirstName AddedByFirstName,
		m.LastName AddedByLastName,
		fma.CreatedOn AddedOn,
		fma.FamilyId
	FROM 
		FamilyMemberAssociation fma	
		JOIN Members m on m.MemberID = fma.CreatedBy
		JOIN Members m2 ON m2.MemberID = fma.MemberId
		CROSS APPLY 
		(
			SELECT 
				TOP 1 tfma.FamilyId
			FROM 
				FamilyMemberAssociation tfma
				JOIN Members tm ON tm.MemberID = tfma.MemberId
			WHERE
				tfma.MemberId = fma.MemberId
				AND tfma.Approved = 1
				AND tfma.FamilyId = @FamilyID
		) t
	WHERE
		fma.Approved = 0				
END