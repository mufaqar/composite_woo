"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import HeadingSection from "../HeadingSection";
import { useMemo, useState } from "react";
import {
  useDeckingProducts,
  useCladdingProducts,
} from "@/lib/hooks/useProducts";
import {
  DeckingVariant,
  CladdingType,
  CladdingSize,
  getProductSqmValue,
} from "@/lib/product-filters";
import { WooProduct } from "@/lib/woocommerce-types";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calculator, Loader2, Info, RefreshCw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const formatNumber = (n: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);

type CalculatorStep = "type" | "variant" | "size" | "product" | "calculate";

export function CalculatorHome() {
  return (
    <section className="pt-16 bg-white">
      <div className="container mx-auto px-4">
        <HeadingSection
          title="Composite Decking & Cladding Calculator"
          desc="Get an instant estimate for your project. Calculate the materials you need for your composite decking or fencing installation with our easy-to-use calculator."
        />
        <Drawer>
          <DrawerTrigger asChild>
            <button className="md:text-xl text-md font-bold text-white inline-flex gap-2 w-screen md:px-7 px-5 py-5 bg-secondary hover:bg-primary uppercase hover:text-white transition-all duration-300 ease-in-out rounded-none mt-10 justify-center -mx-4 md:-mx-[calc((100vw-1280px)/2+1rem)] lg:-mx-[calc((100vw-1280px)/2+1rem)]">
              <Calculator className="h-7 w-7" />
              Calculate
            </button>
          </DrawerTrigger>
          <DrawerContent className="border border-gray-200 rounded-lg">
            <CalculatorContent />
          </DrawerContent>
        </Drawer>
      </div>
    </section>
  );
}

