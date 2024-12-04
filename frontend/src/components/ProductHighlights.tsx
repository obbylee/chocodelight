export default function () {
    return (
        <section className="mx-auto max-w-[1200px] px-10 py-8">
            <div className="flex flex-col">
                <label className="text-2xl font-medium">
                    Our Recommendation
                </label>
                <label>Lorem ipsum dolor sit amet.</label>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mt-5">
                {Array.from({ length: 3 }).map((_, i) => {
                    return (
                        <div
                            key={i}
                            className="border rounded-md p-4 flex flex-col gap-2.5"
                        >
                            <div className="size-52 bg-gray-100" />
                            <div className="font-medium text-xl">Title</div>
                            <div>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Adipisci fugit ex nihil
                                asperiores ab sunt molestiae temporibus iste,
                                dolores fugiat ipsum veniam aliquam autem
                                veritatis.
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex items-center justify-center mt-8">
                <a
                    href="#"
                    className="px-16 py-2 rounded-md bg-black text-white font-medium"
                >
                    Explore all Product's
                </a>
            </div>
        </section>
    );
}
