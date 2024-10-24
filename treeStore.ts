// Есть массив объектов, которые имеют поля id и parent, через которые их можно связать в дерево и некоторые произвольные поля. id может быть как числом, так и строкой. Порядок id не гарантируется, изначально отсутствует какой либо принцип сортировки. Поле type не влияет ни на что, просто отображает возможность наличия какой-то полезной нагрузки в айтемах.
//
//
// НУЖНО написать класс, который принимает в конструктор массив этих объектов и реализует следующие методы:
//    *  - getAll() Должен возвращать изначальный массив элементов.
//    *  - getItem(id) Принимает id элемента и возвращает сам объект элемента;
//    *  - getChildren(id) Принимает id элемента и возвращает массив элементов, являющихся дочерними для того элемента,
//      * чей id получен в аргументе. Если у элемента нет дочерних, то должен возвращаться пустой массив;
//    *  - getAllChildren(id) Принимает id элемента и возвращает массив элементов, являющихся прямыми дочерними элементами того,
//      * чей id получен в аргументе + если у них в свою очередь есть еще дочерние элементы, они все тоже будут включены в результат,
//      * и так до самого глубокого уровня.
//    *  - getAllParents(id) Принимает id элемента и возвращает массив из цепочки родительских элементов,
//      * начиная от самого элемента, чей id был передан в аргументе и до корневого элемента,
//      * т.е. должен получиться путь элемента наверх дерева через цепочку родителей к корню дерева.
//      * в результате getAllParents ПОРЯДОК ЭЛЕМЕНТОВ ВАЖЕН!
//
// ТРЕБОВАНИЕ: максимальное быстродействие, следовательно, минимальное количество обходов массива при операциях,
// * в идеале, прямой доступ к элементам без поиска их в массиве.

interface Item {
    id: string | number;
    parent: string | number;
    type?: unknown;
}

class TreeStore {
    private readonly items: Item[];
    private itemsMap: Map<string | number, Item>;
    private parentMap: Map<string | number, Item[]>;

    constructor(items: Item[]) {
        this.items = items;
        this.itemsMap = new Map<string | number, Item>();
        this.parentMap = new Map<string | number, Item[]>()

        for (const item of items) {
            const parentId = item.parent
            let children = this.parentMap.get(parentId);

            this.itemsMap.set(item.id, item);

            if (!children) {
                children = [] as Item[];
                this.parentMap.set(parentId, children);
            }

            children.push(item)

        }
    }

    getAll(): Item[] {
        return this.items;
    }

    getItem(id: string | number): Item | undefined {
        return this.itemsMap.get(id);
    }

    getChildren(id: string | number): Item[] {
        return this.parentMap.get(id) ?? []
    }

    getAllChildren(id: string | number): Item[] {
        const result: Item[] = [];
        const stack: (string | number)[] = [id];

        while (stack.length > 0) {
            const currentId = stack.pop()!;
            const children = this.getChildren(currentId);

            for (const child of children) {
                result.push(child);
                stack.push(child.id);
            }
        }

        return result;
    }
}


const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items);

console.log(ts.getAll())
console.log(ts.getItem(7))
console.log(ts.getChildren(4));
console.log(ts.getChildren(5));
