# uuidv4-js

Generates a new uuidv4. That's it.

- [Definitions][definitions]
    - [rng][rng]
    - [stringify][stringify]
    - [uuidv4Fn][uuidv4fn]
    - [UuidV4][uuidv4]
- [Usage][usage]

## Definitions

### rng

```typescript
const rng = (): Uint8Array => {
    // ...
};
```

The internal `rng()` function uses the browser's default `crypto` module to
fill a static 16-byte `Uint8Array` with random values.

### stringify

```typescript
const stringify = (arr: Uint8Array): string => {
    // ...
};
```

The internal `stringify()` function uses a static array prefilled with 255
sequential lower-case hex-representations of bytes starting at `0x00`. These
values are then retrieved via `hexBytes[arr[n]]`. This removes the need to
generate a new array of hex values or call `toString(16)` more than once
throughout the lifetime of the object.

### uuidv4Fn

```typescript
const uuidv4Fn = (): string => {
    let random = rng();
    // conform `random` to v4.4 spec...
    return stringify(random);
};
```

### UuidV4

```typescript
const UuidV4 = (() => {
    // aforementioned definitions...
    const uuidv4Obj = {
        new: uuidv4Fn
    };
    return uuidv4Obj;
})();
```

## Usage

This script is meant to be used in a standard web environment, no NPM, node, modules, etc.

```html
<script src="js/uuidv4.js" type="text/javascript"></script>
<script type="text/javascript">
    let uuid = UuidV4.new();
</script>
```

[definitions]: #user-content-definitions
[rng]: #user-content-rng
[stringify]: #user-content-stringify
[uuidv4fn]: #user-content-uuidv4fn
[uuidv4]: #user-content-uuidv4
[usage]: #user-content-usage
