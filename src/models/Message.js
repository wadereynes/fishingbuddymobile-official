import { firebase } from '../config/firebase'

export const SendMessage = async (
  currentUid,
  guestUid,
  message,
  currentTime
) => {
  try {
    return await firebase
      .database()
      .ref('messages/' + currentUid)
      .child(guestUid)
      .push({
        message: {
          sender: currentUid,
          receiver: guestUid,
          msg: message,
          time: currentTime,
        },
      })
  } catch (error) {
    return error
  }
}

export const ReceiveMessage = async (
  currentUid,
  guestUid,
  message,
  currentTime
) => {
  try {
    return await firebase
      .database()
      .ref('messages/' + guestUid)
      .child(currentUid)
      .push({
        message: {
          sender: currentUid,
          receiver: guestUid,
          msg: message,
          time: currentTime,
        },
      })
  } catch (error) {
    return error
  }
}
