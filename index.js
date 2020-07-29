// console.log("in index.js")
const endPoint = "http://localhost:3000/api/v1/sylabuses"

document.addEventListener('DOMContentLoaded', () => {
	// console.log('loaded')
	getSyllabi()

	const createSyllabusForm = document.querySelector("#create-syllabus-form")
	createSyllabusForm.addEventListener("submit", (e) => createFormHandler(e))
})

function getSyllabi() {
	fetch(endPoint)
	  .then(response => response.json())
	  .then(syllabi => {
	  	syllabi.data.forEach(syllabus => {
	  		const syllabusMarkup = `
          		<div data-id=${syllabus.id}>
		            <img src=${syllabus.attributes.image_url} height="200" width="250">
		            <h3>${syllabus.attributes.title}</h3>
		            <p>${syllabus.attributes.category.name}</p>
		            <button data-id=${syllabus.id}>edit</button>
		          </div>
          <br><br>`;

          document.querySelector('#syllabus-container').innerHTML += syllabusMarkup
      	})
	  })
// 	  .catch(errors) //why was this erroring? 
}

function createFormHandler(e) {
	e.preventDefault()
	console.log(e)

}
// get the data, then get access into the data 
// catch get the errors from the controller 
//can refactor the markup code into a render function 