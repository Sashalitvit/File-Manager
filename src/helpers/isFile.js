import { stat } from 'node:fs/promises'
import { resolve } from 'node:path'

export default async function isFile(path) {
    try {
        path = resolve(path)
        const stats = await stat(path)
        return stats.isFile()
    } catch (error) {
        return false
    }
}
