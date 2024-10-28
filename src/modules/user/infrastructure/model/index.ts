import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs';
import { IUserEntity } from '../../domain/entity';

@Schema({ timestamps: true, versionKey: false })
export class User extends Document implements IUserEntity {
  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ type: String })
  name: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ type: String, default: 'user', enum: ['admin', 'user'] })
  level: 'admin' | 'user';
}

export const UserSchema = SchemaFactory.createForClass(User);

// Middleware para hashear contraseñas antes de guardar
UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
  } catch (error) {
    console.error('Error while hashing the password', error);
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (
  toCompare: string
): Promise<boolean> {
  return compare(toCompare, this.password);
};
