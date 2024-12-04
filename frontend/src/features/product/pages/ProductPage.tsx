import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ProductHighlights from "../../../components/ProductHighlights";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../services/products";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../libs/utilities";

type Product = {
    id: string;
    name: string;
    price: number;
    description: string;
};

export default function () {
    const navigate = useNavigate();

    const {
        isPending,
        data: products,
        isError,
    } = useQuery({
        queryKey: ["getProducts"],
        queryFn: getProducts,
    });

    return (
        <main className="min-w-full">
            <Header />

            <section className="mx-auto max-w-[1200px] min-h-screen px-10 py-20">
                <div className="w-full">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <input
                            type="text"
                            className="h-9 px-3 py-1 border rounded-md text-base shadow-sm placeholder:text-gray-600  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            placeholder="search ..."
                        />
                        <div className="flex gap-4">
                            <button
                                type="button"
                                className="rounded-md bg-gray-200 px-3 py-1 font-normal"
                            >
                                Price ascending
                            </button>
                            <button
                                type="button"
                                className="rounded-md bg-gray-200 px-3 py-1 font-normal"
                            >
                                Price descending
                            </button>
                            <button
                                type="button"
                                className="rounded-md bg-gray-200 px-3 py-1 font-normal"
                            >
                                Rating
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-8 flex flex-col md:grid md:grid-cols-4 gap-4">
                    {isError ? (
                        <div>Something went wrong, please try again later.</div>
                    ) : isPending ? (
                        <div>Loading ...</div>
                    ) : products?.success === true ? (
                        products.data.map((val: Product) => {
                            return (
                                <div
                                    key={val.id}
                                    className="w-full md:w-[250px] border rounded-md p-3 flex flex-col gap-2 cursor-pointer"
                                    onClick={() => {
                                        navigate(`/products/${val.id}`);
                                    }}
                                >
                                    <div className="w-full h-[180px] bg-gray-100">
                                        <img
                                            src="./Milk-Chocolate-Bar.jpg"
                                            className="h-full object-contain"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="font-medium text-md">
                                            {val.name}
                                        </div>
                                        <div className="font-medium text-md">
                                            {formatCurrency(val?.price)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : null}
                </div>
            </section>

            <ProductHighlights />

            <Footer />
        </main>
    );
}
