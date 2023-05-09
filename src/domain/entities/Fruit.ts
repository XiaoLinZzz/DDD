import { Description } from "../valueObjects/Description";

export class Fruit {
    id: string;
    name: string;
    description: Description;
    limit: number;
    amount: number;

    constructor(id: string, name: string, description: Description, limit: number, amount: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.limit = limit;
        this.amount = amount;
    }

    updateDescription(description: string): void {
        this.description = new Description(description);
    }
    
    updateLimit(limit: number): void {
        this.limit = limit;
    }
    
    store(amount: number): void {
        this.amount += amount;
    }
    
    remove(amount: number): void {
        if (this.amount < amount) {
        throw new Error("Insufficient amount to remove");
        }
        this.amount -= amount;
    }
  
}
