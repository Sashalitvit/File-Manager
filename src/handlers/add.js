import { open } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'

export default async function handleAdd([newFileName]) {
    let filehandle
    try {
        const pathToFile = resolve(cwd(), newFileName)
        filehandle = await open(pathToFile, 'w')
        displayCurrentDirectory()
    } catch (error) {
        console.log('Operation failed')
    } finally {
        filehandle.close()
    }
}