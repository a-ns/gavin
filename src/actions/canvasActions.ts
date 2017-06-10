export function changeFunction (newFunction: Function, controlsSelected: string) {
  return {
    type: 'MODE_CHANGE',
    payload: {
      newFunction,
      controlsSelected
    }
  }
}
