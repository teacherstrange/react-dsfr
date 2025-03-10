import React, { memo, useId } from "react";
import type { ForwardedRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { createComponentI18nApi } from "./i18n";
import { cx } from "./tools/cx";
import { fr } from "./fr";
import { getLink } from "./link";
import type { RegisteredLinkProps } from "./link";

export type SummaryProps = {
    className?: string;
    links: {
        text: string;
        linkProps: RegisteredLinkProps;
    }[];
    title?: string;
    /** Default: "p" */
    as?: "p" | "h2" | "h3" | "h4" | "h5" | "h6";
    ref?: ForwardedRef<HTMLDivElement>;
    classes?: Partial<Record<"root" | "title" | "link", string>>;
};

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-summary> */
export const Summary = memo((props: SummaryProps) => {
    const { className, links, as = "p", title, classes = {}, ref, ...rest } = props;

    const { t } = useTranslation();

    const titleId = useId();
    const summaryTitle = title ?? t("title");

    const { Link } = getLink();

    assert<Equals<keyof typeof rest, never>>();

    return (
        <nav
            className={cx(fr.cx("fr-summary"), classes.root, className)}
            role="navigation"
            aria-labelledby={titleId}
            ref={ref}
        >
            {React.createElement(
                as,
                {
                    className: cx(fr.cx("fr-summary__title"), classes.title),
                    id: titleId
                },
                <>{summaryTitle}</>
            )}
            <ol>
                {links.map(
                    (link, idx) =>
                        link.linkProps.href !== undefined && (
                            <li key={idx}>
                                <Link
                                    {...link.linkProps}
                                    className={cx(
                                        fr.cx("fr-summary__link"),
                                        classes.link,
                                        link.linkProps.className
                                    )}
                                >
                                    {link.text}
                                </Link>
                            </li>
                        )
                )}
            </ol>
        </nav>
    );
});

Summary.displayName = symToStr({ Summary });

const { useTranslation, addSummaryTranslations } = createComponentI18nApi({
    "componentName": symToStr({ Summary }),
    "frMessages": {
        /* spell-checker: disable */
        "title": "Sommaire"
        /* spell-checker: enable */
    }
});

addSummaryTranslations({
    "lang": "en",
    "messages": {
        "title": "Summary"
    }
});

export { addSummaryTranslations };

export default Summary;
