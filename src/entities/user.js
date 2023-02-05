'use strict'

class User {
    constructor(id,name,age,status) {
        this.id = id || ''
        this.name = name || ''
        this.age= age || 0
        this.status = status || ''
    }

}

module.exports = User