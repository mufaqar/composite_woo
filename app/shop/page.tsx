import ProductBox from "@/components/Product/ProductBox";
import { getAllProducts } from "@/lib/woocommerce-api";
import { WooProduct } from "@/lib/woocommerce-types";


export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
           <ProductBox key={p.id} data={p} />
        ))}
      </div>
    </main>
  );
}
