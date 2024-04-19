import { Schema, Document, model } from "mongoose"

export interface ICat extends Document {
    _id: String;
    name: String;
    age: Number;
    favoriteToy: String;
    __v: String;
}

const catSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    favoriteToy: String,
})

export default model<ICat>('Cat', catSchema);