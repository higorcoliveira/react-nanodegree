import React, { Component } from 'react'
import { TWEET_TEXT_LIMIT } from '../utils/helpers'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'

// componente controlado pelo react
// armazenar o estado desse componente no redux ficaria mais complicado
// mais aconselhável usar o próprio gerenciamento de estado do react
class NewTweet extends Component {
    state = {
        text: '',
    }
    handleChange = (e) => {
        const text = e.target.value

        this.setState(() => ({
            text
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { text } = this.state
        const { dispatch, id } = this.props
        
        dispatch(handleAddTweet(text, id))

        this.setState(() => ({
            text: ''
        }))
    }

    render() {
        const { text } = this.state

        {/* todo: Redirect to / if submitted */ }

        const tweetLeft = TWEET_TEXT_LIMIT - text.length
        return (
            <div>
                <h3 className='center'>Compose New Tweet</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <textarea
                        placeholder="What's happening?"
                        value={text}
                        onChange={this.handleChange}
                        className='textarea'
                        maxLength={280}
                    />
                    {tweetLeft <= 100 && (
                        <div className='tweet-length'>
                            {tweetLeft}
                        </div>
                    )}
                    <button
                        className='btn'
                        type='submit'
                        disabled={text === ''}>
                        Submit
          </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewTweet)
