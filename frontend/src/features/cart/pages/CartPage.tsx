import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ProductHighlights from "../../../components/ProductHighlights";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa6";
import { deleteCartItem, getShoppingCart } from "../../../services/cart";
import { formatCurrency } from "../../../libs/utilities";

type CartItem = {
    id: string;
    quantity: number;
    product: {
        id: string;
        name: string;
        price: number;
    };
};

export default function () {
    const queryClient = useQueryClient();
    const token = localStorage.getItem("token") as string;
    const {
        isPending: isPendingCart,
        data: shoppingCart,
        isError,
    } = useQuery({
        queryKey: ["getShoppingCart"],
        queryFn: async () => getShoppingCart(token),
    });

    const { isPending, mutate: mutateDeleteCartItem } = useMutation({
        mutationFn: deleteCartItem,
        onSuccess: (val) => {
            if (val.success === true) {
                alert(val.message);
                queryClient.invalidateQueries({
                    queryKey: ["getShoppingCart"],
                });
            }

            if (val.success === false) {
                alert("something went wrong, please try again later.");
            }
        },
        onError: (val) => {
            alert(`Something went wrong ${JSON.stringify(val.message)}`);
        },
    });

    const handleDelete = (cartId: string, cartItemId: string) => {
        if (!confirm("Are you sure?")) return;
        mutateDeleteCartItem({
            token,
            payload: {
                cartId: cartId,
                cartItemId: cartItemId,
            },
        });
    };
    console.log(isError);
    return (
        <main className="min-w-full">
            <Header />

            <section className="mx-auto max-w-[1200px] px-8 py-10">
                <div className="font-medium text-lg mb-8">Shopping Cart</div>

                {isError ? (
                    <div>Something went wrong, please try again later.</div>
                ) : isPendingCart ? (
                    <div>Loading...</div>
                ) : shoppingCart?.data?.items?.length > 0 ? (
                    shoppingCart?.data?.items?.map(
                        (item: CartItem, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="w-full mt-20 grid grid-cols-12 gap-8"
                                >
                                    <div className="bg-gray-100 h-[200px] col-span-4">
                                        <img
                                            src="../Milk-Chocolate-Bar.jpg"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div className="col-span-8 flex flex-col gap-2">
                                        <div className="font-medium text-lg">
                                            {item.product.name}
                                        </div>
                                        <div className="font-bold text-xl">
                                            {formatCurrency(item.product.price)}
                                        </div>
                                        <div>
                                            Lorem, ipsum dolor sit amet
                                            consectetur adipisicing elit. Eius,
                                            velit.
                                        </div>
                                        <div className="flex gap-4">
                                            <input
                                                type="number"
                                                readOnly={true}
                                                className="border rounded-md px-3 py-1 max-w-[200px]"
                                                defaultValue={item.quantity}
                                                min={1}
                                            />
                                            <button
                                                type="button"
                                                className="bg-black py-2.5 px-4 rounded-md text-white font-medium"
                                                disabled={isPending}
                                                onClick={() =>
                                                    handleDelete(
                                                        shoppingCart.data.id,
                                                        item.id
                                                    )
                                                }
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    )
                ) : (
                    <div>No data available</div>
                )}
            </section>

            <ProductHighlights />

            <Footer />
        </main>
    );
}
