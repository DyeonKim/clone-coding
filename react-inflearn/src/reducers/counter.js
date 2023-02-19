import * as types from "../actions/ActionTypes";

const initialState = {
    number: 0
};

export default function counter(state = initialState, action) {
    switch(action.type) {
        case types.INCREMENT:
            return { number: state.number + 1 };
        case types.DECREMENT:
            return { number: state.number - 1 };
        default:
            return state;
    }
}

/*  만약 state 객체 안에 값이 여러개라면?
        본문과 같이 사용하면 변경하지 않는 다른 값의 초기값이 날아간다.
        그러므로 immutability helper나 ES6 Spread를 사용하여야 한다.
        (기존 state 복사 -> 복사한 곳에 변화 -> return)

        ex)
        const initialState = {
            number: 0.
            dummy: 'dumb',
            dumbObject: {
                d: 0,
                u: 1,
                m: 2,
                b: 3
            }
        };

        ...

        case types.INCREMENT:
            return { 
                ...state, 
                number: state.number + 1,
                dumbObject: { ...state.dumbObject, u: 0 }
            };
    */