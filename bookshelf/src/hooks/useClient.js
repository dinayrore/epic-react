import { useAuth } from "./useAuth"
import { useCallback } from "react"
import { client } from "utils/api-client"

const useClient = () => {
    const {
      user: {token},
    } = useAuth()
    return useCallback(
      (endpoint, config) => client(endpoint, {...config, token}),
      [token],
    )
  }

export {useClient}