function CalculatorContent() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [step, setStep] = useState<CalculatorStep>("type");
  const [productType, setProductType] = useState<"decking" | "cladding" | null>(
    null
  );
  const [variant, setVariant] = useState<DeckingVariant | CladdingType | null>(
    null
  );
  const [size, setSize] = useState<CladdingSize | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<WooProduct | null>(
    null
  );

  // Calculator inputs
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [wastage, setWastage] = useState<string>("10");

  // Fetch products based on selections
  const {
    data: deckingData,
    isLoading: deckingLoading,
    isFetching: deckingFetching,
  } = useDeckingProducts(
    productType === "decking" ? (variant as DeckingVariant) : null,
    step !== "type" && productType === "decking"
  );

  const {
    data: claddingData,
    isLoading: claddingLoading,
    isFetching: claddingFetching,
  } = useCladdingProducts(
    productType === "cladding" ? (variant as CladdingType) : null,
    step === "product" && productType === "cladding" && !!variant
  );

  const products =
    productType === "decking" ? deckingData?.products : claddingData?.products;
  const isLoadingProducts =
    productType === "decking" ? deckingLoading : claddingLoading;
  const isFetchingProducts =
    productType === "decking" ? deckingFetching : claddingFetching;

  // Calculate results
  const calculations = useMemo(() => {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const wastePct = Math.max(0, parseFloat(wastage));

    const sqmValue =
      selectedProduct && variant && productType
        ? getProductSqmValue(productType, variant, size || undefined)
        : 0.6;

    const validInputs =
      Number.isFinite(L) && Number.isFinite(W) && L > 0 && W > 0;
    const area = validInputs ? L * W : 0;
    const areaWithWaste = validInputs ? area * (1 + (wastePct || 0) / 100) : 0;
    const rawBoards = validInputs && sqmValue ? areaWithWaste / sqmValue : 0;
    const boards = validInputs ? Math.ceil(rawBoards) : 0;

    return { validInputs, area, areaWithWaste, rawBoards, boards, sqmValue };
  }, [length, width, wastage, selectedProduct, variant, productType, size]);

  const handleBack = () => {
    if (step === "variant") {
      setStep("type");
      setVariant(null);
    } else if (step === "size") {
      setStep("product");
      setSize(null);
    } else if (step === "product") {
      setStep("variant");
      setSelectedProduct(null);
    } else if (step === "calculate") {
      // For cladding, go back to size selection
      // For decking, go back to product selection
      if (productType === "cladding") {
        setStep("size");
      } else {
        setStep("product");
      }
    }
  };

  const handleTypeSelect = (type: "decking" | "cladding") => {
    setProductType(type);
    setVariant(null);
    setSize(null);
    setSelectedProduct(null);
    setStep("variant");
  };

  const handleVariantSelect = (v: DeckingVariant | CladdingType) => {
    setVariant(v);
    // Both decking and cladding go to product selection
    setStep("product");
  };

  const handleSizeSelect = (s: CladdingSize) => {
    setSize(s);
    setStep("calculate");
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  const handleProductSelect = (product: WooProduct) => {
    setSelectedProduct(product);
    if (productType === "cladding") {
      setStep("size");
    } else {
      setStep("calculate");
    }
  };

  const handleBuyNow = () => {
    if (!selectedProduct) return;

    const params = new URLSearchParams();
    if (length) params.append("length", length);
    if (width) params.append("width", width);
    if (wastage) params.append("wastage", wastage);
    if (calculations.boards > 0)
      params.append("boards", calculations.boards.toString());

    const url = `/product/${selectedProduct.slug}?${params.toString()}`;
    router.push(url);
  };

  return (
    <div className="mx-auto w-full max-w-2xl overflow-y-scroll">
      <DrawerHeader>
        <div className="flex items-center gap-2">
          {step !== "type" && (
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="flex-1">
            <DrawerTitle className="text-xl">
              {step === "type" && "Select Product Type"}
              {step === "variant" && "Select Variant"}
              {step === "size" && "Select Size"}
              {step === "product" && "Select Product"}
              {step === "calculate" && "Calculate Materials"}
            </DrawerTitle>
            <DrawerDescription>
              {step === "type" && "Choose between decking or cladding"}
              {step === "variant" && `Choose your ${productType} variant`}
              {step === "size" && "Choose the board size"}
              {step === "product" && "Select the specific product"}
              {step === "calculate" &&
                "Enter dimensions to calculate boards needed"}
            </DrawerDescription>
          </div>
          {step === "product" && (
            <button
              onClick={handleRefresh}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Refresh products"
              title="Refresh products"
              disabled={isFetchingProducts}
            >
              <RefreshCw
                className={`w-5 h-5 ${
                  isFetchingProducts ? "animate-spin" : ""
                }`}
              />
            </button>
          )}
        </div>
      </DrawerHeader>

      <div className="p-6 pb-0 max-h-[60vh] overflow-y-auto">
        {/* Step 1: Product Type */}
        {step === "type" && (
          <div className="grid gap-4">
            <button
              onClick={() => handleTypeSelect("decking")}
              className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left"
            >
              <h3 className="font-semibold text-lg mb-1">Decking</h3>
              <p className="text-sm text-gray-600">
                Composite decking boards for outdoor spaces
              </p>
            </button>
            <button
              onClick={() => handleTypeSelect("cladding")}
              className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left"
            >
              <h3 className="font-semibold text-lg mb-1">Cladding</h3>
              <p className="text-sm text-gray-600">
                Composite cladding panels for walls
              </p>
            </button>
          </div>
        )}

        {/* Step 2: Variant Selection */}
        {step === "variant" && productType === "decking" && (
          <div className="grid gap-3">
            {(["grooved", "woodgrain", "capped"] as DeckingVariant[]).map(
              (v) => (
                <button
                  key={v}
                  onClick={() => handleVariantSelect(v)}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left"
                >
                  <span className="font-medium capitalize">{v} Decking</span>
                  <span className="text-sm text-gray-600 ml-2">
                    (0.6 m² per board)
                  </span>
                </button>
              )
            )}
          </div>
        )}

        {step === "variant" && productType === "cladding" && (
          <div className="grid gap-3">
            {(["smooth", "woodgrain"] as CladdingType[]).map((v) => (
              <button
                key={v}
                onClick={() => handleVariantSelect(v)}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left"
              >
                <span className="font-medium capitalize">{v} Cladding</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 3: Size Selection (Cladding only) */}
        {step === "size" && productType === "cladding" && (
          <div className="grid gap-3">
            <button
              onClick={() => handleSizeSelect("2.5")}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left"
            >
              <span className="font-medium">2.5m Length</span>
              <span className="text-sm text-gray-600 ml-2">
                ({variant === "smooth" ? "0.368" : "0.368-0.375"} m² per board)
              </span>
            </button>
            <button
              onClick={() => handleSizeSelect("3.6")}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left"
            >
              <span className="font-medium">3.6m Length</span>
              <span className="text-sm text-gray-600 ml-2">
                ({variant === "smooth" ? "0.530" : "0.530-0.540"} m² per board)
              </span>
            </button>
          </div>
        )}

        {/* Step 4: Product Selection */}
        {step === "product" && (
          <div className="space-y-4">
            {isLoadingProducts && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2 text-gray-600">Loading products...</span>
              </div>
            )}

            {!isLoadingProducts && products && products.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  No products found matching your criteria.
                </p>
                <button
                  onClick={handleBack}
                  className="mt-4 text-primary hover:underline"
                >
                  Try different options
                </button>
              </div>
            )}

            {!isLoadingProducts && products && products.length > 0 && (
              <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2">
                {products.slice(0, 5).map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-base mb-1">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-primary font-semibold">
                            £{parseFloat(product.price).toFixed(2)}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-xs ${
                              product.stock_status === "instock"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {product.stock_status === "instock"
                              ? "In Stock"
                              : "Out of Stock"}
                          </span>
                        </div>
                      </div>
                      {product.images && product.images[0] && (
                        <div
                          className="w-16 h-16 bg-gray-200 rounded ml-3 flex-shrink-0"
                          style={{
                            backgroundImage: `url(${product.images[0].src})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      )}
                    </div>
                  </button>
                ))}
                {products.length > 5 &&
                  products.slice(5).map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-base mb-1">
                            {product.name}
                          </h4>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-primary font-semibold">
                              £{parseFloat(product.price).toFixed(2)}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-xs ${
                                product.stock_status === "instock"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {product.stock_status === "instock"
                                ? "In Stock"
                                : "Out of Stock"}
                            </span>
                          </div>
                        </div>
                        {product.images && product.images[0] && (
                          <div
                            className="w-16 h-16 bg-gray-200 rounded ml-3 flex-shrink-0"
                            style={{
                              backgroundImage: `url(${product.images[0].src})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          />
                        )}
                      </div>
                    </button>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Step 5: Calculate */}
        {step === "calculate" && selectedProduct && (
          <div className="space-y-6">
            {/* Selected Product Summary */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-sm text-gray-600 mb-1">
                Selected Product
              </h4>
              <p className="font-semibold">{selectedProduct.name}</p>
              <p className="text-sm text-primary">
                £{parseFloat(selectedProduct.price).toFixed(2)}
              </p>
            </div>

            {/* Dimension Inputs */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Length (m)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="e.g. 5"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Width (m)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="e.g. 5"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Wastage (%)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="e.g. 10"
                  value={wastage}
                  onChange={(e) => setWastage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Results */}
            {calculations.validInputs && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Total Area</p>
                    <p className="text-2xl font-bold">
                      {formatNumber(calculations.area)} m²
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">
                      Area with Wastage
                    </p>
                    <p className="text-2xl font-bold">
                      {formatNumber(calculations.areaWithWaste)} m²
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary">
                  <p className="text-sm text-gray-700 mb-1">Boards Needed</p>
                  <p className="text-4xl font-bold text-primary">
                    {calculations.boards}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    {formatNumber(calculations.rawBoards)} boards (before
                    rounding up)
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <DrawerFooter>
        {step === "calculate" && calculations.validInputs && (
          <div className="flex gap-3 w-full">
            <button
              onClick={handleBuyNow}
              className="primary_btn flex-1 flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Buy Now
            </button>
            <DrawerClose asChild>
              <button className="secondary_btn px-6">Close</button>
            </DrawerClose>
          </div>
        )}
        {step !== "calculate" && (
          <DrawerClose asChild>
            <button className="secondary_btn w-full">Cancel</button>
          </DrawerClose>
        )}
      </DrawerFooter>
    </div>
  );
}

export function CalculatorProduct() {
  return (
    <div>
      <h1>Calculator Fence</h1>
    </div>
  );
}
