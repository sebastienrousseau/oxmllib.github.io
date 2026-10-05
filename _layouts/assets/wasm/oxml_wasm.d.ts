/* tslint:disable */
/* eslint-disable */

/**
 * A parsed XML document.
 */
export class Document {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * How many nodes an expression matches.
     *
     *
     * `namespaces` binds prefixes for the expression, each written
     * `"PREFIX=URI"` — the same spelling `oxml-cli` takes for `--ns`.
     * A prefix resolves against these bindings and not against the
     * document, so one query works across documents that spell the
     * prefix differently. An unbound prefix is an error.
     *
     * # Errors
     *
     * Returns a `JsError` if the expression is malformed or uses an
     * unbound prefix.
     */
    queryCount(expression: string, namespaces?: string[] | null): number;
    /**
     * Evaluate an `XPath` expression and return the matched nodes'
     * text, as an array of strings.
     *
     * Returning text rather than node handles is deliberate: a
     * `NodeId` is only meaningful against the document that issued
     * it, and handing an opaque integer across the WASM boundary
     * invites exactly the misuse the Rust API's lifetime rules
     * prevent.
     *
     *
     * `namespaces` binds prefixes for the expression, each written
     * `"PREFIX=URI"` — the same spelling `oxml-cli` takes for `--ns`.
     * A prefix resolves against these bindings and not against the
     * document, so one query works across documents that spell the
     * prefix differently. An unbound prefix is an error.
     *
     * # Errors
     *
     * Returns a `JsError` if the expression is malformed or uses an
     * unbound prefix.
     */
    queryText(expression: string, namespaces?: string[] | null): string[];
    /**
     * Evaluate an `XPath` expression and return its value as a string.
     *
     * Use this for expressions that are not node-sets — `count(..)`,
     * `string(..)`, a comparison.
     *
     *
     * `namespaces` binds prefixes for the expression, each written
     * `"PREFIX=URI"` — the same spelling `oxml-cli` takes for `--ns`.
     * A prefix resolves against these bindings and not against the
     * document, so one query works across documents that spell the
     * prefix differently. An unbound prefix is an error.
     *
     * # Errors
     *
     * Returns a `JsError` if the expression is malformed or uses an
     * unbound prefix.
     */
    queryValue(expression: string, namespaces?: string[] | null): string;
    /**
     * The name of the root element, if there is one.
     */
    rootName(): string | undefined;
    /**
     * The document as XML.
     *
     * The counterpart to `parse`. Reading a document and writing it
     * back previously meant reaching for `XMLSerializer` and holding
     * two representations of the same thing.
     *
     * Round-trips: the output parses to a document that serialises
     * identically. It is not guaranteed byte-identical to the input,
     * because a document has more than one valid spelling -- entity
     * references and attribute order among them.
     */
    toXml(): string;
    /**
     * The number of nodes, including the document root.
     */
    readonly size: number;
}

/**
 * Check whether a document is well-formed, without keeping it.
 *
 * Cheaper than `parse` when the answer is all you need, because the
 * tree is dropped immediately.
 */
export function isWellFormed(source: string): boolean;

/**
 * Parse an XML document.
 *
 * # Errors
 *
 * Returns a `JsError` carrying the position and reason if the input
 * is not well-formed.
 */
export function parse(source: string): Document;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_document_free: (a: number, b: number) => void;
    readonly document_queryCount: (a: number, b: number, c: number, d: number, e: number) => [number, number, number];
    readonly document_queryText: (a: number, b: number, c: number, d: number, e: number) => [number, number, number, number];
    readonly document_queryValue: (a: number, b: number, c: number, d: number, e: number) => [number, number, number, number];
    readonly document_rootName: (a: number) => [number, number];
    readonly document_size: (a: number) => number;
    readonly document_toXml: (a: number) => [number, number];
    readonly isWellFormed: (a: number, b: number) => number;
    readonly parse: (a: number, b: number) => [number, number, number];
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __externref_table_alloc: () => number;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __externref_drop_slice: (a: number, b: number) => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
