
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
		m.MaritalStatusID,
		m.Gender,
		m.Alive,
		m.DOD,
		f.HeadOfFamilyID,
		lkm.FirstName rFirstName,
		lkm.LastName rLastName,
		fma.RelationTypeId,
		paternal.PaternalFamilyID PaternalFamilyId,
		paternal.PaternalFamilyName PaternalFamilyName,
		paternal.PaternalFamilyAddress PaternalFamilyAddress,
		maternal.MaternalFamilyID MaternalFamilyId,
		maternal.MaternalFamilyName MaternalFamilyName,
		maternal.MaternalFamilyAddress MaternalFamilyAddress,
		CAST(CASE WHEN mat.MemberID IS NOT NULL THEN 1 ELSE 0 END AS BIT) AS MatrimonialExists,
		defaultFamily.DefaultFamilyId DefaultFamilyId
	FROM
		Members m 
		JOIN FamilyMemberAssociation fma ON fma.MemberId = m.MemberID
		JOIN Families f ON f.FamilyID = fma.FamilyId		
		LEFT JOIN Members lkm ON lkm.MemberID = fma.RelatedId
		LEFT JOIN Matrimonials mat ON mat.MemberID = m.MemberID
		OUTER APPLY
		(
			SELECT TOP 1
				PaternalFamilyID, PaternalFamilyName, PaternalFamilyAddress
			FROM
				GetPaternalFamily(m.MemberID, m.Gender, m.MaritalStatusID)
		) paternal
		OUTER APPLY
		(
			SELECT TOP 1
				MaternalFamilyID, MaternalFamilyName, MaternalFamilyAddress
			FROM	
				GetMaternalFamily(m.MemberID)
		) maternal
		OUTER APPLY
		(
			SELECT TOP 1 
				tfma.FamilyId DefaultFamilyId
			FROM
				FamilyMemberAssociation tfma 
			WHERE	
				tfma.MemberId = m.MemberId and tfma.DefaultFamily = 1
		) defaultFamily
	WHERE
		fma.FamilyId = @FamilyID
END