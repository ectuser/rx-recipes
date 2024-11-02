import { IHeaderView } from "./header.component";

export class HeaderView implements IHeaderView {
  private recipesNumberElement: Element;

  constructor() {
    this.recipesNumberElement = this.getRecipesNumberElement();
  }

  public setNumberOfRecipes(amount: number | undefined) {
    if (amount === undefined) {
      this.recipesNumberElement.textContent = "";
      return;
    }

    this.recipesNumberElement.textContent = amount.toString();
  }

  private getRecipesNumberElement() {
    const recipesNumberElement = document.querySelector(".recipes-number");

    if (!recipesNumberElement) {
      throw new Error("Header not found");
    }

    return recipesNumberElement;
  }
}
