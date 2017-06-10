function generateControlConstants (type: string) {
  return {
    NODE: {
      ADD: type +  '_NODE' + '_ADD',
      DELETE: type + '_NODE' + '_DELETE'
    },
    EDGE: {
      ADD: type + '_EDGE' + '_ADD',
      DELETE: type + '_EDGE' + '_DELETE'
    },
    NONE: type + '_NONE'
  }
}

export const ControlsConstants = generateControlConstants('CONTROLS')
