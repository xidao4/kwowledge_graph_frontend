import Cookies from 'js-cookie'

export function getTokenByKey(key) {
    return Cookies.get(key)
}

export function setTokenByKey(key, token) {
    return Cookies.set(key, token)
}

export function removeTokenByKey(key) {
    return Cookies.remove(key)
}

