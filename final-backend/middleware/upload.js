import multer from 'multer';

function fileFilter(req, file, cb) {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid mimetype'));
    }
}

const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/users');
    },
    filename: function (req, file, cb) {
        const fileNameParts = file.originalname.split('.');
        const ext = fileNameParts[fileNameParts.length - 1];
        const suffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, suffix + '.' + ext);
    }
});
const userUpload = multer({ storage: userStorage, fileFilter: fileFilter });
export default userUpload;


const sliderStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/sliders');
    },
    filename: function (req, file, cb) {
        const fileNameParts = file.originalname.split('.');
        const ext = fileNameParts[fileNameParts.length - 1];
        const suffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, suffix + '.' + ext);
    }
});

export const sliderUpload = multer({ storage: sliderStorage, fileFilter });


const newsStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/news');
    },
    filename: function (req, file, cb) {
        const fileNameParts = file.originalname.split('.');
        const ext = fileNameParts[fileNameParts.length - 1];
        const suffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, suffix + '.' + ext);
    }
});

export const newsUpload = multer({ storage: newsStorage, fileFilter });

