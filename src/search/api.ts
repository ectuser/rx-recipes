import { request } from "../lib/api";
import { RecipesResponseList } from "./types";

export function searchRecipes(searchValue: string) {
  return request<RecipesResponseList>(
    "https://dummyjson.com/recipes/search?q=" + searchValue
  );
}
