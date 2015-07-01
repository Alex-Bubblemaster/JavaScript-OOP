/* Task Description */
/* 
* Create a module for a Telerik Academy course
  * The course has a title and presentations
    * Each presentation also has a title
    * There is a homework for each presentation
  * There is a set of students listed for the course
    * Each student has firstname, lastname and an ID
      * IDs must be unique integer numbers which are at least 1
  * Each student can submit a homework for each presentation in the course
  * Create method init
    * Accepts a string - course title
    * Accepts an array of strings - presentation titles
    * Throws if there is an invalid title
      * Titles do not start or end with spaces
      * Titles do not have consecutive spaces
      * Titles have at least one character
    * Throws if there are no presentations
  * Create method addStudent which lists a student for the course
    * Accepts a string in the format 'Firstname Lastname'
    * Throws if any of the names are not valid
      * Names start with an upper case letter
      * All other symbols in the name (if any) are lowercase letters
    * Generates a unique student ID and returns it
  * Create method getAllStudents that returns an array of students in the format:
    * {firstname: 'string', lastname: 'string', id: StudentID}
  * Create method submitHomework
    * Accepts studentID and homeworkID
      * homeworkID 1 is for the first presentation
      * homeworkID 2 is for the second one
      * ...
    * Throws if any of the IDs are invalid
  * Create method pushExamResults
    * Accepts an array of items in the format {StudentID: ..., Score: ...}
      * StudentIDs which are not listed get 0 points
    * Throw if there is an invalid StudentID
    * Throw if same StudentID is given more than once ( he tried to cheat (: )
    * Throw if Score is not a number
  * Create method getTopStudents which returns an array of the top 10 performing students
    * Array must be sorted from best to worst
    * If there are less than 10, return them all
    * The final score that is used to calculate the top performing students is done as follows:
      * 75% of the exam result
      * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
*/

function solve() {
	function titleHasInvalidSpaces(currentTitle){
		return currentTitle.match(/^\s|\s{2}|^.{0}$|\s$/); //checks for starting, ending spaces and empty string
	}

	function fullNameIsValid(fullname){
		return fullname.match(/^[A-Z][a-z]*?\s[A-Z][a-z]*/);
	}

	function validateStudentID(studentID){
		return (Math.round(studentID)!== studentID || studentID < 1 || studentID > students.length + 1);
	}

	var students = [],
		examResults,
		presentations;

	var Course = {

		init: function(title, presentations) {
			if(presentations.length === 0 || titleHasInvalidSpaces(title) || presentations.some(function(currentTitle){
					return titleHasInvalidSpaces(currentTitle);
				}) ){
				throw new Error();
			}
			this.title = title;
			this.presentations = presentations || []; // if there is no array, create it here
			this.students = students;
		},
		addStudent: function(name) {
			var fullname = name.split(' ');
			if(fullname.length !==2 || !(fullNameIsValid(name))){
				throw new Error();
			}
			var id = students.length + 1;

			var student = {
				firstname:fullname[0],
				lastname:fullname[1],
				ID:id
			}
			students.push(student);
			return id;
		},
		getAllStudents: function() {
			return this.students.slice(0);
		},
		submitHomework: function(studentID, homeworkID) {
			if(validateStudentID(studentID)|| homeworkID < 1 || homeworkID > this.presentations.length ){
				throw new Error();
			}
		},
		pushExamResults: function(results) { //{StudentID: ..., Score: ...} //does not affect the number of tests passing at all
			if(isNotArray(results)){
				throw new Error();
			}
			for (var i = 0; i < results.length; i += 1) {
				if(validateStudentID(results[i].ID)){
					throw new Error();
				}

               			}
		},
		getTopStudents: function() {

		}
	};

	return Course;
}


module.exports = solve;
