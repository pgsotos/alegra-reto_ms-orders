import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Model, Connection } from 'mongoose';
import { IOrderDocument } from '../../domain/entity';

export enum IOrderStatus {
  Pending = 'pending',
  Completed = 'completed',
}

@Schema({ timestamps: true, versionKey: false })
export class Order extends Document {
  @Prop({ type: Number, default: 0 })
  orderNumber: number;

  @Prop({ type: String, required: true })
  recipe: string;

  @Prop({ type: String, enum: IOrderStatus, default: IOrderStatus.Pending })
  status: IOrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.pre<Order>('save', async function (next) {
  if (!this.isNew) return next();
  const lastOrder = await this.model('Order')
    .findOne<IOrderDocument>()
    .sort({ orderNumber: -1 });
  this.orderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;
  next();
});
