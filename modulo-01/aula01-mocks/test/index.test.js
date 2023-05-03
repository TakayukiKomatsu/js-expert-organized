const File = require("../src/file")
const {error} = require("../src/constants")
const assert = require("node:assert")
const path = require("node:path");

(async () => {
    {
        const filePath = path.resolve(__dirname, "../mock/emptyFile-invalid.csv")
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await assert.rejects(result, expected)
    }

    {
        const filePath = path.resolve(__dirname, "../mock/invalid-header.csv")
        const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await assert.rejects(result, expected)
    }

    {
        const filePath = path.resolve(__dirname, "../mock/fiveItems-invalid.csv")
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await assert.rejects(result, expected)
    }

    {
        const filePath = path.resolve(__dirname, "../mock/threeItems-valid.csv")
        const expected = [
            {
                id: "1",
                name: "Xuxa da Silva",
                profession: "Data Scientist",
                age: "120"
            },
            {

                id: "2",
                name: "Jose da Silva",
                profession: "Manager",
                age: "30"
            },
            {
                id: "3",
                name: "Zezinho",
                profession: "QA",
                age: "25"
            }]
        const result = await File.csvToJson(filePath)
        assert.deepEqual(result, expected)
    }
})();
