export {};

declare global {
  interface Date {
    toFormattedDate(): string;
  }
}
