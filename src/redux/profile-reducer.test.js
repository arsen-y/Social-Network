import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";

let state = {
    posts: [
        { id: 1, likesCount: 12, message: 'Hi' },
        { id: 2, likesCount: 5, message: 'How are you?' },
        { id: 3, likesCount: 2, message: 'heeeeeey' }
    ],
}

test('count of posts array should be incremented', () => {

    let action = addPostActionCreator("some text")

    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(4)

  });

  test('count of posts array should be decremented', () => {

    let action = deletePost(1)
   
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(2)

  });

