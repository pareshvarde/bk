CREATE PROCEDURE [dbo].[bk_AuditReport]	
 
AS
BEGIN
	DECLARE @Result AS TABLE
	(
		FamilyId INT,		
		MemberId INT,		
		AuditType INT,
		FamilyName NVARCHAR(100),
		MemberName NVARCHAR(100)
	)

	--families without members
	INSERT INTO @Result (FamilyID, AuditType, FamilyName, MemberName)
		SELECT 
			F.FamilyId, 1, 'Unknown', 'Unknown'
		FROM 
			Families f
			OUTER APPLY
			(	
				SELECT TOP 1 FamilyId FROM FamilyMemberAssociation tfma WHERE tfma.FamilyId = f.FamilyID
			) fma
		WHERE
			fma.FamilyID IS NULL

	--members without family
	INSERT INTO @Result (FamilyId, MemberId, AuditType, FamilyName, MemberName)
		SELECT 
			0, m.MemberId, 2, 'Unknown', m.FirstName + ' ' + m.LastName
		FROM 
			Members m
			OUTER APPLY
			(	
				SELECT TOP 1 FamilyId FROM FamilyMemberAssociation tfma WHERE tfma.MemberId = m.MemberId
			) fma
		WHERE
			fma.FamilyID IS NULL

	--families with single member
	INSERT INTO @Result (FamilyID, AuditType, FamilyName, MemberName)
		SELECT
			FamilyId, 3, hof.FirstName + ' ' + hof.LastName, hof.FirstName + ' ' + hof.LastName
		FROM
			Families f 
			JOIN Members hof ON hof.MemberID = f.HeadOfFamilyID 
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
	INSERT INTO @Result (FamilyId, MemberId, AuditType, FamilyName, MemberName)	
		SELECT 
			0, m.memberID, 4, 'Unknown', m.FirstName + ' ' + m.LastName
		FROM
			members m
			OUTER APPLY
			(	
				SELECT TOP 1 FamilyId FROM FamilyMemberAssociation tfma WHERE tfma.MemberId = m.MemberId AND DefaultFamily = 1 
			) fma
		WHERE
			fma.FamilyID IS NULL

	--families without head of family	
	INSERT INTO @Result (FamilyId, AuditType, FamilyName, MemberName)
		SELECT 
			F.FamilyId, 5, 'Unknown', 'Unknown'
		FROM 
			Families f
			OUTER APPLY
			(	
				SELECT TOP 1 MemberID FROM Members tm WHERE tm.MemberID = f.HeadOfFamilyID				
			) fma
		WHERE
			fma.MemberID IS NULL
	
	--matrimony without correct status (alive, adult, single, dob)
	INSERT INTO @Result (FamilyId, MemberId, AuditType, FamilyName, MemberName)	
		SELECT
			fma.FamilyId, m.MemberID, 6, hof.FirstName + ' ' + hof.LastName, m.FirstName + ' ' + m.LastName
		FROM
			Members m
			JOIN Matrimonials mat on mat.memberid = m.memberid
			JOIN FamilyMemberAssociation fma ON fma.MemberId = m.MemberId AND fma.DefaultFamily = 1			
			JOIN Families f ON f.FamilyID = fma.FamilyId
			JOIN Members hof ON hof.MemberID = f.HeadOfFamilyID
		WHERE
			m.Alive = 0
			OR m.MaritalStatusId = 2
			OR m.DOB IS NULL
			OR (m.Gender = 1 AND m.DOB IS NOT NULL AND DATEDIFF(MONTH, m.DOB, GETDATE())/12 < 21) 
			OR (m.Gender = 0 AND m.DOB IS NOT NULL AND DATEDIFF(MONTH, m.DOB, GETDATE())/12 < 18)

	--family with members with no relation count more than 1 (top level person don't show relation)
	INSERT INTO @Result (FamilyId, AuditType, FamilyName, MemberName)	
		SELECT 
			f.FamilyId, 7, hof.FirstName + ' ' + hof.LastName, 'Unknown'
		FROM
			Families f
			JOIN FamilyMemberAssociation fma ON fma.FamilyID = f.FamilyID
			JOIN Members hof ON hof.MemberID = f.HeadOfFamilyID
		WHERE
			fma.RelatedId IS NULL
			OR RelationTypeId IS NULL
		GROUP BY
			f.FamilyID,
			hof.FirstName,
			hof.LastName
		HAVING
			COUNT(f.FamilyID) > 1
	
	--pending approvals
	INSERT INTO @Result (FamilyId, MemberId, AuditType, FamilyName, MemberName)	
		SELECT 
			fma.FamilyId, fma.MemberId, 8, hof.FirstName + ' ' + hof.LastName, m.FirstName + ' ' + m.LastName
		FROM 
			FamilyMemberAssociation fma
			JOIN Members m ON m.MemberID = fma.MemberId
			JOIN Families f ON f.FamilyID = fma.FamilyId
			JOIN Members hof ON hof.MemberID = f.HeadOfFamilyID
		WHERE
			Approved = 0
		
	--eligible for matrimony but no matrimony profile exists
	INSERT INTO @Result (FamilyId, MemberId, AuditType, FamilyName, MemberName)	
		SELECT
			fma.FamilyID, m.MemberID, 9, hof.FirstName + ' ' + hof.LastName, m.FirstName + ' ' + m.LastName
		FROM
			Members m
			JOIN FamilyMemberAssociation fma ON fma.MemberID = m.MemberId AND DefaultFamily = 1
			JOIN Families f ON f.FamilyID = fma.FamilyId
			JOIN Members hof ON hof.MemberID = f.HeadOfFamilyID
			OUTER APPLY (SELECT MemberID from Matrimonials tmat WHERE tmat.MemberID = m.MemberID) mat	
		WHERE
			m.Alive = 1
			AND m.MaritalStatusId <> 2
			AND m.DOB IS NOT NULL
			AND ((m.Gender = 1 AND m.DOB IS NOT NULL AND DATEDIFF(MONTH, m.DOB, GETDATE())/12 > 20) OR 
			(m.Gender = 0 AND m.DOB IS NOT NULL AND DATEDIFF(MONTH, m.DOB, GETDATE())/12 > 17))
			AND mat.MemberID IS NULL

	--alive members withotu dob
	INSERT INTO @Result (FamilyId, MemberId, AuditType, FamilyName, MemberName)
		SELECT
			fma.FamilyId, m.MemberId, 10, hof.FirstName + ' ' + hof.LastName, m.FirstName + ' ' + m.LastName
		FROM
			Members m
			JOIN FamilyMemberAssociation fma ON fma.MemberId = m.MemberId AND fma.DefaultFamily = 1
			JOIN Families f ON f.FamilyID = fma.FamilyId
			JOIN Members hof ON hof.MemberID = f.HeadOfFamilyID
		WHERE
			m.Alive = 1
			AND m.DOB IS NULL
	
	SELECT *FROM @Result
END