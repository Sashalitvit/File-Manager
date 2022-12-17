import EventEmitter  from 'node:events'
import { homedir } from 'node:os'
import {
    argv,
    chdir,
    exit,
   stdin,
    stdout,
} from 'node:process'
import * as readline from 'node:readline'
import handleAdd from './handlers/add.js'
import handleCat from './handlers/cat.js'
import handleCd from './handlers/cd.js'
import handleCompress from './handlers/compress.js'
import handleCp from './handlers/cp.js'
import handleDecompress from './handlers/decompress.js'
import handleHash from './handlers/hash.js'
import handleLine from './handlers/line.js'
import handleLs from './handlers/ls.js'
import handleMv from './handlers/mv.js'
import handleOs from './handlers/os.js'
import handleRm from './handlers/rm.js'
import handleRn from './handlers/rn.js'
import handleUp from './handlers/up.js'
import displayCurrentDirectory from './helpers/displayCurrentDirectory.js'
//import { runInNewContext } from 'node:vm'

chdir(homedir())

const args = Object.fromEntries(
    argv.slice(2).map((arg) => {
        const [key, value] = arg.split('=')
        return [key, value]
    })
)

const username = args['--username'] ? args['--username'] : 'stranger'

console.log(`Welcome to the File Manager, ${username}!`)
displayCurrentDirectory()

const eventEmitter = new EventEmitter()
eventEmitter.setMaxListeners(0)

eventEmitter
 .on('up', handleUp)
 .on('cd', handleCd)
 .on('ls', handleLs)
 .on('cat', handleCat)
 .on('add', handleAdd)
 .on('rn', handleRn)
 .on('cp', handleCp)
 .on('mv', handleMv)
 .on('rm', handleRm)
 .on('hash', handleHash)
 .on('os', handleOs)
 .on('compress', handleCompress)
 .on('decompress', handleDecompress)

 const rl = readline.createInterface({
    input: stdin,
    output: stdout
 })

 rl.on('line', handleLine.bind(rl, eventEmitter))
   .on('SIGINT', () => rl.close())
   .on('close', () => {
    console.log(`Thank you for using File Manager, ${username}!`)
    setTimeout(() => exit(), 100)
   })