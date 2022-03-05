<template>
	<div class="rdv">
		<h1>This is a calendar page</h1>
		<FullCalendar :options="calendarOptions" />
	</div>
	<input type="checkbox" id="new_meeting_modal" class="modal-toggle" />
	<div class="new_rdv fixed" :style="{ left: newMeeting.boxPosX, top: newMeeting.boxPosY }">
		<h3 class="font-bold text-lg">Ajouter un rendez-vous</h3>
		<div class="flex flex-column">
			<div class="form-control">
				<label class="label">
					<span class="label-text">Date</span>
				</label>
				<label class="input-group">
					<span>Date</span>
					<input type="text" placeholder="info@site.com" class="input input-bordered" />
				</label>
			</div>
			<div class="flex flex-row flex-nowrap"></div>
		</div>
		<button>Do it !</button>
	</div>
</template>

<script>
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import frCalendar from "@fullcalendar/core/locales/fr";

export default {
	components: {
		FullCalendar,
	},
	data() {
		return {
			tab: "day",
			calendarOptions: {
				plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
				initialView: "timeGridDay",
				selectable: true,
				locale: frCalendar,
				nowIndicator: true,
				headerToolbar: {
					left: "timeGridDay,listWeek,dayGridMonth",
					center: "title",
					right: "prev,next today",
				},
				allDaySlot: false,
				height: 600,
				dateClick: this.setNewMeeting,
			},
			newMeeting: {
				boxPosX: 0,
				boxPosY: 0,
				startDate: "",
				endDate: "",
				startTime: "",
				endTime: "",
				patient: "",
				mode: "",
				aide: "",
				reason: "",
				professional: "",
				location: "",
				description: "",
				notes: "",
			},
		};
	},
	methods: {
		setNewMeeting(info) {
			console.log(this.newMeeting);
			console.log("Clicked on: " + info.dateStr);
			console.log("Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY);
			console.log("Current view: " + info.view.type);
			this.newMeeting.boxPosX = info.jsEvent.pageX + "px";
			this.newMeeting.boxPosY = info.jsEvent.pageY + "px";
			console.log(this.newMeeting);
		},
	},
};
</script>

<style lang="scss">
@tailwind components;

@layer components {
	#ze_calendar {
		th {
			@apply capitalize;
		}
	}
}

.new_rdv {
	width: 200px;
	height: 200px;
	background: #fff;
	border: 3px solid red;
	top: 0;
	left: 0;
}
</style>
