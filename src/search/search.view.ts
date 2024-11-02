import { ISearchView } from "./search.component";

export class SearchView implements ISearchView {
  private input: HTMLInputElement;

  constructor() {
    this.input = this.getInputElement();
  }

  private getInputElement() {
    const input = document.querySelector("input");

    if (!input) {
      throw new Error("Element not found");
    }

    return input;
  }
}
