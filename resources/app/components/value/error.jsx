/* globals window */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { LogKey, LogColon, ButtonToggle, ValueWrapper } from './log-element'

const LinkToEditor = styled.span`
  cursor: pointer;
  user-select: auto;
`

export default class LogError extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: !props.opened,
    }
  }

  render() {
    const { collapsed } = this.state
    const { logKey, error } = this.props
    return (
      <span>
        <ButtonToggle
          onClick={() => this.setState({ collapsed: !collapsed })}
          expanded={!collapsed}
        >
          &gt;
        </ButtonToggle>
        {logKey && (
          <span>
            <LogKey>{logKey}</LogKey>
            <LogColon>: </LogColon>
          </span>
        )}
        <span>
          {error.name}: {error.message}
        </span>
        {!collapsed && (
          <ValueWrapper>
            {error.stack.map((value, key) => (
              <li key={key}>
                <LinkToEditor
                  onClick={e => {
                    if (e.metaKey) {
                      window.postMessage('openFile', value.filePath)
                    }
                  }}
                >
                  {value.fn} {value.file}
                  {value.line ? `:${value.line}:${value.column}` : ''}
                </LinkToEditor>
              </li>
            ))}
          </ValueWrapper>
        )}
      </span>
    )
  }
}

LogError.propTypes = {
  opened: PropTypes.bool,
  logKey: PropTypes.string,
  error: PropTypes.shape({
    name: PropTypes.string,
    message: PropTypes.string,
    stack: PropTypes.arrayOf(
      PropTypes.shape({
        fn: PropTypes.string,
        file: PropTypes.string,
        filePath: PropTypes.string,
        line: PropTypes.string,
        column: PropTypes.string,
      })
    ),
  }).isRequired,
}
