import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const channelName = 'D7MTG-PREVIEW'
const refreshMessage = 'REFRESH'

export const usePreviewEmitter = (initialData) => {
    const channel = useRef()
    const [data, setData] = useState(initialData)

    const refresh = useEvent(() => {
        channel.current.postMessage(data)
    })

    useEffect(() => {
        channel.current = new BroadcastChannel(channelName)
        refresh()

        channel.current.onmessage = e => {
            if (e.data === refreshMessage)
                refresh()
        }

        return () => channel.current.close()
    }, [])

    const emit = useCallback(data => {
        setData(data)
        channel.current?.postMessage(data)
    }, [])

    return emit
}

export const usePreview = () => {
    const channel = useRef()
    const [data, setData] = useState()

    useEffect(() => {
        channel.current = new BroadcastChannel(channelName)

        channel.current.onmessage = e => {
            setData(e.data)
        }

        channel.current.postMessage(refreshMessage)
        return () => channel.current.close()
    }, [])

    return data
}

function useEvent(handler) {
    const handlerRef = useRef(null);

    useLayoutEffect(() => {
        handlerRef.current = handler;
    });

    return useCallback((...args) => {
        const fn = handlerRef.current;
        return fn(...args);
    }, []);
}