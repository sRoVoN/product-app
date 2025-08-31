import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: { rate: number; count: number };
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Products"], 
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
        providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products" as const, id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Products", id }],
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => ({
        url: "products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    updateProduct: builder.mutation<Product, Product>({
      query: (product) => ({
        url: `products/${product.id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Products", id }],
    }),
    deleteProduct: builder.mutation<{ success: boolean; id: number }, number>({
  query: (id) => ({
    url: `products/${id}`,
    method: "DELETE",
  }),
  // اپتیمستیک اپدیت
  async onQueryStarted(id, { dispatch, queryFulfilled }) {
    // قبل از اینکه mutate سرور جواب بده، cache رو بروز می‌کنیم
    const patchResult = dispatch(
      productsApi.util.updateQueryData('getProducts', undefined, (draft) => {
        return draft.filter(product => product.id !== id);
      })
    );
    try {
      await queryFulfilled;
    } catch {
      // اگر خطا شد، تغییرات رو rollback کن
      patchResult.undo();
    }
  },
}),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
