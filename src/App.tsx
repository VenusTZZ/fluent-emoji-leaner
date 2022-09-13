import { Component, createSignal, For } from 'solid-js';
import SelectButton from './components/SelectButton';
import headImage from './assets/head/ (1).svg'


const App: Component = () => {
  const [cl, setCl] = createSignal('text-green-600')
  const list = ['red', 'green', 'blue']
  const list2 = [...Array(10).keys()]

  // 暴露所有图标
  const modules = import.meta.glob('./assets/**/*.svg')
  const keys = Object.keys(modules)
  // < For each = { keys } >
  //   {(item, i) => (
  //     <button onClick={[handleClick, item]}>{item}</button>
  //   )}
  //     </For >
  //head

  // 把所有图片渲染到页面
  const [headImages, setHeadImages] = createSignal([])
  const [eyesImages, setEyesImages] = createSignal([])
  const [mouthImages, setMouthImages] = createSignal([])
  const [eyebrowsImages, setEyebrowsImages] = createSignal([])
  const [detailsImages, setDetailsImages] = createSignal([])
  // 渲染要选中的图片 
  const [selectedHead, setSelectedHead] = createSignal(0)
  const [selectedHeadImage, setSelectedHeadImage] = createSignal('')
  const [selectedEyes, setSelectedEyes] = createSignal(0)
  const [selectedEyesImage, setSelectedEyesImage] = createSignal('')
  const [selectedMouth, setSelectedMouth] = createSignal(0)
  const [selectedMouthImage, setSelectedMouthImage] = createSignal('')

  const loadAllImage = async () => {
    //head
    const headModules = await import.meta.glob('./assets/head/*.svg')
    const headValues = Object.values(headModules).map(m => m())
    const fullHeadImages = await Promise.all(headValues)
    setHeadImages(fullHeadImages)
    //eyes
    const eyesModules = await import.meta.glob('./assets/eyes/*.svg')
    const eyesValues = Object.values(eyesModules).map(m => m())
    const fullEyesImages = await Promise.all(eyesValues)
    setEyesImages(fullEyesImages)
    // mouth
    const mouthModules = await import.meta.glob('./assets/mouth/*.svg')
    const mouthValues = Object.values(mouthModules).map(m => m())
    const fullMouthImages = await Promise.all(mouthValues)
    setMouthImages(fullMouthImages)
    //eyebrows
    const eyebrowsModules = await import.meta.glob('./assets/eyebrows/*.svg')
    const eyebrowsValues = Object.values(eyebrowsModules).map(m => m())
    const fullEyebrowsImages = await Promise.all(eyebrowsValues)
    setEyebrowsImages(fullEyebrowsImages)
    //details
    const detailsModules = await import.meta.glob('./assets/details/*.svg')
    const detailsValues = Object.values(detailsModules).map(m => m())
    const fullDetailsImages = await Promise.all(detailsValues)
    setDetailsImages(fullDetailsImages)
  }
  loadAllImage()
  // cl()
  const handleClickHead = (i) => {
    setSelectedHead(i)
    setSelectedHeadImage(headImages()[i()].default)
  }
  const handleClickEyes = (i) => {

    setSelectedEyes(i)
    setSelectedEyesImage(eyesImages()[i()].default)

  }
  const handleClickMouth = (i) => {
    setSelectedMouth(i)
    setSelectedMouthImage(mouthImages()[i()].default)
  }
  return (
    <>
      <h1 text="2xl" font="bold">Fluent Emoji Maker  --  Venus</h1>
      {/* <div>
        <img w-24 src={headImage} alt="" />
      </div> */}

      <p mt-4>选择头</p>
      <div flex="~ row" gap-2 mt-4>
        <For each={headImages()}>
          {(item, index) => (
            <SelectButton >
              <img onClick={[handleClickHead, index]} src={item.default} alt="" />
            </SelectButton>
            // <button onClick={[handleClick, { item }]}>{item}</button>
          )}
        </For>
      </div>

      <p mt-4>选择眼睛</p>
      <div flex="~ row" gap-2 mt-4>
        <For each={eyesImages()}>
          {(item, index) => (
            <SelectButton>
              <img onClick={[handleClickEyes, index]} src={item.default} alt="" />
            </SelectButton>
          )}
        </For>
      </div>

      <p mt-4>选择嘴巴</p>
      <div flex="~ row" gap-2 mt-4>
        <For each={mouthImages()}>
          {(item, index) => (
            <SelectButton>
              <img onClick={[handleClickMouth, index]} src={item.default} alt="" />
            </SelectButton>
          )}
        </For>
      </div>

      <p mt-4>选择眉毛</p>
      <div flex="~ row" gap-2 mt-4>
        <For each={eyebrowsImages()}>
          {(item, i) => (
            <SelectButton>
              <img src={item.default} alt="" />
            </SelectButton>
          )}
        </For>
      </div>

      <p mt-4>添加细节</p>
      <div flex="~ row" gap-2 mt-4>
        <For each={detailsImages()}>
          {(item, i) => (
            <SelectButton>
              <img src={item.default} alt="" />
            </SelectButton>
          )}
        </For>
      </div>

      <div mt-8 border h-32 mt-4>
        <img w-24 h-24 src={selectedHeadImage()} />
        <img w-24 h-24 src={selectedEyesImage()} />
        <img w-24 h-24 src={selectedMouthImage()} />
      </div>
    </>
  );
};

export default App;
