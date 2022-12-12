import { chdir } from 'node:process'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'

export default async function handleCd([pathToDirectory]) {
    try {
        chdir(pathToDirectory)
        displayCurrentDirectory()
    } catch (error) {
        console.error('Operation failed')
    }
}

