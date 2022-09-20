
export const success = (message: string, data: any) => {
    return { message, data }
}

export const getUniqueId = (ingredients: any) => {
    const ingredientsIds: number[] = ingredients.map((ingredient: any) => ingredient.id);
    const maxId: number = ingredientsIds.reduce((a,b) => Math.max(a,b));
    const uniqueId = maxId + 1;
    return uniqueId;
}
