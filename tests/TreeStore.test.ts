import {TreeStore, Item} from "../TreeStore";

describe('TreeStore', () => {
    let items: Item[];
    let ts: TreeStore;

    beforeEach(() => {
        items = [
            { id: 1, parent: 'root' },
            { id: 2, parent: 1, type: 'test' },
            { id: 3, parent: 1, type: 'test' },

            { id: 4, parent: 2, type: 'test' },
            { id: 5, parent: 2, type: 'test' },
            { id: 6, parent: 2, type: 'test' },

            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null },
        ]

        ts = new TreeStore(items)
    })

    test('getAll() должен возвращать все элеенты items', () => {
        expect(ts.getAll()).toEqual(items)
    })

    test('getItem(id) должен возвращать конкретный элемент по переданному id', () => {
        expect(ts.getItem(1)).toEqual({ id: 1, parent: 'root' })
        expect(ts.getItem(5)).toEqual({ id: 5, parent: 2, type: 'test' })
    })

    test('getItem(id) должен возвращать undefined для несуществующего id', () => {
        expect(ts.getItem(55)).toBeUndefined()
    })

    test('getItem(id) должен возвращать undefined при некорректном id', () => {
        expect(ts.getItem(null as any)).toBeUndefined()
        expect(ts.getItem(undefined as any)).toBeUndefined()
        expect(ts.getItem('invalid' as any)).toBeUndefined()
    })

    test('getChildren(id) должен возвращать прямых детей элемента в правильном порядке', () => {
        expect(ts.getChildren(2)).toEqual([
            { id: 4, parent: 2, type: 'test' },
            { id: 5, parent: 2, type: 'test' },
            { id: 6, parent: 2, type: 'test' },
        ])

        expect(ts.getChildren(55)).toEqual([])
    })

    test('getAllChildren(id) должен возвращать всех потомков элемента', () => {
        expect(ts.getAllChildren(2)).toEqual([
            { id: 4, parent: 2, type: 'test' },
            { id: 5, parent: 2, type: 'test' },
            { id: 6, parent: 2, type: 'test' },
            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null },
        ]);

        expect(ts.getAllChildren(4)).toEqual([
            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null },
        ]);

        expect(ts.getAllChildren(5)).toEqual([]);
    });

    test('getAllChildren(id) должен возвращать пустой массив для несуществующего id', () => {
        expect(ts.getAllChildren(55)).toEqual([]);
    });

    test('getAllParents(id) должен возвращать цепочку родителей элемента в правильном порядке', () => {
        expect(ts.getAllParents(1)).toEqual([{ id: 1, parent: 'root' }]);

        expect(ts.getAllParents(7)).toEqual([
            { id: 7, parent: 4, type: null },
            { id: 4, parent: 2, type: 'test' },
            { id: 2, parent: 1, type: 'test' },
            { id: 1, parent: 'root' },
        ]);
    });

    test('getAllParents(id) должен возвращать пустой массив для несуществующего id', () => {
        expect(ts.getAllParents(55)).toEqual([]);
    });

    test('Методы должны возвращать данные нужного типа', () => {
        expect(Array.isArray(ts.getAll())).toBe(true)
        expect(typeof ts.getItem(1)).toBe('object')
        expect(Array.isArray(ts.getChildren(1))).toBe(true)
        expect(Array.isArray(ts.getAllChildren(1))).toBe(true)
        expect(Array.isArray(ts.getAllParents(1))).toBe(true)
    })

    test('Методы должны корректно обрабатывать некорректные входные данные', () => {
        expect(ts.getItem(null as any)).toBeUndefined()
        expect(ts.getItem(undefined as any)).toBeUndefined()

        expect(ts.getChildren(null as any)).toEqual([])
        expect(ts.getChildren(undefined as any)).toEqual([])

        expect(ts.getAllChildren(null as any)).toEqual([])
        expect(ts.getAllChildren(undefined as any)).toEqual([])

        expect(ts.getAllParents(null as any)).toEqual([])
        expect(ts.getAllParents(undefined as any)).toEqual([])
    })

})
