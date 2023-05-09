export class Description {
    private readonly value: string;
  
    constructor(value: string) {
      if (value.length > 10) {
        throw new Error('Description cannot be longer than 10 characters');
      }
      this.value = value;
    }
  
    get(): string {
      return this.value;
    }
}
  