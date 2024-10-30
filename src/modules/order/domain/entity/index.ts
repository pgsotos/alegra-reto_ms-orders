export enum IOrderStatus {
  InProgress = 'in_progress',
  Completed = 'completed',
}

export interface IOrderEntity {
  orderNumber: number;
  recipe: string;
  status: IOrderStatus;
}

export interface IOrderDocument extends IOrderEntity, Document {}
