import multer from 'multer';

const storage = multer.memoryStorage(); // Зберігає файл у буфері
// Фільтрація
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error('Format is not correct');
      error.statusCode = 400;
      error.customPayload = { message: 'Format is not correct' };
      return cb(error, false);
    }

    cb(null, true);
  }
});

export default upload;
