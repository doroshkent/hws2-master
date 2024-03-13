const initState = {
    themeId: 1,
}

export const themeReducer = (state: ThemeState = initState, action: ThemeActions): ThemeState => { // fix any
    switch (action.type) {
        // дописать
        case "SET_THEME_ID":
            return {...state, themeId: action.id}
        default:
            return state
    }
}

export const changeThemeId = (id: number) => ({ type: 'SET_THEME_ID', id }) as const

// types
export type ThemeState = typeof initState
type ThemeActions = ReturnType<typeof changeThemeId>
