declare const _default: (Inner: import("react").ComponentType<any>) => {
    new (...args: any[]): {
        bindNode(node: any): void;
        cancelBlurCheck(): void;
        queueBlurCheck(event: any): void;
        /**
         * Handles a mousedown or mouseup event to respectively assign and
         * unassign a flag for preventing blur check on button elements. Some
         * browsers, namely Firefox and Safari, do not emit a focus event on
         * button elements when clicked, while others do. The logic here
         * intends to normalize this as treating click on buttons as focus.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
         *
         * @param {MouseEvent} event Event for mousedown or mouseup.
         */
        normalizeButtonFocus(event: MouseEvent): void;
        componentWillUnmount(): void;
        node: any;
        blurCheckTimeout: NodeJS.Timeout | undefined;
        preventBlurCheck: boolean | undefined;
        render(): JSX.Element;
        context: any;
        setState<K extends string | number | symbol>(state: any, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<any> & Readonly<{
            children?: import("@wordpress/element/node_modules/@types/react").ReactNode;
        }>;
        state: Readonly<any>;
        refs: {
            [key: string]: import("@wordpress/element/node_modules/@types/react").ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: import("@wordpress/element/node_modules/@types/react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>): any;
        componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
    };
    contextType?: import("@wordpress/element/node_modules/@types/react").Context<any> | undefined;
};
export default _default;
//# sourceMappingURL=with-focus-outside.d.ts.map