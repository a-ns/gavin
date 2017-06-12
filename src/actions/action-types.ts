function generateAction(type: String) {
  return {
    ADD: type + '_ADD',
    ADD_ID: type + '_ADD_ID',
    DELETE: type + '_DELETE',
    DELETE_ID: type + '_DELETE_ID',
    ERROR: type + '_ERROR',
  }
}

export const NODE = generateAction('NODE')
export const EDGE = generateAction('EDGE')
