import { Component, createSignal, For } from 'solid-js';
import Comp from './Comp';
import image from './assets/head/ (1).svg'


const App: Component = () => {
  const [cl, setCl] = createSignal('text-green-600')
  const list = ['red', 'green', 'blue']
  const list2 = [...Array(10).keys()]

  // 暴露所有图标
  const moduls = import.meta.glob('./assets/**/*.svg')
  const keys = Object.keys(moduls)
  // < For each = { keys } >
  //   {(item, i) => (
  //     <button onClick={[handleClick, item]}>{item}</button>
  //   )}
  //     </For >
  //head

  // 加载图片到页面
  const [headImages, setHeadImages] = createSignal([])
  const [eyesImages, setEyesImages] = createSignal([])
  const [mouthImages, setMouthImages] = createSignal([])
  const [eyebrowsImages, setEyebrowsImages] = createSignal([])
  const [detailsImages, setDetailsImages] = createSignal([])
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
  // eyes
  const eyesModules = import.meta.glob('./assets/eyes/*.svg')
  const eyesKeys = Object.keys(eyesModules)
  // mouth
  const mouthModules = import.meta.glob('./assets/mouth/*.svg')
  const mouthKeys = Object.keys(mouthModules)
  // eyebrows
  const eyebrowsModules = import.meta.glob('./assets/eyebrows/*.svg')
  const eyebrowsKeys = Object.keys(eyebrowsModules)

  //details
  const detailsModules = import.meta.glob('./assets/details/*.svg')
  const detailsKeys = Object.keys(detailsModules)


  loadAllImage()
  // cl()
  const handleClick = (i) => {
    alert(i())
  }
  return (
    <>
      <h1 text="2xl" font="bold">Fluent Emoji Maker  --  Venus</h1>
      <div>
        <p>head</p>
        <For each={headImages()}>
          {(item, i) => (
            <img src={item.default} alt="" />
            // <button onClick={[handleClick, { item }]}>{item}</button>
          )}
        </For>
      </div>

      <div mt-4>
        <p>eyes</p>
        <For each={eyesImages()}>
          {(item, i) => (
            <img src={item.default} alt="" />
            // <button onClick={[handleClick, item]}>{item}</button>
          )}
        </For>
      </div>
      <div mt-4>
        <p>mouth</p>
        <For each={mouthImages()}>
          {(item, i) => (
            <img src={item.default} alt="" />
            // <button onClick={[handleClick, item]}>{item}</button>
          )}
        </For>

      </div>
      <div mt-4>
        <p>eyebrows</p>
        <For each={eyebrowsImages()}>
          {(item, i) => (
            <img src={item.default} alt="" />
            // <button onClick={[handleClick, item]}>{item}</button>
          )}
        </For>
      </div>
      <div mt-4>
        <p>detail</p>
        <For each={detailsImages()}>
          {(item, i) => (
            <img src={item.default} alt="" />
            // <button onClick={[handleClick, i]}>{item}</button>
          )}
        </For>
      </div>

      <div>
        <img w-24 src={image} alt="" />
      </div>

      <div mt-8 border h-32>
        <p>{cl}</p>
      </div>
    </>
  );
};

export default App;
