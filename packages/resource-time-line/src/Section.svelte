<script>
    import {getContext} from 'svelte';
    import {setContent} from '@event-calendar/core';
    import {createAllDayContent} from './utils.js';
	
	export let resource;
	
    let {theme, _times} = getContext('state');
	console.log("Inside Section");
	console.log(resource);
</script>

<div class="{$theme.sidebar}">
	<div class="{$theme.resource}" use:setContent={resource ? resource.titleHTML ? {html: resource.titleHTML} : resource.title : ''}></div>
</div>

<div class="{$theme.days}">
    <slot></slot>
</div>
