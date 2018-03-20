const path = require('path')
const {init, end, generatePage, plug} = require('sitio')
const parallel = require('run-parallel')

const plugins = {
  'url:html': 'sitio-url',
  'url:markdown': 'sitio-url',
  'trello:list': 'sitio-trello/list'
}

init({{ json .Globals }})

let tasks = {{ json .Sources }}.map(({provider, reference, root, data}) => function (done) {
  let pluginName = plugins[provider]
  if (!pluginName) return

  data.ref = reference
  plug(pluginName, root, data, done)
})

parallel(
  tasks,
  (err, _) => {
    if (err) {
      console.log('error running one of the sources', err)
      return
    }

    end()
  }
)