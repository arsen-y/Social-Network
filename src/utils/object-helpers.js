export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => items.map(i => {
    if (i[objPropName] === itemId) {
        return { ...i, ...newObjProps }
    }
    return i
})
