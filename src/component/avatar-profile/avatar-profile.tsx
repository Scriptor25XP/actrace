import Image, { ImageProps } from "next/image";

type Props = Omit<ImageProps, "src"> & {
    src: string,
}

export function AvatarProfile({ src, alt, ...props }: Readonly<Props>) {
    if (src.startsWith("avatar")) {
        src = `/${src}`;
    } else {
        src = `/api/image/${encodeURIComponent(src)}`;
    }

    return <Image src={src} alt={alt} {...props} />;
}
