CREATE PROCEDURE [dbo].[bk_PendingApprovals]
(    
	@MemberID INT
)    
AS
BEGIN
	SELECT 
		m.MemberID AddedById,
		m.FirstName AddedByFirstName,
		m.LastName AddedByLastName,
		m2.MemberID AddedToId,
		m2.FirstName AddedToFirstName,
		m2.LastName AddedToLastName,
		fma.CreatedOn AddedOn,
		fma.FamilyId
	FROM 
		FamilyMemberAssociation fma	
		JOIN Members m on m.MemberID = fma.CreatedBy
		JOIN Members m2 ON m2.MemberID = fma.MemberId
		JOIN FamilyMemberAssociation fma2 ON fma2.MemberId = m2.MemberID AND fma2.Approved = 1	
		CROSS APPLY
		(
			SELECT FamilyId
			FROM FamilyMemberAssociation tfma
			WHERE
				tfma.MemberId = @MemberID 
				AND Approved = 1
				AND tfma.FamilyId = fma2.FamilyId
		) t
	WHERE
		fma.Approved = 0		
END