{/* ALTERNATIVE LOGO #2: */}

import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
    return (
        <Link href="/">
            <div className="size-14 flex items-center pl-3 relative shrink-0">
                <Image
                    src="/app-logo1.png"
                    height={100}
                    width={100}
                    alt="Image AI"
                    className="hover:opacity-75 transition" // Removed shrink-0 from here
                    priority
                />
            </div>
        </Link>
    );
};

{/*
ALTERNATIVE LOGO #1: 

import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
    return (
        <Link href="/">
            <div className="size-14 flex items-center pl-4 relative shrink-0">
                <Image
                    src="/app-logo.png"
                    height={100}
                    width={100}
                    alt="Image AI"
                    className="hover:opacity-75 transition" // Removed shrink-0 from here
                />
            </div>
        </Link>
    );
};

ALTERNATIVE LOGO #2:

import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
    return (
        <Link href="/">
            <div className="size-14 flex items-center pl-3 relative shrink-0">
                <Image
                    src="/app-logo1.png"
                    height={100}
                    width={100}
                    alt="Image AI"
                    className="hover:opacity-75 transition" // Removed shrink-0 from here
                />
            </div>
        </Link>
    );
};


OG LOGO: 

import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
    return (
        <Link href="/">
            <div className="size-8 relative shrink-0">
                <Image
                    src="/logo.svg"
                    fill
                    alt="Image AI"
                    className="shrink-0 hover:opacity-75 transition"
                />
            </div>
        </Link>
    );
};

*/}