import mongoose from 'mongoose';

const connectString = /*"mongodb+srv://<username>:<password>@cluster0.vmkcimy.mongodb.net/?retryWrites=true&w=majority"*/ "mongodb+srv://willowesapphire:ss8U159c6FzgiC1E@cluster0.vmkcimy.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(connectString);

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error:`, err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});
