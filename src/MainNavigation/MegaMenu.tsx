import React, { memo } from "react";
import type { ReactNode, ForwardedRef } from "react";
import { symToStr } from "tsafe/symToStr";
import { createComponentI18nApi } from "../i18n";
import { fr } from "../fr";
import { cx } from "../tools/cx";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { getLink } from "../link";
import type { RegisteredLinkProps } from "../link";

export type MegaMenuProps = {
    classes?: Partial<Record<"root" | "leader" | "category" | "list", string>>;
    leader?: MegaMenuProps.Leader;
    categories: MegaMenuProps.Category[];
    ref?: ForwardedRef<HTMLDivElement>;
};
export namespace MegaMenuProps {
    export type Leader = {
        title: ReactNode;
        paragraph: ReactNode;
        link?: {
            linkProps: RegisteredLinkProps;
            text: ReactNode;
        };
    };

    export type Category = {
        categoryMainLink: {
            text: ReactNode;
            linkProps: RegisteredLinkProps;
        };
        links: {
            text: ReactNode;
            linkProps: RegisteredLinkProps;
            isActive?: boolean;
        }[];
    };
}

export const MegaMenu = memo((props: MegaMenuProps & { id: string }) => {
    const { id, classes = {}, leader, categories, ref, ...rest } = props;

    assert<Equals<keyof typeof rest, never>>();

    const { t } = useTranslation();

    const { Link } = getLink();

    return (
        <div className={cx(fr.cx("fr-mega-menu"), classes.root)} tabIndex={-1} id={id} ref={ref}>
            <div className={fr.cx("fr-container", "fr-container--fluid", "fr-container-lg")}>
                <button
                    className={fr.cx("fr-link--close", "fr-link")}
                    aria-controls="mega-menu-775"
                >
                    {t("close")}
                </button>
                <div className={fr.cx("fr-grid-row", "fr-grid-row-lg--gutters")}>
                    {leader !== undefined && (
                        <div
                            className={fr.cx(
                                "fr-col-12",
                                "fr-col-lg-8",
                                "fr-col-offset-lg-4--right",
                                "fr-mb-4v"
                            )}
                        >
                            <div className={cx(fr.cx("fr-mega-menu__leader"), classes.leader)}>
                                <h4 className={fr.cx("fr-h4", "fr-mb-2v")}>{leader.title}</h4>
                                <p className={fr.cx("fr-hidden", "fr-displayed-lg")}>
                                    {leader.paragraph}
                                </p>
                                {leader.link !== undefined && (
                                    <Link
                                        {...leader.link.linkProps}
                                        className={cx(
                                            fr.cx(
                                                "fr-link",
                                                "fr-icon-arrow-right-line",
                                                "fr-link--icon-right",
                                                "fr-link--align-on-content" as any
                                            ),
                                            leader.link.linkProps.className
                                        )}
                                    >
                                        {leader.link.text}
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                    {categories.map(({ categoryMainLink, links }, i) => (
                        <div className={fr.cx("fr-col-12", "fr-col-lg-3")} key={i}>
                            <h5 className={cx(fr.cx("fr-mega-menu__category"), classes.category)}>
                                <Link
                                    {...categoryMainLink.linkProps}
                                    className={cx(
                                        fr.cx("fr-nav__link"),
                                        categoryMainLink.linkProps.className
                                    )}
                                >
                                    {categoryMainLink.text}
                                </Link>
                            </h5>
                            <ul className={cx(fr.cx("fr-mega-menu__list"), classes.list)}>
                                {links.map(({ linkProps, text, isActive }, i) => (
                                    <li key={i}>
                                        <Link
                                            {...linkProps}
                                            className={cx(
                                                fr.cx("fr-nav__link"),
                                                linkProps.className
                                            )}
                                            {...(!isActive ? {} : { "aria-current": "page" })}
                                        >
                                            {text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

MegaMenu.displayName = symToStr({ MegaMenu });

const { useTranslation, addMegaMenuTranslations } = createComponentI18nApi({
    "componentName": symToStr({ MegaMenu }),
    "frMessages": {
        /* spell-checker: disable */
        "close": "Fermer"
        /* spell-checker: enable */
    }
});

addMegaMenuTranslations({
    "lang": "en",
    "messages": {
        "close": "Close"
    }
});

export { addMegaMenuTranslations };

export default MegaMenu;
