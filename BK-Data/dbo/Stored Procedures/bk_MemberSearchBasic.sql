
CREATE PROCEDURE [dbo].[bk_MemberSearchBasic]
(    
	@MemberID INT = NULL,
	@PhoneNumber NVARCHAR(15) = NULL,
	@AadhaarNumber BIGINT = NULL,
	@Email NVARCHAR(100) = NULL
)    
AS
BEGIN	

	SELECT TOP 1
		m.MemberID,
		m.FirstName,
		m.LastName,
		m.DOB,
		m.Gender				
	FROM
		Members m 		
	WHERE
		(@MemberID IS NULL OR m.MemberID = @MemberID)
		AND (@PhoneNumber IS NULL OR m.Phone = @PhoneNumber)
		AND (@AadhaarNumber IS NULL OR m.AadhaarNumber = @AadhaarNumber)
		AND (@Email IS NULL OR m.EmailAddress = @Email)
END