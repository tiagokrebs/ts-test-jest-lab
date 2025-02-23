import { getStringInfo } from "../Utils"
import { v4 } from 'uuid';

// Stubed
export type stringInfo = {
    lowercase: string,
    uppercase: string,
    characters: string[],
    length: number,
    extraInfo: Object | undefined
}

type LoggerServiceCallBack = (arg: string) => void;

// Module mocked
export function toUpperCase(arg: string) {
    return arg.toUpperCase();
}

export function toLowerCaseWithId(arg: string) {
    return arg.toLowerCase() + v4();
}

// Stubed
export function calculateComplexity(stringInfo: stringInfo) {
    return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
}

// Faked and Mocked
export function toUpperCaseWithCallback(arg: string, callBack: LoggerServiceCallBack) {
    if (!arg) {
        callBack('Invalid argument');
        return;
    }
    callBack(`Called function with ${arg}`);

    return arg.toUpperCase();
}

// Spied
export class OtherStringUtils {

    // change functionality using Spies
    private callExternalService(){
        console.log('Calling external service');
    }

    public publicCallExternalService(){
        console.log('Calling external service');
    }

    public toUpperCase(arg: string) {
        return arg.toUpperCase();
    }

    // Spied on external functions/services
    public logString(arg: string) {
        return console.log(arg);
    }

}