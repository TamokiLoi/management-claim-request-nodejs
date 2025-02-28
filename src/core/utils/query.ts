export const formatItemsQuery = (
    query: Partial<Record<string, unknown>>,
    items: Partial<Record<string, unknown>>,
): Partial<Record<string, unknown>> => {
    for (const key in items) {
        if (items[key] || items[key] === false) {
            query = {
                ...query,
                [key]: items[key],
            };
        }
    }
    return query;
};
