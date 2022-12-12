import { stat } from 'node:fs/promises'
//import { start } from 'node:fs/promises'
import { resolve } from 'node:path'

export default async function isDirectory(path) {
    try {
        path = resolve(path)
        const stats = await stat(path)
        return stats.isDirectory()
    } catch (error) {
        return false
    }
}