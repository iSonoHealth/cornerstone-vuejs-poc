import Hammer from 'hammerjs'
import * as cornerstoneMath from 'cornerstone-math'
// Cornerstone Libraries
import * as cornerstone from 'cornerstone-core'
import * as csTools from 'cornerstone-tools'
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader'
import $ from 'jquery'

// Specify external dependencies
cornerstone.external.$ = $
csTools.external.$ = $
csTools.external.Hammer = Hammer
csTools.external.cornerstone = cornerstone
csTools.external.cornerstoneMath = cornerstoneMath
cornerstoneWebImageLoader.external.$ = $
cornerstoneWebImageLoader.external.cornerstone = cornerstone
cornerstoneWebImageLoader.external.cornerstoneMath = cornerstoneMath

export { Hammer, cornerstoneMath, cornerstone, csTools, cornerstoneWebImageLoader }
