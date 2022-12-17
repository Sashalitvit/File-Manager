import { createReadStream, createWriteStream } from 'node:fs'
import { parse, resolve } from 'node:path'
import { pipeline } from 'node:stream/promises'
import { createBrotliCompress } from 'node:zlib'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'
import isDirectory from '../helpers/isDirectory.js'
import isFile from '../helpers/isFile.js'

export default async function handleCompress([pathToFile, pathToDestination]) {
    try {
        const isDirectoryCheck = await isDirectory(pathToDestination)
        const isFileCheck = await isFile(pathToDestination)

        if (!isDirectoryCheck) throw new Error("its not a directory")
        if (!isFileCheck) throw new Error("its not a file")

        pathToFile = resolve(pathToFile)
        const { base } = parse(pathToFile)
        const fileName = `${base}.br`
        pathToDestination = resolve(pathToDestination, fileName)

        const readableStream = createReadStream(pathToFile)
        const writableStream = createWriteStream(pathToDestination)
        const brotliCompress = createBrotliCompress()
        await pipeline(readableStream, brotliCompress, writableStream)
        displayCurrentDirectory()
    } catch (error) {
        console.error('Operation failed')
    }
}







