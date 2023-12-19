import { EditorState, EditorStateConfig, Transaction } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

import { LayoutView, TabView } from "../view";
import {
  LayoutTransaction,
  TabState,
  focusCurrent,
  applyTransaction,
} from "../state";
import {
  getFileName,
  getFileID,
} from "../../../../app/desktop/src/renderer/file";

import { ElectronAPI } from "@core/api";

export class EditorTabState extends TabState<EditorState> {
  static create(config?: EditorStateConfig, id?: string) {
    return new EditorTabState(EditorState.create(config), id);
  }

  applyTransaction(transaction: Transaction) {
    return new EditorTabState(transaction.state, this.id);
  }

  get name() {
    return getFileName(this.contents);
  }

  get fileID() {
    return getFileID(this.contents);
  }
}

export class EditorTabView extends TabView<EditorState> {
  private editor;

  constructor(
    layout: LayoutView,
    id: string,
    private api: typeof ElectronAPI,
    config?: EditorStateConfig
  ) {
    const state = EditorTabState.create(config, id);
    super(layout, state);

    // Set up dom...

    this.editor = new EditorView({
      state: this.state.contents,
      parent: this.dom,
      dispatch: (transaction) => {
        this.layout.dispatch({
          effects: [applyTransaction.of({ id: this.state.id, transaction })],
        });
      },
    });
  }

  update(tr: LayoutTransaction) {
    super.update(tr);

    for (let effect of tr.effects) {
      if (effect.is(applyTransaction) && effect.value.id === this.state.id) {
        this.editor.update([effect.value.transaction]);
      }
    }

    if (tr.state.current === this.state.id) {
      if (
        tr.startState.current !== this.state.id ||
        tr.effects.some((e) => e.is(focusCurrent))
      ) {
        this.editor.focus();
      }
    }
  }

  beforeClose() {
    this.api.requestClose(this.state.id);
    return false;
  }

  destroy() {
    this.editor.destroy();
  }
}
