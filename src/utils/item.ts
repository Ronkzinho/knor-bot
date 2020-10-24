export interface itemI{
    price: number,
    name: string,
    description?: string,
    icon?: string,
    stack: boolean
}

export function getItemById(id: number){
    return items[id]
}

export function getIdByItem(item: itemI){
    return items.indexOf(item)
}

export let items: itemI[] = [
    {
        price: 200,
        name: "teste",
        description: "Compre este item e n ganhe nada!",
        stack: true
    }
]
