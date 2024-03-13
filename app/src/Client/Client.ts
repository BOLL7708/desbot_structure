import Utils from '../Shared/Utils.js'

export default class Client {
    static debug() {
        const handle = setTimeout(() => {}, 0)
        Utils.debug()
        console.log('CLIENT!')
    }
}