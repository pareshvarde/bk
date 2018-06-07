
CREATE PROCEDURE [dbo].[bk_MemberSearch]
(    
	@FirstName NVARCHAR(50) = NULL,
	@LastName NVARCHAR(50) = NULL,
	@CategoryID INT = NULL,
	@NukhID INT = NULL,
	@City NVARCHAR(50) = NULL,
	@State NVARCHAR(50) = NULL,
	@EmailAddress NVARCHAR(100) = NULL,
	@PhoneNumber NVARCHAR(15) = NULL,
	@PageSize INT = 50,
	@CurrentPage INT = 1,
	@IncludeOnlyHOF BIT = NULL,
	@TotalRecords INT OUTPUT
)    
AS

SET NOCOUNT ON 

BEGIN
	
	DECLARE @FirstRecord INT
	DECLARE @LastRecord INT

	IF (@PageSize IS NULL)
		SET @PageSize = 50

	IF (@CurrentPage IS NULL)
		SET @CurrentPage = 1

	SELECT @FirstRecord = (@CurrentPage - 1) * @PageSize
	SELECT @LastRecord = (@CurrentPage * @PageSize + 1);

	WITH TempResult AS
	(
		SELECT
			ROW_NUMBER() OVER(ORDER BY m.MemberId ASC) AS RowNum,
			m.MemberID,
			f.FamilyID,
			m.FirstName,
			m.LastName,								
			f.Address1,
			f.Address2,
			f.City,
			f.State,
			f.Country,
			m.Gender
		FROM
			Members m 
			JOIN FamilyMemberAssociation fma ON fma.MemberId = m.MemberID AND fma.DefaultFamily = 1
			JOIN Families f ON f.FamilyID = fma.FamilyId		
		WHERE
			(@FirstName IS NULL OR m.FirstName = @FirstName)
			AND (@LastName IS NULL OR m.LastName = @LastName)
			AND (@CategoryID IS NULL OR f.CategoryID = @CategoryID)
			AND (@NukhID IS NULL OR f.NukhID = @NukhID)
			AND (@City IS NULL OR f.City = @City)
			AND (@State IS NULL OR f.State = @State)
			AND (@EmailAddress IS NULL OR m.EmailAddress = @EmailAddress)
			AND (@PhoneNumber IS NULL OR m.Phone = @PhoneNumber)	
			AND (@IncludeOnlyHOF IS NULL OR @IncludeOnlyHOF = 0 OR f.HeadOfFamilyID = m.MemberID) 
	)		

	SELECT 
		TOP (@LastRecord -1) *
	FROM
		TempResult
	WHERE
		RowNum > @FirstRecord
		AND RowNum < @LastRecord

	SELECT
		@TotalRecords = COUNT(1)
	FROM
		Members m 
		JOIN FamilyMemberAssociation fma ON fma.MemberId = m.MemberID AND fma.DefaultFamily = 1
		JOIN Families f ON f.FamilyID = fma.FamilyId		
	WHERE
		(@FirstName IS NULL OR m.FirstName = @FirstName)
		AND (@LastName IS NULL OR m.LastName = @LastName)
		AND (@CategoryID IS NULL OR f.CategoryID = @CategoryID)
		AND (@NukhID IS NULL OR f.NukhID = @NukhID)
		AND (@City IS NULL OR f.City = @City)
		AND (@State IS NULL OR f.State = @State)
		AND (@EmailAddress IS NULL OR m.EmailAddress = @EmailAddress)
		AND (@PhoneNumber IS NULL OR m.Phone = @PhoneNumber)	
		AND (@IncludeOnlyHOF IS NULL OR @IncludeOnlyHOF = 0 OR f.HeadOfFamilyID = m.MemberID) 	
			
END

SET NOCOUNT OFF