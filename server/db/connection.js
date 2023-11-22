const mongoose = require('mongoose');

const uri = "mongodb+srv://chat_app_admin:<password>admin1234@cluster0.oovvkhx.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url, {
     userNewParser: true,
     useUnifiedTopology: true
}).then(() => console.log('Connected to DB')).catch((e)=> console.log('Error', e))