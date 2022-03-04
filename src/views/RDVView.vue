<template>
	<div class="rdv">
		<h1>This is a calendar page</h1>
		<div id="ze_calendar">
			<FullCalendar :options="calendarOptions" />
		</div>
	</div>
</template>

<script>
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
	components: {
		FullCalendar, // make the <FullCalendar> tag available
	},
	data() {
		return {
			calendarOptions: {
				plugins: [dayGridPlugin, interactionPlugin],
				initialView: "dayGridMonth",
				selectable: true,
				locale: "fr",
				headerToolbar: {},
				dateClick: function (info) {
					console.log("Clicked on: " + info.dateStr);
					console.log("Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY);
					console.log("Current view: " + info.view.type);
					// change the day's background color just for fun
					info.dayEl.style.backgroundColor = "red";
				},
			},
		};
	},
	methods: {
		toggleWeekends: function () {
			this.calendarOptions.weekends = !this.calendarOptions.weekends; // toggle the boolean!
		},
	},
};
</script>

<style lang="scss">
@media (min-width: 1024px) {
	.rdv {
		display: block;
	}
}
</style>
