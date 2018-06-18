
CREATE PROCEDURE [dbo].[bk_GetFamilyMembers]
	(    
	@FamilyID INT
)    
AS
BEGIN
	SELECT
		m.MemberID,
		m.FirstName,
		m.LastName,
		m.DOB,
		m.Married,
		m.Gender,
		m.Alive,
		m.DOD,
		f.HeadOfFamilyID,
		lkm.FirstName rFirstName,
		lkm.LastName rLastName,
		lk.RelationType,
		paternal.PaternalFamilyID PaternalFamilyId,
		paternal.PaternalFamilyName PaternalFamilyName,
		paternal.PaternalFamilyAddress PaternalFamilyAddress,
		CAST(CASE WHEN mat.MemberID IS NOT NULL THEN 1 ELSE 0 END AS BIT) AS MatrimonialExists		
	FROM
		Members m 
		JOIN FamilyMemberAssociation fma ON fma.MemberId = m.MemberID
		JOIN Families f ON f.FamilyID = fma.FamilyId
		LEFT JOIN lkRelationTypes lk ON lk.RelationTypeId = fma.RelationTypeId
		LEFT JOIN Members lkm ON lkm.MemberID = fma.RelatedId
		LEFT JOIN Matrimonials mat ON mat.MemberID = m.MemberID		
		OUTER APPLY
		(
			SELECT
				PaternalFamilyID, PaternalFamilyName, PaternalFamilyAddress
			FROM
				GetPaternalFamily(m.MemberID, m.Gender, m.Married)
		) paternal
	WHERE
		fma.FamilyId = @FamilyID
END