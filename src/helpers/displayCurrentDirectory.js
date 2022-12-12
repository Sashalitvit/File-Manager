import { cwd } from 'node:process'

export default function displayCurrentDirectory() {
    console.info(`You are currently in ${cwd()}`)
}