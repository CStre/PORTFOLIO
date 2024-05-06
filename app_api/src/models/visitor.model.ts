import { Schema, Document, model } from "mongoose"

export interface IVisitor extends Document {
    _id: String;
    name: String;
    company: Number;
    email: String;
    __v: String;
}

const visitSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    company: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: false
    },
   
},
{
    timestamps: true,
}
)

export default model<IVisitor>('Visit', visitSchema);