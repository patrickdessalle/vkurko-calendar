import {btnTextDay, btnTextWeek, themeView} from '@event-calendar/core';
import TimeGrid from '@event-calendar/time-grid';
import {viewResources} from './stores.js';
import View from './View.svelte';
import Auxiliary from './Auxiliary.svelte';

export default {
	createOptions(options) {
		options.resources = [];
		options.datesAboveResources = false;
		options.filterResourcesWithEvents = false;
		options.resourceLabelContent = undefined;
		options.resourceLabelDidMount = undefined;
		// Common options
		options.buttonText.resourceTimeLineDay = 'day';
		options.buttonText.resourceTimeLineWeek = 'week';
		options.theme.resource = 'ec-resource';
		options.theme.resourceTitle = 'ec-resource-title';
		options.view = 'resourceTimeLineWeek';
		options.views.resourceTimeLineDay = {
			buttonText: btnTextDay,
			component: View,
			duration: {days: 1},
			theme: themeView('ec-time-line ec-resource-day-view')
		};
		options.views.resourceTimeLineWeek = {
			buttonText: btnTextWeek,
			component: View,
			duration: {weeks: 1},
			theme: themeView('ec-time-line ec-resource-week-view')
		};
	},

	createParsers(parsers) {
		parsers.resources = createResources;
	},

	createStores(state) {
		if (!('_times' in state)) {
			TimeGrid.createStores(state);
		}
		state._auxiliary.update($_auxiliary => [...$_auxiliary, Auxiliary]);
		state._viewResources = viewResources(state);
	}
}

function createResources(input) {
	return input.map(resource => ({
		id: String(resource.id),
		title: resource.title || '',
		titleHTML: resource.titleHTML || '',
		eventBackgroundColor: resource.eventBackgroundColor,
        eventTextColor: resource.eventTextColor
	}));
}
