export const createDeferredPromise = () => {
    const deferred = {}
    const promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve
        deferred.reject = reject
    })
    deferred.promise = promise
    return deferred
}