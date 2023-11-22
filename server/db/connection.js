const mongoose = require('mongoose');

const url =
  'mongodb+srv://chat_app_admin:!Hesoyam123@cluster0.oovvkhx.mongodb.net/your-database-name?retryWrites=true&w=majority';

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB'))
  .catch((e) => console.log('Error', e));
