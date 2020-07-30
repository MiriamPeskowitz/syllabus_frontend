// console.log("in index.js")
const endPoint = "http://localhost:3000/api/v1/sylabuses"

document.addEventListener('DOMContentLoaded', () => {
	// console.log('loaded')
	getSyllabi()

	const createSyllabusForm = document.querySelector("#create-syllabus-form")
	createSyllabusForm.addEventListener("submit", (e) => createFormHandler(e))  // grab th einputs with e so that below, you can parse them to send 
})

function getSyllabi() {
	fetch(endPoint)
	  .then(response => response.json())
	  .then(syllabi => {
	  	syllabi.data.forEach(syllabus => {
			debugger
	  		let newSyllabus = new Syllabus(syllabus)
	 		render(newSyllabus)
      	})
	  })
	  .catch(error => console.log(error)) //why was this erroring? 
}

function createFormHandler(e) {
  e.preventDefault()
  const titleInput = document.querySelector('#input-title').value
  const descriptionInput = document.querySelector('#input-description').value
  const imageInput = document.querySelector('#input-url').value
  const categoryInput = document.querySelector('#categories').value
  //because categoryInput is a string and needs to be an integer for the backend 
  const categoryId = parseInt(categoryInput)
  postSyllabus(titleInput, descriptionInput, imageInput, categoryId)
}

function postSyllabus(title, description, image_url, category_id) {
	//make image_url and category_id snakecase, even though it's JS => 
  // confirm these values are coming through properly
  console.log(title, description, image_url, category_id);
  // build body object
  let bodyData = {title, description, image_url, category_id}

  fetch(endPoint, {
	    // POST request
	    method: "POST",
	    headers: {"Content-Type": "application/json"},
	    body: JSON.stringify(bodyData)
	  })
	  .then(response => response.json())
	  .then(syllabus => {
	    console.log("new data: ", syllabus);
	    const syllabusData = syllabus.data
	    // render JSON response
	   render(syllabusData)
  	})
	.catch(error => console.log(error))
}

function render(syllabus) {
  const syllabusMarkup = `
          <div data-id=${syllabus.attributes.id}>
            <img src=${syllabus.attributes.image_url} height="200" width="250">
            <h3>${syllabus.attributes.title}</h3>
            <p>${syllabus.attributes.category.name}</p>
            <button data-id=${syllabus.id}>edit</button>
          </div>
          <br><br>`;

  document.querySelector('#syllabus-container').innerHTML += syllabusMarkup;
}
// get the data, then get access into the data 
// catch get the errors from the controller 
//can refactor the markup code into a render function 