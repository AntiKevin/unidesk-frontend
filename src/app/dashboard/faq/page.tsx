import { FaqList } from "@/components/faq/faq-list";
import { config } from "@/config";
import { Metadata } from "next";

export const metadata = { title: `FAQ | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
    return (
        <>
            <FaqList />
        </>
    );
}