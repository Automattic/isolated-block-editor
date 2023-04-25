export class PostTextEditor extends Component<any, any, any> {
    static getDerivedStateFromProps(props: any, state: any): {
        value: any;
        isDirty: boolean;
    } | null;
    constructor(props: any);
    /**
     * Handles a textarea change event to notify the onChange prop callback and
     * reflect the new value in the component's own state. This marks the start
     * of the user's edits, if not already changed, preventing future props
     * changes to value from replacing the rendered value. This is expected to
     * be followed by a reset to dirty state via `stopEditing`.
     *
     * @see stopEditing
     *
     * @param {Event} event Change event.
     */
    edit(event: Event): void;
    /**
     * Function called when the user has completed their edits, responsible for
     * ensuring that changes, if made, are surfaced to the onPersist prop
     * callback and resetting dirty state.
     */
    stopEditing(): void;
    state: {};
    render(): JSX.Element;
}
declare const _default: unknown;
export default _default;
import { Component } from '@wordpress/element';
//# sourceMappingURL=post-text-editor.d.ts.map