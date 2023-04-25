/**
 * Internal dependencies
 */
import { CollaborativeEditingAvatars } from '.';
declare const _default: {
    title: string;
    component: typeof CollaborativeEditingAvatars;
};
export default _default;
type Props = {
    peerCount: number;
};
export declare const Default: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react/dist/types-0a347bb9").R, Props>;
export declare const Empty: import("@storybook/types").AnnotatedStoryFn<import("@storybook/react/dist/types-0a347bb9").R, Props>;
export declare const NoImage: {
    (args: any): JSX.Element;
    args: {
        id: number;
        name: string;
        color: string | undefined;
    };
};
//# sourceMappingURL=Avatars.stories.d.ts.map