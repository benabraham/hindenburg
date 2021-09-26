import './PluginList.css'


export const Plugin = ({ plugin }) => {
  return plugin && (
    <li className='Plugin'>
      <span>{plugin.getAttribute('Name')}</span>
    </li>
  )
}

export const PluginList = ({ plugins }) => {
    
  return plugins
    ? (
      <ul className='PluginList'>
        {plugins.map(plugin => (
          <Plugin plugin={plugin} />
        ))}
      </ul>
    )
    : null
}
