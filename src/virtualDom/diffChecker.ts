import {ParsedComponent} from "./ParsedComponent";

const areObjectsDifferent = (a:any, b:any) => {
    // Set of all unique keys (quick and dirty way of doing it)
    const allKeys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)]));

    // Return true if one or more elements are different
    return allKeys.some(k => a[k] !== b[k]);
};

/*
 * Diff 2 nodes
 * Returns true if different, false if equal
 */
export const areNodesDifferent = (a:ParsedComponent, b:ParsedComponent) => {
    // If at least one of the nodes doesn't exist, we'll consider them different.
    // Also, if the actual `tag` changed, we don't need to check anything else.
    if (!a || !b || (a.tag !== b.tag)) return true;

    const typeA = typeof a.children;
    const typeB = typeof b.children;

    return typeA !== typeB // Cover the case where we went from children being a string to an array
        || areObjectsDifferent(a.attributes, b.attributes) // changes in attributes
        || (typeA === 'string' && a.children !== b.children); // if it's a string, did the text change?
};


