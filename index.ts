interface Configuration {
  q?: string
  'media-endpoint'?: string
  'syndicate-to'?: string
  'visibility'?: string
}

export class MicropubClient {
  endpoint: string
  token: string
  headers: any
  config: Configuration

  constructor (endpoint, token) {
    this.endpoint = endpoint
    this.token = token
    this.headers = {
      accept: 'application/json'
    }
    if (typeof token !== 'undefined') {
      this.headers.authorization = `Bearer ${token}`
    }

    this.getConfig = this.getConfig.bind(this)

    this.create = this.create.bind(this)
    this.read = this.read.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)

    this.query = this.query.bind(this)
    this.upload = this.upload.bind(this)
  }

  getConfig () {
    return fetch(this.endpoint + '?q=config', {
      headers: this.headers
    }).then(response => {
      if (response.status === 200 || response.status === 201) {
        return response.json().then(data => {
          return data
        })
      }
    })
  }

  getCategories () {
    return fetch(this.endpoint + '?q=category', {
      headers: this.headers
    }).then(response => {
      if (response.status === 200 || response.status === 201) {
        return response.json().then(data => {
          return data
        })
      }
    })
  }

  create (type: string, payload: object, visibility?: string) {
    const headers = this.headers
    headers['content-type'] = 'application/json'
    if (typeof visibility === 'undefined') {
      visibility = 'private'
    }
    return fetch(this.endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        type: [`h-${type}`],
        properties: payload,
        visibility: visibility
      })
    }).then(response => {
      if (response.status === 200 || response.status === 201) {
        return response.headers.get('location') // permalink
      }
    })
  }

  read (url) {
    const headers = this.headers
    headers['content-type'] = 'application/json'
    return fetch(this.endpoint, {
      method: 'GET',
      headers: headers
    }).then(response => {
      if (response.status === 200 || response.status === 201) {
        return response.json().then(data => {
          return data
        })
      }
    })
  }

  update (url, operation, property, values) {
    const payload = { action: 'update', url: url }
    payload[operation] = {}
    payload[operation][property] = values
    return fetch(this.endpoint, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${this.token}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => {
      if (response.status === 200 || response.status === 201) {
        console.log('UPDATED!')
      }
    })
  }

  delete (url) {
  }

  query (q, args) {
    return fetch(this.endpoint + `?q=${q}&search=${args}`, {
      headers: this.headers
    }).then(response => {
      if (response.status === 200 || response.status === 201) {
        return response.json().then(data => {
          return data
        })
      }
    })
  }

  upload () {
  }
}
