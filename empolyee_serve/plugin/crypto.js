import bcrypt from 'bcryptjs'
const saltRounds = parseInt(process.env.SALTNUM)

const craeteHash = (text)=>{
	const salt = bcrypt.genSaltSync(saltRounds)
	return bcrypt.hashSync(text,salt)
}

//$2a$10$cl1N9knuY.yEg1QrX7P4H.fbPKxWrGrXCzNTe2vwUziURJQglCgsm

const hashCompare = (text,hashed)=>{
	return bcrypt.compareSync(text,hashed)
}




export {
	craeteHash,
	hashCompare
}