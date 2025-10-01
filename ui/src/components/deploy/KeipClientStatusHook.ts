import { useEffect, useState } from "react"
import { K8S_CLUSTER_URL } from "../../singletons/externalEndpoints"
import fetchWithTimeout from "../../utils/fetch/fetchWithTimeout"

const statusEndpoint = `${K8S_CLUSTER_URL}/status`

const logKeipClientStatus = (available: boolean) => {
    if (available) {
        console.log(
            `Enable Integration Route deployment: A KEIP Controller is available at ${K8S_CLUSTER_URL}`
        )
    } else {
        console.log(
            `Disable Integration Route deployment: Could not connect to a KEIP Controller at ${K8S_CLUSTER_URL}`
        )
    }
}

const useKeipClientStatus = () => {
    const [isAvailable, setIsAvailable] = useState(false)

    useEffect(() => {
        const abortCtrl = new AbortController()
        const status = fetchWithTimeout(statusEndpoint, { abortCtrl })
            .then((r) => r.ok)
            .catch(() => false)

        void (async () => {
            const resolved = await status
            logKeipClientStatus(resolved)
            setIsAvailable(resolved)
        })()

        return () => {
            abortCtrl.abort("Component unmounted")
        }
    }, [])

    return isAvailable
}

export default useKeipClientStatus