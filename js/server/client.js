let Client = {

    list: [],

    create: function(id) {
        if (!Client.exists(id)) {
            this.id = id;
            this.mouseX = NaN;
            this.mouseY = NaN;

            Client.list.push(this);
        }
    },

    exists: function(id) {
        return Client.list.some(function(client) {
            if (client.id === id) {
                return true;
            }
        });
    },

    setGm: function(id) {
        if (Client.exists(id)) {
            Client.list.unshift( Client.remove(id) );
        }
    },

    remove: function(id) {
        let client = null;
        Client.list.some(function(c, index) {
            if (c.id === id) {
                client = Client.list.splice(index, 1);
                return true;
            }
        });
        return client;
    }
}

module.exports = Client;