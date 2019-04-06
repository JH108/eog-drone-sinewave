import * as actions from '../actions';

const initialState = {
	loading: false,
	droneData: [],
};

const startLoading = (state, action) => {
	return { ...state, loading: true };
};

const droneDataReceived = (state, action) => {
	const { droneData } = action;
	if (!droneData.data) return state;

	return {
		...state,
		loading: false,
		droneData: action.droneData.data,
	};
};

const handlers = {
	[actions.FETCH_DRONE_DATA]: startLoading,
	[actions.DRONE_DATA_RECEIVED]: droneDataReceived,
};

export default (state = initialState, action) => {
	const handler = handlers[action.type];
	if (typeof handler === 'undefined') return state;
	return handler(state, action);
};
