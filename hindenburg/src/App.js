import { useEffect, useState } from 'react'

import './App.css';
import { TrackList } from './TrackList.js'


const xmlko = `<?xml version="1.0" encoding="UTF-8"?>
<Session>
  <AudioPool>
    <File Id="1">
      <File.CuePoints>
        <CuePoint Time="20:29.796"/>
        <CuePoint Time="20:32.396"/>
      </File.CuePoints>
    </File>
    <File Id="2">
      <MetaData OriginalPath="sound.wav"/>
    </File>
  </AudioPool>
  <Tracks>
    <Master Name="Master"/>
    <Track>
      <Region Ref="2"/>
      <Region Ref="2"/>
      <Region Ref="2"/>
    </Track>
    <Track>
      <Region Ref="1"/>
      <Plugins>
        <Plugin Id="0" Name="Brusfri" UID="Mmal" Lookahead="1" Release="0.123905" Threshold="0.5" Attack="0.0123765" HPF="0.25" Learn="0" High="0.25" Mix="1" Vendor="Klevgrand" Edge="0">
          <![CDATA[BZ:789C6394B9BCF29088D9B24346B7161C7AC739E7D089DB330E9DB05D75282E65D9A1DF1BE61E9A3167EEA173026B0E8977AD3DF4847FE12163DF45874E7D597CC8E6C7E243995BFA0FB9FCAA718AFB15E73C6BE61767BFAA7097D6C5CB5D66DDFCE0B26EBDB2ABEDAC50D734B176D7D6CDCB5C972C39E93AEBE57B57DB833C6E
B3CC95DD1822ACDD181818ECFF1FF3B2B971F0AF2D031834D841B13D04030100C7F44AAA]]>
        </Plugin>
        <Plugin Id="1" Name="Voice Profiler" UID="nhft" MF_Gain="0.363359" LF_Q="0.0256047" HF_Freq="0.169365" CompBypass="0" HF_Gain="0.40916" Comp="0.496199" HP_Freq="0.00531827" HP_Gain="0.2" MF_Q="0.12" Bypass="False" HF_Type="0.7" Vendor="Hindenburg Systems" MF_Freq="0.0284487" HF_Q="0.09" LF_Freq="0.0168202" LF_Type="0.6" LF_Gain="0.575"/>
      </Plugins>
    </Track>
  </Tracks>
  <Clipboard>
    <Group Caption="Group 1"/>
    <Group Caption="Group 2"/>
    <Group Caption="Group 3"/>
    <Group Caption="Group 4"/>
  </Clipboard>
  <Markers>
    <Marker Id="2" Name="Out" Time="01:52.000"/>
    <Marker Id="3" Name="Marker 3" Time="27.200"/>
  </Markers>
</Session>`





const readFile = async file => {
  return new Promise(resolve => {
    const reader = new FileReader(file)
    reader.addEventListener('load', (e) => {
      resolve(e.target.result)
    })
    reader.readAsBinaryString(file)
  })
}

const parseFile = contents => {
  const parser = new DOMParser()
  const dom = parser.parseFromString(contents, 'application/xml')
  return [...dom.documentElement.querySelector('Tracks').children]
}


function App() {
  const [draggingOver, setDraggingOver] = useState(false)
  const [tracks, setTracks] = useState(null)

  const onDragEnter = e => {
    e.preventDefault()
    setDraggingOver(true)
  }

  const onDragOver = e => e.preventDefault()

  const onDragLeave = e => {
    e.preventDefault()
    setDraggingOver(false)
  }

  const onDrop = e => {
    e.preventDefault()

    const files = [...e.dataTransfer?.files]

    // TODO: check suffix and mime

    if (files.length > 0) {
      (async () => {
        const contents = await readFile(files[0])
        const tracks = parseFile(contents)
        setTracks(tracks)
      })()
    }
  }



  useEffect(() => {
  setTracks(parseFile(xmlko))
}, [])

  return (
    <div
      className={`App ${draggingOver && 'draggingOver'}`}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      Hello World
      <TrackList trackList={tracks} />
    </div>
  )
}

export default App;
