import multer from 'multer'
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		const tempPath = path.join(__dirname, '../public/uploads')
		if (!fs.existsSync(tempPath)) {
			fs.mkdirSync(tempPath)
			fs.mkdirSync(path.join(tempPath, 'profile'))
		}
		else if (!fs.existsSync(path.join(tempPath, 'profile'))) {
			fs.mkdirSync(path.join(tempPath, 'profile'))
		}
		callback(null, tempPath+'/profile')
	},
	filename: (req, file, callback) => {
		var save = `${req.user.username}`
		callback(null, save)
	}
})

const upload = multer({ storage: storage })

export default upload