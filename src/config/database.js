//CONEXION A LA BASE DE DATOS

//PASO 1: Requerir Mongoose
const mongoose = require('mongoose');

//PASO 2: Crear una función que hace la conexión
const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB conectado exitosamente!!!');
        
    } catch (error) {
        console.error('❌ Error al conectar con MongoDB', error.menssage);
        process.exit(1);
    }

}

//PASO 3: Exportar la función
module.exports = connectDB