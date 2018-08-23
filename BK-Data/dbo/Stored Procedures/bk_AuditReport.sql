CREATE PROCEDURE bk_AuditReport	
 
AS
BEGIN
	DECLARE @Result AS TABLE
	(
		FamilyId INT,		
		MemberId INT,
		AuditType INT
	)

	--families without members
	INSERT INTO @Result (FamilyID, AuditType)
		SELECT 
			F.FamilyId, 1
		FROM 
			Families f
			OUTER APPLY
			(	
				SELECT TOP 1 FamilyId FROM FamilyMemberAssociation tfma WHERE tfma.FamilyId = f.FamilyID
			) fma
		WHERE
			fma.FamilyID IS NULL

	--members without family
	INSERT INTO @Result (MemberId, AuditType)
		SELECT 
			m.MemberId, 2 
		FROM 
			Members m
			OUTER APPLY
			(	
				SELECT TOP 1 FamilyId FROM FamilyMemberAssociation tfma WHERE tfma.MemberId = m.MemberId
			) fma
		WHERE
			fma.FamilyID IS NULL

	--families with single member
	INSERT INTO @Result (FamilyID, AuditType)	
		SELECT
			FamilyId, 3
		FROM
			Families f 
			CROSS APPLY (
				SELECT COUNT(tfma.MemberId) MemberCount
				FROM
					FamilyMemberAssociation tfma
				WHERE
					tfma.FamilyId = f.FamilyId
			) fma
		WHERE
			fma.MemberCount = 1
	
	--members without any default family
	INSERT INTO @Result (MemberId, AuditType)	
		SELECT 
			m.memberID, 4
		FROM
			members m
			OUTER APPLY
			(	
				SELECT TOP 1 FamilyId FROM FamilyMemberAssociation tfma WHERE tfma.MemberId = m.MemberId AND DefaultFamily = 1 
			) fma
		WHERE
			fma.FamilyID IS NULL

	--families without head of family	
	INSERT INTO @Result (FamilyId, AuditType)	
		SELECT 
			F.FamilyId, 5
		FROM 
			Families f
			OUTER APPLY
			(	
				SELECT TOP 1 MemberID FROM Members tm WHERE tm.MemberID = f.HeadOfFamilyID				
			) fma
		WHERE
			fma.MemberID IS NULL
	
	--matrimony without correct status (alive, adult, single, dob)
	INSERT INTO @Result (MemberId, AuditType)	
		SELECT
			m.MemberID, 6
		FROM
			Members m
			JOIN Matrimonials mat on mat.memberid = m.memberid
		WHERE
			m.Alive = 0
			OR m.MaritalStatusId = 2
			OR m.DOB IS NULL
			OR (m.Gender = 1 AND m.DOB IS NOT NULL AND DATEDIFF(MONTH, m.DOB, GETDATE())/12 < 21) 
			OR (m.Gender = 0 AND m.DOB IS NOT NULL AND DATEDIFF(MONTH, m.DOB, GETDATE())/12 < 18)

	--family with members with no relation count more than 1 (top level person don't show relation)
	INSERT INTO @Result (FamilyId, AuditType)	
		SELECT 
			f.FamilyId, 7
		FROM
			Families f
			JOIN FamilyMemberAssociation fma ON fma.FamilyID = f.FamilyID
		WHERE
			fma.RelatedId IS NULL
			OR RelationTypeId IS NULL
		GROUP BY
			f.FamilyID
		HAVING
			COUNT(f.FamilyID) > 1
	
	--pending approvals
	INSERT INTO @Result (FamilyId, MemberId, AuditType)	
		SELECT 
			FamilyId, MemberId, 8
		FROM 
			FamilyMemberAssociation
		WHERE
			Approved = 0
		
	--eligible for matrimony but no matrimony profile exists
	INSERT INTO @Result (FamilyId, MemberId, AuditType)	
		SELECT
			fma.FamilyID,
			m.MemberID,
			9
		FROM
			Members m
			JOIN FamilyMemberAssociation fma ON fma.MemberID = m.MemberId
			OUTER APPLY (SELECT MemberID from Matrimonials tmat WHERE tmat.MemberID = m.MemberID) mat	
		WHERE
			m.Alive = 1
			AND m.MaritalStatusId <> 2
			AND m.DOB IS NOT NULL
			AND ((m.Gender = 1 AND m.DOB IS NOT NULL AND DATEDIFF(MONTH, m.DOB, GETDATE())/12 > 20) OR 
			(m.Gender = 0 AND m.DOB IS NOT NULL AND DATEDIFF(MONTH, m.DOB, GETDATE())/12 > 17))
			AND mat.MemberID IS NULL
	
	SELECT *FROM @Result
END