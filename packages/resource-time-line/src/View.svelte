<script>
    import {getContext} from 'svelte';
    import {setContent} from '@event-calendar/core';
    import {Section, Body, Day, Week} from '@event-calendar/time-grid';
    import Label from './Label.svelte';

    let {_viewDates, _viewResources, _intlDayHeader, theme} = getContext('state');

    let loops;
    $: loops = [$_viewDates, $_viewResources];
</script>

<div class="{$theme.header}">
    <Section>
		{#if loops[0].length > 1}
			<div class="{$theme.days}">
				{#each loops[0] as item0}
					<div class="{$theme.day}" use:setContent={$_intlDayHeader.format(item0)}></div>
				{/each}
			</div>
		{/if}
    </Section>
    <div class="{$theme.hiddenScroll}"></div>
</div>
<Body>
{#each loops[0] as item0}
    <div class="{$theme.resource}">
        {#each loops[1] as item1}
            <Day
                date={item0}
                resource={item1}
            />
        {/each}
    </div>
{/each}
</Body>