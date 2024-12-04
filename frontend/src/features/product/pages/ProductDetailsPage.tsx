import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ProductHighlights from "../../../components/ProductHighlights";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../../services/products";
import { formatCurrency } from "../../../libs/utilities";
import { useForm } from "react-hook-form";
import { addCartItem } from "../../../services/cart";

type ShoppingCartFormProps = {
    product: Product;
};

type Product = {
    id: string;
    name: string;
    price: number;
    description: string;
};

type FormData = {
    productId: string;
    quantity: number;
};

export default function () {
    const { id } = useParams();
    const {
        isPending,
        data: product,
        isError,
    } = useQuery({
        queryKey: ["getProducts", id],
        queryFn: async () => getProductById(id),
    });

    return (
        <main className="min-w-full">
            <Header />

            <section className="mx-auto max-w-[1200px] px-8 py-10">
                <div className="font-medium text-lg mb-8">Detail product</div>
                {isError ? (
                    <div>Something went wrong, please try again later.</div>
                ) : isPending ? (
                    <div>Loading...</div>
                ) : (
                    <ShoppingCartForm product={product.data} />
                )}
            </section>

            <ProductHighlights />

            <Footer />
        </main>
    );
}

const ShoppingCartForm = ({ product }: ShoppingCartFormProps) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            productId: id,
            quantity: 1,
        },
    });

    const { isPending, mutate: mutateAddToCart } = useMutation({
        mutationFn: addCartItem,
        onSuccess: (val) => {
            if (val.success === true) {
                alert(val.message);
                queryClient.invalidateQueries({
                    queryKey: ["getShoppingCart"],
                });
                navigate("/cart", { replace: true });
            }

            if (val.succcess === false) {
                console.log("fail", val);
            }
        },
        onError: (err) => {
            console.log(err);
            alert("something went wrong, please try again later");
        },
    });

    const onSubmit = handleSubmit((data) => {
        const token = localStorage.getItem("token") as string;

        const formData = {
            token,
            payload: {
                productId: data.productId,
                quantity: Number(data.quantity),
            },
        };

        mutateAddToCart(formData);
    });

    return (
        <div className="w-full flex flex-col md:flex-row gap-8">
            <div className="bg-gray-100 h-[300px] md:h-[420px] md:flex-1">
                <img
                    src="../Milk-Chocolate-Bar.jpg"
                    className="h-full object-contain"
                />
            </div>
            <div className="md:flex-1 flex flex-col gap-2">
                <div className="font-medium text-lg">{product?.name}</div>
                <div className="font-bold text-xl">
                    {formatCurrency(product?.price)}
                </div>
                <div className="flex gap-2">
                    <div className="font-medium">Qty :</div>
                    <input
                        type="number"
                        className="border rounded-md px-3 py-1 max-w-[200px]"
                        defaultValue={1}
                        min={1}
                        {...register("quantity", {
                            required: "This field is required",
                        })}
                    />
                    {errors.quantity && (
                        <div className="text-red-500">
                            {errors.quantity.message}
                        </div>
                    )}
                </div>
                <div>{product?.description}</div>
                <button
                    type="button"
                    className="bg-black py-2.5 rounded-md text-white font-medium"
                    onClick={onSubmit}
                    disabled={isPending}
                >
                    Add to cart
                </button>
            </div>
        </div>
    );
};
