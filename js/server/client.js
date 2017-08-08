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
        Client.list.map(function(client) {
            if (client.id === id)
                return true;
        });
        return false;
    },

    remove: function(id) {
        Client.list.map(function(client, index) {
            if (client.id === id) {
                Client.list.splice(index, 1);
            }
        });
    }
}

module.exports = Client;