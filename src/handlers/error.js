import displayCurrentDirectory from './/helpers/displayCurrentDirectory.js'

export default async function handleError(error) {
    if (error) {
        console.error('Operation failed')
    } else {
        displayCurrentDirectory()
    }
}
