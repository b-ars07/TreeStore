# TreeStore

TreeStore — это класс для работы с иерархическими данными на TypeScript. Он предоставляет функциональность для работы с деревьями объектов, включающую быстрый доступ к элементам, получение потомков и родителей, а также другие операции с минимальными затратами ресурсов.

## Особенности

- 🚀 **Высокая производительность**: Минимальное количество обходов массива для выполнения операций.
- 🔗 **Прямой доступ к элементам**: Все операции используют прямой доступ к элементам, что обеспечивает быстродействие.
- 🌱 **Гибкость**: Поддержка как строковых, так и числовых `id` элементов.
- 👨‍💻 **Простота использования**: Легкость в использовании благодаря интуитивным методам для работы с деревом объектов.

## API

### `getAll(): Item[]`
Возвращает все элементы дерева.

### `getItem(id: string | number): Item | undefined`
Возвращает элемент по заданному `id`. Если элемент не найден, возвращает `undefined`.

### `getChildren(id: string | number): Item[]`
Возвращает массив детей элемента с указанным `id`. Если детей нет, возвращает пустой массив.

### `getAllChildren(id: string | number): Item[]`
Возвращает всех потомков элемента, начиная от заданного `id` и до самого глубокого уровня.

### `getAllParents(id: string | number): Item[]`
Возвращает массив родителей элемента, начиная от текущего элемента и до корневого.

## Тестирование

Для запуска тестов используется Jest. Убедитесь, что все зависимости установлены, и выполните следующую команду:

```bash
npm test
```

Тесты охватывают как позитивные, так и негативные сценарии использования, чтобы гарантировать правильную работу всех методов.

## Сборка проекта

Для компиляции TypeScript в JavaScript выполните следующую команду:

```bash
npm run build
```