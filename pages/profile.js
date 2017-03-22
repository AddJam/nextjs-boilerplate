import React, { Component } from 'react'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import { nextConnect } from '../src/config/store'
import { nameSelector, setName } from '../src/modules/user'
import { style, rehydrate } from 'glamor'

// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  // Rehydrate styles
  rehydrate(window.__NEXT_DATA__.ids)
}

class ProfilePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: props.name
    }
  }

  render () {
    const { name, setName } = this.props

    return (
      <div {...styles.page}>
        <p>Your name: {name}</p>
        <Link href='/'><a>Home</a></Link>
        <input
          value={this.state.name}
          onChange={(e) => this.setState({name: e.target.value})} />
        <button onClick={() => {
          setName(this.state.name)
        }}>
          Set Name
        </button>
      </div>
    )
  }
}

const styles = {
  page: style({
    color: '#666',
    fontSize: 20
  })
}

const mapStateToProps = (state) => ({
  name: nameSelector(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setName
}, dispatch)

export default nextConnect(mapStateToProps, mapDispatchToProps)(ProfilePage)
