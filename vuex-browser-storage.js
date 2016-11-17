import merge from 'lodash/merge'

let debug = false

/**
 * Console log depending on config debug mode
 * @param {...*} message
 */
const logDebug = function (message) {
  if (debug) {
    console.log('Vuex-browser-storage :', ...arguments)
  }
}

/**
 * Plugin main class
 */
class VuexBrowserStorage {
  constructor (config, store) {
    this.config = config
    this.store = store
    this.populateApplicationState()
    this.listenForMutations()
  }

  populateApplicationState () {
    const savedState = {}

    logDebug('Populate initial state with browser saved data...')
    this.state.replaceState(merge(this.store.state, savedState))
  }

  listenForMutations () {
    this.store.subscribe((mutation, state) => {
      console.log(mutation)
    })
  }

}

export const VuexBrowserStoragePlugin = (config) => {
  // Default
  config.debug = config.debug || false
  debug = config.debug // Module debug mode

  return (store) => {
    VuexBrowserStorage(config, store)
  }
}