const mongoose = require('mongoose');

const DomainSchema = new mongoose.Schema({
    domain : {
        type : String,
        required: true,
    }
})

const Domain = mongoose.model("Domains_Collections",DomainSchema);

module.exports = Domain;
