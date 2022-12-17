import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'
import { pipeline } from 'node:stream/promises'
import { customOutput } from '../helpers/other.js'
import { createReadStream } from 'fs'
import path  from 'node:path'



export default async function handleCat([file]) {
    const pathToFile = path.resolve(file)

    try {
        const readableStream = createReadStream(pathToFile, { encoding: 'utf-8'})
        await pipeline(readableStream, customOutput())
        displayCurrentDirectory()
    } catch (error) {
        console.error('Operation failed')
    }
}

