/**
 * Internal dependencies
 */
import { CollaborativeEditingAvatars } from '.';
import type { Story } from '@storybook/react';
declare const _default: {
    title: string;
    component: typeof CollaborativeEditingAvatars;
};
export default _default;
type Props = {
    peerCount: number;
};
export declare const Default: Story<Props>;
export declare const Empty: Story<Props>;
export declare const NoImage: {
    (args: any): JSX.Element;
    args: {
        id: number;
        name: string;
        color: string | undefined;
    };
};
//# sourceMappingURL=Avatars.stories.d.ts.map