<script>
    import {getContext} from 'svelte';
    import Section from './Section.svelte';
    import Day from './Day.svelte';

    let {_bodyEl, _viewDates, _viewResources, _slotTimeLimits, _times, scrollTime, slotDuration, slotHeight, theme} = getContext('state');

    let loops;
    $: loops = [$_viewDates, $_viewResources];
	
    let el;
    let compact;
    let rows = [];
    let timeLimitMin;

    $: $_bodyEl = el;

    $: {
        compact = $slotDuration.seconds >= 3600;
        rows.length = $_times.length;
        // Use intermediate variable so that changes in _slotTimeLimits do not trigger setting the el.scrollTop
        timeLimitMin = $_slotTimeLimits.min.seconds;
    }

    $: if (el && $_viewDates) {
        scrollToTime()
    }

    function scrollToTime() {
        el.scrollTop = (($scrollTime.seconds - timeLimitMin) / $slotDuration.seconds - 0.5) * $slotHeight;
    }
</script>

<div
    bind:this={el} 
    class="{$theme.body}{compact ? ' ' + $theme.compact : ''}"
>
	{#each $_viewResources as resource}
		<div class="{$theme.content}">
			<Section {resource}>
				{#each $_viewDates as date}
					<Day
						date={date}
						resource={resource}
					/>
				{/each}
			</Section>
		</div>
	{/each}
</div>
