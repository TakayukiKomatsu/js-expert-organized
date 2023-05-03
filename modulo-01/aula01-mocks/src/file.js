const {readFile} = require('node:fs/promises');
const {error} = require("./constants");

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ["id", "name", "profession", "age"]
}

class File {
    static async csvToJson(filePath) {
        const content = await readFile(filePath, "utf8");
        const validation = this.isValid(content);

        if (!validation.valid) {
            throw new Error(validation.error)
        }
        return this.parseCsvToJson(content);
    }

    static isValid(csvString, options = DEFAULT_OPTIONS) {
        const [headers, ...fileWithoutHeader] = csvString.split(/\r?\n/)
        const isHeaderValid = headers === options.fields.join(",");

        if (!isHeaderValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }
        if (!fileWithoutHeader.length || fileWithoutHeader.length > options.maxLines) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }
        return {
            valid: true
        }
    }

    static parseCsvToJson(csvString) {
        const lines = csvString.split(/\r?\n/);
        const firstLine = lines.shift();
        const header = firstLine.split(",");

        return lines.map(line => {
            const columns = line.split(",");
            let user = {}

            for (const index in columns) {
                user[header[index]] = columns[index].trim()
            }
            return user;
        })
    }
}

module.exports = File;
