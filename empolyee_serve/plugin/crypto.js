import bcrypt from 'bcryptjs'
const saltRounds = parseInt(process.env.SALTNUM)

const craeteHash = (text)=>{
	const salt = bcrypt.genSaltSync(saltRounds)
	return bcrypt.hashSync(text,salt)
}



const hashCompare = (text,hashed)=>{
	return bcrypt.compareSync(text,hashed)
}




export {
	craeteHash,
	hashCompare
}