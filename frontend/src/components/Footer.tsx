import {
    FaInstagram,
    FaLinkedin,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";

export default function () {
    return (
        <footer className="w-full border-t-2">
            <div className="mx-auto max-w-[1200px]">
                <div className="flex flex-col md:flex-row justify-center md:justify-around gap-8 px-8 py-16">
                    <div className="w-full flex flex-col gap-5 text-2xl font-medium items-center md:items-start">
                        <div>ChocoDelight</div>
                        <div className="flex gap-2">
                            <FaXTwitter />
                            <FaInstagram />
                            <FaYoutube />
                            <FaLinkedin />
                        </div>
                        <div>&copy; 2024</div>
                    </div>

                    <div className="w-full flex flex-col text-center md:text-left gap-4">
                        <label className="text-xl font-semibold">
                            Use case
                        </label>
                        <ul className="flex flex-col gap-2.5">
                            <li>UI design</li>
                            <li>UX design</li>
                            <li>Wireframing</li>
                            <li>Diagramming</li>
                            <li>Brainstorming</li>
                            <li>Online Whiteboard</li>
                            <li>Team Collaboration</li>
                        </ul>
                    </div>

                    <div className="w-full flex flex-col text-center md:text-left gap-4">
                        <label className="text-xl font-semibold">Explore</label>
                        <ul className="flex flex-col gap-2.5">
                            <li>Design</li>
                            <li>Prototyping</li>
                            <li>Developemnt features</li>
                            <li>Design systems</li>
                            <li>Collaboration features</li>
                            <li>Design process</li>
                            <li>FigJam</li>
                        </ul>
                    </div>

                    <div className="w-full flex flex-col text-center md:text-left gap-4">
                        <label className="text-xl font-semibold">
                            Resources
                        </label>
                        <ul className="flex flex-col gap-2.5">
                            <li>Blog</li>
                            <li>Best practices</li>
                            <li>Colors</li>
                            <li>Color Wheel</li>
                            <li>Support</li>
                            <li>Developers</li>
                            <li>Resource library</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
