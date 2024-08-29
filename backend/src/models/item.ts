//item.model.js
import {Schema, Types, model} from 'mongoose';

export interface IItem {
    title: string;
    content: string;
    status?: string;
    // organization: Types.ObjectId; // example...
}

export const itemSchema = new Schema<IItem>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, required: false, default: 'active' },
    // organization: { type: Schema.Types.ObjectId, ref: 'Organization' }
});

export const Item = model<IItem>('Item', itemSchema);

//module.exports = Item;
