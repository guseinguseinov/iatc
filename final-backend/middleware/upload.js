import multer from 'multer';

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid mimetype'));
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function(req, file, cb) {
        const fileNameParts = file.originalname.split('.');
        const ext = fileNameParts[fileNameParts.length - 1];
        const suffix = Date.now() + '-' + Math.round(Math.random()*1E9);
        cb(null, suffix + '.' + ext);
    }
});

const upload = multer({ storage, fileFilter });

export default upload;