import { Component, createSignal, onMount, createEffect } from 'solid-js';
import { For, Switch, Match, Show } from 'solid-js'
import SelectButton from './components/SelectButton'
import Footer from './components/Footer'
import Header from './components/Header'
// --export as image
// const pathToImage = (path) => {
//   return new Promise(resolve => {
//     const img = new Image()
//     img.src = path
//     img.onload = () => {
//       resolve(img)
//     }
//   })
// }
const pathToImage = (path) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = path
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      reject(new Error('图片加载失败'))
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
  const [selectedHead, setSelectedHead] = createSignal(0)
  const selectedHeadImage = () => images().head[selectedIndex().head]
  const [selectedEyes, setSelectedEyes] = createSignal(0)
  const selectedEyesImage = () => images().eyes[selectedIndex().eyes]
  const [selectedMouth, setSelectedMouth] = createSignal(0)
  const selectedMouthImage = () => images().mouth[selectedIndex().mouth]
  const [selectedEyebrows, setSelectedEyebrows] = createSignal(0)
  const selectedEyebrowsImage = () => images().eyebrows[selectedIndex().eyebrows]
  const [selectedDetails, setSelectedDetails] = createSignal(0)
  const selectedDetailsImage = () => images().details[selectedIndex().details]
  // --- 初始化
  const loadAllImage = async () => {
    const headModules = import.meta.glob<SvgImageModule>('./assets/head/*.svg')
    const fullHeadImages = await resolveImportGlobModule(headModules)
    const eyesModules = import.meta.glob<SvgImageModule>('./assets/eyes/*.svg')
    const fullEyesImages = await resolveImportGlobModule(eyesModules)
    const mouthModules = import.meta.glob<SvgImageModule>('./assets/mouth/*.svg')
    const fullMouthImages = await resolveImportGlobModule(mouthModules)
    const eyebrowsModules = import.meta.glob<SvgImageModule>('./assets/eyebrows/*.svg')
    const fullEyebrowsImages = await resolveImportGlobModule(eyebrowsModules)
    const detailModules = import.meta.glob<SvgImageModule>('./assets/details/*.svg')
    const fullDetailImages = await resolveImportGlobModule(detailModules)
    setImages({
      head: fullHeadImages,
      eyes: fullEyesImages,
      mouth: fullMouthImages,
      eyebrows: fullEyebrowsImages,
      details: fullDetailImages,
    })
    getRandom()
  }

  onMount(() => {
    loadAllImage()
  })
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
  }
  const handleClickEyes = (i: number) => {
    setSelectedEyes(i)
  }
  const handleClickMouth = (i: number) => {
    setSelectedMouth(i)
  }
  const handleClickEyebrows = (i: number) => {
    setSelectedEyebrows(i)
  }
  const handleClickDetails = (i: number) => {
    setSelectedDetails(i)
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
    setSelectedIndex(randomIndexes)
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
      <Header />
      <main
        flex="~ col" items-center justify-center gap-4
        max-w="65ch" px-6 py-12 mx-auto
        bg-white rounded-lg shadow-sm
        md:px-24
      >

        <div pos-relative p-6 border-1 border-gray-200 rounded-lg>
          {/* <div pos-absolute left-0
            p-2 rounded-full
            bg-gray-200 hover:bg-red hover:text-white
            onclick={getRandom}>
            <div class="i-material-symbols-refresh text-3xl" />
          </div> */}
          <canvas ref={canvas} width={imageSize} height={imageSize} rounded-lg></canvas>
        </div>
        <div flex h-12 gap-2>
          <div
            inline-flex px-3 items-center gap-1
            bg-gray-100 rounded-full
            hover:bg-red hover:text-white
            cursor-pointer
            onclick={getRandom}>
            <div class="i-material-symbols-refresh text-2xl" />
            <span text-2xl font-bold mr-1>再来一个</span>
          </div>
          <div
            inline-flex px-3 items-center gap-1
            bg-gray-100 rounded-full
            hover:bg-red hover:text-white
            cursor-pointer
            onClick={() => exportImage()}>
            <div class="i-material-symbols-download-rounded text-2xl" />
            <span text-2xl font-bold mr-1>导出</span>
          </div>
        </div>
        <div w-full mt-4>
          <header flex items-center p-4 border-b gap-3 border-gray-100 justify-center cursor-pointer>
            <For each={tabs}>
              {item => (
                <div
                  class={selectedTab() == item ? 'bg-red-100' : 'bg-gray-100'}
                  p-2
                  rounded-md
                  onClick={() => setSelectedTab(item)}>
                  <img src={selectedImage()[item]} h-12 />
                </div>
              )}
            </For>
          </header>
          <main p-4 >
            {/* <h2 mt-4 text-sm font-bold>选择头</h2> */}
            <div flex="~ row wrap" gap-2 justify-center cursor-pointer>
              {/* <For each={images()[selectedTab()]}>
                {(item, index) => (
                  <SelectButton
                    highlight={() => { index() === selectedIndex()[selectedTab()] }}
                    onClick={[handleSelectItem, { tab: selectedTab(), index }]}>
                    <img src={item} h-12 />
                  </SelectButton>
                )}
              </For> */}
              <Switch>
                <For each={Object.keys(images())}>
                  {(tab: EmojiSlice) => (
                    <Match when={tab === selectedTab()}>
                      <For each={images()[tab]}>
                        {(item, index) => (
                          <SelectButton
                            highlight={() => index() === selectedIndex()[selectedTab()]}
                            onClick={[handleSelectItem, { tab: selectedTab(), index: index }]}
                          >
                            <Show when={item}>
                              <img src={item} alt={selectedTab() + index} h-10 w-10></img>
                            </Show>
                          </SelectButton>
                        )}
                      </For>
                    </Match>
                  )}
                </For>
              </Switch>
            </div>
          </main>
        </div>
      </main>
      <Footer>

      </Footer>
    </>

  );
};

export default App;
