import {formidable} from 'formidable'
import path from 'path'
const form =  formidable({
	keepExtensions:true,
	uploadDir:'../upload/images/'
})


export {form}