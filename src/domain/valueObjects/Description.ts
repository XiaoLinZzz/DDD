export class Description {
  private readonly value: string;

  constructor(value: string) {
    if (!value) {
      throw new Error("Description cannot be empty");
    }
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

}
