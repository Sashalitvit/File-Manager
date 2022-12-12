import { createHash } from 'node:crypto'
import { createReadStream} from 'node:fs'
import { resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'
import { customOutput } from '../helpers/other.js'

export default async function handleCompress([pathToFile]) {
    try {
        pathToFile = resolve(pathToFile)
        const hash = createHash('sha256')
        const readableStream = createReadStream(pathToFile)
        await pipeline(readableStream, hash.setEncoding('hex'), customOutput())
        displayCurrentDirectory()
    } catch (error) {
        console.error('Operation failed')
    }
}

