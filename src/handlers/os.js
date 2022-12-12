import { cpus, EOL, userInfo } from 'node:os'
import { arch } from 'node:process'
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js'

export default async function handleOs([param]) {
    try {
        if (!param) throw new Error('parameter is not specified')

        const { username, homedir } = userInfo()
        const cpusInfo = cpus().map(({ model, speed }) => {
            speed = `${speed / 1000}GHz`
            return { model, speed }
        })

        const osInfo = {
            '--EOL': JSON.stringify(EOL),
            '--cpus': cpusInfo,
            '--homedir': homedir,
            '--username': username,
            '--architecture': arch,
        }

        if (!osInfo[param]) throw new Error('no such parameter')

        console.table(osInfo[param])
        displayCurrentDirectory()
    } catch (error) {
        console.error('Operation failed')
    }
}

