import mongoose, { Document, Schema } from "mongoose";
import { Description } from "../../../../domain/valueObjects/Description";

export interface FruitBaseDocument extends Document {
  _id: string;
  name: string;
  description: string;
  limit: number;
  amount: number;
}

const FruitSchema: Schema<FruitBaseDocument> = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  limit: { type: Number, required: true },
  amount: { type: Number, required: true },
});

export const FruitModel = mongoose.model<FruitBaseDocument>("Fruit", FruitSchema);
