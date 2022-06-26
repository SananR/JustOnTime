import app from './app.js';
import mongoose from 'mongoose';
import { User } from './models/userModel.js';
import { Event } from './models/eventModel.js';

const port = process.env.PORT || 3000;
const uri = process.env.JUSTONTIME_DB_URI_LOCAL; //process.env.JUSTONTIME_DB_URI (use this on production)

await mongoose.connect(uri)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    const event = new Event(
        {
            eventInfo: {
                name: "test event",
                description: "this is a test event",
                time: new Date(),
                address:{
                    street: "some street",
                    city: "Toronto",
                    country: "Canada",
                    postalCode: "ABC123"
                }
            },
            tags: [],
            bidHistory: [],
            // organizer_id: "62b8ddf61105a16aac887d01",
            eventImage_path: "path"
        }
    )
    await event.save();

    // await EventOrganizer.db.dropDatabase();
    // await mongoose.connection.db.dropDatabase();
     //await EventOrganizer.deleteOne({email: "youomachi@gmail.com"});
    //  User.remove({}, () => {console.log("deleted user")})
    // await VerificationToken.deleteMany();
    console.log('connected to mongoDB '+uri);
    app.listen(port, () => {
        console.log('listening on port '+port)
    })
});