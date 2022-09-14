import { Component, createSignal, onMount, createEffect } from 'solid-js';
import { For, Switch, Match } from 'solid-js'
import SelectButton from './components/SelectButton';
// import headImage from './assets/head/ (1).svg'
// --export as image
const pathToImage = (path) => {
  return new Promise(resolve => {
    const img = new Image()
    img.src = path
    img.onload = () => {
      resolve(img)
    }
  })
}
// --lodeImage logic
type SvgImageModule = typeof import('*.svg')
type ImportModuleFunction = () => Promise<SvgImageModule>
const resolveImportGlobModule = async (modules: Record<string, ImportModuleFunction>) => {
  const imports = Object.values(modules).map(importFn => importFn())
  const loadedModules = await Promise.all(imports)

  return loadedModules.map(module => module.default)
}
type EmojiSlice = 'head' | 'eyes' | 'mouth' | 'eyebrows' | 'details'
const tabs: EmojiSlice[] = ['head', 'eyes', 'mouth', 'eyebrows', 'details']

const App: Component = () => {
  // const [cl, setCl] = createSignal('text-green-600')
  // const list = ['red', 'green', 'blue']
  // const list2 = [...Array(10).keys()]
  // 暴露所有图标
  // const modules = import.meta.glob('./assets/**/*.svg')
  // const keys = Object.keys(modules)
  // < For each = { keys } >
  //   {(item, i) => (
  //     <button onClick={[handleClick, item]}>{item}</button>
  //   )}
  //     </For >
  //head
  // 把所有图片渲染到页面
  const [selectedTab, setSelectedTab] = createSignal<EmojiSlice>('head')
  const [images, setImages] = createSignal({
    head: [],
    eyes: [],
    mouth: [],
    eyebrows: [],
    details: [],
  })
  const [selectedIndex, setSelectedIndex] = createSignal({
    head: 0,
    eyes: 0,
    mouth: 0,
    eyebrows: 0,
    details: 0,
  })
  const selectedImage = () => {
    return {
      head: images().head[selectedIndex().head],
      eyes: images().eyes[selectedIndex().eyes],
      mouth: images().mouth[selectedIndex().mouth],
      eyebrows: images().eyebrows[selectedIndex().eyebrows],
      details: images().details[selectedIndex().details],
    }
  }
  const [headImages, setHeadImages] = createSignal([])
  const [eyesImages, setEyesImages] = createSignal([])
  const [mouthImages, setMouthImages] = createSignal([])
  const [eyebrowsImages, setEyebrowsImages] = createSignal([])
  const [detailsImages, setDetailsImages] = createSignal([])
  // 渲染要选中的图片
  // --head
  const [selectedHead, setSelectedHead] = createSignal(0)
  // const [selectedHeadImage, setSelectedHeadImage] = createSignal('')
  // const selectedHeadImage = () => headImages()[selectedHead()]?.default
  const selectedHeadImage = () => images().head[selectedIndex().head]
  //--eyes
  const [selectedEyes, setSelectedEyes] = createSignal(0)
  // const [selectedEyesImage, setSelectedEyesImage] = createSignal('')
  const selectedEyesImage = () => images().eyes[selectedIndex().eyes]
  // --mouth
  const [selectedMouth, setSelectedMouth] = createSignal(0)
  // const [selectedMouthImage, setSelectedMouthImage] = createSignal('')
  const selectedMouthImage = () => images().mouth[selectedIndex().mouth]
  // --eyebrows
  const [selectedEyebrows, setSelectedEyebrows] = createSignal(0)
  // const [selectedEyebrowsImage, setSelectedEyebrowsImage] = createSignal('')
  const selectedEyebrowsImage = () => images().eyebrows[selectedIndex().eyebrows]
  // --details
  const [selectedDetails, setSelectedDetails] = createSignal(0)
  // const [selectedDetailsImage, setSelectedDetailsImage] = createSignal('')
  const selectedDetailsImage = () => images().details[selectedIndex().details]
  // --- 初始化
  const loadAllImage = async () => {
    //head
    // const headModules = await import.meta.glob('./assets/head/*.svg')
    // const headValues = Object.values(headModules).map(m => m())
    // const fullHeadImages = await Promise.all(headValues)
    const headModules = import.meta.glob<SvgImageModule>('./assets/head/*.svg')
    const fullHeadImages = await resolveImportGlobModule(headModules)
    // setHeadImages(fullHeadImages)
    //eyes
    // const eyesModules = await import.meta.glob('./assets/eyes/*.svg')
    // const eyesValues = Object.values(eyesModules).map(m => m())
    // const fullEyesImages = await Promise.all(eyesValues)
    const eyesModules = import.meta.glob<SvgImageModule>('./assets/eyes/*.svg')
    const fullEyesImages = await resolveImportGlobModule(eyesModules)
    // setEyesImages(fullEyesImages)
    // mouth
    // const mouthModules = await import.meta.glob('./assets/mouth/*.svg')
    // const mouthValues = Object.values(mouthModules).map(m => m())
    // const fullMouthImages = await Promise.all(mouthValues)
    const mouthModules = import.meta.glob<SvgImageModule>('./assets/mouth/*.svg')
    const fullMouthImages = await resolveImportGlobModule(mouthModules)
    // setMouthImages(fullMouthImages)
    //eyebrows
    // const eyebrowsModules = await import.meta.glob('./assets/eyebrows/*.svg')
    // const eyebrowsValues = Object.values(eyebrowsModules).map(m => m())
    // const fullEyebrowsImages = await Promise.all(eyebrowsValues)
    const eyebrowsModules = import.meta.glob<SvgImageModule>('./assets/eyebrows/*.svg')
    const fullEyebrowsImages = await resolveImportGlobModule(eyebrowsModules)
    // setEyebrowsImages(fullEyebrowsImages)
    //details
    // const detailsModules = await import.meta.glob('./assets/details/*.svg')
    // const detailsValues = Object.values(detailsModules).map(m => m())
    // const fullDetailsImages = await Promise.all(detailsValues)
    const detailModules = import.meta.glob<SvgImageModule>('./assets/details/*.svg')
    const fullDetailImages = await resolveImportGlobModule(detailModules)
    // setDetailsImages(fullDetailsImages)
    setImages({
      head: fullHeadImages,
      eyes: fullEyesImages,
      mouth: fullMouthImages,
      eyebrows: fullEyebrowsImages,
      details: fullDetailImages,
    })
  }
  loadAllImage()
  // --export as image
  let canvas: HTMLCanvasElement, imageSize = 160;
  createEffect(() => {
    const headPath = selectedImage().head
    const eyesPath = selectedImage().eyes
    const mouthPath = selectedImage().mouth
    const eyebrowsPath = selectedImage().eyebrows
    const detailPath = selectedImage().details
    Promise.all
      ([pathToImage(headPath),
      pathToImage(eyesPath),
      pathToImage(mouthPath),
      pathToImage(eyebrowsPath),
      pathToImage(detailPath)
      ]).then(images => {
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, imageSize, imageSize)
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, imageSize, imageSize)
        images.forEach((img: HTMLCanvasElement) => {
          // 控制画布大小  number dw    number dh
          ctx.drawImage(img, 0, 0, imageSize, imageSize)
        })
      })
  })
  const handleSelectItem = ({ tab, index }) => {
    setSelectedIndex({
      ...selectedIndex(), [tab]: index()
    })
  }
  const handleClickHead = (i: number) => {
    setSelectedHead(i)
    // setSelectedHeadImage(headImages()[i()].default)
  }
  const handleClickEyes = (i: number) => {
    setSelectedEyes(i)
    // setSelectedEyesImage(eyesImages()[i()].default)
  }
  const handleClickMouth = (i: number) => {
    setSelectedMouth(i)
    // setSelectedMouthImage(mouthImages()[i()].default)
  }
  const handleClickEyebrows = (i: number) => {
    setSelectedEyebrows(i)
    // setSelectedEyebrowsImage(eyebrowsImages()[i()].default)
  }
  const handleClickDetails = (i: number) => {
    setSelectedDetails(i)
    // setSelectedDetailsImage(detailsImages()[i()].default)
  }
  const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const getRandom = () => {
    const randomIndexes = {
      head: randomInt(0, images().head.length - 1),
      eyes: randomInt(0, images().eyes.length - 1),
      mouth: randomInt(0, images().mouth.length - 1),
      eyebrows: randomInt(0, images().eyebrows.length - 1),
      details: randomInt(0, images().details.length - 1),
    }
    // const head = randomInt(0, images().head.length - 1)
    // const eyes = randomInt(0, images().eyes.length - 1)
    // const mouth = randomInt(0, images().mouth.length - 1)
    // const eyebrows = randomInt(0, images().eyebrows.length - 1)
    // const details = randomInt(0, images().details.length - 1)
    setSelectedIndex(randomIndexes)
    // setSelectedHead(head)
    // setSelectedEyes(eyes)
    // setSelectedMouth(mouth)
    // setSelectedEyebrows(eyebrows)
    // setSelectedDetails(details)
  }
  const exportImage = () => {
    canvas.toBlob((blob: Blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${Date.now()}.png`
      a.click()
    })
  }
  return (
    <>
      <h1 text="2xl" font="bold">Fluent Emoji Maker  --  Venus</h1>
      <div
        flex="~ col" items-center justify-center gap-4
        max-w="65ch"
        p-12
        mx-auto
        border
      >
        <div mt-8 border>
          <canvas ref={canvas} width={imageSize} height={imageSize}></canvas>
        </div>
        <div border w-full >
          <header flex items-center p-4 border-b gap-3>
            <For each={tabs}>
              {item => (
                <div
                  class={selectedTab() == item ? 'border-red-500' : ''}
                  p-2
                  border
                  onClick={() => setSelectedTab(item)}>
                  <img src={selectedImage()[item]} h-12 />
                </div>
              )}
            </For>
          </header>
          <main p-4 >
            {/* <h2 mt-4 text-sm font-bold>选择头</h2> */}
            <div flex="~ wrap" gap-2 justify-center>
              <For each={images()[selectedTab()]}>
                {(item, index) => (
                  <SelectButton highlight={() => { index() === selectedIndex()[selectedTab()] }}>
                    <img onClick={[handleSelectItem, { tab: selectedTab(), index }]} src={item} />
                  </SelectButton>
                )}
              </For>
            </div>
          </main>
        </div>
        <div>
          <button onclick={getRandom}>random</button>
          <button onClick={() => exportImage()}>Export</button>
        </div>

      </div>
    </>
  );
};

export default App;
