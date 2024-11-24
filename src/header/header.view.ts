import { RecipesState } from "../recipes.state";
import { HeaderComponent, IHeaderView } from "./header.component";

export class HeaderView implements IHeaderView {
  private recipesNumberElement: Element;

  constructor(private recipesState: RecipesState) {
    this.recipesNumberElement = this.getRecipesNumberElement();

    new HeaderComponent(this, this.recipesState);
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
