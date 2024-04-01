import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true, minlength: 4 })
  username: string;

  @Prop({ type: String, required: true, minlength: 6 })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
