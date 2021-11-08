import { useMemo } from "react"

export const useDictionary = (lang) => {
    return useMemo(() => {
        return (lang==='ru') ? ruWordsDatabase : enWordsDatabase
    }, [lang])
}

const ruWordsDatabase = {
    create: 'Создать',
    createPost: 'Создать пост', 
    postList: 'Список постов',
    enterName: 'Введите заголовок...',
    enterDescription: 'Введите описание...',
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
}

const enWordsDatabase = {
    create: 'Create',
    createPost: 'Create post', 
    postList: 'Posts list',
    enterName: 'Enter name...',
    enterDescription: 'Enter description...',
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
}