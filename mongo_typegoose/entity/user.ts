import { prop, Typegoose } from 'typegoose';
export default class User extends Typegoose {
    @prop()
    name?: string;
    @prop()
    password?: string;
}
