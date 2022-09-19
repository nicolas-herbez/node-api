
exports.success = (message, data) => {
    return { message, data }
}

exports.getUniqueId = (ingredients) => {
    const ingredientsIds = ingredients.map(ingredient => ingredient.id);
    const maxId = ingredientsIds.reduce((a,b) => Math.max(a,b));
    const uniqueId = maxId + 1;
    return uniqueId;
}
