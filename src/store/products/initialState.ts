import { ProductsStateInterface } from "@/models/store/products";
import useCategory from "@/use/useCategory";

export const initialState: ProductsStateInterface = {
  products: [],
  loading: false,
  lastQuery: null,
  isDisableInfiniteScroll: false,
  filter: {
    minPrice: 0,
    maxPrice: 100,
    name: "",
    category: useCategory().categories[0],
  },
  isFilter: false,
  name: "",
  error: "",
};
