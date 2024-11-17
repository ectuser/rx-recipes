import { randomDelay, request } from "../lib/api";
import { RecipesResponseList } from "./types";

export function searchRecipes(
  searchValue: string,
  limit: number,
  skip: number
) {
  const params = new URLSearchParams();
  params.append("q", searchValue);
  params.append("limit", limit.toString());
  params.append("skip", skip.toString());
  params.append("delay", randomDelay().toString());

  const paramsValue = params.toString();

  return request<RecipesResponseList>(
    "https://dummyjson.com/recipes/search?" + paramsValue
  );
}
