import app from './app.js';
import mongoose from 'mongoose';
import { EventOrganizer } from './models/eventOrganizerModel.js';
import { VerificationToken } from './models/verificationTokenModel.js';

const port = process.env.PORT || 3000;
const uri = process.env.JUSTONTIME_DB_URI_LOCAL; //process.env.JUSTONTIME_DB_URI (use this on production)

await mongoose.connect(uri)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await EventOrganizer.deleteOne({email: "youomachi@gmail.com"});
    await VerificationToken.deleteMany();
    console.log('connected to mongoDB '+uri);
    app.listen(port, () => {
        console.log('listening on port '+port)
    })
});