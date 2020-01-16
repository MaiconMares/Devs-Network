module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim());
    /* split() remove as vírgulas e map() junto com trim() retira os espacos 
    que houverem entre as strings */
}