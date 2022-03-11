import React from 'react'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import s from "./Dialogs.module.css"
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import { Textarea } from '../Common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';

const Dialogs = (props) => {

  let state = props.dialogsPage

  let dialogsElements = state.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id} />);
  let messagesElements = state.messages.map(m => <Message key={m.id} message={m.message} />);

  let addNewMessage = values => {
    props.sendMessage(values.newMessageBody)
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>

        {dialogsElements}

      </div>
      <div className={s.messages}>

        <div>{messagesElements}</div>
      </div>

      <AddMessageReduxForm onSubmit={addNewMessage} />
    </div>
  )

}

const maxLength50 = maxLengthCreator(50)

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
    <div><Field component={Textarea} name='newMessageBody' validate={[required, maxLength50]} placeholder='enter your message' /></div>
    <div><button>Send</button></div>

    </form>
  );
}

const AddMessageReduxForm = reduxForm({
  form: 'dialogAddMessageForm'
})(AddMessageForm)

export default Dialogs