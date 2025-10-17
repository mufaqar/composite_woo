import Banner from "@/components/Banner";
import ProductBox from "@/components/Product/ProductBox";
import { getAllProducts } from "@/lib/woocommerce-api";

export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <main>
      <Banner
        title="Welcome to the Composite Warehouse"
        img="/images/about-banner.png"
        desc="Create your dream low maintenance garden with our large range of composite materials from cladding your exterior home, or new garden room, even switching or replacing your fencing with our composite fence panels that will not only modern your garden but ensure it stands out with its large variety of colour and surface texture finishes.Even keep it traditional with our composite decking boards with their natural reversible grooves or wood grain finishes, developed to provide our consumers with alternative low maintenance decking solutions that are resistant to rotting, splintering, and decay with their low moisture absorption ensuring you never need to stain, seal or even paint your deck."
      />
      <section className="md:py-20 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductBox key={p.id} data={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
