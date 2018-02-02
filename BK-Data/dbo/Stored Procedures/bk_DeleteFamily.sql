CREATE PROCEDURE [dbo].[bk_DeleteFamily]
(    
	@FamilyID INT
)    
AS
BEGIN
	
	DECLARE @Members TABLE(
		MemberID INT,	
		CanDelete BIT
	)

	INSERT INTO @Members (MemberID, CanDelete)
		SELECT MemberId, 1 From FamilyMemberAssociation WHERE FamilyId = @FamilyID
	
	BEGIN TRY
		BEGIN TRANSACTION

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
		
		DELETE fm 
		FROM 
			FamilyMemberAssociation fm
			JOIN @Members m ON m.MemberID = fm.MemberId
		WHERE
			m.CanDelete = 1

		DELETE m 
		FROM 
			Members m
			JOIN @Members tm ON tm.MemberID = m.MemberID
		WHERE
			tm.CanDelete = 1
		
		DELETE FROM Families WHERE FamilyID = @FamilyID
			
		COMMIT TRANSACTION
	END TRY
	BEGIN CATCH
		DECLARE @error INT, @message VARCHAR(4000), @xstate INT;
		SELECT @error = ERROR_NUMBER(), @message = ERROR_MESSAGE(), @xstate = XACT_STATE();
		
		ROLLBACK TRANSACTION

		raiserror ('bk_DeleteFamily: %d: %s', 16, 1, @error, @message) ;
	END CATCH	
END