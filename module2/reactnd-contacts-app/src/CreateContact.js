import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImageInput from './ImageInput';
import serializeForm from 'form-serialize';

export class CreateContact extends Component {

    // serializa os dados passados pelo formulário e chama a prop
    // passada pelo componente pai
    handleSubmit = (e) => {
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })

        if (this.props.onCreateContact) {
            this.props.onCreateContact(values)
        }
    }

    render() {
        return (
            <div>
                <Link className='close-create-contact'
                    to='/'>Close</Link>
                <form onSubmit={this.handleSubmit} className='create-contact-form'>
                    <ImageInput
                        className='create-contact-avatar-input'
                        name='avatarURL'
                        maxHeight={64}
                    />
                    <div className='create-contact-details'>
                        <input type='text' name='name' placeholder='Name' />
                        <input type='text' name='handle' placeholder='Handler' />
                        <button>Add Contact</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateContact

