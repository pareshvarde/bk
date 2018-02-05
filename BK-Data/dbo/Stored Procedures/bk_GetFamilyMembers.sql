
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
		f.HeadOfFamilyID,
		lkm.FirstName rFirstName,
		lkm.LastName rLastName,
		lk.RelationType
	FROM
		Members m 
		JOIN FamilyMemberAssociation fma ON fma.MemberId = m.MemberID
		JOIN Families f ON f.FamilyID = fma.FamilyId
		LEFT JOIN lkRelationTypes lk ON lk.RelationTypeId = fma.RelationTypeId
		LEFT JOIN Members lkm ON lkm.MemberID = fma.RelatedId
	WHERE
		fma.FamilyId = @FamilyID
END