class Syllabus {
	constructor(syllabus, syllabusAttributes) {
		this.id = syllabus.id
		this.title = syllabusAttributes.title
		this.description =syllabusAttributes.description
		this.image_url = syllabusAttributes.image_url
		this.category =syllabusAttributes.category
	}
}