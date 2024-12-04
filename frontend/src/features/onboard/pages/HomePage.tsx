import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ProductHighlights from "../../../components/ProductHighlights";

export default function () {
    return (
        <main className="min-w-full">
            <Header />

            <section className="md:mx-auto md:max-w-[1200px] bg-gray-100">
                <div className="min-h-[512px] flex flex-col justify-center items-center gap-4">
                    <div className="text-5xl md:text-7xl font-bold">
                        Indulge in Pure Chocolate Bliss.
                    </div>
                    <div className="text-xl md:text-3xl text-gray-500">
                        Handcrafted with Love from the Finest Ingridients.
                    </div>
                    <a
                        href="#"
                        className="px-16 py-2 rounded-md bg-black text-white font-medium"
                    >
                        Shope Now
                    </a>
                </div>
            </section>

            <ProductHighlights />

            <section className="mx-auto max-w-[1200px] px-10 py-8">
                <div className="text-2xl font-medium mb-3">Latest Reviews</div>

                <div className="flex flex-col md:flex-row gap-8">
                    {Array.from({ length: 3 }).map((_, i) => {
                        return (
                            <div
                                key={i}
                                className="flex flex-col gap-3 border rounded-md p-8"
                            >
                                <div className="flex gap-4">
                                    <div className="size-20 bg-gray-300 rounded-full" />
                                    <div className="flex flex-col gap-2">
                                        <label className="font-medium text-lg">
                                            Reviewer Name
                                        </label>
                                        <span>yyy-mm-dd</span>
                                    </div>
                                </div>

                                <div className="">
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Ipsa, dolor!
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="mx-auto max-w-[1200px] px-10 py-8">
                <div className="text-2xl font-medium mb-4">About us</div>

                <div className="flex flex-col-reverse gap-4 md:flex-row mb-8">
                    <p className="md:flex-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nihil maxime quisquam nisi praesentium! Hic tenetur
                        similique impedit labore est porro perspiciatis eum
                        suscipit optio tempore quasi, numquam corporis rem
                        placeat culpa quibusdam, exercitationem animi eaque
                        quae, soluta libero molestias id? Enim earum ad natus
                        minus aut veritatis optio at quod esse, excepturi, saepe
                        amet eos facilis pariatur similique ducimus iure unde
                        illum deserunt repellendus, fuga necessitatibus
                        incidunt! Nobis, voluptate praesentium asperiores ad
                        facilis, laboriosam quis quam non molestiae ipsum
                        corrupti voluptatibus nihil tenetur quia voluptatem
                        obcaecati modi quae eos aspernatur assumenda animi
                        accusantium corporis. Modi temporibus dolores nam et
                        dolorem.
                    </p>
                    <div className="size-40 md:size-96 bg-gray-100 md:flex-1" />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="size-40 md:size-96 bg-gray-100 md:flex-1"></div>
                    <p className="md:flex-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nihil maxime quisquam nisi praesentium! Hic tenetur
                        similique impedit labore est porro perspiciatis eum
                        suscipit optio tempore quasi, numquam corporis rem
                        placeat culpa quibusdam, exercitationem animi eaque
                        quae, soluta libero molestias id? Enim earum ad natus
                        minus aut veritatis optio at quod esse, excepturi, saepe
                        amet eos facilis pariatur similique ducimus iure unde
                        illum deserunt repellendus, fuga necessitatibus
                        incidunt! Nobis, voluptate praesentium asperiores ad
                        facilis, laboriosam quis quam non molestiae ipsum
                        corrupti voluptatibus nihil tenetur quia voluptatem
                        obcaecati modi quae eos aspernatur assumenda animi
                        accusantium corporis. Modi temporibus dolores nam et
                        dolorem.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-[1200px] h-[512px]">
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-3xl font-medium">
                        Follow the latest trends
                    </div>
                    <div className="text-2xl text-gray-500">
                        With our daily newsletter
                    </div>
                    <div className="flex gap-5 mt-8">
                        <input
                            placeholder="your@example.com"
                            type="text"
                            className="border rounded-md px-4 py-2 w-[256px]"
                        />
                        <a
                            href="#"
                            className="px-8 py-2 rounded-md bg-black text-white font-medium"
                        >
                            Submit
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
