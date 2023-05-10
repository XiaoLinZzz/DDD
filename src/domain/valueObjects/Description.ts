export class Description {
  private readonly value: string;

  constructor(value: string) {
    if (!value) {
      throw new Error("Description cannot be empty");
    }
    if (value.length > 30) {
      throw new Error("Description must below 30 characters long");
    }
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
}
