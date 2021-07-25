export type WeatherDataType = {
    weather: [{
        main: string,
        icon: string
    }],
    main:{
        temp: number,
        temp_min: number,
        temp_max: number,
        humidity: number
    },
    dt: number,
    dt_txt: string,
    wind: {
        speed: number
    }
}

export type WeatherStateType = {
    weather: {
        timeSelected: string,
        times: [],
        data: object,
        todayShow: boolean
    }
}
