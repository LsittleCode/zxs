import jwt from 'jsonwebtoken'
const createToken = async (text)=>{
	const token = await jwt.sign({text},process.env.SECRET,{expiresIn:'1h'})
	return token
}

const verifyToken = async (token)=>{
	const info = await jwt.verify(token,process.env.SECRET)
	return info
}

export {
	createToken,
	verifyToken
}