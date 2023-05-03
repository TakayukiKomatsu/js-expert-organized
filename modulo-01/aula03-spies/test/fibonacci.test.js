const {createSandbox} = require('sinon')
const assert = require('assert')
const stub = createSandbox()
const Fibonacci = require("../src/fibonacci");

;(async () => {
    {
        const fib = new Fibonacci()
        const spy = stub.spy(fib, fib.execute.name)
        for (const sequencia of fib.execute(3)) {
        }
        const expectedCallCount = 4
        assert.deepStrictEqual(spy.callCount, expectedCallCount)
    }
    {
        const fib = new Fibonacci()
        const spy = stub.spy(fib, fib.execute.name)
        const results = [...fib.execute(5)]

        const expectedCallCount = 6
        assert.deepStrictEqual(spy.callCount, expectedCallCount)
        const {args} = spy.getCall(2)
        const expectedParams = [3, 1, 2]
        assert.deepStrictEqual(args, expectedParams, "Os arrays não são iguais")

        const expectedResults = [0, 1, 1, 2, 3]
        assert.deepStrictEqual(results, expectedResults)
    }
})()
