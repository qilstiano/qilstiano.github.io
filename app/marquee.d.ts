import 'react';

// The <marquee> tag is deprecated and not in React's default JSX types,
// but we use it for the early-2000s aesthetic. Declare it so TS compiles.
declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            marquee: React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & {
                    scrollamount?: number | string;
                    scrolldelay?: number | string;
                    direction?: string;
                    behavior?: string;
                    loop?: number | string;
                },
                HTMLElement
            >;
        }
    }
}
