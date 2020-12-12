// import * as cornerstone from 'cornerstone-core'
// import * as csTools from 'cornerstone-tools'
const csTools = window.cornerstoneTools.init()
console.log(csTools)
// const BaseAnnotationTool = csTools.importInternal('base/BaseAnnotationTool')

const BaseTool = csTools.importInternal('base/BaseTool')
// const csTools = cornerstoneTools.init()

// const BaseTool2 = csTools.importInternal('base/BaseTool')

export default class HelloWorldTool extends BaseTool {
  constructor (name = 'HelloWorld') {
    super({
      name,
      supportedInteractionTypes: ['Mouse'],
      mixins: ['activeOrDisabledBinaryTool']
    })
  }

  preMouseDownCallback (evt) {
    console.log('Hello cornerstoneTools!')
  }

  activeCallback (element) {
    console.log(`Hello element ${element.uuid}!`)
  }

  disabledCallback (element) {
    console.log(`Goodbye element ${element.uuid}!`)
  }
}
