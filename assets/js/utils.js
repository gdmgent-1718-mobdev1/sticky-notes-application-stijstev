let utils = {
    generateId: function(length) {
        return new Date().getTime() + Math.round(Math.random() * 1000)
    }
}