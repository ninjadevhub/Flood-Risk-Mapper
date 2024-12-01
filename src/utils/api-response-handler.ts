
export default async function apiResponseHandler(callable: () => Promise<void | Response>) {
    try {
        return await callable()
    } catch (error) {
        const castedError = error as Error
        console.error('Error while processing request::', castedError.message);
        return new Response(JSON.stringify({ success: false, message: castedError.message ?? `An error occured. Please try again later!` }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }
}