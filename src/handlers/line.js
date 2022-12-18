export default function handleLine(eventEmitter, line) {
    try {
        let [command, ...args] = line.split(' ')

        switch(true){
            case(['cd', 'cat', 'add', 'rm', 'os', 'hash'].includes(command) && args.length === 1):
                eventEmitter.emit(command, args);
                break;
            case(['rn', 'cp', 'mv', 'compress', 'decompress'].includes(command) && args.length === 2):
                eventEmitter.emit(command, args);
                break;
            case(['up', 'ls'].includes(command)):
                eventEmitter.emit(command);
                break;
            case(command === '.exit'):
                this.close();
                break;
            default:
               console.info('Invalid input');
               break;
        }
    } catch (error) {
        console.error(error.massage)
    }
}