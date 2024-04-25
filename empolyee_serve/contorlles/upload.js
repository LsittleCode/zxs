import {form} from '../upload/index.js'

export const uploadImage = async (req,res,next)=>{
	form.parse(req,(err,fields,files)=>{
		if(err){
			return next(err)
		}
		res.cc({newPath:'/images/'+files.file[0].newFilename},200)
	})
}