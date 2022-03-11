import React from 'react'
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../Common/FormsControls/FormsControls';
import s from "./MyPosts.module.css"
import Post from './Post/Post';

const MyPosts = (props) => {

  let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);

  let onAddPost = (values) => {
    props.addPost(values.newPostText)
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>

      <AddNewPostFormRedux onSubmit={onAddPost} />

      <div className={s.posts}>

        {postsElements}

      </div>

    </div>
  )

}

const maxLength30 = maxLengthCreator(30)

const AddNewPostForm = (props) => {

  return (
      <form onSubmit={props.handleSubmit}>

        <div><Field component={Textarea} name='newPostText' validate={[required, maxLength30]} placeholder='new message' /></div>
        <div> <button>Add post</button></div>

      </form>
  )

}

const AddNewPostFormRedux = reduxForm({
  form: 'profileAddNewPostForm'
})(AddNewPostForm)

export default MyPosts;