import { createReadStream,  createWriteStream } from 'node:fs'
import { unlink } from 'node:fs/promises'
import { parse, resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'
import isDirectory from '../helpers/isDirectory.js'

export default async function handleCompress([pathToFile, pathToNewDirectory]) {
    try {
        const isNotDirectory = !(await isDirectory(pathToNewDirectory))

        if (isNotDirectory) throw new Error('invalid path_to_new_directory')

        pathToFile = resolve(pathToFile)
        const { base } = parse(pathToFile)
        pathToNewDirectory = resolve(pathToNewDirectory, base)
        const readableStream = createReadStream(pathToFile)
        const writableStream = createWriteStream(pathToNewDirectory)
        await pipeline (readableStream, writableStream)
        await unlink(pathToFile)
        displayCurrentDirectory()
    } catch (error) {
        console.error('Operation failed')
    }
}

