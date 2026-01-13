import { test, expect } from '@jest/globals';
import { Sandbox } from '@fb-sandbox/core-client';


test('test shareWatchHistory', () => {

  Sandbox.testMethod(true).then((res: unknown) => {
    expect(res).toBe(null);
  });


  Sandbox.testMethod(false).then((res: unknown) => {
    expect(res).toBe(null);
  });
});
