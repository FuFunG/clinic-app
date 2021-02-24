interface BasicPayload<T> {
    ok: boolean,
    message: string
    payload: T
}

export type BasicResponse<T> =
    | BasicPayload<T>
    | [];