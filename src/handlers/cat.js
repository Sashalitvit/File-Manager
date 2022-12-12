import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'
import { pipeline } from 'node:stream/promises'
import { customOutput } from '../helpers/other.js'
import { createReadStream } from 'node:fs'

export default async function handleCat([pathToFile]) {
    try {
        pathToFile = resolve(pathToFile)
        const readableStream = createReadStream(pathToFile, { encoding: 'utf8' })
        await pipeline(readableStream, customOutput())
        displayCurrentDirectory()
    } catch (error) {
        console.error('Operation failed')
    }
}
