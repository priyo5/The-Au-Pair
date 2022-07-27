import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetId , SetType, SetFcmToken, SetName } from './actions';
import { Injectable } from '@angular/core';

export interface AppStateModel{
    id: string;
    name: string;
    type: number;
    fcmToken: string;
}

@State<AppStateModel>({
    name: 'user',
    defaults: {
        id: '',
        name: '',
        type: 0,
        fcmToken: ''
    },
})

@Injectable()
export class AppState{

    @Action(SetId)
    setId({ patchState }: StateContext<AppStateModel>, { payload }: SetId) {
        patchState({id: payload});
    }
    
    @Selector()
    static getID(state : AppStateModel) {
        return state.id;
    }

    @Action(SetName)
    setName({ patchState }: StateContext<AppStateModel>, { payload }: SetName) {
        patchState({name: payload});
    }
    
    @Selector()
    static getName(state : AppStateModel) {
        return state.name;
    }

    @Action(SetType)
    setType({ patchState }: StateContext<AppStateModel>, { payload }: SetType) {
        patchState({type: payload});
    }

    @Selector()
    static getType(state : AppStateModel) {
        return state.id;
    }

    @Action(SetFcmToken)
    setFcmToken({ patchState }: StateContext<AppStateModel>, { payload }: SetFcmToken) {
        patchState({fcmToken: payload});
    }

    @Selector()
    static getFcmToken(state : AppStateModel) {
        return state.fcmToken;
    }
}
