var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { test, expect } from '@jest/globals';
import { Sandbox } from "@fb-sandbox/core-client";
class TransportSpy {
    constructor(spy) {
        this.spy = spy;
        this.responder = null;
        this.result = true;
        this.messageToCompare = null;
    }
    send(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            let parsed = JSON.parse(msg);
            this.spy(parsed);
            //if this.messageToCompare is not null, we compare the message
            if (this.messageToCompare) {
                expect(parsed.method).toBe(this.messageToCompare.method);
                expect(parsed.params).toEqual(this.messageToCompare.params);
            }
            this.responder(JSON.stringify({
                jsonrpc: '2.0',
                id: parsed.id,
                result: null
            }));
        });
    }
    receive(callback) {
        this.responder = callback;
    }
}
test('test shareWatchHistory', () => {
    let cb = null;
    let promise = new Promise((resolve, reject) => {
        cb = resolve;
    });
    let ts = new TransportSpy(cb);
    window['__firebolt'].setTransportLayer(ts);
    Sandbox.testMethod(true).then((res) => {
        expect(res).toBe(null);
    });
    ts.result = false;
    Sandbox.testMethod(false).then((res) => {
        expect(res).toBe(null);
    });
});
