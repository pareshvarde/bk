
--[bk_MemberSearch] null, null, null, null, null, null, null, null, null, 50, 1, NULL, NULL 
CREATE PROCEDURE [dbo].[bk_MemberSearch]
(    
	@FirstName NVARCHAR(50) = NULL,
	@LastName NVARCHAR(50) = NULL,
	@CategoryID INT = NULL,
	@NukhID INT = NULL,
	@City NVARCHAR(50) = NULL,
	@District NVARCHAR(50) = NULL,
	@State NVARCHAR(50) = NULL,
	@EmailAddress NVARCHAR(100) = NULL,
	@PhoneNumber NVARCHAR(15) = NULL,
	@PageSize INT = 50,
	@CurrentPage INT = 1,
	@IncludeOnlyHOF BIT = NULL,
	@SortOrder NVARCHAR(50) = NULL,
	@MemberID INT = NULL,	
	@AadhaarNumber BIGINT = NULL,	
	@TotalRecords INT OUTPUT
)    
AS

SET NOCOUNT ON 

BEGIN
	
	DECLARE @FirstRecord INT
	DECLARE @LastRecord INT
	
	IF (@SortOrder IS NULL)
		SET @SortOrder = 'memberid desc'	

	IF (@PageSize IS NULL)
		SET @PageSize = 50

	IF (@CurrentPage IS NULL)
		SET @CurrentPage = 1

	SELECT @FirstRecord = (@CurrentPage - 1) * @PageSize
	SELECT @LastRecord = (@CurrentPage * @PageSize + 1);

	WITH TempResult AS
	(
		SELECT
			ROW_NUMBER() OVER(ORDER BY
				CASE WHEN @sortOrder = 'city asc' then f.City END ASC,				
				CASE WHEN @sortOrder = 'city desc' then f.City END DESC,	
				CASE WHEN @sortOrder = 'state asc' then f.State END ASC,				
				CASE WHEN @sortOrder = 'state desc' then f.State END DESC,	
				CASE WHEN @sortOrder = 'memberid asc' then m.MemberID END ASC,
				CASE WHEN @sortOrder = 'memberid desc' then m.MemberID END DESC) AS RowNum,
			m.MemberID,
			f.FamilyID,
			m.FirstName,
			m.LastName,								
			f.Address1,
			f.Address2,
			f.City,
			f.District,
			f.State,
			f.Country,
			m.Gender,
			m.Alive,
			m.DOD,
			m.DOB,
			m.ModifiedOn
		FROM
			Members m 
			JOIN FamilyMemberAssociation fma ON fma.MemberId = m.MemberID AND fma.DefaultFamily = 1
			JOIN Families f ON f.FamilyID = fma.FamilyId		
		WHERE
			(@FirstName IS NULL OR m.FirstName LIKE @FirstName + '%')
			AND (@LastName IS NULL OR m.LastName LIKE @LastName + '%')
			AND (@CategoryID IS NULL OR f.CategoryID = @CategoryID)
			AND (@NukhID IS NULL OR f.NukhID = @NukhID)
			AND (@City IS NULL OR f.City LIKE @City + '%')
			AND (@District IS NULL OR f.District = @District)
			AND (@State IS NULL OR f.State = @State)
			AND (@EmailAddress IS NULL OR m.EmailAddress = @EmailAddress)
			AND (@PhoneNumber IS NULL OR m.Phone = @PhoneNumber)	
			AND (@IncludeOnlyHOF IS NULL OR @IncludeOnlyHOF = 0 OR f.HeadOfFamilyID = m.MemberID) 		
			AND (@MemberID IS NULL OR m.MemberID = @MemberID)
			AND (@AadhaarNumber IS NULL OR m.AadhaarNumber = @AadhaarNumber)
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
		(@FirstName IS NULL OR m.FirstName LIKE @FirstName + '%')
		AND (@LastName IS NULL OR m.LastName LIKE @LastName + '%')
		AND (@CategoryID IS NULL OR f.CategoryID = @CategoryID)
		AND (@NukhID IS NULL OR f.NukhID = @NukhID)
		AND (@City IS NULL OR f.City LIKE @City + '%')
		AND (@District IS NULL OR f.District = @District)
		AND (@State IS NULL OR f.State = @State)
		AND (@EmailAddress IS NULL OR m.EmailAddress = @EmailAddress)
		AND (@PhoneNumber IS NULL OR m.Phone = @PhoneNumber)	
		AND (@IncludeOnlyHOF IS NULL OR @IncludeOnlyHOF = 0 OR f.HeadOfFamilyID = m.MemberID) 	
		AND (@MemberID IS NULL OR m.MemberID = @MemberID)
		AND (@AadhaarNumber IS NULL OR m.AadhaarNumber = @AadhaarNumber)
			
END

SET NOCOUNT OFF