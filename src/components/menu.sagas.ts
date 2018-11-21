import { takeLatest, put } from "redux-saga/effects";
import { actions, ActionTypes } from "./menu.actions";

function* helloWorld() {
  yield put(actions.helloWorldSuccess());
}

export function* sagas() {
  yield takeLatest(ActionTypes.HELLO_WORLD, helloWorld);
}
