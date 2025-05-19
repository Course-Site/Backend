import { diskStorage } from 'multer';
import { extname } from 'path';
import { mimeToFileType } from './file-type.utils';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads/lab-reports',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      callback(null, `${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    try {
      mimeToFileType(file.mimetype); // Проверяем поддержку типа
      callback(null, true);
    } catch (error) {
      callback(error, false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
};
