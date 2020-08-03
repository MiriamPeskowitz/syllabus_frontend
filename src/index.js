// console.log("in index.js")
const endPoint = "http://localhost:3000/api/v1/sylabuses"

document.addEventListener('DOMContentLoaded', () => {
	// console.log('loaded')
	getSyllabi()

	const createSyllabusForm = document.querySelector("#create-syllabus-form")
	createSyllabusForm.addEventListener("submit", (e) => createFormHandler(e))  // grab th einputs with e so that below, you can parse them to send 
	
	const loginForm = document.querySelector("#login-form")
	loginForm.addEventListener("submit", (e) => loginFormHandler(e))  
})

function getSyllabi() {
	fetch(endPoint)
	  .then(response => response.json())
	  .then(syllabi => {
	  	syllabi.data.forEach(syllabus => {
			console.log("syllabuses :", syllabi)
	  		let newSyllabus = new Syllabus(syllabus, syllabus.attributes)
	 		// render(newSyllabus)
	 		document.querySelector('#syllabus-container').innerHTML += newSyllabus.renderSyllabusCard();

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
		console.log(syllabus)
		const syllabusData = syllabus.data
		//becuase of how it's nested 
	  	let newSyllabus = new Syllabus(syllabusData, syllabusData.attributes)
		document.querySelector('#syllabus-container').innerHTML += newSyllabus.renderSyllabusCard();

	   //  console.log("new data: ", syllabus);
	   //  const syllabusData = syllabus.data
	   //  // render JSON response
	   // render(syllabusData)
  	})
	.catch(error => console.log(error))
 }

 function loginFormHandler(e) {
 	e.preventDefault()
 	console.log("e-data: ", e)
 	const emailInput = e.target.querySelector('#login-email').value
 	const pwInput = e.target.querySelector('#login-password').value
 	loginFetch(emailInput, pwInput)
 }


// because destructirng: pass in the rails db params words
// in the args, exactly as they are there. 
// alos, because strong params: have to uncludes {user: first , not just the data ) }
 function loginFetch(email, password){
 	const bodyData = {user: {email, password} }
 	fetch("http://localhost:3000/api/v1/login", {
 		method: "POST",
 		headers: {"Content-Type": "application/json"},
 		body: JSON.stringify(bodyData)
 	})
 	.then(response => response.json())
 	.then(json => {
 		console.log(json)
 		localStorage.setItem('jwt_token', json.jwt)
 		renderUserProfile()
 	})

 }
 
function renderUserProfile() {
	console.log("localStorage: ", localStorage.getItem('jwt_token') )
	fetch("http://localhost:3000/api/v1/profile",  {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
		}
	})
	.then(response => response.json())
	.then(json => {
		alert(`Welcome back, ${json.user.data.attributes.name}`)
	})
}

// get the data, then get access into the data 
// catch get the errors from the controller 
//can refactor the markup code into a render function 