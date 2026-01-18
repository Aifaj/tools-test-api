const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://atdrive_user:Atdrive%40123@cluster0.onikaqp.mongodb.net/atdrive_test?retryWrites=true&w=majority&appName=Cluster0'
)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));


// update  replace_user => your own user name and replace_password => password