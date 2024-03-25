const multer = require('multer');
const path = require('path');

//ROUTES TO THE STORAGE
// Define la configuración del almacenamiento de Multer
const storageEmployee = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads/employees'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const storagePots = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads/post'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const storageOwner = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads/owner'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const storagePet = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads/pet'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const storageProduct = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads/product'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const storageMedical = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads/medical'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

//UPLOADS THE IMAGES
// Configura Multer con la función de filtrado y la configuración de almacenamiento
const uploadEmployee = multer({
    storage: storageEmployee,
    fileFilter: (req, file, cb) => {
        // Verifica si se proporcionó un archivo
        if (!file) {
            // Si no se proporcionó un archivo, permite la carga sin problemas
            cb(null, true);
        } else {
            // Si se proporcionó un archivo, verifica su extensión
            try {
                const filetypes = /jpeg|jpg|png/;
                const mimetype = filetypes.test(file.mimetype);
                const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                if (mimetype && extname) {
                    // Si el archivo tiene una extensión válida, permite la carga
                    cb(null, true);
                } else {
                    // Si el archivo tiene una extensión no válida, rechaza la carga
                    throw new Error('Error: Archivo no válido');
                }
            } catch (error) {
                // Captura cualquier error y llama a la función de devolución de llamada con el error
                cb(error);
            }
        }
    }
});

const uploadPost = multer({
    storage: storagePots,
    fileFilter: (req, file, cb) => {
        // Verifica si se proporcionó un archivo
        if (!file) {
            // Si no se proporcionó un archivo, permite la carga sin problemas
            cb(null, true);
        } else {
            // Si se proporcionó un archivo, verifica su extensión
            try {
                const filetypes = /jpeg|jpg|png/;
                const mimetype = filetypes.test(file.mimetype);
                const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                if (mimetype && extname) {
                    // Si el archivo tiene una extensión válida, permite la carga
                    cb(null, true);
                } else {
                    // Si el archivo tiene una extensión no válida, rechaza la carga
                    throw new Error('Error: Archivo no válido');
                }
            } catch (error) {
                // Captura cualquier error y llama a la función de devolución de llamada con el error
                cb(error);
            }
        }
    }
});

const uploadPet = multer({
    storage: storagePet,
    fileFilter: (req, file, cb) => {
        // Verifica si se proporcionó un archivo
        if (!file) {
            // Si no se proporcionó un archivo, permite la carga sin problemas
            cb(null, true);
        } else {
            // Si se proporcionó un archivo, verifica su extensión
            try {
                const filetypes = /jpeg|jpg|png/;
                const mimetype = filetypes.test(file.mimetype);
                const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                if (mimetype && extname) {
                    // Si el archivo tiene una extensión válida, permite la carga
                    cb(null, true);
                } else {
                    // Si el archivo tiene una extensión no válida, rechaza la carga
                    throw new Error('Error: Archivo no válido');
                }
            } catch (error) {
                // Captura cualquier error y llama a la función de devolución de llamada con el error
                cb(error);
            }
        }
    }
});

const uploadOwner = multer({
    storage: storageOwner,
    fileFilter: (req, file, cb) => {
        // Verifica si se proporcionó un archivo
        if (!file) {
            // Si no se proporcionó un archivo, permite la carga sin problemas
            cb(null, true);
        } else {
            // Si se proporcionó un archivo, verifica su extensión
            try {
                const filetypes = /jpeg|jpg|png/;
                const mimetype = filetypes.test(file.mimetype);
                const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                if (mimetype && extname) {
                    // Si el archivo tiene una extensión válida, permite la carga
                    cb(null, true);
                } else {
                    // Si el archivo tiene una extensión no válida, rechaza la carga
                    throw new Error('Error: Archivo no válido');
                }
            } catch (error) {
                // Captura cualquier error y llama a la función de devolución de llamada con el error
                cb(error);
            }
        }
    }
});

const uploadProduct = multer({
    storage: storageProduct,
    fileFilter: (req, file, cb) => {
        // Verifica si se proporcionó un archivo
        if (!file) {
            // Si no se proporcionó un archivo, permite la carga sin problemas
            cb(null, true);
        } else {
            // Si se proporcionó un archivo, verifica su extensión
            try {
                const filetypes = /jpeg|jpg|png/;
                const mimetype = filetypes.test(file.mimetype);
                const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                if (mimetype && extname) {
                    // Si el archivo tiene una extensión válida, permite la carga
                    cb(null, true);
                } else {
                    // Si el archivo tiene una extensión no válida, rechaza la carga
                    throw new Error('Error: Archivo no válido');
                }
            } catch (error) {
                // Captura cualquier error y llama a la función de devolución de llamada con el error
                cb(error);
            }
        }
    }
});

const uploadMedical = multer({
    storage: storageMedical,
    fileFilter: (req, file, cb) => {
        // Verifica si se proporcionó un archivo
        if (!file) {
            // Si no se proporcionó un archivo, permite la carga sin problemas
            cb(null, true);
        } else {
            // Si se proporcionó un archivo, verifica su extensión
            try {
                const filetypes = /jpeg|jpg|png/;
                const mimetype = filetypes.test(file.mimetype);
                const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                if (mimetype && extname) {
                    // Si el archivo tiene una extensión válida, permite la carga
                    cb(null, true);
                } else {
                    // Si el archivo tiene una extensión no válida, rechaza la carga
                    throw new Error('Error: Archivo no válido');
                }
            } catch (error) {
                // Captura cualquier error y llama a la función de devolución de llamada con el error
                cb(error);
            }
        }
    }
});
// Exporta el middleware de carga de archivos configurado
module.exports = {uploadEmployee, uploadOwner, uploadPet,uploadProduct,uploadMedical,uploadPost};
