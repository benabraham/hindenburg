import './TrackList.css'
import { PluginList } from './PluginList.js'


export const Track = ({ track }) => {
    
    return (
      <li className='Track'>
        <div>
          <span>{track.getAttribute('Name') ?? 'No Name'}</span>
          <PluginList className='PluginList' plugins={[...track.querySelector('Plugins')?.children ?? []]} />
        </div>
      </li>
    )
}

export const TrackList = ({ trackList }) => {
  const onClick = (index) => () => {
    console.log(trackList, index)
  }

  return trackList ? (
    <ul className='TrackList'>
      {(trackList ?? []).map((track, index) => (
        <Track track={track} onClick={onClick(index)} />
      ))}
    </ul>
  ) : null
}
