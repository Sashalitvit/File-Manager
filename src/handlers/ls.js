import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'

export default async function handleLs() {
    try {
        const currentDirectory = resolve(cwd())
        const files = await readdir(currentDirectory)
        console.table(files)
        displayCurrentDirectory()
    } catch (error) {
        console.error('Operation failed')
    }
}
