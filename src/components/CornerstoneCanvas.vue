<template>
  <!-- WRAPPER -->
  <div
    class="image-canvas-wrapper"
    oncontextmenu="return false"
    unselectable='on'
    onselectstart='return false;'
    onmousedown='return false;'
  >

    <!-- DICOM CANVAS -->
    <div
      ref="canvas"
      class="image-canvas"
      oncontextmenu="return false"
    ></div>

  </div>

</template>

<script>
// External Dependencies
import $ from 'jquery'
import { cornerstone, cornerstoneTools, cornerstoneWebImageLoader } from './csutil.js'

// Here is how you register an image loader w/ Cornerstone
// Under the hood, this image loader is also registering a "metaDataProvider"
// Each of these has an interface you can program against to create a custom
// Image loader, or metaDataProvider if you need to get data/images into cornerstone
cornerstone.registerImageLoader('http', cornerstoneWebImageLoader.loadImage)
cornerstone.registerImageLoader('https', cornerstoneWebImageLoader.loadImage)

export default {
  name: 'CornerstoneCanvas',
  props: {
    imageId: {
      type: String,
      default: `0`
    }
  },
  data () {
    return {
      baseUrl: 'http://localhost:8086',
      exampleStudyImageUrls: [
        '/static/simple-study/1.2.276.0.74.3.1167540280.200511.112514.1.1.4.jpg',
        '/static/simple-study/1.2.276.0.74.3.1167540280.200511.112514.1.1.5.jpg',
        '/static/simple-study/1.2.276.0.74.3.1167540280.200511.112514.1.1.6.jpg',
        '/static/simple-study/1.2.276.0.74.3.1167540280.200511.112514.1.1.7.jpg',
        '/static/simple-study/1.2.276.0.74.3.1167540280.200511.112514.1.1.9.jpg',
        '/static/simple-study/1.2.276.0.74.3.1167540280.200511.112514.1.1.10.jpg'
      ],
      isInitLoad: true
    }
  },
  mounted () {
    // let _self = this
    // this.listenForCornerstoneImageRendered()
    // this.listenForCornerstoneImageLoaded()
    this.listenForWindowResize()

    // Enable Canvas
    let canvas = this.$refs.canvas
    cornerstone.enable(canvas)

    // ImageId that matches our registered image loader's 'http:' prefix
    // The webImageLoader uses this to make an xhr request to fetch an image
    // Under the hood, it creates a cornerstone "Image" object needed for display
    const imageUrl = this.baseUrl + this.exampleStudyImageUrls[this.imageId]
    cornerstone.loadImage(imageUrl)
      .then((image) => {
        // Display our loaded image on the target canvas
        cornerstone.displayImage(canvas, image)

        // TODO: It really should be possible to "turn on tools" before an image is loaded
        if (this.isInitLoad) {
          this.initCanvasTools()
        }
      })
  },
  beforeDestroy () {
    // Remove jQuery event listeners
    let canvas = this.$refs.canvas
    $(canvas).off()
  },
  methods: {
    initCanvasTools: function () {
      let canvas = this.$refs.canvas

      this.isInitLoad = false

      // Find imageIds for canvasStack
      let allImageIds = []
      this.exampleStudyImageUrls.forEach((imageId) => {
        let imageUrl = this.baseUrl + imageId
        allImageIds.push(imageUrl)
      })

      // Create canvasStack
      let canvasStack = {
        currentImageIdIndex: 0,
        imageIds: allImageIds
      }

      // Enable Inputs
      console.log(`dump cornerstoneTools.mouseInput:::`)
      cornerstoneTools.mouseInput.enable(canvas)
      // cornerstoneTools.mouseWheelInput.enable(canvas)
      cornerstoneTools.touchInput.enable(canvas)

      // Set the stack as tool state
      cornerstoneTools.addStackStateManager(canvas, ['stack'])
      cornerstoneTools.addToolState(canvas, 'stack', canvasStack)
      // cornerstoneTools.stackScrollWheel.activate(canvas)  // Mouse wheele
      cornerstoneTools.scrollIndicator.enable(canvas) // Position indicator
      console.log(`csTools.arrowAnnotate object is: `)
      console.log(cornerstoneTools.arrowAnnotate)
      // Mouse
      // cornerstoneTools.arrowAnnotate.activate(canvas, 4) // right click
      // console.log(HelloWorldTool)
      cornerstoneTools.length.activate(canvas, 1) // left click
      cornerstoneTools.pan.activate(canvas, 2) // middle click
      // cornerstoneTools.zoom.activate(canvas, 4) // right click
      let savedEventHandler = cornerstoneTools.arrowAnnotate.mouseDownCallback
      cornerstoneTools.arrowAnnotate.toolSelectedCallback = (evt, o, ...args) => {
        console.error(`Arrow Tool Selected`)
      }

      cornerstoneTools.arrowAnnotate.mouseDownCallback = (evt, o, ...args) => {
        console.log('Arrow Annotation Callback')
        console.log(cornerstoneTools.arrowAnnotate)
        const stack = new Error().stack
        console.log(stack)
        console.log(evt)
        console.log(o)
        savedEventHandler(evt, o, ...args)
      }
      cornerstoneTools.zoom.mouseDownCallback = (evt, o) => {
        console.log('zoom tool Callback')
        const stack = new Error().stack
        console.log(stack)
        console.log(evt)
        console.log(o)
      }
      // cornerstoneTools.arrowAnnotate.preMouseDownCallback = (e) => {
      //   console.log(e)
      //   console.log(this)
      // }

      // Touch / Gesture
      cornerstoneTools.lengthTouch.activate(canvas)
      // wwwc changes brightness upon touch and drag
      // cornerstoneTools.wwwcTouchDrag.activate(canvas)
      cornerstoneTools.zoomTouchPinch.activate(canvas) // - Pinch
      cornerstoneTools.panMultiTouch.activate(canvas) // - Multi (x2)
    },
    /*
     * Window Resize
     *
    */
    listenForWindowResize: function () {
      this.$nextTick(function () {
        window.addEventListener('resize', this.debounce(this.onWindowResize, 100))
      })
    },
    onWindowResize: function () {
      cornerstone.resize(this.$refs.canvas, true)
    },
    /*
     * Utility Methods
     *
    */
    debounce: function (func, wait, immediate) {
      var timeout
      return function () {
        var context = this
        var args = arguments
        var later = function () {
          timeout = null
          if (!immediate) func.apply(context, args)
        }
        var callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image-canvas-wrapper {
  width: 100%;
  height: 525px;
}

.image-canvas {
  width: 100%;
  height: 100%;
}
</style>
