
// Use "/* istanbul ignore next */" to ignore thw whole function from code coverage
export class StringUtils {
    public toUpperCase(arg: string) {
        if (!arg) {
            throw new Error('Argument cannot be null or undefined');
        }
        return toUpperCase(arg);
    }
}

export function toUpperCase(arg: string) {
    return arg.toUpperCase();
}

export type stringInfo = {
    lowercase: string,
    uppercase: string,
    characters: string[],
    lebnght: number,
    extraInfo: Object | undefined
}

export function getStringInfo(arg: string): stringInfo {
    return {
        lowercase: arg.toLowerCase(),
        uppercase: arg.toUpperCase(),
        characters: Array.from(arg),
        lebnght: arg.length,
        extraInfo: {}
    }
}