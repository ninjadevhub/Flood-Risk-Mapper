export default interface GenericAPIRes<D = undefined> {
    success: boolean
    message?: string
    data?: D | null
}