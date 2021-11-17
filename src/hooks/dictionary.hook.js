import { useMemo } from "react"

export const useDictionary = (lang) => {
    return useMemo(() => {
        return (lang==='ru') ? ruWordsDatabase : enWordsDatabase
    }, [lang])
}

const ruWordsDatabase = {
    create: 'Создать',
    createTask: 'Создать задачу', 
    postList: 'Список постов',
    enterName: 'Введите заголовок...',
    enterDescription: 'Введите описание...',
    enterTask: 'Что Вам нужно сделать?',
    errorNoNameDesc: 'Введите название и описание',
    searching: 'Поиск...',
    sorting: 'Сортировка',
    byName: 'По названию',
    byDescription: 'По описанию',
    noPosts: 'Посты не найдены',
    changePost: 'Редактировать',
    deletePost: 'Удалить',
    errorNoSelectCity: 'Вы не ввели город...',
    errorAlreadyInList: 'Город уже в списке',
    enterCity: 'Введите город...',
    search: 'Поиск',
    localTime: 'Местное время: ',
    hour: 'ч.',
    feelsLike: 'Ощущается: ',
    kph: 'км/ч',
    forecast: 'Прогноз погоды',
    emptyInput: 'Вы не заполнили поле ввода',
    welcome: 'Добро пожаловать'
}

const enWordsDatabase = {
    create: 'Create',
    createTask: 'Create task', 
    postList: 'Posts list',
    enterName: 'Enter name...',
    enterDescription: 'Enter description...',
    enterTask: 'What do you have to do?',
    errorNoNameDesc: 'Enter name and description',
    searching: 'Searching...',
    sorting: 'Sort',
    byName: 'By name',
    byDescription: 'By description',
    noPosts: 'No post found',
    changePost: 'Change',
    deletePost: 'Delete',
    errorNoSelectCity: 'You haven\'t selected the city...',
    errorAlreadyInList: 'City is already in list',
    enterCity: 'Search city...',
    search: 'Search',
    localTime: 'Local time: ',
    hour: 'h',
    feelsLike: 'Feels like: ',
    kph: 'kph',
    forecast: 'Forecast',
    emptyInput: 'You haven\'t fill input',
    welcome: 'Welcome'
}