import multer from 'multer'
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		const tempPath = path.join(__dirname, '../public/uploads')
		if (!fs.existsSync(tempPath)) {
			fs.mkdirSync(tempPath)
			fs.mkdirSync(path.join(tempPath, 'temp'))
		}
		else if (!fs.existsSync(path.join(tempPath, 'temp'))) {
			fs.mkdirSync(path.join(tempPath, 'temp'))
		}
		var dest = 'uploads/temp'
		callback(null, tempPath+'/temp')
	},
	filename: (req, file, callback) => {
		console.log(file)
		var user = req.query.username
		var save = user + '.jpg'
		callback(null, save)
	}
})

const upload = multer({ storage: storage })

export default upload