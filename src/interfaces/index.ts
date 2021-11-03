import { Dispatch, SetStateAction } from "react";

export interface weatherData {
    getData: any;
    current: {
        date: string;
        date_epoch: number;
        feelslike_c: number;
        [k:string]:number | string;
        temp_: number;
        temp_c: number;
        temp_f: number;
        wind_kph: number;
        wind_mph: number;
        last_updated: string;
        last_updated_epoch: number;
        humidity: number;
        cloud: number;
    };

    forecast: {
        forecastday: [
            {
                date: string;
                date_epoch: number;
                day: {
                    [k: string]: number;
                    daily_chance_of_rain: number;
                    daily_chance_of_snow: number;
                    daily_will_it_rain: number;
                    daily_will_it_snow: number;
                    maxtemp_: number;
                    maxtemp_c: number;
                    maxtemp_f: number;
                    maxwind_kph: number;
                    maxwind_mph: number;
                    mintemp_: number;
                    mintemp_c: number;
                    mintemp_f: number;
                    totalprecip_in: number;
                    totalprecip_mm: number;
                };
                hour: [
                    {
                        chance_of_rain: number;
                        chance_of_snow: number;
                        cloud: number;
                        [k:string]: string | number;
                        dewpoint_c: number;
                        dewpoint_f: number;
                        feelslike_c: number;
                        feelslike_f: number;
                        gust_kph: number;
                        gust_mph: number;
                        heatindex_c: number;
                        heatindex_f: number;
                        humidity: number;
                        is_day: number;
                        precip_in: number;
                        precip_mm: number;
                        pressure_in: number;
                        pressure_mb: number;
                        temp_: number;
                        temp_c: number;
                        temp_f: number;
                        time: string;
                        time_epoch: number;
                        vis_km: number;
                        vis_miles: number;
                        will_it_rain: number;
                        will_it_snow: number;
                        wind_degree: number;
                        wind_dir: string;
                        wind_kph: number;
                        wind_mph: number;
                        windchill_c: number;
                        windchill_f: number;
                        uv: number;
                    }
                ]
            }
        ]
    };
    location: {
        country: "Russia"
        lat: number;
        localtime: string;
        localtime_epoch: number;
        lon: number;
        name: string;
        region: string;
        tz_id: string;
    }
}

export interface weatherCardInterface {
    setCurDayIndex: Dispatch<SetStateAction<number>>;
    tempDimension: string;
    curDayIndex: number;
    children?: any;
    index: number;
    day: {
        date: string;
        date_epoch: number;
        day: {
            daily_chance_of_rain: number;
            daily_chance_of_snow: number;
            daily_will_it_rain: number;
            daily_will_it_snow: number;
            [k: string]: number;
            maxtemp_: number;
            maxtemp_c: number;
            maxtemp_f: number;
            maxwind_kph: number;
            maxwind_mph: number;
            mintemp_: number;
            mintemp_c: number;
            mintemp_f: number;
            totalprecip_in: number;
            totalprecip_mm: number;
        };
        hour: [
            {
                chance_of_rain: number;
                chance_of_snow: number;
                cloud: number;
                [k: string]: number | string;
                dewpoint_c: number;
                dewpoint_f: number;
                feelslike_c: number;
                feelslike_f: number;
                gust_kph: number;
                gust_mph: number;
                heatindex_c: number;
                heatindex_f: number;
                humidity: number;
                is_day: number;
                precip_in: number;
                precip_mm: number;
                pressure_in: number;
                pressure_mb: number;
                temp_: number;
                temp_c: number;
                temp_f: number;
                time: string;
                time_epoch: number;
                vis_km: number;
                vis_miles: number;
                will_it_rain: number;
                will_it_snow: number;
                wind_degree: number;
                wind_dir: string;
                wind_kph: number;
                wind_mph: number;
                windchill_c: number;
                windchill_f: number;
                uv: number;
            }
        ]
    }
}

export interface weatherHourInterface {
    tempDimension: string;
    hour: {
        chance_of_rain: number;
        chance_of_snow: number;
        cloud: number;
        [k: string]: number | string;
        dewpoint_c: number;
        dewpoint_f: number;
        feelslike_c: number;
        feelslike_f: number;
        gust_kph: number;
        gust_mph: number;
        heatindex_c: number;
        heatindex_f: number;
        humidity: number;
        is_day: number;
        precip_in: number;
        precip_mm: number;
        pressure_in: number;
        pressure_mb: number;
        temp_: number;
        temp_c: number;
        temp_f: number;
        time: string;
        time_epoch: number;
        vis_km: number;
        vis_miles: number;
        will_it_rain: number;
        will_it_snow: number;
        wind_degree: number;
        wind_dir: string;
        wind_kph: number;
        wind_mph: number;
        windchill_c: number;
        windchill_f: number;
        uv: number;
    }
}
