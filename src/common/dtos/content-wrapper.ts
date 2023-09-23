export class PageDto<T> {
  content: T[];

  constructor(content: T[]) {
    this.content = content;
  }
}
