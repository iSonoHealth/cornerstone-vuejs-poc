import Hammer from 'hammerjs'
import * as cornerstoneMath from 'cornerstone-math'
// Cornerstone Libraries
import * as cornerstone from 'cornerstone-core'
import * as cornerstoneTools from 'cornerstone-tools'
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader'
import $ from 'jquery'

// Specify external dependencies
cornerstone.external.$ = $
cornerstoneTools.external.$ = $
cornerstoneTools.external.Hammer = Hammer
cornerstoneTools.external.cornerstone = cornerstone
cornerstoneTools.external.cornerstoneMath = cornerstoneMath
cornerstoneWebImageLoader.external.$ = $
cornerstoneWebImageLoader.external.cornerstone = cornerstone
cornerstoneWebImageLoader.external.cornerstoneMath = cornerstoneMath

export { Hammer, cornerstoneMath, cornerstone, cornerstoneTools, cornerstoneWebImageLoader }
