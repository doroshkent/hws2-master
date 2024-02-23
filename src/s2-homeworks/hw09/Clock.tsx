import React, {useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)

    const start = () => {
        const id = +setInterval(() => {
            setDate(new Date())
        }, 1000)
        setTimerId(id)
    }

    const stop = () => {
        clearInterval(timerId);
        setTimerId(undefined);
    }

    const onMouseEnter = () => {
        setShow(true)
    }
    const onMouseLeave = () => {
        setShow(false)
    }

    const formatOptions = {
        time: {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        },
        fullDate: {
            month: "2-digit",
            day: "2-digit",
            year: "numeric"
        },
        day: {
            weekday: "long"
        },
        month: {
            month: "long"
        }
    } as const;

    const { time, fullDate, day, month } = formatOptions;

    const formattedTime = new Intl.DateTimeFormat("en-GB", time).format(date);
    const formattedDate = new Intl.DateTimeFormat("ru", fullDate).format(date);
    const formattedDay = new Intl.DateTimeFormat("en-GB", day).format(date);
    const formattedMonth = new Intl.DateTimeFormat("en-GB", month).format(date);

    const stringTime = `${formattedTime}` || <br/>;
    const stringDate = `${formattedDate}` || <br/>;
    const stringDay = `${formattedDay}` || <br/>;
    const stringMonth = `${formattedMonth}` || <br/>;

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={!!timerId}
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={!timerId}
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
