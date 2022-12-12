import { fileURLToPath } from 'node:url'

export default function getFilename(importMetaUrl) {
    return fileURLToPath(importMetaUrl)
}