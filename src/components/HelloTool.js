// import * as cornerstone from 'cornerstone-core'
// import * as cornerstoneTools from 'cornerstone-tools'
const csTools = window.cornerstoneTools.init()
console.log(csTools)
// const BaseAnnotationTool = cornerstoneTools.importInternal('base/BaseAnnotationTool')

const BaseTool = csTools.importInternal('base/BaseTool')
// const cornerstoneTools = cornerstoneTools.init()

// const BaseTool2 = cornerstoneTools.importInternal('base/BaseTool')

export default class HelloWorldTool extends BaseTool {
  constructor (name = 'HelloWorld') {
    super({
      name,
      supportedInteractionTypes: ['Mouse'],
      mixins: ['activeOrDisabledBinaryTool']
    })
  }

  preMouseDownCallback (evt) {
    console.log(`Hello csTools! ${evt}`)
  }

  activeCallback (element) {
    console.log(`Hello element ${element.uuid}!`)
  }

  disabledCallback (element) {
    console.log(`Goodbye element ${element.uuid}!`)
  }
}
